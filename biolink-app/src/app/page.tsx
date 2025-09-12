import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        <header className="mb-6">
          <Image
            src="https://via.placeholder.com/150"
            alt="Profile Picture"
            width={100}
            height={100}
            className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
          />
          <h1 className="text-2xl font-bold">[Your Name/Handle]</h1>
          <p className="text-gray-600 mt-2">
            Digital Marketer | Helping small businesses grow their online presence | Coffee enthusiast ☕
          </p>
        </header>
        <main>
          <section className="links mb-6">
            <h2 className="text-xl font-semibold mb-3">🛍️ Shop</h2>
            <a
              href="#"
              className="block bg-blue-500 text-white py-3 px-4 rounded-lg mb-3 hover:bg-blue-600 transition-colors"
            >
              ⭐ Shop My Prints
            </a>

            <h2 className="text-xl font-semibold mb-3 mt-6">📺 Videos</h2>
            <a
              href="#"
              className="block bg-blue-500 text-white py-3 px-4 rounded-lg mb-3 hover:bg-blue-600 transition-colors"
            >
              Latest YouTube Video
            </a>

            <h2 className="text-xl font-semibold mb-3 mt-6">🔗 Connect</h2>
            <a
              href="#"
              className="block bg-blue-500 text-white py-3 px-4 rounded-lg mb-3 hover:bg-blue-600 transition-colors"
            >
              🎁 Get My Free E-book
            </a>
            <a
              href="#"
              className="block bg-blue-500 text-white py-3 px-4 rounded-lg mb-3 hover:bg-blue-600 transition-colors"
            >
              👋 Book a Consultation
            </a>
            <a
              href="#"
              className="block bg-blue-500 text-white py-3 px-4 rounded-lg mb-3 hover:bg-blue-600 transition-colors"
            >
              Follow me on Instagram
            </a>
          </section>
          <section className="newsletter">
            <h2 className="text-xl font-semibold mb-3">Subscribe to my Newsletter</h2>
            <form>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg mb-3"
              />
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}
