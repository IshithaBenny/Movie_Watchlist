import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Watchlist from './components/Watchlist';

function HomePage() {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-950 p-8 shadow-2xl shadow-black/30">
      <p className="mb-3 text-sm uppercase tracking-[0.25em] text-red-400">Trending now</p>
      <h1 className="text-4xl font-bold text-white">Discover the next obsession.</h1>
      <p className="mt-4 max-w-2xl text-gray-300">
        Browse handpicked movies, build your watchlist, and keep track of your favorites in one place.
      </p>
    </div>
  );
}

function LoginPage() {
  return <Login />;
}

function WatchlistPage() {
  return <Watchlist />;
}

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
