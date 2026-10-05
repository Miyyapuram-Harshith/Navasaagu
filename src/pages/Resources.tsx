
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { BookOpen, ExternalLink, ShieldCheck, MapPin, Droplets } from 'lucide-react';


const Resources = () => {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-agri-dark mb-2 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-harvest-yellow" />
            Resources for your farm
          </h1>
          <p className="text-gray-500 text-lg">3 resources may be relevant to your farm.</p>
        </div>

        <div className="space-y-4">
          
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 hover:border-agri-green/50 transition-colors">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-agri-dark">Crop Support Scheme (PM-KISAN)</h3>
                    <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                      High Relevance
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 max-w-xl">
                    Financial support scheme for farmers with cultivable landholding. You may be eligible for the next installment.
                  </p>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                    <div><span className="text-gray-400">Benefit:</span> <span className="font-medium text-gray-800">₹6,000/year</span></div>
                    <div><span className="text-gray-400">Deadline:</span> <span className="font-medium text-gray-800">Rolling</span></div>
                    <div><span className="text-gray-400">Region:</span> <span className="font-medium text-gray-800">All India</span></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <button className="bg-agri-green text-white px-6 py-2.5 rounded-xl font-medium hover:bg-agri-dark transition-colors whitespace-nowrap">
                  Check Eligibility
                </button>
                <button className="bg-gray-50 text-gray-700 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                  View Details <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 hover:border-agri-green/50 transition-colors">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-agri-dark">Nearest Agriculture Service Center</h3>
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                      6.4 km away
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 max-w-xl">
                    Rythu Vedika - Warangal. Available for soil testing, seed procurement, and expert consultation.
                  </p>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                    <div><span className="text-gray-400">Services:</span> <span className="font-medium text-gray-800">Soil, Seeds</span></div>
                    <div><span className="text-gray-400">Status:</span> <span className="font-medium text-green-600">Open Now</span></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <button className="bg-gray-50 text-gray-700 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                  Get Directions <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 hover:border-agri-green/50 transition-colors">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-400 flex items-center justify-center shrink-0">
                  <Droplets className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-agri-dark">Micro-Irrigation Subsidy</h3>
                    <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                      Medium Relevance
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 max-w-xl">
                    TS-MIP scheme offering subsidies for drip and sprinkler irrigation systems.
                  </p>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                    <div><span className="text-gray-400">Benefit:</span> <span className="font-medium text-gray-800">Up to 90% subsidy</span></div>
                    <div><span className="text-gray-400">Region:</span> <span className="font-medium text-gray-800">Telangana</span></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <button className="bg-gray-50 text-gray-700 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                  View Details <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Resources;
