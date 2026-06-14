import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48')",
      }}
    >
      <div className="min-h-screen bg-black/70">

        <nav className="flex justify-between items-center px-10 py-6">

          <h1 className="text-3xl font-bold text-red-500">
            AI FITNESS
          </h1>

          <div className="space-x-6">

            <Link
              to="/login"
              className="text-white hover:text-red-500"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-red-600 px-5 py-2 rounded text-white"
            >
              Join Now
            </Link>

          </div>
        </nav>

        <div className="max-w-3xl px-10 pt-40">

          <h2 className="text-white text-6xl font-bold leading-tight">
            BUILD YOUR
            <br />
            DREAM BODY
          </h2>

          <p className="text-gray-300 mt-6 text-xl">
            Track workouts, monitor progress,
            and get AI-powered fitness guidance.
          </p>

          <Link
            to="/register"
            className="inline-block mt-8 bg-red-600 hover:bg-red-700 px-8 py-4 rounded text-white font-semibold"
          >
            Get Started
          </Link>

        </div>

      </div>
    </div>
  );
}

export default LandingPage;