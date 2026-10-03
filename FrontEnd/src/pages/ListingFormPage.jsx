import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BasicInfoSection from "../components/listing-form/BasicInfoSection";
import PropertyDetailsSection from "../components/listing-form/PropertyDetailsSection";
import LocationSection from "../components/listing-form/LocationSection";
import AmenitiesSection from "../components/listing-form/AmenitiesSection";
import HouseRulesSection from "../components/listing-form/HouseRulesSection";
import ImageUploader from "../components/listing-form/ImageUploader";
import listingService from "../services/listingService";
// import listing from "../../../Server/models/listing";
import { useEffect } from "react";
import toast from "react-hot-toast";

const initialFormData = {
  title: "",
  description: "",

  price: "",

  propertyType: "Apartment",
  roomType: "Entire Place",

  maxGuests: 1,
  bedrooms: 1,
  beds: 1,
  bathrooms: 1,

  address: {
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  },

  amenities: [],

  houseRules: [],

  status: "published",

  existingImages: [],
  newImages: [],
};

export default function ListingFormPage({ mode = "create" }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState(initialFormData);
  const [ruleInput, setRuleInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchListingData = async () => {
    try {
      const response = await listingService.getListingById(id);
      const listing = response.listing;

      setFormData({
        title: listing.title,
        description: listing.description,

        price: listing.price,

        propertyType: listing.propertyType,
        roomType: listing.roomType,

        maxGuests: listing.maxGuests,
        bedrooms: listing.bedrooms,
        beds: listing.beds,
        bathrooms: listing.bathrooms,

        address: {
          street: listing.address?.street || "",
          city: listing.address?.city || "",
          state: listing.address?.state || "",
          country: listing.address?.country || "",
          postalCode: listing.address?.postalCode || "",
        },

        amenities: listing.amenities || [],

        houseRules: listing.houseRules || [],

        status: listing.status,

        existingImages: listing.images || [],
        newImages: [],
      });
    } catch (err) {
    }
  };

  useEffect(() => {
    if (mode === "edit") {
      fetchListingData();
    }
  }, [id]);

  // -------------------------
  // Basic Input Change
  // -------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -------------------------
  // Address Change
  // -------------------------
  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  // -------------------------
  // Amenities
  // -------------------------
  const handleAmenityChange = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((item) => item !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  // -------------------------
  // Images
  // -------------------------
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setFormData((prev) => ({
      ...prev,
      newImages: [...prev.newImages, ...files],
    }));
  };

  const handleRemoveExistingImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      existingImages: prev.existingImages.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveNewImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      newImages: prev.newImages.filter((_, i) => i !== index),
    }));
  };

  const handleAddRule = () => {
    const rule = ruleInput.trim();

    if (!rule) return;

    if (formData.houseRules.includes(rule)) return;

    setFormData((prev) => ({
      ...prev,
      houseRules: [...prev.houseRules, rule],
    }));

    setRuleInput("");
  };

  const handleRemoveRule = (rule) => {
    setFormData((prev) => ({
      ...prev,
      houseRules: prev.houseRules.filter((item) => item !== rule),
    }));
  };
  // -------------------------
  // Submit
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();

    // -------------------------
    // Basic Information
    // -------------------------

    submitData.append("title", formData.title);
    submitData.append("description", formData.description);
    submitData.append("price", formData.price);

    // -------------------------
    // Property Details
    // -------------------------

    submitData.append("propertyType", formData.propertyType);
    submitData.append("roomType", formData.roomType);

    submitData.append("maxGuests", formData.maxGuests);
    submitData.append("bedrooms", formData.bedrooms);
    submitData.append("beds", formData.beds);
    submitData.append("bathrooms", formData.bathrooms);

    // -------------------------
    // Address
    // -------------------------

    submitData.append("address[street]", formData.address.street);
    submitData.append("address[city]", formData.address.city);
    submitData.append("address[state]", formData.address.state);
    submitData.append("address[country]", formData.address.country);
    submitData.append("address[postalCode]", formData.address.postalCode);

    // -------------------------
    // Arrays
    // -------------------------

    formData.amenities.forEach((amenity) => {
      submitData.append("amenities", amenity);
    });

    formData.houseRules.forEach((rule) => {
      submitData.append("houseRules", rule);
    });

    // -------------------------
    // Images
    // -------------------------

    // Existing images (already on Cloudinary)
    submitData.append(
      "existingImages",
      JSON.stringify(formData.existingImages),
    );

    // Newly uploaded images
    formData.newImages.forEach((image) => {
      submitData.append("images", image);
    });

    // -------------------------
    // Status
    // -------------------------

    submitData.append("status", formData.status);

    try {
      setIsSubmitting(true);
      if (mode === "create") {
        await toast.promise(listingService.createListing(submitData), {
          loading: "Creating listing...",
          success: "Listing Created successfully",
          error: "Failed to failed listing",
        });
      } else {
        await toast.promise(listingService.updateListing(id, submitData), {
          loading: "Updating listing...",
          success: "Listing updated successfully",
          error: "Failed to update listing",
        });
      }

      navigate("/host/listings");
    } catch (err) {
      console.error(
      err.message || "Something went wrong",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">
        {mode === "create" ? "Create Listing" : "Edit Listing"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <BasicInfoSection formData={formData} handleChange={handleChange} />

        <PropertyDetailsSection
          formData={formData}
          handleChange={handleChange}
        />

        {/* LocationSection */}
        <LocationSection
          formData={formData}
          handleAddressChange={handleAddressChange}
        />

        {/* AmenitiesSection */}
        <AmenitiesSection
          formData={formData}
          handleAmenityChange={handleAmenityChange}
        />

        {/* HouseRulesSection */}
        <HouseRulesSection
          houseRules={formData.houseRules}
          ruleInput={ruleInput}
          setRuleInput={setRuleInput}
          handleAddRule={handleAddRule}
          handleRemoveRule={handleRemoveRule}
        />

        {/* ImageUploader */}

        <ImageUploader
          existingImages={formData.existingImages}
          newImages={formData.newImages}
          handleImageChange={handleImageChange}
          handleRemoveExistingImage={handleRemoveExistingImage}
          handleRemoveNewImage={handleRemoveNewImage}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`rounded-xl px-6 py-3 text-white transition
                ${
                  isSubmitting
                    ? "cursor-not-allowed bg-slate-400"
                    : "bg-slate-900 hover:bg-slate-800"
                }`}
        >
          {isSubmitting
            ? mode === "create"
              ? "Creating..."
              : "Updating..."
            : mode === "create"
              ? "Create Listing"
              : "Update Listing"}
        </button>
      </form>
    </div>
  );
}
