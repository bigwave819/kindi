// components/skeletons/HomeSkeleton.tsx
export default function HomeSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Skeleton */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Skeleton */}
            <div className="flex items-center">
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
            
            {/* Navigation Links Skeleton */}
            <div className="hidden md:flex items-center space-x-8">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
            
            {/* Auth Buttons Skeleton */}
            <div className="flex items-center space-x-4">
              <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Main Heading Skeleton */}
            <div className="h-12 w-3/4 mx-auto bg-gray-200 rounded animate-pulse mb-6"></div>
            
            {/* Subheading Skeleton */}
            <div className="h-6 w-2/3 mx-auto bg-gray-200 rounded animate-pulse mb-8"></div>
            
            {/* CTA Buttons Skeleton */}
            <div className="flex justify-center space-x-4">
              <div className="h-12 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-12 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading Skeleton */}
          <div className="text-center mb-12">
            <div className="h-8 w-64 mx-auto bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="h-4 w-96 mx-auto bg-gray-200 rounded animate-pulse"></div>
          </div>
          
          {/* Features Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-center p-6">
                <div className="h-16 w-16 bg-gray-200 rounded-full animate-pulse mx-auto mb-4"></div>
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mx-auto mb-3"></div>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section Skeleton */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading Skeleton */}
          <div className="text-center mb-12">
            <div className="h-8 w-64 mx-auto bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="h-4 w-96 mx-auto bg-gray-200 rounded animate-pulse"></div>
          </div>
          
          {/* Services Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-3"></div>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section Skeleton */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="h-12 w-20 bg-gray-200 rounded animate-pulse mx-auto mb-2"></div>
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-8 w-2/3 mx-auto bg-blue-400 rounded animate-pulse mb-4"></div>
          <div className="h-6 w-1/2 mx-auto bg-blue-400 rounded animate-pulse mb-6"></div>
          <div className="h-12 w-48 bg-blue-400 rounded animate-pulse mx-auto"></div>
        </div>
      </section>

      {/* Footer Skeleton */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-6 w-24 bg-gray-600 rounded animate-pulse mb-4"></div>
                <div className="space-y-2">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="h-4 w-32 bg-gray-600 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8">
            <div className="h-4 w-48 bg-gray-600 rounded animate-pulse mx-auto"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}