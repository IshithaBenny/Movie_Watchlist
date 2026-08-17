import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import StarRating from './StarRating';
const tabs = ['To Watch', 'Watched'];
function Watchlist() {
    // 1. Cleaned up state variables (No more duplicate mediaItems!)
    const [activeTab, setActiveTab] = useState('To Watch');
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ title: '', type: 'Movie' });

    // 2. Simplified fetch function (Only calling the correct Django endpoint)
    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const response = await axiosInstance.get('media/');
                // Handle both paginated and non-paginated Django responses
                const payload = response.data.results || response.data;
                setMedia(payload);
            } catch (error) {
                console.error("Error fetching media:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMedia();
    }, []);



    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.title.trim()) {
            return;
        }

        // 1. Check which tab is currently active to determine the status
        const targetStatus = activeTab === 'Watched' ? 'Watched' : 'Unwatched';

        try {
            const response = await axiosInstance.post('media/', {
                title: formData.title,
                type: formData.type,

                // 2. Send the dynamic status instead of the hardcoded one
                status: targetStatus
            });

            setMedia(prevMedia => [...prevMedia, response.data]);
            setFormData({ title: '', type: 'Movie' });

        } catch (error) {
            console.error("Django Rejected the Request:", error.response?.data || error.message);
        }
    };
    const handleMarkWatched = async (id) => {
        try {
            // Tell Django to change the status
            await axiosInstance.patch(`media/${id}/`, {
                status: 'Watched'
            });

            // Update the React UI instantly without reloading
            setMedia(prevMedia => prevMedia.map(item =>
                item.id === id ? { ...item, status: 'Watched' } : item
            ));
        } catch (error) {
            console.error("Error updating status:", error.response?.data || error.message);
        }
    };
    const handleDelete = async (id) => {
        try {
            // Send the DELETE request to Django (don't forget the trailing slash!)
            await axiosInstance.delete(`media/${id}/`);

            // Remove the item from the React UI instantly
            setMedia(prevMedia => prevMedia.filter(item => item.id !== id));
        } catch (error) {
            console.error("Error deleting media:", error.response?.data || error.message);
        }
    };
    const handleRate = async (itemId, rating) => {
        try {
            const response = await axiosInstance.patch(`/media/${itemId}/`, {
                rating,
            });

            const updatedRating = response.data?.rating ?? rating;

            setMedia((prev) =>
                prev.map((item) =>
                    item.id === itemId ? { ...item, rating: updatedRating } : item
                )
            );
        } catch (error) {
            console.error('Error updating rating:', error);
        }
    };

    const filteredItems = media.filter((item) =>
        (activeTab === 'To Watch' && item.status === 'Unwatched') ||
        (activeTab === 'Watched' && item.status === 'Watched')
    );
    return (
        <div className="space-y-8">
            <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-gray-800 bg-gray-900 p-5 shadow-xl shadow-black/20"
            >
                <div className="flex flex-col gap-4 md:flex-row">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Add a movie or show title"
                        className="flex-1 rounded-md border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:outline-none"
                    />

                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="rounded-md border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                    >
                        <option value="Movie">Movie</option>
                        <option value="TV">TV</option>
                    </select>

                    <button
                        type="submit"
                        className="rounded-md bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-500"
                    >
                        Add Media
                    </button>
                </div>
            </form>

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab;

                        return (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setActiveTab(tab)}
                                className={
                                    isActive
                                        ? 'rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-red-900/30 transition'
                                        : 'rounded-full px-3 py-2 text-sm font-medium text-gray-300 transition hover:text-white'
                                }
                            >
                                {tab}
                            </button>
                        );
                    })}
                </div>

                {loading ? (
                    <div className="rounded-2xl border border-gray-800 bg-gray-900/60 px-6 py-10 text-center text-gray-400">
                        Loading your watchlist...
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="rounded-2xl border border-gray-800 bg-gray-900/60 px-6 py-10 text-center text-gray-400">
                        No media in this list yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

                        {filteredItems.map((item) => (
                            <div key={item.id} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg mb-4">

                                {/* Movie Title and Type */}
                                <div>
                                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                    <p className="text-gray-400 text-sm">{item.type}</p>
                                </div>

                                {/* Conditional Logic for Buttons/Stars */}
                                <div className="flex items-center gap-4">

                                    {/* ONLY show this button if the movie is Unwatched */}
                                    {item.status === 'Unwatched' && (
                                        <button
                                            onClick={() => handleMarkWatched(item.id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold transition"
                                        >
                                            Mark as Watched
                                        </button>
                                    )}

                                    {/* ONLY show the Star Rating if the movie is Watched */}
                                    {item.status === 'Watched' && (
                                        <StarRating
                                            currentRating={item.rating}
                                            onRate={(starValue) => handleRate(item.id, starValue)}
                                        />
                                    )}
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-gray-400 hover:text-red-500 font-bold ml-4 transition"
                                        title="Delete this movie"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Watchlist;
