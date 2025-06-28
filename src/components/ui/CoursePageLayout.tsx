import  { useMemo, useState } from 'react';
// --- StarRating Component ---
const StarRating = ({ rating, maxStars = 5, size = 'medium' }) => {
    const starSize = {
        small: 'w-3 h-3',
        medium: 'w-4 h-4',
        large: 'w-5 h-5',
    };

    return (
        <div className="flex items-center">
            {[...Array(maxStars)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <svg
                        key={index}
                        className={`${starSize[size]} ${starValue <= rating ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M12 .587l3.668 7.424 8.219 1.194-5.967 5.819 1.406 8.188L12 18.896l-7.326 3.856 1.406-8.188-5.967-5.819 8.219-1.194L12 .587z" />
                    </svg>
                );
            })}
        </div>
    );
};

const ReviewCard = ({ review }) => (
    <div className="border-t border-gray-200 py-6 first:border-t-0">
        <div className="flex items-start space-x-4">
            <img
                src="https://via.placeholder.com/48"
                alt={`Avatar of ${review.reviewerName}`}
                className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-grow">
                <div className="flex justify-between items-center mb-2">
                    <div>
                        <h4 className="font-semibold text-gray-900">{review.reviewerName}</h4>
                        <StarRating rating={review.rating} size="small" />
                    </div>
                    <div className="flex space-x-4 text-gray-500">
                        <button className="flex items-center space-x-1 hover:text-blue-500">
                            <span className="w-5 h-5">👍</span>
                            <span>{review.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-red-500">
                            <span className="w-5 h-5">👎</span>
                            <span>{review.dislikes}</span>
                        </button>
                    </div>
                </div>
                <h5 className="font-medium text-gray-800 mb-1">{review.title}</h5>
                <p className="text-gray-600 text-sm">{review.content}</p>
            </div>
        </div>
    </div>
);

const SiteDashboardPage = () => {
    const [loadedReviewsCount, setLoadedReviewsCount] = useState(3);

    const initialReviews = useMemo(() => ([
        { id: 1, reviewerName: 'Narendra', rating: 5, title: 'Excellent', content: 'Great course.', likes: 12, dislikes: 0 },
        { id: 2, reviewerName: 'Priya S.', rating: 4, title: 'Informative', content: 'Bit fast but good.', likes: 8, dislikes: 1 },
        { id: 3, reviewerName: 'Amit K.', rating: 5, title: 'Revolutionary', content: 'Amazing clarity.', likes: 20, dislikes: 0 },
        { id: 4, reviewerName: 'Deepa V.', rating: 5, title: 'Practical', content: 'Useful examples.', likes: 15, dislikes: 0 },
        { id: 5, reviewerName: 'Rajesh M.', rating: 5, title: 'Transformative', content: 'Challenging assignments.', likes: 10, dislikes: 0 },
        { id: 6, reviewerName: 'Sarita L.', rating: 5, title: 'Career Boost', content: 'Gained skills.', likes: 18, dislikes: 0 },
    ]), []);

    const averageRating = useMemo(() => {
        const total = initialReviews.reduce((sum, r) => sum + r.rating, 0);
        return (total / initialReviews.length).toFixed(1);
    }, [initialReviews]);

    const reviewCounts = useMemo(() => {
        return initialReviews.reduce((acc, r) => {
            acc[r.rating] = (acc[r.rating] || 0) + 1;
            return acc;
        }, {});
    }, [initialReviews]);

    const handleLoadMore = () => {
        setLoadedReviewsCount(prev => Math.min(prev + 3, initialReviews.length));
    };

    return (
        <section className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <div className="flex items-end mb-4 sm:mb-0">
                    <span className="text-6xl font-bold text-gray-900">{averageRating}</span>
                    <div className="ml-3">
                        <StarRating rating={Math.round(Number(averageRating))} size="medium" />
                        <span className="text-gray-500 text-sm block mt-1">{initialReviews.length} ratings</span>
                    </div>
                </div>
                <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Write A Review</button>
            </div>

            {/* Rating Bar Graph */}
            <div className="mb-8">
                {[5, 4, 3, 2, 1].map(rating => (
                    <div key={rating} className="flex items-center mb-2">
                        <span className="w-8 font-medium text-gray-700">{rating}</span>
                        <StarRating rating={rating} size="small" />
                        <div className="flex-grow bg-gray-200 h-2 rounded-full mx-3">
                            <div
                                className="bg-yellow-500 h-full rounded-full"
                                style={{ width: `${(reviewCounts[rating] || 0) / Math.max(...Object.values(reviewCounts)) * 100}%` }}
                            ></div>
                        </div>
                        <span className="text-gray-600">{reviewCounts[rating] || 0}</span>
                    </div>
                ))}
            </div>

            {/* Review Cards */}
            {initialReviews.slice(0, loadedReviewsCount).map(r => (
                <ReviewCard key={r.id} review={r} />
            ))}

            {loadedReviewsCount < initialReviews.length && (
                <div className="text-center mt-6">
                    <button onClick={handleLoadMore} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                        Load More
                    </button>
                </div>
            )}
        </section>
    );
};

export default SiteDashboardPage;
