import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Watchlist from './components/Watchlist';

function HomePage() {
  return (
    <div className="rounded-2xl border border-gray-800 p-8">
      <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gray-400">Welcome</p>
      <h1 className="text-4xl font-bold text-white">Discover & Track</h1>
      <p className="mt-4 max-w-2xl text-gray-300">
        Browse handpicked movies, build your watchlist, and never miss a great film.
      </p>
    </div>
  );
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
          <Route path="/" element={<HomePage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          {/* A catch-all route so any invalid link goes to HomePage */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;