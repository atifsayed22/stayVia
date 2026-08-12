const listings = [
  {
    title: "Modern Sea View Apartment in Bandra",

    description:
      "A bright and contemporary two-bedroom apartment in Bandra West, designed for guests who want a comfortable stay close to Mumbai's restaurants, cafes, shopping areas, and waterfront. The apartment features a spacious living room, fully equipped kitchen, comfortable bedrooms, and a private balcony with city views.",

    price: 6500,

    propertyType: "Apartment",
    roomType: "Entire Place",

    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,

    address: {
      street: "Bandra West",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      postalCode: "400050",
    },

    amenities: [
      "WiFi",
      "Air Conditioning",
      "Kitchen",
      "Washing Machine",
      "TV",
      "Workspace",
      "Parking",
      "Balcony",
    ],

    houseRules: [
      "No smoking",
      "No parties",
      "No pets",
      "Check-in after 2 PM",
      "Quiet hours after 10 PM",
    ],

    averageRating: 4.8,
    reviewCount: 124,

    status: "published",

    images: [
      {
        url: "https://images.unsplash.com/",
        filename: "seed-bandra-1",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/",
        filename: "seed-bandra-2",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/",
        filename: "seed-bandra-3",
        source: "unsplash",
      },
    ],
  },

  {
    title: "Cozy Heritage Stay in South Mumbai",

    description:
      "A charming private residence in the heart of South Mumbai, offering a warm and comfortable stay surrounded by historic architecture, local cafes, galleries, and some of the city's most popular landmarks. The property combines traditional character with modern amenities and is ideal for couples or solo travelers.",

    price: 4200,

    propertyType: "House",
    roomType: "Entire Place",

    maxGuests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,

    address: {
      street: "Colaba",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      postalCode: "400005",
    },

    amenities: [
      "WiFi",
      "Air Conditioning",
      "Kitchen",
      "TV",
      "Workspace",
      "Breakfast",
    ],

    houseRules: [
      "No smoking",
      "No parties",
      "No pets",
      "No loud music",
    ],

    averageRating: 4.6,
    reviewCount: 87,

    status: "published",

    images: [
      {
        url: "https://images.unsplash.com/",
        filename: "seed-colaba-1",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/",
        filename: "seed-colaba-2",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/",
        filename: "seed-colaba-3",
        source: "unsplash",
      },
    ],
  },

  {
    title: "Luxury Pool Villa in North Goa",

    description:
      "A spacious tropical villa surrounded by greenery with a private swimming pool and relaxing outdoor area. The property is designed for families and groups looking for a peaceful Goa getaway while staying within easy reach of beaches, restaurants, and nightlife.",

    price: 12000,

    propertyType: "Villa",
    roomType: "Entire Place",

    maxGuests: 8,
    bedrooms: 4,
    beds: 5,
    bathrooms: 4,

    address: {
      street: "Anjuna",
      city: "Goa",
      state: "Goa",
      country: "India",
      postalCode: "403509",
    },

    amenities: [
      "WiFi",
      "Private Pool",
      "Air Conditioning",
      "Kitchen",
      "Parking",
      "TV",
      "Garden",
      "Outdoor Dining",
      "BBQ",
    ],

    houseRules: [
      "No smoking indoors",
      "No parties without approval",
      "No pets",
      "Pool closes at 10 PM",
      "Quiet hours after 11 PM",
    ],

    averageRating: 4.9,
    reviewCount: 216,

    status: "published",

    images: [
      {
        url: "https://images.unsplash.com/",
        filename: "seed-goa-villa-1",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/",
        filename: "seed-goa-villa-2",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/",
        filename: "seed-goa-villa-3",
        source: "unsplash",
      },
    ],
  },

  {
    title: "Minimalist Apartment Near Koregaon Park",

    description:
      "A stylish one-bedroom apartment in Pune's Koregaon Park area, featuring a minimalist interior, dedicated workspace, fully equipped kitchen, and comfortable living space. A convenient choice for business travelers, couples, and longer stays.",

    price: 3200,

    propertyType: "Apartment",
    roomType: "Entire Place",

    maxGuests: 3,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,

    address: {
      street: "Koregaon Park",
      city: "Pune",
      state: "Maharashtra",
      country: "India",
      postalCode: "411001",
    },

    amenities: [
      "WiFi",
      "Air Conditioning",
      "Kitchen",
      "Washing Machine",
      "Workspace",
      "TV",
      "Parking",
    ],

    houseRules: [
      "No smoking",
      "No parties",
      "No pets",
      "Keep common areas clean",
    ],

    averageRating: 4.7,
    reviewCount: 73,

    status: "published",

    images: [
      {
        url: "https://images.unsplash.com/",
        filename: "seed-pune-1",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/",
        filename: "seed-pune-2",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/",
        filename: "seed-pune-3",
        source: "unsplash",
      },
    ],
  },

  {
    title: "Elegant Two Bedroom Home in Bengaluru",

    description:
      "A comfortable two-bedroom home in Bengaluru with a modern interior, dedicated workspace, fully equipped kitchen, and peaceful surroundings. The property is suitable for families, professionals, and guests staying for several nights.",

    price: 4800,

    propertyType: "House",
    roomType: "Entire Place",

    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,

    address: {
      street: "Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      postalCode: "560038",
    },

    amenities: [
      "WiFi",
      "Air Conditioning",
      "Kitchen",
      "Washing Machine",
      "Workspace",
      "TV",
      "Parking",
      "Garden",
    ],

    houseRules: [
      "No smoking",
      "No parties",
      "No pets",
      "Quiet hours after 10 PM",
    ],

    averageRating: 4.8,
    reviewCount: 101,

    status: "published",

    images: [
      {
        url: "https://images.unsplash.com/",
        filename: "seed-bangalore-1",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/",
        filename: "seed-bangalore-2",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/",
        filename: "seed-bangalore-3",
        source: "unsplash",
      },
    ],
  },
];

module.exports = listings;