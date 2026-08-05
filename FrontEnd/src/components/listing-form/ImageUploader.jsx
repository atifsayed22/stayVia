import { X } from "lucide-react";

export default function ImageUploader({
  existingImages,
  newImages,
  handleImageChange,
  handleRemoveExistingImage,
  handleRemoveNewImage,
}) {
  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">
        Property Images
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Upload high-quality photos of your property.
      </p>

      <div className="mt-8">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full rounded-xl border border-slate-300 p-3"
        />
      </div>

      {(existingImages.length > 0 || newImages.length > 0) && (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">

          {/* Existing Images */}
          {existingImages.map((image, index) => (
            <div
              key={image.filename}
              className="relative overflow-hidden rounded-xl"
            >
              <img
                src={image.url}
                alt=""
                className="h-40 w-full object-cover"
              />

              <button
                type="button"
                onClick={() => handleRemoveExistingImage(index)}
                className="absolute right-2 top-2 rounded-full bg-white p-1 shadow"
              >
                <X size={16} />
              </button>
            </div>
          ))}

          {/* New Images */}
          {newImages.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl"
            >
              <img
                src={URL.createObjectURL(image)}
                alt=""
                className="h-40 w-full object-cover"
              />

              <button
                type="button"
                onClick={() => handleRemoveNewImage(index)}
                className="absolute right-2 top-2 rounded-full bg-white p-1 shadow"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}