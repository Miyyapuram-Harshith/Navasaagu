import React, { useState, useCallback, useRef, useEffect } from 'react';
import { 
  GoogleMap, 
  useJsApiLoader, 
  DrawingManager, 
  Polygon, 
  StandaloneSearchBox
} from '@react-google-maps/api';
import type { Coordinates } from '../../types/farm';
import { Navigation, MapPin, X, RotateCcw, Save } from 'lucide-react';

const LIBRARIES: ("places" | "drawing" | "geometry")[] = ['places', 'drawing', 'geometry'];

interface GoogleFarmMapProps {
  initialCenter?: Coordinates;
  savedPolygon?: Coordinates[];
  onSaveFarm?: (polygon: Coordinates[], areaSqMeters: number, center: Coordinates) => void;
  readOnly?: boolean;
  children?: React.ReactNode; // For overlays, markers, risk zones, etc.
}

const DEFAULT_CENTER = { lat: 18.0, lng: 79.5 }; // Warangal approx
const DEFAULT_ZOOM = 16;

const GoogleFarmMap: React.FC<GoogleFarmMapProps> = ({ 
  initialCenter, 
  savedPolygon, 
  onSaveFarm,
  readOnly = false,
  children
}) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  const isKeyValid = apiKey && apiKey.length > 10 && !apiKey.includes('YourRealKeyGoesHere');

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: isKeyValid ? apiKey : '',
    libraries: LIBRARIES
  });

  const [, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState<Coordinates>(initialCenter || DEFAULT_CENTER);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [polygonPaths, setPolygonPaths] = useState<Coordinates[]>(savedPolygon || []);
  const [tempPolygon, setTempPolygon] = useState<google.maps.Polygon | null>(null);
  const [area, setArea] = useState<number>(0);
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);
  
  const drawingManagerRef = useRef<google.maps.drawing.DrawingManager | null>(null);

  // Recalculate area if polygonPaths changes (and we're not using tempPolygon yet)
  useEffect(() => {
    if (isLoaded && polygonPaths.length > 2 && window.google) {
      const path = polygonPaths.map(p => new window.google.maps.LatLng(p.lat, p.lng));
      const calculatedArea = window.google.maps.geometry.spherical.computeArea(path);
      setArea(calculatedArea);
    }
  }, [polygonPaths, isLoaded]);

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
    mapInstance.setMapTypeId('hybrid'); // Default to Satellite with labels
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleSearchBoxLoad = (ref: google.maps.places.SearchBox) => {
    setSearchBox(ref);
  };

  const handlePlacesChanged = () => {
    if (searchBox) {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        if (place.geometry && place.geometry.location) {
          const newCenter = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          };
          setCenter(newCenter);
          setZoom(18); // Zoom in closer for farm definition
        }
      }
    }
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setZoom(19);
        },
        (_error) => {
          alert('Location access is unavailable. Search for your farm instead.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const onPolygonComplete = (polygon: google.maps.Polygon) => {
    setTempPolygon(polygon);
    
    // Calculate initial area
    const path = polygon.getPath();
    const calculatedArea = window.google.maps.geometry.spherical.computeArea(path);
    setArea(calculatedArea);

    // Stop drawing mode but keep polygon editable
    setIsDrawingMode(false);
    polygon.setEditable(true);

    // Listen for edits
    ['insert_at', 'remove_at', 'set_at'].forEach(eventName => {
      window.google.maps.event.addListener(path, eventName, () => {
        const updatedArea = window.google.maps.geometry.spherical.computeArea(path);
        setArea(updatedArea);
      });
    });
  };

  const handleSaveFarm = () => {
    if (tempPolygon) {
      const path = tempPolygon.getPath();
      const coords: Coordinates[] = [];
      for (let i = 0; i < path.getLength(); i++) {
        coords.push({ lat: path.getAt(i).lat(), lng: path.getAt(i).lng() });
      }
      
      const savedArea = window.google.maps.geometry.spherical.computeArea(path);
      
      // Calculate center of polygon
      let bounds = new window.google.maps.LatLngBounds();
      coords.forEach(c => bounds.extend(new window.google.maps.LatLng(c.lat, c.lng)));
      const centerCoord = { lat: bounds.getCenter().lat(), lng: bounds.getCenter().lng() };

      setPolygonPaths(coords);
      if (onSaveFarm) {
        onSaveFarm(coords, savedArea, centerCoord);
      }
      
      // Cleanup temp polygon
      tempPolygon.setMap(null);
      setTempPolygon(null);
    }
  };

  const handleClearPolygon = () => {
    if (tempPolygon) {
      tempPolygon.setMap(null);
      setTempPolygon(null);
    }
    setPolygonPaths([]);
    setArea(0);
  };

  if (!isKeyValid) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full bg-green-50 border-2 border-dashed border-agri-green/30 rounded-2xl p-8 text-center">
        <MapPin className="w-16 h-16 text-agri-green/50 mb-4" />
        <h3 className="text-xl font-bold text-agri-dark mb-2">Google Maps Setup Required</h3>
        <p className="text-gray-600 max-w-md mb-6">
          To enable the interactive farm intelligence map, please add your Google Maps API key to the <code className="bg-gray-100 px-2 py-1 rounded">.env</code> file.
        </p>
        <div className="bg-white p-4 rounded-xl shadow-sm text-sm text-left border border-gray-100 w-full max-w-md">
          <p className="font-mono text-gray-500 mb-2">.env</p>
          <code className="text-blue-600">VITE_GOOGLE_MAPS_API_KEY=your_real_api_key</code>
        </div>
      </div>
    );
  }

  if (loadError) return <div className="p-4 text-red-500">Error loading maps: {loadError.message}</div>;
  if (!isLoaded) return <div className="p-4 text-gray-500 flex items-center gap-2"><div className="w-4 h-4 border-2 border-agri-green border-t-transparent rounded-full animate-spin"></div> Loading Map...</div>;

  const acres = (area * 0.000247105).toFixed(2);
  const hectares = (area * 0.0001).toFixed(2);

  return (
    <div className="flex flex-col h-full w-full relative">
      {!readOnly && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-full max-w-md px-4 flex flex-col gap-2">
          <StandaloneSearchBox onLoad={handleSearchBoxLoad} onPlacesChanged={handlePlacesChanged}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search village, town, landmark or PIN code"
                className="w-full bg-white shadow-lg rounded-full px-5 py-3 pl-12 text-sm font-medium outline-none border border-transparent focus:border-agri-green"
              />
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </StandaloneSearchBox>
          <button 
            onClick={handleUseMyLocation}
            className="self-center bg-white/90 backdrop-blur text-gray-700 shadow-md px-4 py-2 rounded-full text-xs font-semibold hover:bg-gray-50 flex items-center gap-2"
          >
            <Navigation className="w-4 h-4 text-blue-500" /> Use My Location
          </button>
        </div>
      )}

      <div className="flex-1 relative rounded-2xl overflow-hidden border border-gray-200">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={center}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            mapTypeId: 'hybrid', // Default to satellite
            mapTypeControl: true,
            mapTypeControlOptions: {
              position: window.google?.maps?.ControlPosition?.TOP_RIGHT
            },
            fullscreenControl: false,
            streetViewControl: false,
          }}
        >
          {!readOnly && isDrawingMode && (
            <DrawingManager
              onLoad={ref => drawingManagerRef.current = ref}
              onPolygonComplete={onPolygonComplete}
              options={{
                drawingControl: false,
                drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
                polygonOptions: {
                  fillColor: '#22C55E',
                  fillOpacity: 0.3,
                  strokeColor: '#14532D',
                  strokeWeight: 3,
                  editable: true,
                  draggable: false
                }
              }}
            />
          )}

          {/* Render saved polygon if we aren't currently drawing a new one */}
          {polygonPaths.length > 0 && !tempPolygon && (
            <Polygon
              paths={polygonPaths}
              options={{
                fillColor: '#22C55E',
                fillOpacity: 0.2,
                strokeColor: '#14532D',
                strokeWeight: 3,
              }}
            />
          )}

          {children}
        </GoogleMap>

        {/* Drawing Controls Overlay */}
        {!readOnly && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
            
            {/* Show Area Calculation if we have a polygon */}
            {(tempPolygon || polygonPaths.length > 0) && area > 0 && (
              <div className="bg-white/95 backdrop-blur shadow-xl rounded-2xl p-4 min-w-[200px] text-center border border-agri-green/20">
                <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">Your Farm</h4>
                <div className="text-xl font-bold text-agri-dark">{acres} acres</div>
                <div className="text-sm font-medium text-gray-500">{hectares} hectares</div>
                <p className="text-[10px] text-gray-400 mt-2">Map-based estimate.</p>
              </div>
            )}

            {!isDrawingMode && !tempPolygon && polygonPaths.length === 0 && (
              <button 
                onClick={() => setIsDrawingMode(true)}
                className="bg-agri-green text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-agri-green/30 hover:bg-agri-dark transition-all hover:scale-105"
              >
                + Draw My Farm
              </button>
            )}

            {isDrawingMode && !tempPolygon && (
              <div className="bg-black/80 backdrop-blur text-white px-6 py-3 rounded-full text-sm font-medium flex items-center gap-4">
                <span>Tap around your field boundary to mark your farm.</span>
                <button onClick={() => setIsDrawingMode(false)} className="bg-white/20 p-1.5 rounded-full hover:bg-white/30">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {tempPolygon && (
              <div className="flex gap-3">
                <button 
                  onClick={handleClearPolygon}
                  className="bg-white text-red-600 px-6 py-3 rounded-full font-bold shadow-lg hover:bg-gray-50 flex items-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" /> Clear
                </button>
                <button 
                  onClick={handleSaveFarm}
                  className="bg-agri-green text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-agri-dark flex items-center gap-2"
                >
                  <Save className="w-5 h-5" /> Save Farm
                </button>
              </div>
            )}
            
            {polygonPaths.length > 0 && !tempPolygon && (
              <button 
                onClick={handleClearPolygon}
                className="bg-white text-gray-700 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-50 border border-gray-200"
              >
                Edit Farm Boundary
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleFarmMap;
