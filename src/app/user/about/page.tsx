import Image from "next/image";

const values = [
  {
    id: 1,
    title: "Local First",
    description:
      "We support local farmers and suppliers by sourcing coffee beans and ingredients from within Rwanda.",
  },
  {
    id: 2,
    title: "Quality & Freshness",
    description:
      "Every dish and drink is crafted with care, using fresh ingredients to ensure the best taste.",
  },
  {
    id: 3,
    title: "Community Spirit",
    description:
      "We aim to create a place that feels like home for everyone who walks through our doors.",
  },
  {
    id: 4,
    title: "Innovation with Tradition",
    description:
      "While we celebrate Rwanda’s rich coffee heritage, we also bring in creative recipes and modern flavors to keep things exciting.",
  },
];

function AboutPage() {
  return (
    <div className="w-full min-h-screen py-12 px-6 md:px-20 mt-16">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <Image
            src="/kindi.jpeg"
            alt="Kindi Coffee Shop"
            className="rounded-2xl shadow-xl object-cover"
            width={500}
            height={500}
          />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-amber-900 mb-4">
          🌿 About Kindi Coffee Shop
        </h1>
        <p className="text-gray-700 leading-relaxed text-lg">
          Welcome to <span className="font-semibold">Kindi Coffee Shop</span>, a cozy and vibrant café 
          located in the heart of Nyanza District. Founded with a passion for great coffee and wholesome food, 
          Kindi Coffee Shop has grown into a favorite meeting place for locals, students, travelers, and families.
          <br /> <br />
          At Kindi Coffee Shop, we pride ourselves on serving the best of Rwanda’s coffee culture. Every cup we brew is sourced directly from local farmers, carefully roasted, and prepared to bring out the bold, rich, and authentic flavors that Rwanda is celebrated for.
          <br /> <br />
          In addition to our signature coffee drinks, we offer a wide variety of delicious food products. From fresh pastries and sandwiches to local dishes and international bites, our menu is designed to satisfy every craving.
        </p>
      </div>

      {/* Values Section */}
      <div className="max-w-5xl mx-auto mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-amber-800 mb-6 text-center">
          🌱 Our Values
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {values.map((value) => (
            <div
              key={value.id}
              className="p-6 bg-white rounded-xl shadow-md border border-amber-100 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-amber-900 mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-amber-800 mb-4">
          ☕ Why Choose Us?
        </h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          Because at Kindi Coffee Shop, every sip and every bite tells a story — of Rwanda’s land, its people, 
          and its culture. We are here to make your day brighter, your meals tastier, and your coffee unforgettable.
          <br /> <br />
          Whether you are a coffee enthusiast, a foodie, or just someone looking for a warm and welcoming spot 
          in Nyanza, Kindi Coffee Shop is the place for you.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
