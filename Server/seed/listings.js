const listings = [
  {
    title: "Quiet Balcony Apartment in Andheri West",

    description:
      "A comfortable modern apartment in Andheri West with a bright living room, private balcony, well-equipped kitchen, and a dedicated workspace. The home is conveniently located near cafes, restaurants, shopping areas, and Mumbai's major business districts, making it suitable for couples, small families, and business travelers.",

    price: 3800,

    propertyType: "Apartment",
    roomType: "Entire Place",

    maxGuests: 3,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,

    address: {
      street: "Andheri West",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      postalCode: "400058",
    },

    geometry: {
      type: "Point",
      coordinates: [72.8347, 19.1364],
    },

    amenities: [
      "WiFi",
      "Air Conditioning",
      "Kitchen",
      "Washing Machine",
      "TV",
      "Workspace",
      "Elevator",
      "Balcony",
    ],

    houseRules: [
      "No smoking",
      "No parties",
      "No pets",
      "No loud music after 10 PM",
      "Check-in after 2 PM",
    ],

    averageRating: 4.7,
    reviewCount: 96,

    status: "published",

    images: [
      {
        url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-andheri-1",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-andheri-2",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-andheri-3",
        source: "unsplash",
      },
    ],
  },

  {
    title: "Sunlit Apartment with Sea Breeze in Juhu",

    description:
      "A relaxed one-bedroom apartment in Juhu with large windows, comfortable furnishings, a compact kitchen, and a private balcony. The neighborhood offers easy access to Juhu Beach, local restaurants, cafes, and Mumbai's entertainment districts while providing a peaceful place to return to after a busy day.",

    price: 5200,

    propertyType: "Apartment",
    roomType: "Entire Place",

    maxGuests: 3,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,

    address: {
      street: "Juhu Tara Road, Juhu",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      postalCode: "400049",
    },

    geometry: {
      type: "Point",
      coordinates: [72.826, 19.0883],
    },

    amenities: [
      "WiFi",
      "Air Conditioning",
      "Kitchen",
      "TV",
      "Workspace",
      "Balcony",
      "Elevator",
      "Refrigerator",
    ],

    houseRules: [
      "No smoking",
      "No parties",
      "No pets",
      "Quiet hours after 10 PM",
    ],

    averageRating: 4.8,
    reviewCount: 142,

    status: "published",

    images: [
      {
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-juhu-1",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-juhu-2",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-juhu-3",
        source: "unsplash",
      },
    ],
  },

  {
    title: "Private Portuguese-Style Villa near Assagao",

    description:
      "A spacious private villa inspired by traditional Goan homes, surrounded by tropical greenery in the peaceful Assagao area. Guests have access to a private pool, outdoor seating, a fully equipped kitchen, and four comfortable bedrooms. The villa is well suited for families and groups wanting privacy while exploring North Goa.",

    price: 10500,

    propertyType: "Villa",
    roomType: "Entire Place",

    maxGuests: 8,
    bedrooms: 4,
    beds: 5,
    bathrooms: 4,

    address: {
      street: "Assagao",
      city: "Goa",
      state: "Goa",
      country: "India",
      postalCode: "403507",
    },

    geometry: {
      type: "Point",
      coordinates: [73.7888, 15.586],
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
      "No parties without prior approval",
      "No pets",
      "No glass near the pool",
      "Quiet hours after 11 PM",
    ],

    averageRating: 4.9,
    reviewCount: 188,

    status: "published",

    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-assagao-1",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600566753086-00f18fb6c5d3?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-assagao-2",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-assagao-3",
        source: "unsplash",
      },
    ],
  },

  {
    title: "Garden Cottage near Candolim Beach",

    description:
      "A cozy private cottage tucked into a quiet residential lane near Candolim. The home has a comfortable bedroom, small kitchen, shaded garden seating, and a relaxed coastal atmosphere. It is a practical choice for couples who want quick access to beaches, restaurants, and North Goa's popular attractions.",

    price: 4600,

    propertyType: "Cottage",
    roomType: "Entire Place",

    maxGuests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,

    address: {
      street: "Candolim",
      city: "Goa",
      state: "Goa",
      country: "India",
      postalCode: "403515",
    },

    geometry: {
      type: "Point",
      coordinates: [73.7629, 15.5176],
    },

    amenities: [
      "WiFi",
      "Air Conditioning",
      "Kitchen",
      "Garden",
      "Parking",
      "TV",
      "Outdoor Seating",
    ],

    houseRules: [
      "No smoking indoors",
      "No parties",
      "No pets",
      "Keep garden area clean",
      "Quiet hours after 10 PM",
    ],

    averageRating: 4.6,
    reviewCount: 79,

    status: "published",

    images: [
      {
        url: "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-candolim-1",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600566753051-7a6f7a4b4e4c?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-candolim-2",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-candolim-3",
        source: "unsplash",
      },
    ],
  },

  {
    title: "Contemporary Hillside Home in Lonavala",

    description:
      "A spacious hillside holiday home overlooking the green valleys of Lonavala. The property has three bedrooms, a large living area, a modern kitchen, and an outdoor terrace that is ideal for morning tea or relaxed evenings. It works particularly well for families and small groups looking for a weekend escape from Mumbai or Pune.",

    price: 7200,

    propertyType: "Holiday Home",
    roomType: "Entire Place",

    maxGuests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,

    address: {
      street: "Tungarli",
      city: "Lonavala",
      state: "Maharashtra",
      country: "India",
      postalCode: "410401",
    },

    geometry: {
      type: "Point",
      coordinates: [73.4072, 18.7508],
    },

    amenities: [
      "WiFi",
      "Air Conditioning",
      "Kitchen",
      "Parking",
      "TV",
      "Garden",
      "Terrace",
      "Outdoor Dining",
      "Mountain View",
    ],

    houseRules: [
      "No smoking indoors",
      "No parties",
      "No pets",
      "Quiet hours after 10:30 PM",
      "No loud music outdoors",
    ],

    averageRating: 4.8,
    reviewCount: 164,

    status: "published",

    images: [
      {
        url: "https://images.unsplash.com/photo-1600566753086-00f18fb6c5d3?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-lonavala-1",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-lonavala-2",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-lonavala-3",
        source: "unsplash",
      },
    ],
  },

  {
    title: "Private Farmhouse Retreat near Alibaug",

    description:
      "A peaceful independent farmhouse surrounded by greenery on the outskirts of Alibaug. The property offers a spacious living area, three bedrooms, a private pool, outdoor dining space, and plenty of room for families to unwind. Beaches and local seafood restaurants are within a short drive.",

    price: 8500,

    propertyType: "Farmhouse",
    roomType: "Entire Place",

    maxGuests: 7,
    bedrooms: 3,
    beds: 5,
    bathrooms: 3,

    address: {
      street: "Kihim",
      city: "Alibaug",
      state: "Maharashtra",
      country: "India",
      postalCode: "402201",
    },

    geometry: {
      type: "Point",
      coordinates: [72.8783, 18.6971],
    },

    amenities: [
      "WiFi",
      "Private Pool",
      "Air Conditioning",
      "Kitchen",
      "Parking",
      "Garden",
      "Outdoor Dining",
      "BBQ",
      "TV",
    ],

    houseRules: [
      "No smoking indoors",
      "No parties without approval",
      "No pets",
      "Pool closes at 10 PM",
      "Quiet hours after 11 PM",
    ],

    averageRating: 4.9,
    reviewCount: 137,

    status: "published",

    images: [
      {
        url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-alibaug-1",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-alibaug-2",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-alibaug-3",
        source: "unsplash",
      },
    ],
  },

  {
    title: "Old Delhi Courtyard Home near Chandni Chowk",

    description:
      "A restored private home in an old Delhi neighborhood, combining traditional architectural details with comfortable modern interiors. The property has a small private courtyard, two bedrooms, a functional kitchen, and easy access to Chandni Chowk, Jama Masjid, and the historic markets of Old Delhi.",

    price: 3600,

    propertyType: "House",
    roomType: "Entire Place",

    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,

    address: {
      street: "Chandni Chowk",
      city: "Delhi",
      state: "Delhi",
      country: "India",
      postalCode: "110006",
    },

    geometry: {
      type: "Point",
      coordinates: [77.2303, 28.6506],
    },

    amenities: [
      "WiFi",
      "Air Conditioning",
      "Kitchen",
      "TV",
      "Workspace",
      "Courtyard",
      "Refrigerator",
    ],

    houseRules: [
      "No smoking",
      "No parties",
      "No pets",
      "No loud music",
      "Respect neighborhood quiet hours",
    ],

    averageRating: 4.6,
    reviewCount: 91,

    status: "published",

    images: [
      {
        url: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-delhi-oldcity-1",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-delhi-oldcity-2",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-delhi-oldcity-3",
        source: "unsplash",
      },
    ],
  },

  {
    title: "Elegant Designer Apartment in South Delhi",

    description:
      "A stylish two-bedroom apartment in a quiet South Delhi neighborhood, furnished with clean contemporary interiors and a comfortable living room. The property includes a full kitchen, workspace, balcony, and secure parking, making it suitable for families, professionals, and guests visiting Delhi for several days.",

    price: 5400,

    propertyType: "Apartment",
    roomType: "Entire Place",

    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,

    address: {
      street: "Greater Kailash II",
      city: "Delhi",
      state: "Delhi",
      country: "India",
      postalCode: "110048",
    },

    geometry: {
      type: "Point",
      coordinates: [77.2372, 28.5318],
    },

    amenities: [
      "WiFi",
      "Air Conditioning",
      "Kitchen",
      "Washing Machine",
      "Workspace",
      "TV",
      "Parking",
      "Balcony",
      "Elevator",
    ],

    houseRules: [
      "No smoking",
      "No parties",
      "No pets",
      "Quiet hours after 10 PM",
      "No unregistered overnight guests",
    ],

    averageRating: 4.8,
    reviewCount: 116,

    status: "published",

    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-delhi-gk-1",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-delhi-gk-2",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-delhi-gk-3",
        source: "unsplash",
      },
    ],
  },

  {
    title: "Heritage Haveli Stay in the Heart of Jaipur",

    description:
      "A beautifully restored private haveli offering a traditional Jaipur experience with comfortable modern facilities. The home features handcrafted details, a peaceful courtyard, two bedrooms, and a cozy sitting area. Its central location makes it convenient for exploring the Pink City, local bazaars, forts, and historic landmarks.",

    price: 4300,

    propertyType: "House",
    roomType: "Entire Place",

    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,

    address: {
      street: "Brahampuri",
      city: "Jaipur",
      state: "Rajasthan",
      country: "India",
      postalCode: "302002",
    },

    geometry: {
      type: "Point",
      coordinates: [75.8472, 26.9356],
    },

    amenities: [
      "WiFi",
      "Air Conditioning",
      "Kitchen",
      "TV",
      "Courtyard",
      "Breakfast",
      "Workspace",
      "Parking",
    ],

    houseRules: [
      "No smoking indoors",
      "No parties",
      "No pets",
      "Respect the heritage interiors",
      "Quiet hours after 10 PM",
    ],

    averageRating: 4.8,
    reviewCount: 153,

    status: "published",

    images: [
      {
        url: "https://images.unsplash.com/photo-1600566753051-7a6f7a4b4e4c?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-jaipur-haveli-1",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-jaipur-haveli-2",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-jaipur-haveli-3",
        source: "unsplash",
      },
    ],
  },

  {
    title: "Lakeview Heritage Home in Udaipur",

    description:
      "A charming private heritage home with traditional interiors and views toward the surrounding hills and old city. The property provides two comfortable bedrooms, a bright sitting room, a small kitchen, and a terrace where guests can enjoy quiet evenings. Ideal for couples or families exploring Udaipur's lakes and historic streets.",

    price: 4800,

    propertyType: "House",
    roomType: "Entire Place",

    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,

    address: {
      street: "Lal Ghat",
      city: "Udaipur",
      state: "Rajasthan",
      country: "India",
      postalCode: "313001",
    },

    geometry: {
      type: "Point",
      coordinates: [73.6821, 24.5787],
    },

    amenities: [
      "WiFi",
      "Air Conditioning",
      "Kitchen",
      "TV",
      "Terrace",
      "Workspace",
      "Breakfast",
      "Lake View",
    ],

    houseRules: [
      "No smoking indoors",
      "No parties",
      "No pets",
      "Quiet hours after 10 PM",
      "No loud music on terrace",
    ],

    averageRating: 4.9,
    reviewCount: 128,

    status: "published",

    images: [
      {
        url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-udaipur-1",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-udaipur-2",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600566753086-00f18fb6c5d3?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-udaipur-3",
        source: "unsplash",
      },
    ],
  },

  {
    title: "Modern Family Home near Indiranagar",

    description:
      "A spacious independent home in a quiet residential lane near Indiranagar. The property has three bedrooms, a well-equipped kitchen, comfortable common areas, and a small garden. It is conveniently located near Bengaluru's cafes, restaurants, metro connections, and commercial areas.",

    price: 6200,

    propertyType: "House",
    roomType: "Entire Place",

    maxGuests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,

    address: {
      street: "HAL 2nd Stage, Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      postalCode: "560038",
    },

    geometry: {
      type: "Point",
      coordinates: [77.6412, 12.9784],
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
      "Balcony",
    ],

    houseRules: [
      "No smoking indoors",
      "No parties",
      "No pets",
      "Quiet hours after 10 PM",
      "Keep garden area clean",
    ],

    averageRating: 4.8,
    reviewCount: 84,

    status: "published",

    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-bangalore-home-1",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-bangalore-home-2",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-bangalore-home-3",
        source: "unsplash",
      },
    ],
  },

  {
    title: "High-Rise Two Bedroom Apartment in Hyderabad",

    description:
      "A modern two-bedroom apartment in a well-connected part of Hyderabad, offering a spacious living room, fully equipped kitchen, comfortable bedrooms, and a dedicated work area. The apartment is convenient for both business and leisure stays, with restaurants, shopping, and major roads nearby.",

    price: 3900,

    propertyType: "Apartment",
    roomType: "Entire Place",

    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,

    address: {
      street: "HITEC City",
      city: "Hyderabad",
      state: "Telangana",
      country: "India",
      postalCode: "500081",
    },

    geometry: {
      type: "Point",
      coordinates: [78.3772, 17.4483],
    },

    amenities: [
      "WiFi",
      "Air Conditioning",
      "Kitchen",
      "Washing Machine",
      "TV",
      "Workspace",
      "Parking",
      "Elevator",
      "Gym",
    ],

    houseRules: [
      "No smoking",
      "No parties",
      "No pets",
      "Quiet hours after 10 PM",
      "No unregistered guests",
    ],

    averageRating: 4.7,
    reviewCount: 109,

    status: "published",

    images: [
      {
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-hyderabad-1",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-hyderabad-2",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-hyderabad-3",
        source: "unsplash",
      },
    ],
  },

  {
    title: "Cozy Wooden Cabin in Old Manali",

    description:
      "A warm wooden cabin tucked away in the quieter part of Old Manali, surrounded by pine trees and mountain air. The cabin has two bedrooms, a cozy living room, compact kitchen facilities, and a private outdoor sitting area. It is ideal for travelers looking for a relaxed mountain stay close to cafes and walking trails.",

    price: 5600,

    propertyType: "Cabin",
    roomType: "Entire Place",

    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,

    address: {
      street: "Old Manali",
      city: "Manali",
      state: "Himachal Pradesh",
      country: "India",
      postalCode: "175131",
    },

    geometry: {
      type: "Point",
      coordinates: [77.1871, 32.2487],
    },

    amenities: [
      "WiFi",
      "Heating",
      "Kitchen",
      "TV",
      "Mountain View",
      "Garden",
      "Outdoor Seating",
      "Workspace",
    ],

    houseRules: [
      "No smoking indoors",
      "No parties",
      "No pets",
      "Quiet hours after 10 PM",
      "Do not litter around the property",
    ],

    averageRating: 4.9,
    reviewCount: 176,

    status: "published",

    images: [
      {
        url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-manali-cabin-1",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-manali-cabin-2",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-manali-cabin-3",
        source: "unsplash",
      },
    ],
  },

  {
    title: "Mountain View Cottage in Shimla",

    description:
      "A peaceful two-bedroom cottage overlooking the surrounding hills of Shimla. The property combines classic mountain architecture with comfortable modern furnishings and includes a small kitchen, cozy living room, and outdoor sitting space. A good choice for families wanting a quieter stay away from the busiest parts of town.",

    price: 5200,

    propertyType: "Cottage",
    roomType: "Entire Place",

    maxGuests: 5,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,

    address: {
      street: "Mashobra Road",
      city: "Shimla",
      state: "Himachal Pradesh",
      country: "India",
      postalCode: "171007",
    },

    geometry: {
      type: "Point",
      coordinates: [77.2436, 31.1048],
    },

    amenities: [
      "WiFi",
      "Heating",
      "Kitchen",
      "TV",
      "Mountain View",
      "Parking",
      "Garden",
      "Fireplace",
      "Outdoor Seating",
    ],

    houseRules: [
      "No smoking indoors",
      "No parties",
      "No pets",
      "Fireplace must be supervised",
      "Quiet hours after 10 PM",
    ],

    averageRating: 4.8,
    reviewCount: 118,

    status: "published",

    images: [
      {
        url: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-shimla-cottage-1",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-shimla-cottage-2",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600566753051-7a6f7a4b4e4c?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-shimla-cottage-3",
        source: "unsplash",
      },
    ],
  },

  {
    title: "Riverside Private Home near Rishikesh",

    description:
      "A comfortable independent home surrounded by greenery near the Ganga, offering a calm base for guests visiting Rishikesh. The property has two bedrooms, a spacious living area, a kitchen, and an outdoor terrace. It is suited to families and small groups interested in yoga, rafting, nature walks, and relaxed evenings.",

    price: 4100,

    propertyType: "House",
    roomType: "Entire Place",

    maxGuests: 5,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,

    address: {
      street: "Tapovan",
      city: "Rishikesh",
      state: "Uttarakhand",
      country: "India",
      postalCode: "249192",
    },

    geometry: {
      type: "Point",
      coordinates: [78.3248, 30.1292],
    },

    amenities: [
      "WiFi",
      "Air Conditioning",
      "Kitchen",
      "TV",
      "Terrace",
      "Garden",
      "Workspace",
      "Parking",
      "Outdoor Seating",
    ],

    houseRules: [
      "No smoking indoors",
      "No parties",
      "No pets",
      "No loud music",
      "Quiet hours after 10 PM",
    ],

    averageRating: 4.7,
    reviewCount: 102,

    status: "published",

    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-rishikesh-1",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-rishikesh-2",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-rishikesh-3",
        source: "unsplash",
      },
    ],
  },

  {
    title: "Backwater Villa with Private Garden in Alleppey",

    description:
      "A spacious Kerala-style private villa surrounded by tropical greenery near the backwaters of Alleppey. The home has three bedrooms, a large common area, a fully equipped kitchen, and a shaded garden where guests can relax. It provides a comfortable base for families wanting to explore Kerala's waterways and villages.",

    price: 6800,

    propertyType: "Villa",
    roomType: "Entire Place",

    maxGuests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,

    address: {
      street: "Punnamada",
      city: "Alappuzha",
      state: "Kerala",
      country: "India",
      postalCode: "688006",
    },

    geometry: {
      type: "Point",
      coordinates: [76.354, 9.5057],
    },

    amenities: [
      "WiFi",
      "Air Conditioning",
      "Kitchen",
      "Parking",
      "TV",
      "Garden",
      "Outdoor Dining",
      "Breakfast",
      "Backwater View",
    ],

    houseRules: [
      "No smoking indoors",
      "No parties",
      "No pets",
      "Quiet hours after 10 PM",
      "Do not litter near the water",
    ],

    averageRating: 4.9,
    reviewCount: 145,

    status: "published",

    images: [
      {
        url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-alleppey-1",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-alleppey-2",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-alleppey-3",
        source: "unsplash",
      },
    ],
  },

  {
    title: "French Quarter Courtyard Home in Pondicherry",

    description:
      "A character-filled private home in Pondicherry's French Quarter, featuring high ceilings, traditional details, a peaceful inner courtyard, and comfortable modern furnishings. The property is within walking distance of cafes, heritage streets, boutiques, and the promenade, making it ideal for couples and small families.",

    price: 4500,

    propertyType: "House",
    roomType: "Entire Place",

    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,

    address: {
      street: "White Town",
      city: "Pondicherry",
      state: "Puducherry",
      country: "India",
      postalCode: "605001",
    },

    geometry: {
      type: "Point",
      coordinates: [79.8337, 11.931],
    },

    amenities: [
      "WiFi",
      "Air Conditioning",
      "Kitchen",
      "TV",
      "Courtyard",
      "Workspace",
      "Breakfast",
      "Refrigerator",
    ],

    houseRules: [
      "No smoking indoors",
      "No parties",
      "No pets",
      "No loud music",
      "Quiet hours after 10 PM",
    ],

    averageRating: 4.8,
    reviewCount: 132,

    status: "published",

    images: [
      {
        url: "https://images.unsplash.com/photo-1600566753086-00f18fb6c5d3?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-pondicherry-1",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-pondicherry-2",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-pondicherry-3",
        source: "unsplash",
      },
    ],
  },

  {
    title: "Modern Weekend Villa near Pawna Lake",

    description:
      "A private three-bedroom villa designed for relaxed weekend stays near Pawna Lake. The property offers a spacious living area, private pool, outdoor dining space, and open views of the surrounding hills. It is well suited for families and small groups traveling from Mumbai or Pune.",

    price: 9000,

    propertyType: "Villa",
    roomType: "Entire Place",

    maxGuests: 7,
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,

    address: {
      street: "Pawna Lake Road, Kamshet",
      city: "Lonavala",
      state: "Maharashtra",
      country: "India",
      postalCode: "410405",
    },

    geometry: {
      type: "Point",
      coordinates: [73.6117, 18.7575],
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
      "Mountain View",
    ],

    houseRules: [
      "No smoking indoors",
      "No parties without approval",
      "No pets",
      "Pool closes at 10 PM",
      "Quiet hours after 11 PM",
    ],

    averageRating: 4.8,
    reviewCount: 121,

    status: "published",

    images: [
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-pawna-1",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-pawna-2",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-pawna-3",
        source: "unsplash",
      },
    ],
  },

  {
    title: "Quiet Studio Apartment in Viman Nagar",

    description:
      "A compact and thoughtfully furnished studio apartment in Viman Nagar, Pune. The space includes a comfortable sleeping area, small kitchen, work desk, and modern bathroom. Its location near restaurants, shopping areas, and Pune Airport makes it particularly convenient for short business trips and couples.",

    price: 2600,

    propertyType: "Apartment",
    roomType: "Entire Place",

    maxGuests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,

    address: {
      street: "Viman Nagar",
      city: "Pune",
      state: "Maharashtra",
      country: "India",
      postalCode: "411014",
    },

    geometry: {
      type: "Point",
      coordinates: [73.9143, 18.5679],
    },

    amenities: [
      "WiFi",
      "Air Conditioning",
      "Kitchen",
      "TV",
      "Workspace",
      "Parking",
      "Elevator",
      "Refrigerator",
    ],

    houseRules: [
      "No smoking",
      "No parties",
      "No pets",
      "No loud music after 10 PM",
    ],

    averageRating: 4.6,
    reviewCount: 68,

    status: "published",

    images: [
      {
        url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-viman-1",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-viman-2",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600566753051-7a6f7a4b4e4c?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-viman-3",
        source: "unsplash",
      },
    ],
  },

  {
    title: "Palm-Filled Holiday Home near Vagator",

    description:
      "A relaxed private holiday home surrounded by palms and tropical greenery near Vagator. The property includes two bedrooms, a comfortable living room, kitchen, outdoor seating, and a small private garden. Guests can reach nearby beaches, cafes, restaurants, and North Goa nightlife within a short drive.",

    price: 5800,

    propertyType: "Holiday Home",
    roomType: "Entire Place",

    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,

    address: {
      street: "Vagator",
      city: "Goa",
      state: "Goa",
      country: "India",
      postalCode: "403509",
    },

    geometry: {
      type: "Point",
      coordinates: [73.746, 15.5977],
    },

    amenities: [
      "WiFi",
      "Air Conditioning",
      "Kitchen",
      "Parking",
      "TV",
      "Garden",
      "Outdoor Seating",
      "Balcony",
    ],

    houseRules: [
      "No smoking indoors",
      "No parties",
      "No pets",
      "Quiet hours after 11 PM",
      "No loud music outdoors",
    ],

    averageRating: 4.7,
    reviewCount: 93,

    status: "published",

    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-vagator-1",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-vagator-2",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-vagator-3",
        source: "unsplash",
      },
    ],
  },

  {
    title: "Private Pool House in Siolim",

    description:
      "A contemporary private home in the quieter Siolim area of North Goa, designed for guests who want a peaceful stay away from the busiest tourist streets. The house has three bedrooms, a private pool, open-plan living space, modern kitchen, and an outdoor dining area surrounded by greenery.",

    price: 7800,

    propertyType: "House",
    roomType: "Entire Place",

    maxGuests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,

    address: {
      street: "Siolim",
      city: "Goa",
      state: "Goa",
      country: "India",
      postalCode: "403517",
    },

    geometry: {
      type: "Point",
      coordinates: [73.788, 15.6175],
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
      "Washing Machine",
    ],

    houseRules: [
      "No smoking indoors",
      "No parties without approval",
      "No pets",
      "Pool closes at 10 PM",
      "Quiet hours after 11 PM",
    ],

    averageRating: 4.9,
    reviewCount: 157,

    status: "published",

    images: [
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-siolim-1",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-siolim-2",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-siolim-3",
        source: "unsplash",
      },
    ],
  },

  {
    title: "Cozy Family Apartment near HSR Layout",

    description:
      "A bright three-bedroom apartment in a residential part of Bengaluru, offering comfortable bedrooms, a spacious living room, full kitchen, work area, and secure parking. The home is convenient for families and professionals with easy access to cafes, restaurants, offices, and major roads.",

    price: 5100,

    propertyType: "Apartment",
    roomType: "Entire Place",

    maxGuests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,

    address: {
      street: "HSR Layout Sector 2",
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      postalCode: "560102",
    },

    geometry: {
      type: "Point",
      coordinates: [77.6382, 12.9116],
    },

    amenities: [
      "WiFi",
      "Air Conditioning",
      "Kitchen",
      "Washing Machine",
      "TV",
      "Workspace",
      "Parking",
      "Elevator",
      "Balcony",
    ],

    houseRules: [
      "No smoking",
      "No parties",
      "No pets",
      "Quiet hours after 10 PM",
      "No loud music in common areas",
    ],

    averageRating: 4.7,
    reviewCount: 88,

    status: "published",

    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-hsr-1",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-hsr-2",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-hsr-3",
        source: "unsplash",
      },
    ],
  },

  {
    title: "Peaceful Plantation Homestay in Wayanad",

    description:
      "A private homestay surrounded by coffee plantations and forested hills in Wayanad. The property offers two comfortable bedrooms, a simple kitchen, a spacious veranda, and plenty of outdoor space. It is a good fit for travelers who prefer nature, quiet mornings, and a slower Kerala experience.",

    price: 3900,

    propertyType: "Homestay",
    roomType: "Entire Place",

    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,

    address: {
      street: "Vythiri",
      city: "Wayanad",
      state: "Kerala",
      country: "India",
      postalCode: "673576",
    },

    geometry: {
      type: "Point",
      coordinates: [76.0387, 11.5525],
    },

    amenities: [
      "WiFi",
      "Kitchen",
      "Parking",
      "Garden",
      "Outdoor Seating",
      "Breakfast",
      "Mountain View",
      "Workspace",
    ],

    houseRules: [
      "No smoking indoors",
      "No parties",
      "No pets",
      "Respect surrounding wildlife",
      "Quiet hours after 10 PM",
    ],

    averageRating: 4.9,
    reviewCount: 112,

    status: "published",

    images: [
      {
        url: "https://images.unsplash.com/photo-1600566753086-00f18fb6c5d3?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-wayanad-1",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-wayanad-2",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-wayanad-3",
        source: "unsplash",
      },
    ],
  },

  {
    title: "Sunset Villa Overlooking the Aravallis in Udaipur",

    description:
      "A spacious private villa on the outskirts of Udaipur with open views toward the Aravalli hills. The property has three bedrooms, a private pool, landscaped garden, outdoor dining area, and a large living room designed for groups. It offers a peaceful retreat while remaining within driving distance of the city's lakes and attractions.",

    price: 9200,

    propertyType: "Villa",
    roomType: "Entire Place",

    maxGuests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,

    address: {
      street: "Badi Road",
      city: "Udaipur",
      state: "Rajasthan",
      country: "India",
      postalCode: "313011",
    },

    geometry: {
      type: "Point",
      coordinates: [73.6108, 24.6338],
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
      "Mountain View",
    ],

    houseRules: [
      "No smoking indoors",
      "No parties without approval",
      "No pets",
      "Pool closes at 10 PM",
      "Quiet hours after 11 PM",
    ],

    averageRating: 4.9,
    reviewCount: 134,

    status: "published",

    images: [
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-udaipur-villa-1",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-udaipur-villa-2",
        source: "unsplash",
      },
      {
        url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
        filename: "seed-udaipur-villa-3",
        source: "unsplash",
      },
    ],
  },
];

module.exports = listings;