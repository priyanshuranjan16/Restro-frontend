export default function Hero() {
  return (
    <section className="w-full bg-white pt-24 pb-20 px-6 text-center">
      <div className="max-w-6xl mx-auto">
        {/* Hero text */}
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-8">
          <span className="relative font-caveat">
            All-in-one Restaurant Management System
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-blue-500 transform -skew-x-12 opacity-80"></span>
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
          A one stop restaurant management system with mobile ordering, table
          reservations, online ordering, employee scheduling, integration with
          delivery platforms... all at a fraction of the cost of traditional
          software.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <a
            href="#"
            className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
          >
            Get started - It's free!
          </a>
          
        </div>

        
      </div>
    </section>
  );
}
