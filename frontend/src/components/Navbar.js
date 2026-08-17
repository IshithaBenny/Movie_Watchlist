import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-black text-white shadow-lg shadow-red-950/20">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <Link to="/" className="text-2xl font-black tracking-tight text-red-600">
                    Cineflix
                </Link>

                <div className="flex items-center gap-6 text-sm font-medium">
                    <Link to="/" className="transition hover:text-red-500">
                        Home
                    </Link>
                    <Link to="/watchlist" className="transition hover:text-red-500">
                        Watchlist
                    </Link>

                    {user ? (
                        <button
                            type="button"
                            onClick={logout}
                            className="rounded-full border border-red-600 px-4 py-2 text-red-500 transition hover:bg-red-600 hover:text-white"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className="transition hover:text-red-500">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
