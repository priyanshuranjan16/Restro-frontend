export default function Hero() {
  return (
    <section className="w-full bg-white py-16 px-6 text-center">
      <div className="max-w-6xl mx-auto">
        {/* Hero text */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug mb-6">
          <span className="italic">An all-in-one POS restaurant</span>
        </h2>

        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Enjoy a lightning-fast point of sale, with mobile ordering, table
          reservations, online ordering, employee scheduling, integration with
          delivery platforms... all at a fraction of the cost of traditional
          software.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <a
            href="#"
            className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-md font-semibold"
          >
            Get started - It's free!
          </a>
          <a
            href="#"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-md font-semibold"
          >
            Meet an advisor
          </a>
        </div>

        {/* Subtext */}
        <p className="text-sm text-gray-500 mt-4">
          It&apos;s free forever, with unlimited users.{" "}
          <a href="#" className="text-green-600 font-medium hover:underline">
            Find out why.
          </a>
        </p>
      </div>
    </section>
  );
}
