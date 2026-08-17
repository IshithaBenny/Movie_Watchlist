const StarRating = ({ currentRating = 0, onRate }) => {
    const stars = Array.from({ length: 5 }, (_, index) => index + 1);

    return (
        <div className="flex items-center gap-1">
            {stars.map((value) => {
                const isActive = value <= currentRating;

                return (
                    <button
                        key={value}
                        type="button"
                        aria-label={`Rate ${value} star${value > 1 ? 's' : ''}`}
                        onClick={() => onRate?.(value)}
                        className="cursor-pointer transition-transform duration-200 hover:scale-110"
                    >
                        <svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`h-6 w-6 ${isActive ? 'text-red-600' : 'text-gray-600'}`}
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.903 0l1.286 3.955a1 1 0 0 0 .95.69h4.163c.969 0 1.371 1.24.588 1.813l-3.372 2.446a1 1 0 0 0-.364 1.118l1.286 3.955c.3.921-.755 1.688-1.538 1.118L10 2.9a1 1 0 0 0-1.902 0l-1.286 3.955a1 1 0 0 0-.964.69H2.685c-.969 0-1.371-1.24-.588-1.813l3.372-2.446a1 1 0 0 0 .364-1.118L3.547 6.572c-.3-.921.755-1.688 1.538-1.118l3.372 2.446a1 1 0 0 0 1.118-.364l1.286-3.955Z" />
                        </svg>
                    </button>
                );
            })}
        </div>
    );
};

export default StarRating;
