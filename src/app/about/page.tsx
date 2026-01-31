export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Sri Lanka Bus Finder
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Making public transportation easier for everyone in Sri Lanka
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Sri Lanka Bus Finder is designed to simplify public transportation in Sri Lanka. We understand how challenging it can be to navigate the bus system, especially for locals who don&apos;t know all the routes and tourists unfamiliar with the country.
            </p>
            
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              Our platform provides comprehensive information about Sri Lankan bus routes, schedules, fares, and nearby stops to make your journey as smooth as possible.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="text-4xl mb-4">📍</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Find Your Route</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Enter your starting point and destination to find available bus routes connecting them.
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="text-4xl mb-4">🚌</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Get Bus Details</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  View bus numbers, types, operators, departure/arrival times, and fares.
                </p>
              </div>
              
              <div className="bg-purple-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="text-4xl mb-4">📍</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Locate Stops</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Find the nearest bus stops to your current location using GPS.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Features</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-8">
              <li>Comprehensive database of Sri Lankan bus routes and schedules</li>
              <li>Real-time fare information for different routes</li>
              <li>Nearest bus stop detection using GPS</li>
              <li>Information about express, ordinary, and night buses</li>
              <li>Major routes covering all provinces of Sri Lanka</li>
              <li>User-friendly interface designed for local needs</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Coverage Areas</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our system covers major bus routes throughout Sri Lanka, including:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🏛️</div>
                <div className="font-medium">Colombo</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🏔️</div>
                <div className="font-medium">Kandy</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🌊</div>
                <div className="font-medium">Galle</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🌴</div>
                <div className="font-medium">Jaffna</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🏝️</div>
                <div className="font-medium">Trincomalee</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">⛰️</div>
                <div className="font-medium">Nuwara Eliya</div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Why Use Our Service?</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Public transportation in Sri Lanka can be confusing without proper guidance. Our bus finder system bridges the gap between passengers and information, making travel more accessible for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-8">
              <li>Tourists exploring Sri Lanka&apos;s beautiful destinations</li>
              <li>Students traveling between cities</li>
              <li>Workers commuting for employment</li>
              <li>Anyone looking for affordable transportation options</li>
            </ul>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Note</h3>
              <p className="text-yellow-700 dark:text-yellow-300">
                While we strive to provide accurate and up-to-date information, please verify schedules and fares directly with bus operators before traveling, as these can occasionally change.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}