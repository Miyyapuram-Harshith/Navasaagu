export interface Coordinates {
  lat: number;
  lng: number;
}

export interface FarmProfile {
  id: string;
  name: string;
  center: Coordinates;
  polygon: Coordinates[]; // Array of lat/lng defining the boundary
  areaAcres: number;
  areaHectares: number;
  areaSqMeters: number;
  crop: string;
  season: string;
  irrigation: string;
  createdAt: number;
  updatedAt: number;
}
