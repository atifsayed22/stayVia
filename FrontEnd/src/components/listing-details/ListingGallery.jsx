export default function ListingGallery({ listing }) {
  const images = listing.images || [];

  if (images.length === 0) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-[2rem] bg-slate-100 text-slate-500">
        No images available
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
        {/* Main Image */}
        <div>
          <img
            src={images[0]?.url}
            alt={listing.title}
            className="h-[500px] w-full rounded-[2rem] object-cover"
          />
        </div>

        {/* Side Images */}
        <div className="grid grid-cols-2 gap-3">
          {images.slice(1, 5).map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`${listing.title} ${index + 2}`}
              className="h-[243px] w-full rounded-[1.5rem] object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
}