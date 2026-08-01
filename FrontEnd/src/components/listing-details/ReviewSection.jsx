export default function ReviewSection({ reviews = [] }) {
  return (
    <section className="rounded-[2rem] bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">
        Guest Reviews
      </h2>

      {reviews.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-slate-50 p-8 text-center">
          <p className="text-slate-500">
            No reviews yet.
          </p>

          <p className="mt-2 text-sm text-slate-400">
            Be the first guest to leave a review.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="rounded-2xl border border-slate-200 p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    @{review.author?.username || "Guest"}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="rounded-full bg-rose-50 px-3 py-1 font-semibold text-rose-600">
                  ⭐ {review.rating}/5
                </div>
              </div>

              <p className="mt-4 leading-7 text-slate-600">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}