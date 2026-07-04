import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../store/useAuth";
import toast from "react-hot-toast";

const MOCK_TRIPS = {
  1: {
    _id: "1",
    title: "Kedarnath Trek",
    type: "trekking",
    difficulty: "challenging",
    destination: "Kedarnath, Uttarakhand",
    duration: { days: 6, nights: 5 },
    price: 12500,
    discountedPrice: 9999,
    coverImage: "/images/trips/kedarnath.jpg",
    gallery: [
      "/images/trips/kedarnath.jpg",
      "/images/trips/tungnath.jpg",
      "/images/trips/badrinath.jpg",
      "/images/trips/amarnath.jpg",
    ],
    availableSeats: 8,
    altitude: "3,583 m",
    startLocation: "Haridwar",
    endLocation: "Haridwar",
    maxGroupSize: 12,
    description:
      "One of the most sacred treks in India, the Kedarnath Trek leads you to the ancient Kedarnath Temple at 3,583 m — one of the 12 Jyotirlingas. This challenging yet spiritually enriching 14 km trek through the Garhwal Himalayas rewards trekkers with stunning alpine scenery, glacial rivers and a profound devotional energy felt nowhere else on Earth. The route passes through Junglechatti, Bhimbali and Lincholi before the final ascent to the sacred shrine.",
    highlights: [
      "Darshan at Kedarnath Jyotirlinga Temple",
      "Trek through Himalayan alpine meadows",
      "Cross the Chorabari Glacier trail",
      "Sunrise over snow-capped Kedarnath Peak",
      "Evening aarti at the ancient stone temple",
      "Bhairavnath Temple exploration",
      "Garhwali culture & local cuisine",
    ],
    inclusions: [
      "Guest house accommodation throughout",
      "All meals (breakfast & dinner)",
      "Certified trek guide",
      "Safety equipment & first-aid kit",
      "Medical kit & oxygen cylinder",
      "Transport from Haridwar & back",
    ],
    exclusions: [
      "Flights/trains to Haridwar",
      "Personal expenses",
      "Travel insurance",
      "Pony/helicopter charges",
      "Lunch on trek days",
    ],
    itinerary: [
      {
        day: 1,
        title: "Haridwar → Gaurikund",
        description:
          "Drive 210 km to Gaurikund via Devprayag, Rudraprayag and Sonprayag. Check in and acclimatize. Evening puja at Gauri Temple.",
        accommodation: "Guest House Gaurikund",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Gaurikund → Kedarnath (14 km Trek)",
        description:
          "Early morning trek 14 km uphill through Junglechatti, Bhimbali and Lincholi to Kedarnath. Evening abhishek & aarti darshan at the Jyotirlinga.",
        accommodation: "Guest House at Kedarnath",
        meals: ["Breakfast", "Dinner"],
        distance: "14 km",
        altitude: "3,583 m",
      },
      {
        day: 3,
        title: "Kedarnath Temple & Bhairavnath",
        description:
          "Full day for temple visits. Dawn abhishek puja, Bhairavnath Temple trek, Chorabari Tal (Gandhi Sarovar) visit. Afternoon meditation time.",
        accommodation: "Guest House at Kedarnath",
        meals: ["Breakfast", "Dinner"],
        altitude: "3,583 m",
      },
      {
        day: 4,
        title: "Kedarnath → Gaurikund (Descent)",
        description:
          "Final darshan at sunrise. Descend 14 km back to Gaurikund. Rest & hot water soak.",
        accommodation: "Guest House Gaurikund",
        meals: ["Breakfast", "Dinner"],
        distance: "14 km",
      },
      {
        day: 5,
        title: "Gaurikund → Haridwar",
        description:
          "Drive back to Haridwar. Evening at leisure on Har Ki Pauri ghats. Attend Ganga Aarti.",
        accommodation: "Hotel Haridwar",
        meals: ["Breakfast"],
      },
      {
        day: 6,
        title: "Departure from Haridwar",
        description:
          "Morning puja at Har Ki Pauri. Breakfast and departure. Trek concludes with cherished memories.",
        meals: ["Breakfast"],
      },
    ],
  },

  /* ── Bike Ride Details ───────────────────────────────────────────────── */
  bike1: {
    _id: "bike1",
    title: "Leh–Ladakh Bike Adventure",
    type: "bike",
    difficulty: "challenging",
    destination: "Leh, Ladakh",
    duration: { days: 7, nights: 6 },
    price: 30000,
    coverImage: "/images/trips/leh.jpg",
    gallery: ["/images/trips/leh.jpg", "/images/trips/spiti valley.jpg"],
    ratingsAverage: 4.9,
    ratingsCount: 210,
    availableSeats: 10,
    availableDates: ["2026-08-10", "2026-09-05"],
    altitude: "3,500 m",
    startLocation: "Leh",
    endLocation: "Leh",
    maxGroupSize: 12,
    description:
      "An iconic high-altitude circuit across some of India’s highest passes. Expect long riding days, dramatic landscapes and remote hospitality.",
    highlights: [
      "Khardung La pass",
      "Pangong Lake turn",
      "Magnetic hill detour",
    ],
    inclusions: [
      "Motorbike rental (optional)",
      "Mechanic support",
      "Hotel & meals",
    ],
    exclusions: ["Rider gear", "Permits"],
    itinerary: [
      {
        day: 1,
        title: "Arrive Leh & Acclimatize",
        description: "Light ride and rest.",
        accommodation: "Hotel",
        meals: ["Dinner"],
      },
      {
        day: 3,
        title: "Leh to Pangong",
        description: "Ride to Pangong Lake via Chang La.",
        accommodation: "Camp",
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 7,
        title: "Return to Leh",
        description: "Finish route and depart.",
        meals: ["Breakfast"],
      },
    ],
  },

  bike2: {
    _id: "bike2",
    title: "Spiti Valley Bike Ride",
    type: "bike",
    difficulty: "challenging",
    destination: "Spiti Valley, Himachal Pradesh",
    duration: { days: 6, nights: 5 },
    price: 22000,
    coverImage: "/images/trips/spiti ride.jpg",
    gallery: ["/images/trips/spiti ride.jpg", "/images/trips/kinnuar.jpg"],
    ratingsAverage: 4.8,
    ratingsCount: 156,
    availableSeats: 12,
    availableDates: ["2026-07-20", "2026-08-15"],
    altitude: "3,000-4,000 m",
    startLocation: "Shimla",
    endLocation: "Kaza",
    maxGroupSize: 14,
    description:
      "A rugged ride across high mountain passes into the cold desert of Spiti — technical roads and epic vistas.",
    highlights: ["Key Monastery", "Chandratal lake", "Kaza sunrise"],
    inclusions: ["Support vehicle", "Local permits", "Accommodation"],
    exclusions: ["Fuel", "Personal equipment"],
    itinerary: [
      {
        day: 1,
        title: "Shimla → Narkanda",
        description: "Ride through apple orchards.",
        accommodation: "Hotel",
      },
      {
        day: 3,
        title: "Kaza Exploration",
        description: "Local monasteries and markets.",
        accommodation: "Guesthouse",
      },
      {
        day: 6,
        title: "Return leg",
        description: "Final scenic ride back.",
        meals: ["Breakfast"],
      },
    ],
  },

  bike3: {
    _id: "bike3",
    title: "Manali to Leh Ride",
    type: "bike",
    difficulty: "challenging",
    destination: "Manali → Leh",
    duration: { days: 6, nights: 5 },
    price: 25000,
    coverImage: "/images/trips/manali to leh ride.jpg",
    gallery: ["/images/trips/manali to leh ride.jpg", "/images/trips/leh.jpg"],
    ratingsAverage: 4.9,
    ratingsCount: 198,
    availableSeats: 10,
    availableDates: ["2026-07-10", "2026-08-01"],
    altitude: "3,500 m",
    startLocation: "Manali",
    endLocation: "Leh",
    maxGroupSize: 12,
    description:
      "The legendary Manali–Leh highway — remote high passes, thrilling descents and moonlike landscapes.",
    highlights: ["Rohtang & Baralacha La", "Tanglang La", "Lamayuru"],
    inclusions: ["Ride permits", "Accommodation", "Mechanic support"],
    exclusions: ["Fuel", "Personal insurance"],
    itinerary: [
      {
        day: 1,
        title: "Manali → Keylong",
        description: "First high pass day.",
        accommodation: "Guesthouse",
      },
      {
        day: 3,
        title: "Sarchu to Pang",
        description: "Cross major passes.",
        accommodation: "Camp",
      },
      {
        day: 6,
        title: "Arrive Leh",
        description: "Finish and rest.",
        meals: ["Breakfast"],
      },
    ],
  },

  bike4: {
    _id: "bike4",
    title: "Manali Local Ride",
    type: "bike",
    difficulty: "moderate",
    destination: "Manali, Himachal Pradesh",
    duration: { days: 3, nights: 2 },
    price: 9500,
    coverImage: "/images/trips/manali.jpg",
    gallery: ["/images/trips/manali.jpg"],
    ratingsAverage: 4.7,
    ratingsCount: 112,
    availableSeats: 14,
    availableDates: ["2026-06-25", "2026-07-18"],
    altitude: "2,000 m",
    startLocation: "Manali",
    endLocation: "Manali",
    maxGroupSize: 16,
    description:
      "Short scenic loops around Solang Valley and nearby attractions — perfect for weekend riders.",
    highlights: ["Solang Valley", "Old Manali cafes", "Hadimba Temple"],
    inclusions: ["Local guide", "Hotel", "Breakfast"],
    exclusions: ["Lunch", "Fuel"],
    itinerary: [
      {
        day: 1,
        title: "Local rides & cafes",
        description: "Explore Old Manali.",
        accommodation: "Hotel",
      },
      {
        day: 3,
        title: "Return",
        description: "Wrap up ride.",
        meals: ["Breakfast"],
      },
    ],
  },

  bike5: {
    _id: "bike5",
    title: "Tawang Bike Circuit",
    type: "bike",
    difficulty: "challenging",
    destination: "Tawang, Arunachal Pradesh",
    duration: { days: 7, nights: 6 },
    price: 32000,
    coverImage: "/images/trips/tawang ride.jpg",
    gallery: ["/images/trips/tawang ride.jpg"],
    ratingsAverage: 4.8,
    ratingsCount: 74,
    availableSeats: 8,
    availableDates: ["2026-09-10", "2026-10-05"],
    altitude: "3,000 m",
    startLocation: "Guwahati",
    endLocation: "Tawang",
    maxGroupSize: 10,
    description:
      "A cultural and highland ride into the eastern Himalaya — monasteries, steep roads and remote hospitality.",
    highlights: ["Tawang Monastery", "Sela Pass", "Barren highlands"],
    inclusions: ["Transport support", "Accommodation", "Meals"],
    exclusions: ["Inner-line permits", "Fuel"],
    itinerary: [
      {
        day: 1,
        title: "Drive to Bomdila",
        description: "Begin the eastern leg.",
        accommodation: "Hotel",
      },
      {
        day: 4,
        title: "Sela pass day",
        description: "High-altitude riding.",
        accommodation: "Guesthouse",
      },
    ],
  },

  bike6: {
    _id: "bike6",
    title: "Zanskar Valley Ride",
    type: "bike",
    difficulty: "challenging",
    destination: "Zanskar, Ladakh",
    duration: { days: 8, nights: 7 },
    price: 34000,
    coverImage: "/images/trips/zanskar valeey ride.jpg",
    gallery: ["/images/trips/zanskar valeey ride.jpg"],
    ratingsAverage: 4.9,
    ratingsCount: 63,
    availableSeats: 8,
    availableDates: ["2026-08-20", "2026-09-12"],
    altitude: "3,200 m",
    startLocation: "Leh",
    endLocation: "Leh",
    maxGroupSize: 10,
    description:
      "Remote, rugged and spectacular — Zanskar offers dramatic river gorges and alpine plateaus for experienced riders.",
    highlights: ["Zanskar Gorge", "Remote villages", "High passes"],
    inclusions: ["Guide", "Camps", "Meals"],
    exclusions: ["Emergency evacuation", "Fuel"],
    itinerary: [
      {
        day: 1,
        title: "Leh to Darcha",
        description: "Begin valley approach.",
        accommodation: "Camp",
      },
      {
        day: 8,
        title: "Return to Leh",
        description: "Finish ride.",
        meals: ["Breakfast"],
      },
    ],
  },

  bike7: {
    _id: "bike7",
    title: "Rishikesh – Chopta Bike Ride",
    type: "bike",
    difficulty: "moderate",
    destination: "Rishikesh → Chopta, Uttarakhand",
    duration: { days: 3, nights: 2 },
    price: 8500,
    coverImage: "/images/trips/rishikesh to chopta ride.jpg",
    gallery: ["/images/trips/rishikesh to chopta ride.jpg"],
    ratingsAverage: 4.7,
    ratingsCount: 88,
    availableSeats: 16,
    availableDates: ["2026-06-15", "2026-07-12"],
    altitude: "1,500-3,000 m",
    startLocation: "Rishikesh",
    endLocation: "Chopta",
    maxGroupSize: 20,
    description:
      "Short Himalayan loops mixing river valley roads with forested highland passes — excellent for mixed-skill groups.",
    highlights: ["Rishikesh Ganga banks", "Beas river views", "Chopta meadows"],
    inclusions: ["Hotel", "Breakfast", "Mechanic on call"],
    exclusions: ["Fuel", "Insurance"],
    itinerary: [
      {
        day: 1,
        title: "Rishikesh to Uttarkashi",
        description: "Scenic ride upstream.",
        accommodation: "Hotel",
      },
      {
        day: 3,
        title: "Chopta exploration",
        description: "Short treks and vistas.",
        meals: ["Breakfast"],
      },
    ],
  },

  bike8: {
    _id: "bike8",
    title: "Nainital Bike Getaway",
    type: "bike",
    difficulty: "easy",
    destination: "Nainital, Uttarakhand",
    duration: { days: 2, nights: 1 },
    price: 5500,
    coverImage: "/images/trips/nainital ride.jpg",
    gallery: ["/images/trips/nainital ride.jpg"],
    ratingsAverage: 4.6,
    ratingsCount: 92,
    availableSeats: 20,
    availableDates: ["2026-06-05", "2026-07-01"],
    altitude: "2,000 m",
    startLocation: "Nainital",
    endLocation: "Nainital",
    maxGroupSize: 25,
    description:
      "A relaxed short ride around the lakes and hill roads of Nainital — great for beginners.",
    highlights: ["Naini Lake", "Snow View point", "Local markets"],
    inclusions: ["Hotel", "Breakfast"],
    exclusions: ["Lunch", "Fuel"],
    itinerary: [
      {
        day: 1,
        title: "Local loop",
        description: "Scenic lake rides.",
        accommodation: "Hotel",
      },
    ],
  },

  bike9: {
    _id: "bike9",
    title: "Mussoorie – Dhanaulti Ride",
    type: "bike",
    difficulty: "easy",
    destination: "Mussoorie, Uttarakhand",
    duration: { days: 2, nights: 1 },
    price: 6000,
    coverImage: "/images/trips/mussoorie to dhanaulti ride.jpg",
    gallery: ["/images/trips/mussoorie to dhanaulti ride.jpg"],
    ratingsAverage: 4.7,
    ratingsCount: 64,
    availableSeats: 18,
    availableDates: ["2026-06-20", "2026-07-15"],
    altitude: "2,000 m",
    startLocation: "Dehradun",
    endLocation: "Mussoorie",
    maxGroupSize: 20,
    description:
      "A pleasant hill ride to Mussoorie and nearby Dhanaulti with winding roads and viewpoints.",
    highlights: ["Camel\'s Back", "Clouds end point", "Dhanaulti views"],
    inclusions: ["Hotel", "Breakfast"],
    exclusions: ["Fuel"],
    itinerary: [
      {
        day: 1,
        title: "Ride & viewpoints",
        description: "Short sightseeing ride.",
        accommodation: "Hotel",
      },
    ],
  },

  bike10: {
    _id: "bike10",
    title: "Kasol & Parvati Valley Ride",
    type: "bike",
    difficulty: "moderate",
    destination: "Kasol → Parvati Valley",
    duration: { days: 3, nights: 2 },
    price: 9000,
    coverImage: "/images/trips/kasol ride.jpg",
    gallery: ["/images/trips/kasol ride.jpg"],
    ratingsAverage: 4.8,
    ratingsCount: 86,
    availableSeats: 14,
    availableDates: ["2026-07-05", "2026-08-02"],
    altitude: "1,500 m",
    startLocation: "Bhuntar",
    endLocation: "Kasol",
    maxGroupSize: 16,
    description:
      "A soulful ride into Parvati Valley with riverside roads, cafes and pine forests.",
    highlights: ["Parvati river views", "Local cafes", "Tosh village"],
    inclusions: ["Hotel", "Breakfast", "Guide"],
    exclusions: ["Fuel"],
    itinerary: [
      {
        day: 1,
        title: "Ride to Kasol",
        description: "Arrive and explore.",
        accommodation: "Guesthouse",
      },
    ],
  },

  bike11: {
    _id: "bike11",
    title: "Shimla Bike Weekend",
    type: "bike",
    difficulty: "easy",
    destination: "Shimla, Himachal Pradesh",
    duration: { days: 2, nights: 1 },
    price: 6500,
    coverImage: "/images/trips/shimla ride.jpg",
    gallery: ["/images/trips/shimla ride.jpg"],
    ratingsAverage: 4.6,
    ratingsCount: 78,
    availableSeats: 20,
    availableDates: ["2026-06-12", "2026-07-20"],
    altitude: "2,200 m",
    startLocation: "Shimla",
    endLocation: "Shimla",
    maxGroupSize: 25,
    description:
      "Short weekend circuits across apple orchards and hill roads around Shimla.",
    highlights: ["Ridge walk", "Kufri detour", "Local bazaars"],
    inclusions: ["Hotel", "Breakfast"],
    exclusions: ["Fuel"],
    itinerary: [
      {
        day: 1,
        title: "Local ride",
        description: "Short scenic rides.",
        accommodation: "Hotel",
      },
    ],
  },

  bike12: {
    _id: "bike12",
    title: "Jaipur – Jaisalmer Desert Ride",
    type: "bike",
    difficulty: "moderate",
    destination: "Rajasthan",
    duration: { days: 5, nights: 4 },
    price: 16000,
    coverImage: "/images/trips/jaipur ride.jpg",
    gallery: [
      "/images/trips/jaipur ride.jpg",
      "/images/trips/jaisalmer ride.jpg",
    ],
    ratingsAverage: 4.7,
    ratingsCount: 102,
    availableSeats: 12,
    availableDates: ["2026-09-01", "2026-10-10"],
    altitude: "200-250 m",
    startLocation: "Jaipur",
    endLocation: "Jaisalmer",
    maxGroupSize: 16,
    description:
      "Cross Rajasthan’s cultural heart from Pink City to the golden dunes of Jaisalmer on well-paved roads.",
    highlights: ["Amber Fort", "Pushkar stop", "Jaisalmer dunes"],
    inclusions: ["Hotel", "Breakfast", "Support vehicle"],
    exclusions: ["Fuel"],
    itinerary: [
      {
        day: 1,
        title: "Jaipur sights",
        description: "Amber Fort & city ride.",
        accommodation: "Hotel",
      },
    ],
  },

  bike13: {
    _id: "bike13",
    title: "Jaisalmer Sand Dunes Ride",
    type: "bike",
    difficulty: "moderate",
    destination: "Jaisalmer, Rajasthan",
    duration: { days: 3, nights: 2 },
    price: 9000,
    coverImage: "/images/trips/jaisalmer ride.jpg",
    gallery: ["/images/trips/jaisalmer ride.jpg"],
    ratingsAverage: 4.7,
    ratingsCount: 58,
    availableSeats: 16,
    availableDates: ["2026-10-01", "2026-11-10"],
    altitude: "200 m",
    startLocation: "Jaisalmer",
    endLocation: "Jaisalmer",
    maxGroupSize: 18,
    description:
      "Dune rides, desert camps and sunset vistas — a compact desert riding experience.",
    highlights: ["Sunset dunes", "Camel village visit", "Desert camp"],
    inclusions: ["Camp stay", "Meals", "Guide"],
    exclusions: ["Fuel", "Personal gear"],
    itinerary: [
      {
        day: 1,
        title: "Dune camp",
        description: "Ride & camp.",
        accommodation: "Desert Camp",
      },
    ],
  },

  bike14: {
    _id: "bike14",
    title: "Mount Abu Hill Ride",
    type: "bike",
    difficulty: "easy",
    destination: "Mount Abu, Rajasthan",
    duration: { days: 2, nights: 1 },
    price: 7000,
    coverImage: "/images/trips/mount abu ride.jpg",
    gallery: ["/images/trips/mount abu ride.jpg"],
    ratingsAverage: 4.6,
    ratingsCount: 44,
    availableSeats: 20,
    availableDates: ["2026-06-30", "2026-07-25"],
    altitude: "1,220 m",
    startLocation: "Mount Abu",
    endLocation: "Mount Abu",
    maxGroupSize: 20,
    description:
      "A restful hill-ride to Mount Abu with cool pine-scented forests and lake-side rides.",
    highlights: ["Nakki Lake", "Dilwara Temples", "Sunset point"],
    inclusions: ["Hotel", "Breakfast"],
    exclusions: ["Fuel"],
    itinerary: [
      {
        day: 1,
        title: "Arrival & local ride",
        description: "Enjoy lakeside rides.",
        accommodation: "Hotel",
      },
    ],
  },

  bike15: {
    _id: "bike15",
    title: "Goa Coastal Ride",
    type: "bike",
    difficulty: "easy",
    destination: "Goa",
    duration: { days: 3, nights: 2 },
    price: 8500,
    coverImage: "/images/trips/goa ride.jpg",
    gallery: ["/images/trips/goa ride.jpg", "/images/trips/goa.jpg"],
    ratingsAverage: 4.7,
    ratingsCount: 132,
    availableSeats: 18,
    availableDates: ["2026-06-18", "2026-07-22"],
    altitude: "Sea Level",
    startLocation: "Goa",
    endLocation: "Goa",
    maxGroupSize: 20,
    description:
      "Coastal highways, beach stops and laid-back nights — a leisurely coastal ride.",
    highlights: ["Beach stops", "Waterfront cafes", "Sunset cruises"],
    inclusions: ["Hotel", "Breakfast", "Local transfers"],
    exclusions: ["Flights", "Fuel"],
    itinerary: [
      {
        day: 1,
        title: "Coastal ride",
        description: "Explore beaches.",
        accommodation: "Beach Villa",
      },
    ],
  },

  bike16: {
    _id: "bike16",
    title: "Gokarna Beach Ride",
    type: "bike",
    difficulty: "easy",
    destination: "Gokarna, Karnataka",
    duration: { days: 2, nights: 1 },
    price: 6500,
    coverImage: "/images/trips/gokarna ride.jpg",
    gallery: ["/images/trips/gokarna ride.jpg"],
    ratingsAverage: 4.6,
    ratingsCount: 48,
    availableSeats: 20,
    availableDates: ["2026-07-08", "2026-08-12"],
    altitude: "Sea Level",
    startLocation: "Gokarna",
    endLocation: "Gokarna",
    maxGroupSize: 22,
    description:
      "Beach-hopping and relaxed riding along the Karnataka coast, ideal for short getaways.",
    highlights: ["Om Beach", "Kudle Beach", "Sunset viewpoints"],
    inclusions: ["Hotel", "Breakfast"],
    exclusions: ["Fuel"],
    itinerary: [
      {
        day: 1,
        title: "Beach loop",
        description: "Visit main beaches.",
        accommodation: "Beach Hut",
      },
    ],
  },

  bike17: {
    _id: "bike17",
    title: "Munnar Tea Estate Ride",
    type: "bike",
    difficulty: "easy",
    destination: "Munnar, Kerala",
    duration: { days: 3, nights: 2 },
    price: 9500,
    coverImage: "/images/trips/munnar ride.jpg",
    gallery: ["/images/trips/munnar ride.jpg"],
    ratingsAverage: 4.8,
    ratingsCount: 52,
    availableSeats: 14,
    availableDates: ["2026-07-15", "2026-08-05"],
    altitude: "1,500 m",
    startLocation: "Munnar",
    endLocation: "Munnar",
    maxGroupSize: 16,
    description:
      "Ride through winding roads flanked by tea gardens, waterfalls and misty hills.",
    highlights: ["Tea estate views", "Waterfalls", "Eco trails"],
    inclusions: ["Hotel", "Breakfast", "Local guide"],
    exclusions: ["Fuel"],
    itinerary: [
      {
        day: 1,
        title: "Estate loops",
        description: "Tea garden rides.",
        accommodation: "Hotel",
      },
    ],
  },

  bike18: {
    _id: "bike18",
    title: "Ooty Nilgiris Ride",
    type: "bike",
    difficulty: "easy",
    destination: "Ooty, Tamil Nadu",
    duration: { days: 2, nights: 1 },
    price: 8000,
    coverImage: "/images/trips/ooty ride.jpg",
    gallery: ["/images/trips/ooty ride.jpg"],
    ratingsAverage: 4.6,
    ratingsCount: 46,
    availableSeats: 18,
    availableDates: ["2026-06-28", "2026-07-30"],
    altitude: "2,240 m",
    startLocation: "Ooty",
    endLocation: "Ooty",
    maxGroupSize: 18,
    description:
      "Nilgiri hill roads, tea gardens and lake-side views make this a peaceful short ride.",
    highlights: ["Ooty Lake", "Tea gardens", "Nilgiri viewpoints"],
    inclusions: ["Hotel", "Breakfast"],
    exclusions: ["Fuel"],
    itinerary: [
      {
        day: 1,
        title: "Local ride",
        description: "Scenic hill loops.",
        accommodation: "Hotel",
      },
    ],
  },

  bike19: {
    _id: "bike19",
    title: "Puducherry Coastal Ride",
    type: "bike",
    difficulty: "easy",
    destination: "Puducherry",
    duration: { days: 2, nights: 1 },
    price: 7500,
    coverImage: "/images/trips/puducherry ride.jpg",
    gallery: ["/images/trips/puducherry ride.jpg"],
    ratingsAverage: 4.6,
    ratingsCount: 40,
    availableSeats: 20,
    availableDates: ["2026-06-22", "2026-07-18"],
    altitude: "Sea Level",
    startLocation: "Puducherry",
    endLocation: "Puducherry",
    maxGroupSize: 20,
    description:
      "A short coastal escape through French Quarter lanes and coastal roads to nearby beaches.",
    highlights: ["Promenade walks", "Auroville visit", "Beaches"],
    inclusions: ["Hotel", "Breakfast"],
    exclusions: ["Fuel"],
    itinerary: [
      {
        day: 1,
        title: "Coastal loop",
        description: "Explore Promenade & beaches.",
        accommodation: "Hotel",
      },
    ],
  },

  3: {
    _id: "3",
    title: "Solo Rishikesh Retreat",
    type: "solo",
    difficulty: "easy",
    destination: "Rishikesh, Uttarakhand",
    duration: { days: 4, nights: 3 },
    price: 7500,
    discountedPrice: 5999,
    coverImage: "/images/trips/neelkanth.jpg",
    gallery: [
      "/images/trips/neelkanth.jpg",
      "/images/trips/kedarnath.jpg",
      "/images/trips/tungnath.jpg",
      "/images/trips/badrinath.jpg",
    ],
    ratingsAverage: 4.7,
    ratingsCount: 76,
    availableSeats: 12,
    altitude: "372 m",
    startLocation: "Rishikesh",
    endLocation: "Rishikesh",
    maxGroupSize: 1,
    description:
      "A soul-refreshing solo retreat in the yoga capital of the world — Rishikesh. Spend your days doing sunrise yoga on the banks of the sacred Ganga, meditating at ancient ashrams, exploring the mystical Beatles Ashram and tackling thrilling white-water rapids. Perfect for the solo traveler seeking peace, adventure and self-discovery in the lap of the Himalayas.",
    highlights: [
      "Daily sunrise yoga on Ganga banks",
      "White-water rafting on the Ganges (16 km)",
      "Visit Neelkanth Mahadev Temple",
      "Beatles Ashram (Chaurasi Kutia) exploration",
      "Evening Ganga Aarti at Parmarth Niketan",
      "Laxman Jhula & Ram Jhula bridges",
      "Cafe culture & local Rishikesh cuisine",
    ],
    inclusions: [
      "Ashram/hostel accommodation",
      "Yoga & meditation sessions",
      "Certified guide",
      "Rafting equipment & safety gear",
      "All breakfasts",
    ],
    exclusions: [
      "Personal expenses",
      "Lunch & dinner",
      "Train tickets to Rishikesh",
      "Bungee jumping (optional add-on)",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Ganga Aarti",
        description:
          "Arrive in Rishikesh. Check in at riverside ashram. Sunset walk on Laxman Jhula, evening Ganga Aarti spectacle at Triveni Ghat.",
        accommodation: "Riverside Ashram",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Sunrise Yoga & White-Water Rafting",
        description:
          "Dawn yoga session on Ganga banks. After breakfast, white-water rafting 16 km through Grade III-IV rapids — Roller Coaster, Golf Course & Club House.",
        accommodation: "Riverside Ashram",
        meals: ["Breakfast"],
        distance: "16 km rafting",
      },
      {
        day: 3,
        title: "Neelkanth Mahadev Temple Trek",
        description:
          "Forest trek 3 km through dense sal forest to Neelkanth Mahadev Temple (1,675 m). Shiva darshan. Explore Beatles Ashram in the evening.",
        accommodation: "Riverside Ashram",
        meals: ["Breakfast"],
        distance: "6 km",
        altitude: "1,675 m",
      },
      {
        day: 4,
        title: "Sunrise Meditation & Departure",
        description:
          "Final sunrise meditation at Triveni Ghat. Ayurvedic breakfast. Explore local market. Departure.",
        meals: ["Breakfast"],
      },
    ],
  },

  4: {
    _id: "4",
    title: "11 Shiv Yatra Package",
    type: "spiritual",
    difficulty: "moderate",
    destination: "Pan India",
    duration: { days: 21, nights: 20 },
    price: 45000,
    discountedPrice: 38999,
    coverImage: "/images/trips/somnath.jpg",
    gallery: [
      "/images/trips/somnath.jpg",
      "/images/trips/kashivishwanath.jpg",
      "/images/trips/ujjain.jpg",
      "/images/trips/omkareshwar.jpg",
    ],
    ratingsAverage: 5.0,
    ratingsCount: 64,
    availableSeats: 6,
    altitude: "Varies",
    startLocation: "Mumbai",
    endLocation: "Varanasi",
    maxGroupSize: 20,
    description:
      "An epic 21-day pan-India circuit visiting all 11 major Jyotirlingas by AC sleeper coach and flights. Experience the spiritual grandeur of India's most sacred Shiva temples from coastal Gujarat to the Himalayan heights of Kedarnath.",
    highlights: [
      "Visit 11 Jyotirlingas across India",
      "Somnath sunrise aarti",
      "Kedarnath helicopter option",
      "Kashi Vishwanath corridor visit",
      "Mahakaleshwar Bhasma aarti",
    ],
    inclusions: [
      "All hotel accommodation (3-star)",
      "All meals",
      "AC transport between cities",
      "Temple VIP darshan passes",
      "Licensed guide",
      "Travel insurance",
    ],
    exclusions: [
      "Flights to Mumbai",
      "Personal expenses",
      "Camera fees at temples",
    ],
    itinerary: [
      {
        day: 1,
        title: "Mumbai → Somnath",
        description: "Fly to Rajkot, drive to Somnath. Evening aarti.",
        accommodation: "Hotel Somnath",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Somnath → Nageshwar → Dwarka",
        description:
          "Morning Somnath darshan, drive to Nageshwar Jyotirlinga, then Dwarka.",
        accommodation: "Hotel Dwarka",
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 3,
        title: "Dwarka → Ahmedabad → Ujjain",
        description:
          "Drive to Ahmedabad, fly to Indore, drive to Ujjain for Mahakaleshwar.",
        accommodation: "Hotel Ujjain",
        meals: ["Breakfast", "Dinner"],
      },
    ],
  },

  5: {
    _id: "5",
    title: "Goa Friends Bonanza",
    type: "friends",
    difficulty: "easy",
    destination: "Goa",
    duration: { days: 5, nights: 4 },
    price: 15000,
    discountedPrice: 11999,
    coverImage: "/images/trips/banner.jpg",
    ratingsAverage: 4.6,
    ratingsCount: 112,
    availableSeats: 14,
    altitude: "Sea Level",
    startLocation: "Goa Airport",
    endLocation: "Goa Airport",
    maxGroupSize: 20,
    description:
      "The ultimate friends getaway to sun-kissed Goa! Spend 5 days hopping between stunning beaches, vibrant shacks, water sports, night markets and unforgettable sunset parties. This package is designed for maximum fun with your squad.",
    highlights: [
      "Baga & Anjuna beach parties",
      "Water sports – jet ski, parasailing, banana boat",
      "Old Goa churches & Dudhsagar Falls day trip",
      "Night market at Arpora",
      "Sunset cruise on the Mandovi River",
    ],
    inclusions: [
      "Beach villa accommodation",
      "Breakfast daily",
      "Airport transfers",
      "Water sports package",
      "Sunset cruise",
    ],
    exclusions: ["Flights to Goa", "Lunches & dinners", "Personal shopping"],
    itinerary: [
      {
        day: 1,
        title: "Arrival & North Goa Beaches",
        description:
          "Check in, relax at Baga Beach, evening shacks and bonfire.",
        accommodation: "Beach Villa",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Water Sports Day",
        description:
          "Jet skiing, parasailing, banana boat at Calangute. Evening Anjuna party.",
        accommodation: "Beach Villa",
        meals: ["Breakfast"],
      },
      {
        day: 3,
        title: "South Goa & Dudhsagar",
        description: "Day trip to Dudhsagar Falls and Palolem Beach.",
        accommodation: "Beach Villa",
        meals: ["Breakfast"],
      },
      {
        day: 4,
        title: "Old Goa & Sunset Cruise",
        description:
          "Old Goa churches, spice plantation, Mandovi River sunset cruise.",
        accommodation: "Beach Villa",
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 5,
        title: "Departure Day",
        description: "Last morning at beach, breakfast and airport drop.",
        meals: ["Breakfast"],
      },
    ],
  },

  2: {
    _id: "2",
    title: "Spiti Valley Expedition",
    type: "friends",
    difficulty: "moderate",
    destination: "Spiti Valley, Himachal Pradesh",
    duration: { days: 8, nights: 7 },
    price: 18000,
    discountedPrice: null,
    coverImage: "/images/trips/kinnuar.jpg",
    ratingsAverage: 4.8,
    ratingsCount: 94,
    availableSeats: 4,
    altitude: "4,270 m",
    startLocation: "Shimla",
    endLocation: "Manali",
    maxGroupSize: 12,
    description:
      "An epic road expedition through the cold desert mountain valley of Spiti. Drive through some of the world's highest motorable roads, visit ancient Buddhist monasteries, and camp under the clearest skies you've ever seen.",
    highlights: [
      "Key Monastery & Kibber village",
      "Chandratal Lake (Moon Lake)",
      "World's highest post office at Hikkim",
      "Spiti River valley camping",
      "Dhankar Monastery & Lake",
    ],
    inclusions: [
      "Tempo traveller throughout",
      "Camping & hotel stays",
      "All meals",
      "Experienced driver guide",
      "Permits",
    ],
    exclusions: ["Train to Shimla", "Personal expenses", "Travel insurance"],
    itinerary: [
      {
        day: 1,
        title: "Shimla → Narkanda → Rampur",
        description:
          "Drive through the apple belt of Himachal. Scenic mountain roads.",
        accommodation: "Hotel",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Rampur → Nako → Tabo",
        description:
          "Enter Spiti valley. Visit Nako Lake and ancient Tabo Monastery.",
        accommodation: "Homestay",
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 3,
        title: "Tabo → Dhankar → Kaza",
        description:
          "Dramatic Dhankar Monastery perched on a cliff. Base at Kaza.",
        accommodation: "Guesthouse Kaza",
        meals: ["Breakfast", "Dinner"],
        altitude: "3,800 m",
      },
    ],
  },

  6: {
    _id: "6",
    title: "Valley of Flowers Trek",
    type: "trekking",
    difficulty: "moderate",
    destination: "Chamoli, Uttarakhand",
    duration: { days: 7, nights: 6 },
    price: 16000,
    discountedPrice: null,
    coverImage: "/images/trips/kedarnath.jpg",
    ratingsAverage: 4.8,
    ratingsCount: 87,
    availableSeats: 10,
    altitude: "3,658 m",
    startLocation: "Haridwar",
    endLocation: "Haridwar",
    maxGroupSize: 15,
    description:
      "A UNESCO World Heritage Site, the Valley of Flowers is a breathtaking alpine meadow carpeted with hundreds of wild Himalayan flowers. The trek also includes a visit to the sacred Hemkund Sahib Gurudwara at 4,329 m — a truly divine experience.",
    highlights: [
      "Valley of Flowers – UNESCO Heritage",
      "Hemkund Sahib Gurudwara at 4,329 m",
      "Ghangaria base camp",
      "Nanda Devi National Park",
      "Diverse Himalayan flora & fauna",
    ],
    inclusions: [
      "Hotel & camping accommodation",
      "All meals",
      "Trek guide",
      "Entry permits",
      "Transport from Haridwar",
    ],
    exclusions: ["Trains to Haridwar", "Personal expenses", "Porter charges"],
    itinerary: [
      {
        day: 1,
        title: "Haridwar → Govindghat",
        description: "Drive 8 hours to Govindghat. Check in and briefing.",
        accommodation: "Hotel",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Govindghat → Ghangaria",
        description:
          "Trek 13 km through beautiful forest. Base camp at Ghangaria.",
        accommodation: "Guesthouse",
        meals: ["Breakfast", "Dinner"],
        distance: "13 km",
        altitude: "3,050 m",
      },
      {
        day: 3,
        title: "Valley of Flowers",
        description:
          "Trek into the magical Valley of Flowers. Full day exploration.",
        accommodation: "Guesthouse Ghangaria",
        meals: ["Breakfast", "Dinner"],
        altitude: "3,658 m",
      },
      {
        day: 4,
        title: "Hemkund Sahib",
        description: "Trek 6 km to Hemkund Sahib Gurudwara at 4,329 m.",
        accommodation: "Guesthouse",
        meals: ["Breakfast", "Dinner"],
        distance: "6 km",
        altitude: "4,329 m",
      },
    ],
  },

  7: {
    _id: "7",
    title: "Rajasthan Friends Ride",
    type: "friends",
    difficulty: "easy",
    destination: "Rajasthan",
    duration: { days: 6, nights: 5 },
    price: 13500,
    discountedPrice: null,
    coverImage: "/images/trips/banner.jpg",
    ratingsAverage: 4.7,
    ratingsCount: 45,
    availableSeats: 8,
    altitude: "217 m",
    startLocation: "Jaipur",
    endLocation: "Jaisalmer",
    maxGroupSize: 15,
    description:
      "Cruise through the royal deserts and palaces of Rajasthan with your friends. From the Pink City of Jaipur to the golden dunes of Jaisalmer, this trip is packed with culture, colour, and camel rides.",
    highlights: [
      "Jaipur – Amber Fort & Hawa Mahal",
      "Pushkar Holy Lake & Brahma Temple",
      "Jodhpur – Blue City & Mehrangarh Fort",
      "Jaisalmer sand dunes & camel safari",
      "Desert camp with folk music",
    ],
    inclusions: [
      "Heritage hotel accommodation",
      "Breakfast & dinner daily",
      "AC transport",
      "Camel safari",
      "Cultural guide",
    ],
    exclusions: ["Trains to Jaipur", "Lunches", "Personal shopping"],
    itinerary: [
      {
        day: 1,
        title: "Arrival Jaipur",
        description: "Amber Fort, Hawa Mahal evening walk, night market.",
        accommodation: "Heritage Hotel",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Jaipur → Pushkar",
        description: "Pushkar Lake, Brahma Temple, rose gardens.",
        accommodation: "Lakeside Hotel",
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 3,
        title: "Pushkar → Jodhpur",
        description: "Blue City, Mehrangarh Fort, Jaswant Thada.",
        accommodation: "Fort Hotel",
        meals: ["Breakfast", "Dinner"],
      },
    ],
  },

  fr4: {
    _id: "fr4",
    title: "Coorg Friends Getaway",
    type: "friends",
    difficulty: "easy",
    destination: "Coorg, Karnataka",
    duration: { days: 4, nights: 3 },
    price: 12000,
    discountedPrice: 9499,
    coverImage: "/images/trips/image1.jpg",
    ratingsAverage: 4.6,
    ratingsCount: 63,
    availableSeats: 12,
    altitude: "1,525 m",
    startLocation: "Bangalore",
    endLocation: "Bangalore",
    maxGroupSize: 16,
    description:
      "Scotland of India — Coorg is a misty coffee-scented paradise perfect for a friends retreat. Explore lush coffee plantations, jungle waterfalls, spice gardens and cozy homestays nestled in the Western Ghats.",
    highlights: [
      "Abbey Falls & Iruppu Falls",
      "Coorg coffee & spice plantation tour",
      "Namdroling Monastery (Golden Temple)",
      "Jungle trek to Brahmagiri Peak",
      "Coorg cuisine – Pandi curry & Kadambuttu",
    ],
    inclusions: [
      "Coffee estate homestay",
      "All meals",
      "Plantation tour",
      "Cab transport",
      "Guide",
    ],
    exclusions: [
      "Bus/train to Bangalore",
      "Personal expenses",
      "Adventure activities",
    ],
    itinerary: [
      {
        day: 1,
        title: "Bangalore → Coorg",
        description:
          "5-hour drive to Coorg. Check in at coffee estate, evening plantation walk.",
        accommodation: "Coffee Homestay",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Waterfalls & Monastery",
        description: "Abbey Falls, Golden Temple Namdroling, local market.",
        accommodation: "Coffee Homestay",
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 3,
        title: "Brahmagiri Trek",
        description:
          "Jungle trek to Brahmagiri Peak, river crossing, spice garden.",
        accommodation: "Coffee Homestay",
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 4,
        title: "Return to Bangalore",
        description: "Morning coffee walk, Coorg local breakfast, drive back.",
        meals: ["Breakfast"],
      },
    ],
  },

  fr5: {
    _id: "fr5",
    title: "Manali Squad Trip",
    type: "bike",
    difficulty: "moderate",
    destination: "Manali, Himachal Pradesh",
    duration: { days: 6, nights: 5 },
    price: 17500,
    discountedPrice: 13999,
    coverImage: "/images/trips/img1.jpg",
    ratingsAverage: 4.8,
    ratingsCount: 91,
    availableSeats: 6,
    availableDates: [],
    altitude: "2,050 m",
    startLocation: "Delhi",
    endLocation: "Delhi",
    maxGroupSize: 14,
    description:
      "The classic Manali squad trip — snow, adventure, cafes and mountains. Rohtang Pass, Solang Valley, Hadimba Temple, paragliding and cozy bonfire nights. This is the one your friends will talk about for years.",
    highlights: [
      "Rohtang Pass snow point",
      "Solang Valley – paragliding & zorbing",
      "Hadimba Devi Temple",
      "Old Manali cafes & markets",
      "Bonfire nights with mountain views",
    ],
    inclusions: [
      "Hotel & camp accommodation",
      "Breakfast & dinner",
      "Volvo from Delhi",
      "Sightseeing by cab",
      "Adventure activities",
    ],
    exclusions: ["Lunch", "Personal shopping", "Travel insurance"],
    itinerary: [
      {
        day: 1,
        title: "Delhi → Manali (Volvo)",
        description: "Overnight Volvo bus from Delhi. Arrive Manali morning.",
        accommodation: "Hotel Manali",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Solang Valley Adventure",
        description: "Paragliding, zorbing, snow activities at Solang Valley.",
        accommodation: "Hotel Manali",
        meals: ["Breakfast", "Dinner"],
        altitude: "2,480 m",
      },
      {
        day: 3,
        title: "Rohtang Pass",
        description:
          "Drive to Rohtang Pass snow point (subject to permit). Snowball fights!",
        accommodation: "Hotel Manali",
        meals: ["Breakfast", "Dinner"],
        altitude: "3,978 m",
      },
      {
        day: 4,
        title: "Hadimba Temple & Old Manali",
        description:
          "Hadimba Devi Temple, Van Vihar, Old Manali cafes & mall road.",
        accommodation: "Hotel Manali",
        meals: ["Breakfast", "Dinner"],
      },
    ],
  },

  8: {
    _id: "8",
    title: "Chadar Trek Ladakh",
    type: "trekking",
    difficulty: "extreme",
    destination: "Zanskar, Ladakh",
    duration: { days: 10, nights: 9 },
    price: 28000,
    discountedPrice: null,
    coverImage: "/images/trips/amarnath.jpg",
    ratingsAverage: 4.9,
    ratingsCount: 56,
    availableSeats: 6,
    altitude: "3,500 m",
    startLocation: "Leh",
    endLocation: "Leh",
    maxGroupSize: 10,
    description:
      "Walk on the frozen Zanskar River — one of the most unique and extreme winter treks in the world. The Chadar (frozen river sheet) trek is done in January–February at -20°C and is reserved for only the most adventurous souls.",
    highlights: [
      "Trek on frozen Zanskar River",
      "Zanskar Gorge & ice caves",
      "Local Zanskari village stay",
      "Nerak Waterfall frozen",
      "Extreme cold-weather trekking experience",
    ],
    inclusions: [
      "All accommodation (camps & villages)",
      "All meals",
      "Expedition guide & support team",
      "Sleeping bags & thermal gear",
      "Leh airport pickup",
    ],
    exclusions: [
      "Flights to Leh",
      "Personal gear",
      "Travel insurance",
      "Oxygen cylinder (if needed)",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive Leh – Acclimatization",
        description: "Arrive Leh airport, rest and acclimatize. No exertion.",
        accommodation: "Hotel Leh",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Leh – Gear prep & Briefing",
        description: "Gear check, route briefing, acclimatization walk.",
        accommodation: "Hotel Leh",
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 3,
        title: "Drive to Chilling – Chadar starts",
        description: "Drive to Chilling, begin walking on the frozen Zanskar.",
        accommodation: "Chadar Camp",
        meals: ["Breakfast", "Dinner"],
        distance: "7 km",
        altitude: "3,150 m",
      },
    ],
  },

  9: {
    _id: "9",
    title: "Varanasi Solo Spiritual",
    type: "solo",
    difficulty: "easy",
    destination: "Varanasi, Uttar Pradesh",
    duration: { days: 3, nights: 2 },
    price: 5500,
    discountedPrice: null,
    coverImage: "/images/trips/kashivishwanath.jpg",
    ratingsAverage: 4.8,
    ratingsCount: 92,
    availableSeats: 20,
    altitude: "80 m",
    startLocation: "Varanasi",
    endLocation: "Varanasi",
    maxGroupSize: 1,
    description:
      "Immerse yourself in the eternal city of Varanasi — one of the world's oldest living cities and the spiritual heart of India. Witness the magnificent Ganga Aarti, take a sunrise boat ride, visit Kashi Vishwanath and Sarnath.",
    highlights: [
      "Ganga Aarti at Dashashwamedh Ghat",
      "Sunrise boat ride on the Ganges",
      "Kashi Vishwanath Temple darshan",
      "Sarnath – birthplace of Buddhism",
      "Narrow lanes, chai & Banarasi cuisine",
    ],
    inclusions: [
      "Ghat-view hotel accommodation",
      "Breakfast",
      "Boat ride",
      "Local guide",
      "Temple visit assistance",
    ],
    exclusions: ["Train to Varanasi", "Lunch & dinner", "Personal expenses"],
    itinerary: [
      {
        day: 1,
        title: "Arrive & Evening Ganga Aarti",
        description:
          "Arrive Varanasi, check in, evening Ganga Aarti at Dashashwamedh Ghat.",
        accommodation: "Ghat-view Hotel",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Sunrise Boat Ride & Temples",
        description:
          "Dawn boat ride on Ganga, Kashi Vishwanath darshan, Sarnath visit.",
        accommodation: "Ghat-view Hotel",
        meals: ["Breakfast"],
      },
      {
        day: 3,
        title: "Banaras Walk & Departure",
        description:
          "Morning chai walk through narrow lanes, shopping, departure.",
        meals: ["Breakfast"],
      },
    ],
  },

  sp1: {
    _id: "sp1",
    title: "Omkareshwar Yatra",
    type: "spiritual",
    difficulty: "easy",
    destination: "Omkareshwar, Madhya Pradesh",
    duration: { days: 3, nights: 2 },
    price: 8500,
    discountedPrice: 6999,
    coverImage: "/images/trips/omkareshwar.jpg",
    gallery: [
      "/images/trips/omkareshwar.jpg",
      "/images/trips/ujjain.jpg",
      "/images/trips/somnath.jpg",
      "/images/trips/kashivishwanath.jpg",
    ],
    ratingsAverage: 4.9,
    ratingsCount: 108,
    availableSeats: 15,
    altitude: "264 m",
    startLocation: "Indore",
    endLocation: "Indore",
    maxGroupSize: 20,
    description:
      "Visit the sacred island of Omkareshwar, shaped naturally like the Om symbol, where the Narmada River flows around it. Home to one of the 12 Jyotirlingas, this yatra blends the serenity of the river with profound Shiva devotion.",
    highlights: [
      "Omkareshwar Jyotirlinga darshan",
      "Boat ride around the Om-shaped island",
      "Mamleshwar Temple",
      "Narmada River holy dip",
      "Sunset aarti on the ghats",
    ],
    inclusions: [
      "Dharamshala/hotel accommodation",
      "All meals",
      "Boat ride",
      "Guide",
      "Transport from Indore",
    ],
    exclusions: ["Flights to Indore", "Personal expenses", "Camera fees"],
    itinerary: [
      {
        day: 1,
        title: "Indore → Omkareshwar",
        description:
          "Drive 80 km to Omkareshwar. Evening aarti on Narmada ghats.",
        accommodation: "Guest House",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Jyotirlinga Darshan & Boat Ride",
        description:
          "Morning darshan at Omkareshwar temple, boat circumambulation of island.",
        accommodation: "Guest House",
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 3,
        title: "Mamleshwar & Return",
        description:
          "Mamleshwar Temple visit, Narmada holy dip, drive back to Indore.",
        meals: ["Breakfast"],
      },
    ],
  },

  sp2: {
    _id: "sp2",
    title: "Badrinath Dham Yatra",
    type: "spiritual",
    difficulty: "moderate",
    destination: "Badrinath, Uttarakhand",
    duration: { days: 5, nights: 4 },
    price: 14000,
    discountedPrice: 11499,
    coverImage: "/images/trips/badrinath.jpg",
    gallery: [
      "/images/trips/badrinath.jpg",
      "/images/trips/kedarnath.jpg",
      "/images/trips/tungnath.jpg",
      "/images/trips/amarnath.jpg",
    ],
    ratingsAverage: 5.0,
    ratingsCount: 89,
    availableSeats: 10,
    altitude: "3,133 m",
    startLocation: "Haridwar",
    endLocation: "Haridwar",
    maxGroupSize: 18,
    description:
      "Badrinath — one of the Char Dham pilgrimage sites — is home to Lord Vishnu in his Badri form, flanked by the Nar-Narayan mountain ranges. The scenic journey through Devprayag, Joshimath and Mana village makes this yatra an unforgettable experience.",
    highlights: [
      "Badrinath Temple darshan",
      "Tapt Kund holy dip (natural hot spring)",
      "Mana Village – last Indian village",
      "Vasundhara Falls",
      "Confluence at Devprayag",
    ],
    inclusions: [
      "Hotel & guesthouse stays",
      "All meals",
      "Transport from Haridwar",
      "Guide & permits",
      "Kund bath access",
    ],
    exclusions: [
      "Flights to Haridwar",
      "Personal expenses",
      "Helicopter option",
    ],
    itinerary: [
      {
        day: 1,
        title: "Haridwar → Joshimath",
        description:
          "Drive 8 hrs via Devprayag & Rudraprayag. Evening at Joshimath.",
        accommodation: "Hotel Joshimath",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Joshimath → Badrinath",
        description:
          "Drive 45 km to Badrinath. Tapt Kund holy dip, evening darshan.",
        accommodation: "Hotel Badrinath",
        meals: ["Breakfast", "Dinner"],
        altitude: "3,133 m",
      },
      {
        day: 3,
        title: "Badrinath Darshan & Mana Village",
        description:
          "Morning darshan, visit Mana Village, Vasundhara Falls, Vyas Gufa.",
        accommodation: "Hotel Badrinath",
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 4,
        title: "Badrinath → Haridwar",
        description: "Early morning darshan, drive back to Haridwar.",
        accommodation: "Hotel Haridwar",
        meals: ["Breakfast"],
      },
      {
        day: 5,
        title: "Departure",
        description: "Morning puja at Har Ki Pauri, departure.",
        meals: ["Breakfast"],
      },
    ],
  },

  sp3: {
    _id: "sp3",
    title: "Mahakaleshwar Ujjain",
    type: "spiritual",
    difficulty: "easy",
    destination: "Ujjain, Madhya Pradesh",
    duration: { days: 2, nights: 1 },
    price: 5500,
    discountedPrice: 3999,
    coverImage: "/images/trips/ujjain.jpg",
    gallery: [
      "/images/trips/ujjain.jpg",
      "/images/trips/omkareshwar.jpg",
      "/images/trips/trimbakeshwar.jpg",
      "/images/trips/kashivishwanath.jpg",
    ],
    ratingsAverage: 4.8,
    ratingsCount: 156,
    availableSeats: 20,
    altitude: "491 m",
    startLocation: "Indore",
    endLocation: "Indore",
    maxGroupSize: 25,
    description:
      "Ujjain — the city of Mahakal — is home to the mighty Mahakaleshwar Jyotirlinga and the only south-facing Shivlinga among the 12 Jyotirlingas. The pre-dawn Bhasma Aarti is one of India's most powerful spiritual experiences.",
    highlights: [
      "Bhasma Aarti at Mahakaleshwar Temple",
      "Kal Bhairav Temple",
      "Shipra River Ghat darshan",
      "Ram Ghat evening aarti",
      "Harsiddhi Mata Temple",
    ],
    inclusions: [
      "Hotel accommodation",
      "Bhasma Aarti pass",
      "Breakfast",
      "Local guide",
      "Transport from Indore",
    ],
    exclusions: ["Flights to Indore", "Lunch & dinner", "Personal expenses"],
    itinerary: [
      {
        day: 1,
        title: "Arrive Ujjain & Temple Circuit",
        description:
          "Drive from Indore. Visit Kal Bhairav, Ram Ghat aarti, Mahakaleshwar evening darshan.",
        accommodation: "Hotel Ujjain",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Bhasma Aarti & Return",
        description:
          "Pre-dawn Bhasma Aarti (4 AM), Shipra Ghat holy dip, drive back to Indore.",
        meals: ["Breakfast"],
      },
    ],
  },

  sp4: {
    _id: "sp4",
    title: "Somnath Temple Yatra",
    type: "spiritual",
    difficulty: "easy",
    destination: "Somnath, Gujarat",
    duration: { days: 3, nights: 2 },
    price: 9500,
    discountedPrice: 7499,
    coverImage: "/images/trips/somnath.jpg",
    gallery: [
      "/images/trips/somnath.jpg",
      "/images/trips/nageswar.jpg",
      "/images/trips/ujjain.jpg",
      "/images/trips/omkareshwar.jpg",
    ],
    ratingsAverage: 4.9,
    ratingsCount: 132,
    availableSeats: 18,
    altitude: "Sea Level",
    startLocation: "Rajkot",
    endLocation: "Rajkot",
    maxGroupSize: 22,
    description:
      "Somnath — the first and most glorious of the 12 Jyotirlingas — stands majestically on the Arabian Sea coast in Gujarat. This yatra also covers Dwarka (one of the four Char Dhams), Nageshwar Jyotirlinga and the beautiful Gir forests.",
    highlights: [
      "Somnath Jyotirlinga darshan",
      "Sound & Light show at Somnath",
      "Nageshwar Jyotirlinga",
      "Dwarka Dwarkadhish Temple",
      "Arabian Sea coastal sunset",
    ],
    inclusions: [
      "Hotel accommodation",
      "All meals",
      "Transport",
      "Guide",
      "Entry passes",
    ],
    exclusions: ["Flights to Rajkot", "Personal expenses"],
    itinerary: [
      {
        day: 1,
        title: "Rajkot → Somnath",
        description:
          "Drive 220 km to Somnath. Evening darshan and Sound & Light show.",
        accommodation: "Hotel Somnath",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Somnath → Nageshwar → Dwarka",
        description:
          "Nageshwar Jyotirlinga darshan, drive to Dwarka, Dwarkadhish temple.",
        accommodation: "Hotel Dwarka",
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 3,
        title: "Dwarka Darshan & Return",
        description: "Beyt Dwarka island, morning puja, drive back to Rajkot.",
        meals: ["Breakfast"],
      },
    ],
  },

  sp5: {
    _id: "sp5",
    title: "Kashi Vishwanath Yatra",
    type: "spiritual",
    difficulty: "easy",
    destination: "Varanasi, Uttar Pradesh",
    duration: { days: 4, nights: 3 },
    price: 10500,
    discountedPrice: 8499,
    coverImage: "/images/trips/kashivishwanath.jpg",
    gallery: [
      "/images/trips/kashivishwanath.jpg",
      "/images/trips/somnath.jpg",
      "/images/trips/omkareshwar.jpg",
      "/images/trips/trimbakeshwar.jpg",
    ],
    ratingsAverage: 4.9,
    ratingsCount: 198,
    availableSeats: 16,
    altitude: "80 m",
    startLocation: "Varanasi",
    endLocation: "Varanasi",
    maxGroupSize: 20,
    description:
      "Varanasi — the eternal city — is home to Kashi Vishwanath, the holiest Jyotirlinga. The new Kashi Vishwanath Corridor has transformed the pilgrimage experience. This package also includes Sarnath, Ramnagar Fort and the iconic Ganga Aarti.",
    highlights: [
      "Kashi Vishwanath Jyotirlinga darshan",
      "Grand Ganga Aarti at Dashashwamedh Ghat",
      "Sunrise boat ride on the Ganges",
      "Sarnath – Dhamek Stupa",
      "Manikarnika Ghat – sacred cremation ground",
    ],
    inclusions: [
      "Ghat-view hotel",
      "All meals",
      "Boat ride",
      "Temple guide",
      "VIP darshan assistance",
    ],
    exclusions: ["Trains to Varanasi", "Personal expenses", "Camera fees"],
    itinerary: [
      {
        day: 1,
        title: "Arrive Varanasi",
        description:
          "Check in. Evening Ganga Aarti at Dashashwamedh Ghat – a mesmerizing spectacle.",
        accommodation: "Ghat Hotel",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Kashi Vishwanath Darshan",
        description:
          "Early morning mangala aarti, VIP darshan at Kashi Vishwanath Corridor.",
        accommodation: "Ghat Hotel",
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 3,
        title: "Sunrise Boat & Sarnath",
        description:
          "Dawn Ganga boat ride, Sarnath Buddhist pilgrimage, Ramnagar Fort.",
        accommodation: "Ghat Hotel",
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 4,
        title: "Final Darshan & Departure",
        description: "Morning Ganga dip, final temple visit, departure.",
        meals: ["Breakfast"],
      },
    ],
  },

  sp6: {
    _id: "sp6",
    title: "Trimbakeshwar Darshan",
    type: "spiritual",
    difficulty: "easy",
    destination: "Trimbak, Maharashtra",
    duration: { days: 2, nights: 1 },
    price: 6000,
    discountedPrice: 4499,
    coverImage: "/images/trips/trimbakeshwar.jpg",
    gallery: [
      "/images/trips/trimbakeshwar.jpg",
      "/images/trips/bhimashankar.jpg",
      "/images/trips/ujjain.jpg",
      "/images/trips/omkareshwar.jpg",
    ],
    ratingsAverage: 4.7,
    ratingsCount: 74,
    availableSeats: 22,
    altitude: "780 m",
    startLocation: "Nashik",
    endLocation: "Nashik",
    maxGroupSize: 24,
    description:
      "Trimbakeshwar is one of the 12 Jyotirlingas and the source of the sacred Godavari River. Nestled at the foothills of Brahmagiri Mountain, the temple features a unique Shivlinga with three faces representing Brahma, Vishnu and Shiva.",
    highlights: [
      "Trimbakeshwar Jyotirlinga darshan",
      "Godavari River origin at Brahmagiri",
      "Kushavarta Kund holy dip",
      "Nashik – Wine capital & Ramkund Ghat",
      "Anjneri Hill – Hanuman birthplace nearby",
    ],
    inclusions: [
      "Hotel Nashik",
      "Breakfast",
      "Transport",
      "Guide",
      "Kund entry",
    ],
    exclusions: ["Train to Nashik", "Lunch & dinner", "Personal expenses"],
    itinerary: [
      {
        day: 1,
        title: "Nashik → Trimbakeshwar",
        description:
          "Drive 28 km to Trimbakeshwar. Evening darshan and Kushavarta Kund dip.",
        accommodation: "Hotel Nashik",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Morning Darshan & Return",
        description:
          "Early morning puja, Brahmagiri origin of Godavari, return to Nashik.",
        meals: ["Breakfast"],
      },
    ],
  },

  sp7: {
    _id: "sp7",
    title: "Tungnath Chandrashila Trek",
    type: "trekking",
    difficulty: "moderate",
    destination: "Rudraprayag, Uttarakhand",
    duration: { days: 4, nights: 3 },
    price: 11500,
    discountedPrice: 8999,
    coverImage: "/images/trips/tungnath.jpg",
    gallery: [
      "/images/trips/tungnath.jpg",
      "/images/trips/kedarnath.jpg",
      "/images/trips/amarnath.jpg",
      "/images/trips/badrinath.jpg",
    ],
    ratingsAverage: 4.8,
    ratingsCount: 67,
    availableSeats: 12,
    altitude: "4,090 m",
    startLocation: "Haridwar",
    endLocation: "Haridwar",
    maxGroupSize: 14,
    description:
      "A stunning combination trek to Tungnath — the world's highest Shiva temple at 3,680 m — and Chandrashila summit at 4,090 m. Lush green alpine meadows, snow-capped peaks and a 360° panoramic sunrise from the summit make this one of India's most beautiful treks.",
    highlights: [
      "Tungnath – World's Highest Shiva Temple (3,680 m)",
      "Chandrashila Summit Sunrise (4,090 m)",
      "Chopta – Mini Switzerland of India",
      "Panoramic views of Nanda Devi & Chaukhamba",
      "Deoria Tal optional add-on",
    ],
    inclusions: [
      "Hotel & tent accommodation",
      "All meals",
      "Certified trek guide",
      "Permits",
      "Transport from Haridwar",
    ],
    exclusions: ["Train to Haridwar", "Personal expenses", "Porter charges"],
    itinerary: [
      {
        day: 1,
        title: "Haridwar → Chopta",
        description: "Drive 8 hrs to Chopta meadow. Evening walk in bugyals.",
        accommodation: "Tent Camp",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Chopta → Tungnath → Chandrashila",
        description:
          "Trek 4 km to Tungnath Temple, then 1.5 km to Chandrashila summit.",
        accommodation: "Tent Camp Chopta",
        meals: ["Breakfast", "Dinner"],
        distance: "5.5 km",
        altitude: "4,090 m",
      },
      {
        day: 3,
        title: "Sunrise at Chandrashila",
        description:
          "Pre-dawn hike for sunrise summit. Views of Kedarnath, Nanda Devi, Chaukhamba.",
        accommodation: "Tent Camp",
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 4,
        title: "Return to Haridwar",
        description: "Descend to Chopta, drive back to Haridwar.",
        meals: ["Breakfast"],
      },
    ],
  },

  sp8: {
    _id: "sp8",
    title: "Amarnath Yatra",
    type: "spiritual",
    difficulty: "challenging",
    destination: "Pahalgam, Jammu & Kashmir",
    duration: { days: 7, nights: 6 },
    price: 22000,
    discountedPrice: 18499,
    coverImage: "/images/trips/amarnath.jpg",
    gallery: [
      "/images/trips/amarnath.jpg",
      "/images/trips/kedarnath.jpg",
      "/images/trips/tungnath.jpg",
      "/images/trips/badrinath.jpg",
    ],
    ratingsAverage: 5.0,
    ratingsCount: 143,
    availableSeats: 7,
    altitude: "3,888 m",
    startLocation: "Jammu",
    endLocation: "Srinagar",
    maxGroupSize: 12,
    description:
      "The Amarnath Yatra is one of India's holiest pilgrimages — a sacred cave at 3,888 m housing a naturally formed ice Shivlinga. The trek through Kashmir's dramatic landscapes, glacial rivers and alpine meadows is both physically challenging and spiritually transformative.",
    highlights: [
      "Natural Ice Shivlinga at Amarnath Cave",
      "Pahalgam – mini Switzerland of Kashmir",
      "Sheshnag Lake camp",
      "Panchtarni meadows",
      "Kashmir valley views",
    ],
    inclusions: [
      "All accommodation (hotels & camps)",
      "All meals",
      "Yatra permits",
      "Ponies (optional)",
      "Medical support team",
      "Jammu pickup",
    ],
    exclusions: [
      "Flights to Jammu",
      "Personal expenses",
      "Helicopter to Panchtarni",
    ],
    itinerary: [
      {
        day: 1,
        title: "Jammu → Pahalgam",
        description: "Drive 5 hrs to Pahalgam. Yatra registration & rest.",
        accommodation: "Hotel Pahalgam",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Pahalgam → Chandanwari",
        description: "Drive 16 km to Chandanwari trek base. Evening at camp.",
        accommodation: "Camp Chandanwari",
        meals: ["Breakfast", "Dinner"],
        altitude: "2,895 m",
      },
      {
        day: 3,
        title: "Chandanwari → Sheshnag",
        description: "Trek 11 km through Pissu Top to Sheshnag Lake camp.",
        accommodation: "Camp Sheshnag",
        meals: ["Breakfast", "Dinner"],
        distance: "11 km",
        altitude: "3,590 m",
      },
      {
        day: 4,
        title: "Sheshnag → Panchtarni",
        description: "Trek 14 km crossing Mahagunas Top to Panchtarni.",
        accommodation: "Camp Panchtarni",
        meals: ["Breakfast", "Dinner"],
        distance: "14 km",
        altitude: "3,657 m",
      },
      {
        day: 5,
        title: "Amarnath Cave Darshan",
        description:
          "Trek 6 km to Amarnath Cave. Ice Shivlinga darshan. Return to Panchtarni.",
        accommodation: "Camp Panchtarni",
        meals: ["Breakfast", "Dinner"],
        distance: "12 km",
        altitude: "3,888 m",
      },
    ],
  },

  tr1: {
    _id: "tr1",
    title: "Tungnath Temple Trek",
    type: "trekking",
    difficulty: "moderate",
    destination: "Rudraprayag, Uttarakhand",
    duration: { days: 4, nights: 3 },
    price: 10500,
    discountedPrice: 8499,
    coverImage: "/images/trips/tungnath.jpg",
    ratingsAverage: 4.9,
    ratingsCount: 112,
    availableSeats: 14,
    altitude: "3,680 m",
    startLocation: "Haridwar",
    endLocation: "Haridwar",
    maxGroupSize: 14,
    description:
      'Tungnath is the world\'s highest Shiva temple at 3,680 m, perched amid lush Chopta meadows called the "Mini Switzerland of India". The trek is short, scenic and deeply spiritual — ideal for first-time Himalayan trekkers and Shiv devotees.',
    highlights: [
      "World's Highest Shiva Temple",
      "Chopta Bugyal green meadows",
      "Chandrashila Summit (4,090 m)",
      "Panoramic Himalayan views",
      "Rhododendron forests in bloom (Apr–May)",
    ],
    inclusions: [
      "Tent/guesthouse accommodation",
      "All meals",
      "Trek guide",
      "Permits",
      "Transport from Haridwar",
    ],
    exclusions: ["Train to Haridwar", "Personal expenses"],
    itinerary: [
      {
        day: 1,
        title: "Haridwar → Chopta",
        description: "Drive 8–9 hrs to Chopta. Arrive, rest.",
        accommodation: "Tent Camp",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Chopta → Tungnath → Chandrashila",
        description:
          "Trek 5.5 km to Chandrashila via Tungnath. Sunrise summit experience.",
        accommodation: "Tent Camp",
        meals: ["Breakfast", "Dinner"],
        distance: "5.5 km",
        altitude: "4,090 m",
      },
      {
        day: 3,
        title: "Chopta Exploration",
        description: "Forest walk, Deoria Tal lake, meadow photography.",
        accommodation: "Tent Camp",
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 4,
        title: "Return to Haridwar",
        description: "Drive back. Trek concludes.",
        meals: ["Breakfast"],
      },
    ],
  },

  tr2: {
    _id: "tr2",
    title: "Rudranath Temple Trek",
    type: "trekking",
    difficulty: "challenging",
    destination: "Chamoli, Uttarakhand",
    duration: { days: 6, nights: 5 },
    price: 14500,
    discountedPrice: 11999,
    coverImage: "/images/trips/rudranath.jpg",
    ratingsAverage: 4.8,
    ratingsCount: 73,
    availableSeats: 10,
    altitude: "3,600 m",
    startLocation: "Haridwar",
    endLocation: "Haridwar",
    maxGroupSize: 12,
    description:
      "Rudranath is the most remote and mystical of the Panch Kedar shrines. The 20 km trek through dense oak forests, alpine meadows and rocky terrain leads to the only temple where the face of Lord Shiva is worshipped. Extremely powerful spiritual energy awaits.",
    highlights: [
      "Face of Shiva worship – unique Panch Kedar",
      "Dense oak & rhododendron forests",
      "Panar Bugyal alpine meadows",
      "Pitradhar sacred pond",
      "Nandaghunti & Trishul peak views",
    ],
    inclusions: [
      "Tent & guesthouse stays",
      "All meals",
      "Experienced guide",
      "Permits & safety gear",
      "Transport from Haridwar",
    ],
    exclusions: ["Train to Haridwar", "Personal expenses", "Porter charges"],
    itinerary: [
      {
        day: 1,
        title: "Haridwar → Sagar Village",
        description: "Drive 9 hrs to Sagar Village (Rudranath base). Rest.",
        accommodation: "Guesthouse",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Sagar → Pungyar → Lyuti Bugyal",
        description: "Trek begins through forest and meadows.",
        accommodation: "Camp",
        meals: ["Breakfast", "Dinner"],
        distance: "8 km",
      },
      {
        day: 3,
        title: "Lyuti Bugyal → Rudranath",
        description: "Trek 8 km to Rudranath Temple. Shiva face darshan.",
        accommodation: "Camp Rudranath",
        meals: ["Breakfast", "Dinner"],
        distance: "8 km",
        altitude: "3,600 m",
      },
    ],
  },

  tr3: {
    _id: "tr3",
    title: "Madhyamaheshwar Temple Trek",
    type: "trekking",
    difficulty: "challenging",
    destination: "Rudraprayag, Uttarakhand",
    duration: { days: 7, nights: 6 },
    price: 15500,
    discountedPrice: 12999,
    coverImage: "/images/trips/madhyamaheswar.jpg",
    ratingsAverage: 4.9,
    ratingsCount: 58,
    availableSeats: 8,
    altitude: "3,497 m",
    startLocation: "Haridwar",
    endLocation: "Haridwar",
    maxGroupSize: 12,
    description:
      "Madhyamaheshwar, the third Panch Kedar shrine, is renowned for the navel (Nabhi) worship of Lord Shiva. The trek offers spectacular views of Chaukhamba, Kedarnath and Neelkanth peaks reflected in pristine bugyal meadows — often called the most beautiful trek in Uttarakhand.",
    highlights: [
      "Navel of Shiva worship",
      "Sunrise over Chaukhamba peaks",
      "Budha Madhyamaheshwar viewpoint",
      "Lush Markindaya Bugyal meadows",
      "Crystal-clear Madhyamaheshwar Ganga stream",
    ],
    inclusions: [
      "Tent & guesthouse accommodation",
      "All meals",
      "Guide",
      "Permits",
      "Transport from Haridwar",
    ],
    exclusions: ["Train to Haridwar", "Personal expenses", "Porter charges"],
    itinerary: [
      {
        day: 1,
        title: "Haridwar → Ukhimath → Ransi",
        description: "Drive 8 hrs to Ransi village, trek base.",
        accommodation: "Guesthouse Ransi",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Ransi → Bantoli",
        description: "Trek 8 km through forest. Reach Bantoli camp.",
        accommodation: "Camp Bantoli",
        meals: ["Breakfast", "Dinner"],
        distance: "8 km",
      },
      {
        day: 3,
        title: "Bantoli → Madhyamaheshwar",
        description: "Trek 6 km to temple. Shiva darshan. Chaukhamba views.",
        accommodation: "Camp",
        meals: ["Breakfast", "Dinner"],
        distance: "6 km",
        altitude: "3,497 m",
      },
    ],
  },

  tr4: {
    _id: "tr4",
    title: "Manimahesh Kailash Yatra",
    type: "trekking",
    difficulty: "challenging",
    destination: "Chamba, Himachal Pradesh",
    duration: { days: 5, nights: 4 },
    price: 13000,
    discountedPrice: 10499,
    coverImage: "/images/trips/manimahesh kailash.jpg",
    ratingsAverage: 4.9,
    ratingsCount: 89,
    availableSeats: 9,
    altitude: "4,080 m",
    startLocation: "Chamba",
    endLocation: "Chamba",
    maxGroupSize: 14,
    description:
      "Manimahesh Kailash (5,650 m) is believed to be the abode of Lord Shiva and Parvati. The sacred Manimahesh Lake (4,080 m) at its base is considered as holy as the Mansarovar. The trek offers raw Himalayan beauty and deep spiritual significance.",
    highlights: [
      "Manimahesh Lake holy dip",
      "Manimahesh Kailash Peak views",
      "Dal Lake en route",
      "Bharmour – ancient Chaurasi Temples",
      "Dense rhododendron & deodar forest",
    ],
    inclusions: [
      "Guesthouse & camp accommodation",
      "All meals",
      "Trek guide",
      "Transport from Chamba",
    ],
    exclusions: [
      "Travel to Chamba",
      "Personal expenses",
      "Ropeway if operational",
    ],
    itinerary: [
      {
        day: 1,
        title: "Chamba → Hadsar",
        description: "Drive 65 km to Hadsar village, trek start point.",
        accommodation: "Guesthouse",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Hadsar → Dhancho",
        description: "Trek 7 km through dense forest. Reach Dhancho camp.",
        accommodation: "Camp Dhancho",
        meals: ["Breakfast", "Dinner"],
        distance: "7 km",
      },
      {
        day: 3,
        title: "Dhancho → Manimahesh Lake",
        description: "Trek 7 km to the sacred lake. Holy dip, darshan.",
        accommodation: "Camp at Lake",
        meals: ["Breakfast", "Dinner"],
        distance: "7 km",
        altitude: "4,080 m",
      },
    ],
  },

  tr5: {
    _id: "tr5",
    title: "Kinner Kailash Circuit",
    type: "trekking",
    difficulty: "extreme",
    destination: "Kinnaur, Himachal Pradesh",
    duration: { days: 8, nights: 7 },
    price: 22000,
    discountedPrice: 18499,
    coverImage: "/images/trips/kinnuar.jpg",
    ratingsAverage: 5.0,
    ratingsCount: 46,
    availableSeats: 6,
    altitude: "4,500 m",
    startLocation: "Shimla",
    endLocation: "Shimla",
    maxGroupSize: 8,
    description:
      "Kinner Kailash (6,050 m) is the mythological winter abode of Lord Shiva. The sacred rock Shivlinga changes color three times a day — gold, white and ash. This extreme trek through the raw Kinnaur landscape is only for experienced, physically fit trekkers.",
    highlights: [
      "Sacred 79-ft natural rock Shivlinga",
      "Kinner Kailash Peak at 6,050 m",
      "Parikrama route around sacred peak",
      "Apple orchards of Kinnaur",
      "Incredible Sutlej River gorge views",
    ],
    inclusions: [
      "All accommodation",
      "All meals",
      "Experienced high-altitude guide",
      "Permits & logistics",
      "Emergency support",
    ],
    exclusions: [
      "Travel to Shimla",
      "Personal gear",
      "Travel insurance (mandatory)",
    ],
    itinerary: [
      {
        day: 1,
        title: "Shimla → Sangla",
        description: "Drive 7 hrs to Sangla valley.",
        accommodation: "Hotel Sangla",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Sangla → Chitkul",
        description:
          "Drive to Chitkul – last inhabited village on Indo-Tibet border.",
        accommodation: "Homestay",
        meals: ["Breakfast", "Dinner"],
        altitude: "3,450 m",
      },
      {
        day: 3,
        title: "Chitkul → Lamkhaga Base",
        description: "Trek begins. Cross moraine and snow fields.",
        accommodation: "Camp",
        meals: ["Breakfast", "Dinner"],
        distance: "8 km",
      },
    ],
  },

  tr6: {
    _id: "tr6",
    title: "Adi Kailash Trek",
    type: "trekking",
    difficulty: "challenging",
    destination: "Pithoragarh, Uttarakhand",
    duration: { days: 10, nights: 9 },
    price: 24500,
    discountedPrice: 19999,
    coverImage: "/images/trips/adi kailash.jpg",
    ratingsAverage: 5.0,
    ratingsCount: 61,
    availableSeats: 7,
    altitude: "5,945 m",
    startLocation: "Kathgodam",
    endLocation: "Kathgodam",
    maxGroupSize: 10,
    description:
      "Adi Kailash (6,191 m) in the Kumaon Himalayas is considered the Indian Kailash — a smaller version of Mount Kailash in Tibet. The trek through the untouched Jolingkong Valley includes the sacred Om Parvat where snowfall naturally forms the Om symbol.",
    highlights: [
      "Adi Kailash Peak views at 6,191 m",
      "Om Parvat – natural Om in snow",
      "Jolingkong Valley pristine lakes",
      "Kali River valley",
      "Tibetan border landscape",
    ],
    inclusions: [
      "All hotel & camp stays",
      "All meals",
      "Guide & porter",
      "Permits",
      "Transport from Kathgodam",
    ],
    exclusions: ["Train to Kathgodam", "Personal gear", "Insurance"],
    itinerary: [
      {
        day: 1,
        title: "Kathgodam → Dharchula",
        description: "Drive 7 hrs to Dharchula on Nepal border.",
        accommodation: "Hotel Dharchula",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Dharchula → Gunji",
        description: "Drive/trek 45 km. Enter Inner Line area.",
        accommodation: "Camp Gunji",
        meals: ["Breakfast", "Dinner"],
        altitude: "3,325 m",
      },
      {
        day: 3,
        title: "Gunji → Jolingkong (Adi Kailash)",
        description: "Trek to Jolingkong Lake with Adi Kailash views.",
        accommodation: "Camp",
        meals: ["Breakfast", "Dinner"],
        distance: "11 km",
        altitude: "4,572 m",
      },
    ],
  },

  tr7: {
    _id: "tr7",
    title: "Shrikhand Mahadev Trek",
    type: "trekking",
    difficulty: "extreme",
    destination: "Kullu, Himachal Pradesh",
    duration: { days: 5, nights: 4 },
    price: 16500,
    discountedPrice: 13499,
    coverImage: "/images/trips/shrikhand mahadev.jpg",
    ratingsAverage: 4.9,
    ratingsCount: 52,
    availableSeats: 8,
    altitude: "5,155 m",
    startLocation: "Bhuntar",
    endLocation: "Bhuntar",
    maxGroupSize: 10,
    description:
      "Shrikhand Mahadev is a 75-ft natural rock Shivlinga at 5,155 m above sea level — one of the toughest and most revered pilgrimages in Himachal Pradesh. The 32 km trek involves crossing snowfields, glaciers and extreme altitude terrain.",
    highlights: [
      "75-ft natural rock Shivlinga at 5,155 m",
      "Parvati Bagh alpine garden",
      "Kaali Ganga crossing",
      "Panoramic Himalayan views",
      "Extreme altitude challenge",
    ],
    inclusions: [
      "Camp stays",
      "All meals",
      "Experienced guide",
      "Safety ropes & equipment",
      "Transport from Bhuntar",
    ],
    exclusions: ["Travel to Bhuntar", "Personal gear", "Insurance (mandatory)"],
    itinerary: [
      {
        day: 1,
        title: "Bhuntar → Bagipul → Jao",
        description: "Drive 2 hrs to Jao village. Trek 4 km to base camp.",
        accommodation: "Camp Jao",
        meals: ["Dinner"],
        distance: "4 km",
      },
      {
        day: 2,
        title: "Jao → Thachru",
        description: "Trek 8 km through forest. Reach Thachru.",
        accommodation: "Camp Thachru",
        meals: ["Breakfast", "Dinner"],
        distance: "8 km",
      },
      {
        day: 3,
        title: "Thachru → Bheem Dwar → Shrikhand",
        description: "Summit day. Cross Parvati Bagh, reach Shivlinga.",
        accommodation: "Camp Thachru",
        meals: ["Breakfast", "Dinner"],
        distance: "16 km",
        altitude: "5,155 m",
      },
    ],
  },

  tr8: {
    _id: "tr8",
    title: "Amarnath Temple Trek",
    type: "trekking",
    difficulty: "challenging",
    destination: "Pahalgam, Jammu & Kashmir",
    duration: { days: 6, nights: 5 },
    price: 20000,
    discountedPrice: 16499,
    coverImage: "/images/trips/amarnath.jpg",
    ratingsAverage: 5.0,
    ratingsCount: 134,
    availableSeats: 10,
    altitude: "3,888 m",
    startLocation: "Srinagar",
    endLocation: "Srinagar",
    maxGroupSize: 14,
    description:
      "The Amarnath Temple trek via the classic Pahalgam route is the grandest Himalayan pilgrimage — 48 km through Kashmir's most stunning glacial landscapes to the sacred cave housing the natural ice Shivlinga. A once-in-a-lifetime adventure for the devoted trekker.",
    highlights: [
      "Natural Ice Shivlinga at Amarnath Cave",
      "Sheshnag Lake glacial camp",
      "Mahagunas Pass at 4,890 m",
      "Panchtarni alpine meadows",
      "Kashmir Valley beauty",
    ],
    inclusions: [
      "All camps & guesthouses",
      "All meals",
      "Trek guide & support team",
      "Yatra permits & registration",
      "Medical support",
    ],
    exclusions: [
      "Flights to Srinagar",
      "Personal gear",
      "Helicopter option",
      "Insurance",
    ],
    itinerary: [
      {
        day: 1,
        title: "Srinagar → Pahalgam",
        description: "Drive 95 km to Pahalgam. Yatra registration.",
        accommodation: "Hotel Pahalgam",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Pahalgam → Chandanwari",
        description: "Trek/drive to Chandanwari.",
        accommodation: "Camp",
        meals: ["Breakfast", "Dinner"],
        altitude: "2,895 m",
      },
      {
        day: 3,
        title: "Chandanwari → Sheshnag",
        description: "Trek 11 km via Pissu Top.",
        accommodation: "Camp Sheshnag",
        meals: ["Breakfast", "Dinner"],
        distance: "11 km",
        altitude: "3,590 m",
      },
      {
        day: 4,
        title: "Sheshnag → Panchtarni",
        description: "Trek 14 km over Mahagunas Pass.",
        accommodation: "Camp Panchtarni",
        meals: ["Breakfast", "Dinner"],
        distance: "14 km",
        altitude: "3,657 m",
      },
      {
        day: 5,
        title: "Amarnath Cave Darshan",
        description: "Trek 6 km to cave. Ice Shivlinga darshan. Return.",
        accommodation: "Camp Panchtarni",
        meals: ["Breakfast", "Dinner"],
        distance: "12 km",
        altitude: "3,888 m",
      },
      {
        day: 6,
        title: "Return to Srinagar",
        description: "Trek/drive back. Trip concludes.",
        meals: ["Breakfast"],
      },
    ],
  },

  tr9: {
    _id: "tr9",
    title: "Neelkanth Mahadev Trek",
    type: "trekking",
    difficulty: "moderate",
    destination: "Rishikesh, Uttarakhand",
    duration: { days: 3, nights: 2 },
    price: 8500,
    discountedPrice: 6999,
    coverImage: "/images/trips/neelkanth.jpg",
    ratingsAverage: 4.8,
    ratingsCount: 96,
    availableSeats: 16,
    altitude: "1,675 m",
    startLocation: "Rishikesh",
    endLocation: "Rishikesh",
    maxGroupSize: 16,
    description:
      "A beautiful forest trek from Rishikesh to Neelkanth Mahadev Temple — where Lord Shiva drank the poison (halahal) during the churning of the ocean. The 3 km jungle trail through dense sal forests is beginner-friendly and profoundly spiritual.",
    highlights: [
      "Neelkanth Mahadev Temple darshan",
      "Dense Sal forest trail",
      "Ganga valley panoramic views",
      "Rishikesh ashrams & ghats",
      "Sunset meditation at the summit",
    ],
    inclusions: [
      "Rishikesh hotel",
      "Breakfast",
      "Trek guide",
      "Transport to trailhead",
    ],
    exclusions: ["Train to Rishikesh", "Lunch & dinner", "Personal expenses"],
    itinerary: [
      {
        day: 1,
        title: "Arrive Rishikesh & Ganga Aarti",
        description: "Check in. Evening Ganga Aarti at Triveni Ghat.",
        accommodation: "Hotel Rishikesh",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Neelkanth Temple Trek",
        description:
          "Trek 3 km through forest to Neelkanth Mahadev Temple. Shiva darshan.",
        accommodation: "Hotel Rishikesh",
        meals: ["Breakfast", "Dinner"],
        distance: "3 km",
        altitude: "1,675 m",
      },
      {
        day: 3,
        title: "Yoga & Departure",
        description: "Morning yoga on Ganga ghats, breakfast, departure.",
        meals: ["Breakfast"],
      },
    ],
  },

  sl1: {
    _id: "sl1",
    title: "Tungnath + Chandrashila Solo",
    type: "solo",
    difficulty: "moderate",
    destination: "Rudraprayag, Uttarakhand",
    duration: { days: 4, nights: 3 },
    price: 9500,
    discountedPrice: 7499,
    coverImage: "/images/trips/tungnath.jpg",
    ratingsAverage: 5.0,
    ratingsCount: 187,
    availableSeats: 15,
    altitude: "4,090 m",
    startLocation: "Haridwar",
    endLocation: "Haridwar",
    maxGroupSize: 1,
    description:
      "The perfect solo Shiv bhakt trek — short, stunning and deeply sacred. Tungnath is the world's highest Shiva temple (3,680 m) surrounded by lush green Chopta meadows. The sunrise from Chandrashila (4,090 m) over Kedarnath, Nanda Devi and Chaukhamba peaks is life-changing.",
    highlights: [
      "World's Highest Shiva Temple",
      "Solo sunrise at Chandrashila (4,090 m)",
      "Lush green Chopta Bugyal",
      "360° Himalayan panorama",
      "Safe & beginner-friendly solo trek",
    ],
    inclusions: [
      "Tent camp accommodation",
      "All meals",
      "Dedicated solo guide",
      "Permits",
      "Transport from Haridwar",
    ],
    exclusions: ["Train to Haridwar", "Personal expenses"],
    itinerary: [
      {
        day: 1,
        title: "Haridwar → Chopta",
        description:
          "Drive 8 hrs to Chopta. Arrive, settle in. Sunset in the meadow.",
        accommodation: "Tent Camp",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Tungnath Temple Darshan",
        description:
          "Trek 3.5 km to Tungnath Temple. Shiva darshan. Return to Chopta.",
        accommodation: "Tent Camp",
        meals: ["Breakfast", "Dinner"],
        distance: "7 km",
        altitude: "3,680 m",
      },
      {
        day: 3,
        title: "Chandrashila Summit Sunrise",
        description:
          "Pre-dawn hike to Chandrashila. Sunrise meditation at 4,090 m.",
        accommodation: "Tent Camp",
        meals: ["Breakfast", "Dinner"],
        altitude: "4,090 m",
      },
      {
        day: 4,
        title: "Return to Haridwar",
        description: "Morning meadow walk, drive back. Solo journey completes.",
        meals: ["Breakfast"],
      },
    ],
  },

  sl2: {
    _id: "sl2",
    title: "Kedarnath + Vasuki Tal Solo",
    type: "solo",
    difficulty: "challenging",
    destination: "Rudraprayag, Uttarakhand",
    duration: { days: 6, nights: 5 },
    price: 13500,
    discountedPrice: 10999,
    coverImage: "/images/trips/kedarnath.jpg",
    ratingsAverage: 5.0,
    ratingsCount: 214,
    availableSeats: 10,
    altitude: "4,150 m",
    startLocation: "Haridwar",
    endLocation: "Haridwar",
    maxGroupSize: 1,
    description:
      "A soul-stirring solo pilgrimage combining Kedarnath darshan with the hidden gem of Vasuki Tal — a pristine alpine lake at 4,150 m offering breathtaking views of Kedarnath Peak. Vasuki Tal is one of the best-kept secrets of the Garhwal Himalayas.",
    highlights: [
      "Kedarnath Temple – powerful Jyotirlinga",
      "Vasuki Tal hidden alpine lake",
      "Solo trekking in sacred silence",
      "Bhairavnath Temple view point",
      "Kedarnath glacier close-up",
    ],
    inclusions: [
      "Guesthouse & tent accommodation",
      "All meals",
      "Solo-dedicated guide",
      "Permits & safety gear",
      "Transport from Haridwar",
    ],
    exclusions: ["Train to Haridwar", "Personal expenses", "Pony/helicopter"],
    itinerary: [
      {
        day: 1,
        title: "Haridwar → Gaurikund",
        description:
          "Drive to Gaurikund. Acclimatize. Evening puja at Gauri temple.",
        accommodation: "Guesthouse",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Gaurikund → Kedarnath",
        description: "Trek 14 km to Kedarnath. Evening aarti at Jyotirlinga.",
        accommodation: "Guesthouse Kedarnath",
        meals: ["Breakfast", "Dinner"],
        distance: "14 km",
        altitude: "3,583 m",
      },
      {
        day: 3,
        title: "Kedarnath → Vasuki Tal",
        description:
          "Trek 8 km to Vasuki Tal (4,150 m). Pristine lake views of Kedarnath Peak.",
        accommodation: "Camp Vasuki Tal",
        meals: ["Breakfast", "Dinner"],
        distance: "8 km",
        altitude: "4,150 m",
      },
      {
        day: 4,
        title: "Vasuki Tal Sunrise & Return",
        description:
          "Sunrise at the lake, meditate in silence, trek back to Kedarnath.",
        accommodation: "Guesthouse Kedarnath",
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 5,
        title: "Kedarnath → Gaurikund",
        description: "Final darshan, descend 14 km to Gaurikund.",
        accommodation: "Guesthouse",
        meals: ["Breakfast", "Dinner"],
        distance: "14 km",
      },
      {
        day: 6,
        title: "Return to Haridwar",
        description: "Drive back. Solo yatra concludes.",
        meals: ["Breakfast"],
      },
    ],
  },

  sl3: {
    _id: "sl3",
    title: "Rudranath Temple Solo",
    type: "solo",
    difficulty: "challenging",
    destination: "Chamoli, Uttarakhand",
    duration: { days: 5, nights: 4 },
    price: 11000,
    discountedPrice: 8999,
    coverImage: "/images/trips/rudranath.jpg",
    ratingsAverage: 4.9,
    ratingsCount: 98,
    availableSeats: 12,
    altitude: "3,600 m",
    startLocation: "Haridwar",
    endLocation: "Haridwar",
    maxGroupSize: 1,
    description:
      "Rudranath — the most remote Panch Kedar temple — is where the face of Lord Shiva is worshipped. The solo trek through dense forests and remote bugyals creates an almost mystical feeling of deep solitude and raw divine connection.",
    highlights: [
      "Face of Shiva – most mystical Panch Kedar",
      "Deep forest solo solitude",
      "Panar Bugyal meadows",
      "Nandaghunti peak views",
      "Pitradhar sacred pond",
    ],
    inclusions: [
      "Tent & guesthouse",
      "All meals",
      "Solo guide",
      "Permits",
      "Transport",
    ],
    exclusions: ["Train to Haridwar", "Personal expenses"],
    itinerary: [
      {
        day: 1,
        title: "Haridwar → Sagar Village",
        description: "Drive 9 hrs to Sagar, the trek base village.",
        accommodation: "Guesthouse",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Sagar → Pungyar",
        description: "Trek 8 km through dense oak and rhododendron forest.",
        accommodation: "Camp Pungyar",
        meals: ["Breakfast", "Dinner"],
        distance: "8 km",
      },
      {
        day: 3,
        title: "Pungyar → Rudranath",
        description:
          "Trek 8 km to Rudranath. Shiva face darshan. Incredible mountain views.",
        accommodation: "Camp Rudranath",
        meals: ["Breakfast", "Dinner"],
        distance: "8 km",
        altitude: "3,600 m",
      },
      {
        day: 4,
        title: "Rudranath → Sagar",
        description: "Full descent through forest. Camp at Sagar.",
        accommodation: "Guesthouse",
        meals: ["Breakfast", "Dinner"],
        distance: "16 km",
      },
      {
        day: 5,
        title: "Return to Haridwar",
        description: "Drive back to Haridwar. Solo trek ends.",
        meals: ["Breakfast"],
      },
    ],
  },

  sl4: {
    _id: "sl4",
    title: "Madhyamaheshwar + Budha Madhyamaheshwar",
    type: "solo",
    difficulty: "challenging",
    destination: "Rudraprayag, Uttarakhand",
    duration: { days: 7, nights: 6 },
    price: 14000,
    discountedPrice: 11499,
    coverImage: "/images/trips/madhyamaheswar.jpg",
    ratingsAverage: 4.9,
    ratingsCount: 67,
    availableSeats: 8,
    altitude: "4,200 m",
    startLocation: "Haridwar",
    endLocation: "Haridwar",
    maxGroupSize: 1,
    description:
      "A solo meditation-grade journey to Madhyamaheshwar — where Shiva's navel is worshipped — and the solitary Budha Madhyamaheshwar viewpoint. The green grasslands with Chaukhamba peak reflections and the complete silence of the high Himalayas make this the ideal meditation retreat.",
    highlights: [
      "Navel worship of Shiva – Panch Kedar",
      "Budha Madhyamaheshwar solitary viewpoint",
      "Chaukhamba peak sunrise reflections",
      "Markindaya Bugyal meadows",
      "Complete silence & deep meditation energy",
    ],
    inclusions: [
      "Tent & guesthouse",
      "All meals",
      "Solo guide",
      "Permits",
      "Transport from Haridwar",
    ],
    exclusions: ["Train to Haridwar", "Personal expenses", "Porter charges"],
    itinerary: [
      {
        day: 1,
        title: "Haridwar → Ransi",
        description: "Drive 8 hrs to Ransi village.",
        accommodation: "Guesthouse Ransi",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Ransi → Bantoli",
        description: "Trek 8 km into the forest.",
        accommodation: "Camp Bantoli",
        meals: ["Breakfast", "Dinner"],
        distance: "8 km",
      },
      {
        day: 3,
        title: "Bantoli → Madhyamaheshwar",
        description: "Trek 6 km to temple. Navel darshan. Chaukhamba views.",
        accommodation: "Camp",
        meals: ["Breakfast", "Dinner"],
        distance: "6 km",
        altitude: "3,497 m",
      },
      {
        day: 4,
        title: "Budha Madhyamaheshwar Day Hike",
        description:
          "Trek 4 km to Budha viewpoint. 360° panorama. Solo meditation.",
        accommodation: "Camp",
        meals: ["Breakfast", "Dinner"],
        altitude: "4,200 m",
      },
    ],
  },

  sl5: {
    _id: "sl5",
    title: "Kalpeshwar + Urgam Valley",
    type: "solo",
    difficulty: "easy",
    destination: "Chamoli, Uttarakhand",
    duration: { days: 3, nights: 2 },
    price: 7500,
    discountedPrice: 5999,
    coverImage: "/images/trips/tungnath.jpg",
    ratingsAverage: 4.8,
    ratingsCount: 54,
    availableSeats: 18,
    altitude: "2,200 m",
    startLocation: "Haridwar",
    endLocation: "Haridwar",
    maxGroupSize: 1,
    description:
      "Kalpeshwar is the only Panch Kedar temple accessible throughout the year, where Lord Shiva's matted hair (jata) is worshipped. The Urgam Valley surrounding it is a hidden paradise of green terraced fields, ancient stone villages and complete peace — perfect for a solo solo refresh.",
    highlights: [
      "Kalpeshwar – Hair of Shiva worship",
      "Year-round accessible Panch Kedar",
      "Urgam Valley hidden green paradise",
      "Ancient stone village life",
      "Cave-like temple approach – unique",
    ],
    inclusions: [
      "Guesthouse accommodation",
      "All meals",
      "Local guide",
      "Transport from Haridwar",
    ],
    exclusions: ["Train to Haridwar", "Personal expenses"],
    itinerary: [
      {
        day: 1,
        title: "Haridwar → Urgam Valley",
        description: "Drive 7 hrs to Urgam. Check in. Evening valley walk.",
        accommodation: "Guesthouse Urgam",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Kalpeshwar Temple Darshan",
        description:
          "Trek 2 km to Kalpeshwar. Shiva jata darshan. Explore Urgam Valley.",
        accommodation: "Guesthouse",
        meals: ["Breakfast", "Dinner"],
        distance: "2 km",
        altitude: "2,200 m",
      },
      {
        day: 3,
        title: "Return to Haridwar",
        description: "Morning meditation, breakfast, drive back.",
        meals: ["Breakfast"],
      },
    ],
  },

  sl6: {
    _id: "sl6",
    title: "Triyuginarayan Temple Solo",
    type: "solo",
    difficulty: "easy",
    destination: "Rudraprayag, Uttarakhand",
    duration: { days: 3, nights: 2 },
    price: 8000,
    discountedPrice: 6299,
    coverImage: "/images/trips/triyuginarayan.jpg",
    ratingsAverage: 4.8,
    ratingsCount: 72,
    availableSeats: 20,
    altitude: "1,980 m",
    startLocation: "Haridwar",
    endLocation: "Haridwar",
    maxGroupSize: 1,
    description:
      "Triyuginarayan is the mythological site of the wedding of Lord Shiva and Goddess Parvati, with Lord Vishnu as the officiating priest. The eternal fire (Akhand Dhuni) in front of the temple has been burning since the divine wedding — a symbol of eternal love and devotion.",
    highlights: [
      "Shiva-Parvati wedding site",
      "Eternal fire burning for three yugas",
      "Kedarnath-Badrinath route connection",
      "Quiet mountain village setting",
      "Mandakini & Soneganga confluence nearby",
    ],
    inclusions: [
      "Guesthouse accommodation",
      "All meals",
      "Guide",
      "Transport from Haridwar",
    ],
    exclusions: ["Train to Haridwar", "Personal expenses"],
    itinerary: [
      {
        day: 1,
        title: "Haridwar → Triyuginarayan",
        description:
          "Drive 7 hrs via Ukhimath. Evening temple darshan and Akhand Dhuni.",
        accommodation: "Guesthouse",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Temple & Village Exploration",
        description:
          "Morning puja, explore Brahma Shila, Rudra Kund, Vishnu Kund, and the village.",
        accommodation: "Guesthouse",
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 3,
        title: "Return to Haridwar",
        description: "Final temple visit, breakfast, drive back.",
        meals: ["Breakfast"],
      },
    ],
  },

  sl7: {
    _id: "sl7",
    title: "Jageshwar Temple Complex",
    type: "solo",
    difficulty: "easy",
    destination: "Almora, Uttarakhand",
    duration: { days: 3, nights: 2 },
    price: 6500,
    discountedPrice: 4999,
    coverImage: "/images/trips/jageshwar.jpg",
    ratingsAverage: 4.9,
    ratingsCount: 115,
    availableSeats: 22,
    altitude: "1,870 m",
    startLocation: "Kathgodam",
    endLocation: "Kathgodam",
    maxGroupSize: 1,
    description:
      "Jageshwar is one of India's most ancient and mysterious Shiva temple complexes — 124 temples from the 7th–12th century nestled inside a dense deodar cedar forest in the Kumaon Himalayas. It is believed to be the place where Shiva performed his greatest penance.",
    highlights: [
      "124 ancient stone Shiva temples",
      "Dense deodar cedar forest",
      "Laghukailash peak viewpoint",
      "Archaeological Museum",
      "Vriddha Jageshwar – old form temple",
    ],
    inclusions: [
      "Forest lodge accommodation",
      "All meals",
      "Local guide",
      "Transport from Kathgodam",
    ],
    exclusions: ["Train to Kathgodam", "Camera fees", "Personal expenses"],
    itinerary: [
      {
        day: 1,
        title: "Kathgodam → Jageshwar",
        description:
          "Drive 5 hrs to Jageshwar. Evening temple complex walk in cedar forest.",
        accommodation: "Forest Lodge",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Deep Temple Exploration",
        description:
          "All 124 temples, Dandeshwar, Mritunjay, Laghukailash viewpoint hike.",
        accommodation: "Forest Lodge",
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 3,
        title: "Vriddha Jageshwar & Return",
        description:
          "Trek 5 km to old Jageshwar, morning puja, drive back to Kathgodam.",
        meals: ["Breakfast"],
      },
    ],
  },

  sl8: {
    _id: "sl8",
    title: "Kinner Kailash Solo Expedition",
    type: "solo",
    difficulty: "extreme",
    destination: "Kinnaur, Himachal Pradesh",
    duration: { days: 9, nights: 8 },
    price: 23500,
    discountedPrice: 19999,
    coverImage: "/images/trips/kinnuar.jpg",
    ratingsAverage: 5.0,
    ratingsCount: 38,
    availableSeats: 5,
    altitude: "4,500 m",
    startLocation: "Shimla",
    endLocation: "Shimla",
    maxGroupSize: 1,
    description:
      "The most powerful solo Shiv pilgrimage in Himachal — Kinner Kailash houses a 79-ft natural rock Shivlinga that changes color three times a day. This extreme expedition through the raw Kinnaur landscape and glacial passes is reserved for the most spiritually committed adventurers.",
    highlights: [
      "79-ft natural rock Shivlinga",
      "Color-changing Shivlinga – dawn to dusk",
      "Kinnaur Kailash Peak (6,050 m)",
      "Solo extreme high-altitude challenge",
      "Inner Line Permit zone – limited access",
    ],
    inclusions: [
      "All accommodation & camps",
      "All meals",
      "High-altitude certified guide",
      "Inner Line permits",
      "Emergency support & satellite phone",
    ],
    exclusions: [
      "Travel to Shimla",
      "Personal gear",
      "Insurance (mandatory)",
      "Oxygen cylinder",
    ],
    itinerary: [
      {
        day: 1,
        title: "Shimla → Sangla",
        description: "Drive 7 hrs to Sangla Valley. Acclimatize.",
        accommodation: "Hotel Sangla",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Sangla Acclimatization",
        description: "Short valley walks, gear check, briefing.",
        accommodation: "Hotel Sangla",
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 3,
        title: "Sangla → Chitkul",
        description: "Drive to Chitkul. Last Indian village. Acclimatize.",
        accommodation: "Homestay Chitkul",
        meals: ["Breakfast", "Dinner"],
        altitude: "3,450 m",
      },
    ],
  },

  sl9: {
    _id: "sl9",
    title: "Manimahesh Kailash Solo",
    type: "solo",
    difficulty: "challenging",
    destination: "Chamba, Himachal Pradesh",
    duration: { days: 5, nights: 4 },
    price: 12500,
    discountedPrice: 9999,
    coverImage: "/images/trips/manimahesh kailash.jpg",
    ratingsAverage: 4.9,
    ratingsCount: 83,
    availableSeats: 9,
    altitude: "4,080 m",
    startLocation: "Chamba",
    endLocation: "Chamba",
    maxGroupSize: 1,
    description:
      "A solo pilgrimage to the sacred Manimahesh Lake (4,080 m) at the foot of Manimahesh Kailash (5,650 m) — Lord Shiva's abode in Himachal. The holy lake is believed to possess the power of Mansarovar. Solo trekking here in the months of September–October is a transformative experience.",
    highlights: [
      "Manimahesh Lake – as holy as Mansarovar",
      "Manimahesh Kailash Peak views",
      "Solo pilgrimage in spiritual silence",
      "Bharmour ancient Chaurasi temples",
      "Dal Lake en route",
    ],
    inclusions: [
      "Guesthouse & camp",
      "All meals",
      "Solo guide",
      "Transport from Chamba",
    ],
    exclusions: [
      "Travel to Chamba",
      "Personal expenses",
      "Ropeway if operational",
    ],
    itinerary: [
      {
        day: 1,
        title: "Chamba → Bharmour → Hadsar",
        description: "Drive 65 km to Hadsar via Bharmour ancient temples.",
        accommodation: "Guesthouse Hadsar",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Hadsar → Dhancho",
        description: "Trek 7 km through forest and stream crossings.",
        accommodation: "Camp Dhancho",
        meals: ["Breakfast", "Dinner"],
        distance: "7 km",
      },
      {
        day: 3,
        title: "Dhancho → Manimahesh Lake",
        description:
          "Trek 7 km to the holy lake. Solo holy dip, Kailash views.",
        accommodation: "Camp at Lake",
        meals: ["Breakfast", "Dinner"],
        distance: "7 km",
        altitude: "4,080 m",
      },
      {
        day: 4,
        title: "Sunrise at Manimahesh & Descent",
        description: "Sunrise meditation at the lake. Descend to Hadsar.",
        accommodation: "Guesthouse",
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 5,
        title: "Return to Chamba",
        description: "Drive via Bharmour. Solo pilgrimage completes.",
        meals: ["Breakfast"],
      },
    ],
  },

  sl10: {
    _id: "sl10",
    title: "Vishwanath Guptkashi + Hidden Trails",
    type: "solo",
    difficulty: "moderate",
    destination: "Rudraprayag, Uttarakhand",
    duration: { days: 4, nights: 3 },
    price: 9000,
    discountedPrice: 7199,
    coverImage: "/images/trips/kashivishwanath.jpg",
    ratingsAverage: 4.8,
    ratingsCount: 61,
    availableSeats: 14,
    altitude: "1,319 m",
    startLocation: "Haridwar",
    endLocation: "Haridwar",
    maxGroupSize: 1,
    description:
      "Guptkashi houses the ancient Vishwanath Temple and Ardhnarishwar Temple overlooking the magnificent Mandakini Valley. This solo trip combines temple visits with hidden local trekking trails that most tourists never discover — offering a raw, authentic Garhwali experience.",
    highlights: [
      "Vishwanath Temple Guptkashi",
      "Ardhnarishwar Temple (Shiva-Parvati)",
      "Mandakini Valley hidden trails",
      "Kashi Vishwanath replica temple",
      "Local Garhwali village life",
    ],
    inclusions: [
      "Guesthouse accommodation",
      "All meals",
      "Local guide",
      "Transport from Haridwar",
    ],
    exclusions: ["Train to Haridwar", "Personal expenses"],
    itinerary: [
      {
        day: 1,
        title: "Haridwar → Guptkashi",
        description:
          "Drive 7 hrs via Devprayag and Rudraprayag. Evening temple visit.",
        accommodation: "Guesthouse Guptkashi",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Vishwanath & Ardhnarishwar Darshan",
        description:
          "Morning puja at both temples, Mandakini Ghat, explore old Guptkashi.",
        accommodation: "Guesthouse",
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 3,
        title: "Hidden Trail Hike",
        description:
          "Local guide-led trail through Garhwali villages and forest to a secret viewpoint.",
        accommodation: "Guesthouse",
        meals: ["Breakfast", "Dinner"],
        distance: "6 km",
      },
      {
        day: 4,
        title: "Return to Haridwar",
        description:
          "Morning sunrise view of Mandakini, breakfast, drive back.",
        meals: ["Breakfast"],
      },
    ],
  },

  ntr1: {
    _id: "ntr1",
    title: "Kashmir Great Lakes Trek",
    type: "trekking",
    difficulty: "challenging",
    destination: "Sonamarg, Jammu & Kashmir",
    duration: { days: 8, nights: 7 },
    price: 22500,
    discountedPrice: 18999,
    coverImage: "/images/trips/kashmir great lakes.jpg",
    gallery: [
      "/images/trips/kashmir great lakes.jpg",
      "/images/trips/amarnath.jpg",
      "/images/trips/spiti valley.jpg",
      "/images/trips/valley of flowers.jpg",
    ],
    ratingsAverage: 5.0,
    ratingsCount: 174,
    availableSeats: 10,
    altitude: "4,250 m",
    startLocation: "Srinagar",
    endLocation: "Srinagar",
    maxGroupSize: 12,
    description:
      "The Kashmir Great Lakes Trek is widely regarded as one of the most beautiful high-altitude treks in the entire world. Traversing 70 km through the alpine wonderland of Kashmir, this trek connects seven breathtaking glacial lakes — Vishansar, Krishansar, Gadsar, Satsar, Gangabal and Nundkol — set against a backdrop of emerald meadows, snow-capped peaks and crystal-clear skies. It is a trek that permanently alters your understanding of natural beauty.",
    highlights: [
      "Seven stunning glacial lakes in one trek",
      "Vishansar & Krishansar twin lakes",
      "Gadsar Pass at 4,250 m – highest point",
      "Gangabal Lake – base of Harmukh Peak",
      "Alpine meadows of unparalleled beauty",
      "Shepherd settlements & Kashmiri culture",
      "Naranag ancient temple ruins at trailhead",
    ],
    inclusions: [
      "Tent camping throughout",
      "All meals (veg)",
      "Experienced Kashmir guide",
      "Forest & national park permits",
      "Quality sleeping bags & mats",
      "Transport from Srinagar & back",
      "Medical kit & oxygen",
    ],
    exclusions: [
      "Flights/trains to Srinagar",
      "Personal expenses",
      "Travel insurance",
      "Pony charges (optional)",
      "Porter charges (optional)",
    ],
    itinerary: [
      {
        day: 1,
        title: "Srinagar → Sonamarg → Shekdur",
        description:
          "Drive 2.5 hrs from Srinagar to Sonamarg. Continue to Shekdur village (2,756 m) — the trek begins here through alpine forests.",
        accommodation: "Camp Shekdur",
        meals: ["Dinner"],
        distance: "5 km",
        altitude: "2,756 m",
      },
      {
        day: 2,
        title: "Shekdur → Nichnai",
        description:
          "Trek 12 km through dense pine forest and open meadows crossing the Nichnai Nala stream. Reach Nichnai camp at 3,505 m.",
        accommodation: "Camp Nichnai",
        meals: ["Breakfast", "Dinner"],
        distance: "12 km",
        altitude: "3,505 m",
      },
      {
        day: 3,
        title: "Nichnai → Vishansar Lake",
        description:
          "Cross the Nichnai Pass (4,100 m). Descend to the stunning Vishansar Lake — a turquoise jewel at 3,710 m reflecting the surrounding peaks.",
        accommodation: "Camp Vishansar",
        meals: ["Breakfast", "Dinner"],
        distance: "13 km",
        altitude: "3,710 m",
      },
      {
        day: 4,
        title: "Vishansar → Krishansar → Gadsar Pass",
        description:
          "Trek to the twin Krishansar Lake, then ascend to Gadsar Pass (4,250 m) — the highest and most dramatic point of the trek. Descend to Gadsar Lake.",
        accommodation: "Camp Gadsar",
        meals: ["Breakfast", "Dinner"],
        distance: "14 km",
        altitude: "4,250 m",
      },
      {
        day: 5,
        title: "Gadsar → Satsar Lakes",
        description:
          "A relatively relaxed day walking through meadows to reach the chain of Satsar lakes — seven smaller glacial pools surrounded by wildflowers.",
        accommodation: "Camp Satsar",
        meals: ["Breakfast", "Dinner"],
        distance: "12 km",
        altitude: "3,658 m",
      },
      {
        day: 6,
        title: "Satsar → Gangabal Lake",
        description:
          "Trek to Gangabal Lake (3,576 m) — the jewel of the trek, nestled at the foot of Harmukh Peak (5,142 m). Swim in the sacred cold waters.",
        accommodation: "Camp Gangabal",
        meals: ["Breakfast", "Dinner"],
        distance: "11 km",
        altitude: "3,576 m",
      },
      {
        day: 7,
        title: "Gangabal → Naranag",
        description:
          "Final descent 13 km through ancient deodar forests to Naranag, passing the Nundkol Lake and ancient 8th-century Naranag temple ruins.",
        accommodation: "Guesthouse Naranag",
        meals: ["Breakfast", "Dinner"],
        distance: "13 km",
      },
      {
        day: 8,
        title: "Naranag → Srinagar",
        description:
          "Drive 2 hrs back to Srinagar. Trek concludes. Dal Lake evening optional.",
        meals: ["Breakfast"],
      },
    ],
  },

  ntr2: {
    _id: "ntr2",
    title: "Hampta Pass Trek",
    type: "trekking",
    difficulty: "moderate",
    destination: "Kullu, Himachal Pradesh",
    duration: { days: 6, nights: 5 },
    price: 13500,
    discountedPrice: 10999,
    coverImage: "/images/trips/hampta pass.jpg",
    gallery: [
      "/images/trips/hampta pass.jpg",
      "/images/trips/spiti valley.jpg",
      "/images/trips/manali.jpg",
      "/images/trips/valley of flowers.jpg",
    ],
    ratingsAverage: 4.8,
    ratingsCount: 143,
    availableSeats: 12,
    altitude: "4,270 m",
    startLocation: "Manali",
    endLocation: "Manali",
    maxGroupSize: 14,
    description:
      "The Hampta Pass Trek is a spectacular crossover trek that connects the lush green Kullu Valley to the barren, otherworldly moonscape of Spiti — a dramatic transition of landscapes within a single trek. Crossing Hampta Pass at 4,270 m, trekkers witness one of the sharpest contrasts in the Himalayas, from dense meadows and waterfalls to dry, stark desert mountains. A visit to the ethereal Chandratal Lake (Moon Lake) in Spiti is the cherry on top.",
    highlights: [
      "Dramatic green-to-desert landscape crossover",
      "Hampta Pass at 4,270 m",
      "Chandratal Lake (Moon Lake) overnight",
      "Beas Kund glacial stream crossing",
      "Lahaul Valley ancient villages",
      "High-altitude meadows of Jobra & Chikka",
      "Ideal for first-time high-altitude trekkers",
    ],
    inclusions: [
      "Tent camping + 1 night guesthouse",
      "All meals on trek",
      "Experienced guide & cook",
      "Camping equipment",
      "Manali pickup & Chandratal drop",
      "Permits",
    ],
    exclusions: [
      "Travel to Manali",
      "Personal trekking gear",
      "Chandratal to Manali return transport (extra)",
      "Travel insurance",
    ],
    itinerary: [
      {
        day: 1,
        title: "Manali → Jobra → Chikka",
        description:
          "Drive 35 km from Manali to Jobra (3,150 m). Trek 4 km through rhododendron forest to Chikka camp on the banks of the Rani Nala stream.",
        accommodation: "Camp Chikka",
        meals: ["Dinner"],
        distance: "4 km",
        altitude: "3,150 m",
      },
      {
        day: 2,
        title: "Chikka → Balu Ka Ghera",
        description:
          "Trek 8 km through lush meadows with the sound of rushing glacial streams. Cross the Rani Nala multiple times. Reach Balu Ka Ghera (3,600 m) — a vast sandy flat perfect for camping.",
        accommodation: "Camp Balu Ka Ghera",
        meals: ["Breakfast", "Dinner"],
        distance: "8 km",
        altitude: "3,600 m",
      },
      {
        day: 3,
        title: "Balu Ka Ghera → Hampta Pass → Shea Goru",
        description:
          "The most dramatic day. Ascend steeply to Hampta Pass (4,270 m). The moment you cross the pass, the world changes — lush green vanishes and the grey-silver Lahaul landscape unfolds. Descend to Shea Goru.",
        accommodation: "Camp Shea Goru",
        meals: ["Breakfast", "Dinner"],
        distance: "10 km",
        altitude: "4,270 m",
      },
      {
        day: 4,
        title: "Shea Goru → Chatru → Chandratal",
        description:
          "Drive from Chatru to Chandratal Lake (4,250 m) — the Moon Lake. Witness the surreal blue waters at sunset. Camp overnight by the lake.",
        accommodation: "Camp Chandratal",
        meals: ["Breakfast", "Dinner"],
        altitude: "4,250 m",
      },
      {
        day: 5,
        title: "Chandratal Sunrise & Drive to Manali",
        description:
          "Early sunrise over Chandratal — one of the most magical moments of the trek. Drive back to Manali via Rohtang Pass.",
        accommodation: "Hotel Manali",
        meals: ["Breakfast"],
      },
      {
        day: 6,
        title: "Departure from Manali",
        description: "Breakfast at leisure. Trek concludes. Depart.",
        meals: ["Breakfast"],
      },
    ],
  },

  ntr3: {
    _id: "ntr3",
    title: "Goecha La Trek",
    type: "trekking",
    difficulty: "extreme",
    destination: "Sikkim",
    duration: { days: 11, nights: 10 },
    price: 28000,
    discountedPrice: 23999,
    coverImage: "/images/trips/goecha la.jpg",
    gallery: [
      "/images/trips/goecha la.jpg",
      "/images/trips/kinnuar.jpg",
      "/images/trips/amarnath.jpg",
      "/images/trips/chadar trek.jpg",
    ],
    ratingsAverage: 4.9,
    ratingsCount: 88,
    availableSeats: 8,
    altitude: "4,940 m",
    startLocation: "Yuksom",
    endLocation: "Yuksom",
    maxGroupSize: 10,
    description:
      "Goecha La (4,940 m) is one of India's most coveted high-altitude passes, offering the closest ground-level view of Kangchenjunga — the world's third-highest mountain at 8,586 m. This 90 km trek through the Kanchenjunga National Park in Sikkim traverses dense rhododendron forests, glacial moraines, sacred lakes and high alpine passes. It demands serious fitness but rewards with views that are simply unmatched anywhere in the Indian Himalayas.",
    highlights: [
      "Closest view of Kangchenjunga (8,586 m)",
      "Goecha La Pass at 4,940 m",
      "Samiti Lake – stunning glacial lake",
      "Dzongri Top sunrise panorama",
      "Rhododendron forests of Sikkim",
      "Kanchenjunga National Park wildlife",
      "Sacred Yuksom – first capital of Sikkim",
    ],
    inclusions: [
      "All camping accommodation",
      "All meals on trek",
      "Licensed Sikkim guide",
      "National park & restricted area permits",
      "Porters included",
      "Sikkim permit assistance",
      "Transport from NJP/Gangtok",
    ],
    exclusions: [
      "Flights to Bagdogra/NJP",
      "Personal trekking gear",
      "Travel insurance (mandatory)",
      "Tips for guide & porters",
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP/Gangtok → Yuksom",
        description:
          "Drive 4–5 hrs to Yuksom (1,780 m) — the historic first capital of Sikkim. Briefing, permit check, rest.",
        accommodation: "Guesthouse Yuksom",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Yuksom → Sachen",
        description:
          "Trek 11 km through dense subtropical forest. Cross the Rathong Chu river. Reach Sachen camp.",
        accommodation: "Camp Sachen",
        meals: ["Breakfast", "Dinner"],
        distance: "11 km",
        altitude: "2,050 m",
      },
      {
        day: 3,
        title: "Sachen → Tshoka",
        description:
          "Steep climb through beautiful rhododendron forest. Occasional Khangchendzonga views. Reach Tshoka.",
        accommodation: "Camp Tshoka",
        meals: ["Breakfast", "Dinner"],
        distance: "6 km",
        altitude: "3,050 m",
      },
      {
        day: 4,
        title: "Tshoka → Dzongri",
        description:
          "Trek through spectacular rhododendron forest and open meadows. Dzongri (4,020 m) has stunning views of Kanchenjunga, Kabru and Pandim.",
        accommodation: "Camp Dzongri",
        meals: ["Breakfast", "Dinner"],
        distance: "9 km",
        altitude: "4,020 m",
      },
      {
        day: 5,
        title: "Dzongri Top Sunrise + Acclimatization",
        description:
          "Pre-dawn hike to Dzongri Top for the most spectacular sunrise over Kanchenjunga. Rest and acclimatize.",
        accommodation: "Camp Dzongri",
        meals: ["Breakfast", "Dinner"],
        altitude: "4,250 m",
      },
      {
        day: 6,
        title: "Dzongri → Thansing",
        description:
          "Trek 8 km through Precheykha La and descend to Thansing, a high altitude meadow with clear Himalayan views.",
        accommodation: "Camp Thansing",
        meals: ["Breakfast", "Dinner"],
        distance: "8 km",
        altitude: "3,930 m",
      },
      {
        day: 7,
        title: "Thansing → Lamuney → Goecha La",
        description:
          "The big summit day. Start at 3 AM. Reach Lamuney (4,250 m). Ascend to Goecha La Pass (4,940 m). Breathtaking close-up view of Kangchenjunga South Face. Return to Lamuney camp.",
        accommodation: "Camp Lamuney",
        meals: ["Breakfast", "Dinner"],
        distance: "14 km",
        altitude: "4,940 m",
      },
      {
        day: 8,
        title: "Lamuney → Samiti Lake → Thansing",
        description:
          "Visit the sacred Samiti Lake (4,200 m) — a glacial lake reflecting Kanchenjunga. Return to Thansing.",
        accommodation: "Camp Thansing",
        meals: ["Breakfast", "Dinner"],
        altitude: "4,200 m",
      },
      {
        day: 9,
        title: "Thansing → Tshoka",
        description: "Long descent through meadows and forest.",
        accommodation: "Camp Tshoka",
        meals: ["Breakfast", "Dinner"],
        distance: "17 km",
      },
      {
        day: 10,
        title: "Tshoka → Yuksom",
        description:
          "Final descent through rhododendron forest back to Yuksom.",
        accommodation: "Guesthouse Yuksom",
        meals: ["Breakfast", "Dinner"],
        distance: "17 km",
      },
      {
        day: 11,
        title: "Return to Gangtok/NJP",
        description: "Drive back. Trek ends. Kanchenjunga memories forever.",
        meals: ["Breakfast"],
      },
    ],
  },

  ntr4: {
    _id: "ntr4",
    title: "Kumara Parvatha Trek",
    type: "trekking",
    difficulty: "challenging",
    destination: "Coorg, Karnataka",
    duration: { days: 3, nights: 2 },
    price: 8500,
    discountedPrice: 6999,
    coverImage: "/images/trips/kumara parvatha.jpg",
    gallery: [
      "/images/trips/kumara parvatha.jpg",
      "/images/trips/coorg friends.jpg",
      "/images/trips/chembra peek.jpg",
      "/images/trips/netravati trek.jpg",
    ],
    ratingsAverage: 4.7,
    ratingsCount: 96,
    availableSeats: 14,
    altitude: "1,712 m",
    startLocation: "Mangalore",
    endLocation: "Mangalore",
    maxGroupSize: 14,
    description:
      "Kumara Parvatha (1,712 m), also called Pushpagiri, is the second-highest peak in Karnataka and one of the most rewarding trekking challenges in South India. The 20 km round-trip trek through the Pushpagiri Wildlife Sanctuary takes you through dense shola forests, grassland plateaus and steep rocky ridges. The summit offers a sweeping 360° panorama of the Western Ghats, Kodagu valleys and the Arabian Sea on a clear day.",
    highlights: [
      "Second-highest peak in Karnataka – 1,712 m",
      "360° panorama of Western Ghats & Arabian Sea",
      "Dense shola forest & grassland ecosystem",
      "Pushpagiri Wildlife Sanctuary",
      "Shiva temple at Bhattara Mane base",
      "Challenging rocky ridge approach",
      "Southern India's most iconic trek",
    ],
    inclusions: [
      "Forest lodge/homestay accommodation",
      "All meals",
      "Certified local guide",
      "Forest entry permits",
      "Transport from Mangalore",
    ],
    exclusions: [
      "Train/flight to Mangalore",
      "Personal trekking gear",
      "Camera fees in sanctuary",
    ],
    itinerary: [
      {
        day: 1,
        title: "Mangalore → Bhattara Mane (Kukke)",
        description:
          "Drive 3 hrs to Kukke Subramanya. Check in at Bhattara Mane, the forest homestay at the base. Evening briefing and Kukke Subramanya temple visit.",
        accommodation: "Bhattara Mane Homestay",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Kumara Parvatha Summit",
        description:
          "Early 5 AM start. Trek 9 km through shola forest, passing Batte Mane grasslands and the steep rocky ridge to Kumara Parvatha summit (1,712 m). Summit views of Kodagu, Mangalore coast and Pushpagiri. Descent back to base.",
        accommodation: "Bhattara Mane Homestay",
        meals: ["Breakfast", "Dinner"],
        distance: "18 km",
        altitude: "1,712 m",
      },
      {
        day: 3,
        title: "Return to Mangalore",
        description:
          "Morning Kukke temple darshan, local breakfast, drive back to Mangalore.",
        meals: ["Breakfast"],
      },
    ],
  },

  ntr5: {
    _id: "ntr5",
    title: "Chembra Peak Trek",
    type: "trekking",
    difficulty: "moderate",
    destination: "Wayanad, Kerala",
    duration: { days: 2, nights: 1 },
    price: 5500,
    discountedPrice: 4299,
    coverImage: "/images/trips/chembra peek.jpg",
    gallery: [
      "/images/trips/chembra peek.jpg",
      "/images/trips/kumara parvatha.jpg",
      "/images/trips/laitlum canyons.jpg",
      "/images/trips/netravati trek.jpg",
    ],
    ratingsAverage: 4.7,
    ratingsCount: 118,
    availableSeats: 16,
    altitude: "2,100 m",
    startLocation: "Calicut",
    endLocation: "Calicut",
    maxGroupSize: 16,
    description:
      "Chembra Peak (2,100 m) is the highest peak in the Wayanad district of Kerala and a beloved trekking destination for the people of South India. The trail is famous for a heart-shaped lake (Hridaya Thadakam) halfway up the mountain — a perfectly shaped natural pond that never dries up even in summer. The lush Western Ghats landscape, tea plantations and misty forests make this a truly enchanting trek.",
    highlights: [
      "Heart-shaped lake – Hridaya Thadakam",
      "Highest peak in Wayanad – 2,100 m",
      "Panoramic views of three states (Kerala, Karnataka, Tamil Nadu)",
      "Lush shola forests & grasslands",
      "Western Ghats biodiversity corridor",
      "Tea and coffee estates en route",
      "Beginner to intermediate difficulty",
    ],
    inclusions: [
      "Wayanad guesthouse accommodation",
      "All meals",
      "Forest guide (mandatory)",
      "Forest department entry permit",
      "Transport from Calicut",
    ],
    exclusions: ["Train/flight to Calicut", "Personal trekking gear", "Tips"],
    itinerary: [
      {
        day: 1,
        title: "Calicut → Kalpetta → Chembra Base",
        description:
          "Drive 2.5 hrs to Kalpetta. Check in, rest. Evening walk through tea estates. Dinner and briefing.",
        accommodation: "Wayanad Guesthouse",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Chembra Peak Summit",
        description:
          "Early 6 AM trek start from the forest checkpoint. Trek 3 km to the famous heart-shaped lake Hridaya Thadakam (1,700 m) — a perfect natural heart-shaped pond. Continue 2 km steep climb to Chembra Peak summit (2,100 m). Panoramic views of three states. Descend to base by afternoon. Drive back to Calicut.",
        meals: ["Breakfast"],
        distance: "10 km",
        altitude: "2,100 m",
      },
    ],
  },

  ntr6: {
    _id: "ntr6",
    title: "Laitlum Canyons Trek",
    type: "trekking",
    difficulty: "easy",
    destination: "Shillong, Meghalaya",
    duration: { days: 3, nights: 2 },
    price: 7000,
    discountedPrice: 5499,
    coverImage: "/images/trips/laitlum canyons.jpg",
    gallery: [
      "/images/trips/laitlum canyons.jpg",
      "/images/trips/har ki dhun.jpg",
      "/images/trips/valley of flowers.jpg",
      "/images/trips/hampta pass.jpg",
    ],
    ratingsAverage: 4.6,
    ratingsCount: 72,
    availableSeats: 18,
    altitude: "1,450 m",
    startLocation: "Shillong",
    endLocation: "Shillong",
    maxGroupSize: 18,
    description:
      'Laitlum, meaning "End of the Hills" in Khasi, is an awe-inspiring canyon on the outskirts of Shillong in Meghalaya — the Abode of Clouds. The dramatic gorge drops sharply into the valley below, offering some of the most dramatic and surreal landscapes in Northeast India. The trek is easy and perfect for nature lovers who want to experience the raw, misty beauty of Meghalaya without extreme physical challenge. Combine it with the living root bridges and Cherrapunji — the wettest place on Earth.',
    highlights: [
      "Dramatic canyon views – End of the Hills",
      "Misty Meghalaya landscape",
      "Shillong city exploration",
      "Cherrapunji & double-decker living root bridges",
      "Nohkalikai Falls – India's highest plunge waterfall",
      "Lush green Khasi Hills",
      "Unique Northeast Indian tribal culture",
    ],
    inclusions: [
      "Shillong guesthouse",
      "All meals",
      "Local Khasi guide",
      "Cherrapunji day trip",
      "Transport from Shillong",
    ],
    exclusions: [
      "Flights to Shillong/Guwahati",
      "Personal expenses",
      "Entry fees to root bridges",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive Shillong → Laitlum Canyons",
        description:
          "Arrive Shillong airport or Guwahati. Drive to hotel. Evening drive to Laitlum Canyon viewpoint for sunset — breathtaking misty gorge views.",
        accommodation: "Guesthouse Shillong",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Cherrapunji & Living Root Bridges",
        description:
          "Full-day trip to Cherrapunji (Sohra). Visit Nohkalikai Falls (340 m plunge), Seven Sisters Falls, Mawsmai Caves, and the famous double-decker living root bridges of Nongriat village (1.5 hr hike down).",
        accommodation: "Guesthouse Shillong",
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 3,
        title: "Shillong City & Departure",
        description:
          "Morning at Laitlum for sunrise, Ward's Lake, Shillong Peak viewpoint, local Khasi food market. Depart.",
        meals: ["Breakfast"],
      },
    ],
  },

  ntr7: {
    _id: "ntr7",
    title: "Har Ki Dun Trek",
    type: "trekking",
    difficulty: "moderate",
    destination: "Uttarkashi, Uttarakhand",
    duration: { days: 7, nights: 6 },
    price: 14500,
    discountedPrice: 11999,
    coverImage: "/images/trips/har ki dhun.jpg",
    gallery: [
      "/images/trips/har ki dhun.jpg",
      "/images/trips/valley of flowers.jpg",
      "/images/trips/kedarnath.jpg",
      "/images/trips/tungnath.jpg",
    ],
    ratingsAverage: 4.9,
    ratingsCount: 131,
    availableSeats: 12,
    altitude: "3,566 m",
    startLocation: "Dehradun",
    endLocation: "Dehradun",
    maxGroupSize: 14,
    description:
      "Har Ki Dun (Valley of Gods) is an ancient cradle-shaped hanging valley at 3,566 m in the Govind National Park of Uttarakhand. According to Hindu mythology, the Pandavas used this route to ascend to heaven (Swargarohini Peak). The valley is lined with ancient wooden Mahasu Devta temples, traditional Jaunpuri villages, dense deodar forests and apple orchards — offering a deeply cultural and scenic trekking experience that is largely untouched by mass tourism.",
    highlights: [
      "Har Ki Dun Valley of Gods – 3,566 m",
      "Swargarohini Peak – Pandava ascent route",
      "Ancient Mahasu Devta wooden temples",
      "Traditional Jaunpuri villages",
      "Govind Wildlife Sanctuary wildlife",
      "Ruinsara Tal glacial lake optional add-on",
      "Deodar & oak forest camping",
    ],
    inclusions: [
      "Guesthouse & tent accommodation",
      "All meals on trek",
      "Experienced guide",
      "Forest permits",
      "Transport from Dehradun",
    ],
    exclusions: [
      "Train to Dehradun",
      "Personal trekking gear",
      "Porter charges",
    ],
    itinerary: [
      {
        day: 1,
        title: "Dehradun → Sankri",
        description:
          "Drive 7 hrs to Sankri village (1,920 m) — the base camp for Har Ki Dun. Check in, evening village walk.",
        accommodation: "Guesthouse Sankri",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Sankri → Taluka → Osla",
        description:
          "Drive 12 km to Taluka (1,884 m). Trek 11 km through dense deodar forest along the Tons River bank to Osla village — home to Mahasu Devta wooden temple.",
        accommodation: "Camp Osla",
        meals: ["Breakfast", "Dinner"],
        distance: "11 km",
        altitude: "2,565 m",
      },
      {
        day: 3,
        title: "Osla → Har Ki Dun",
        description:
          "Trek 10 km through apple orchards, open meadows and ancient moraines. Arrive at the glorious Har Ki Dun valley camp at 3,566 m.",
        accommodation: "Camp Har Ki Dun",
        meals: ["Breakfast", "Dinner"],
        distance: "10 km",
        altitude: "3,566 m",
      },
      {
        day: 4,
        title: "Har Ki Dun Exploration & Ruinsara Tal Option",
        description:
          "Rest day or optional 6 km hike to Ruinsara Tal (3,900 m) — a pristine glacial lake with Swargarohini Peak reflections. Explore the valley.",
        accommodation: "Camp Har Ki Dun",
        meals: ["Breakfast", "Dinner"],
        altitude: "3,900 m",
      },
      {
        day: 5,
        title: "Har Ki Dun → Osla",
        description:
          "Trek back 10 km to Osla. Evening bonfire and cultural interaction with local Jaunpuri community.",
        accommodation: "Camp Osla",
        meals: ["Breakfast", "Dinner"],
        distance: "10 km",
      },
      {
        day: 6,
        title: "Osla → Taluka → Sankri",
        description:
          "Trek 11 km back to Taluka. Drive to Sankri. Hot dinner and rest.",
        accommodation: "Guesthouse Sankri",
        meals: ["Breakfast", "Dinner"],
        distance: "11 km",
      },
      {
        day: 7,
        title: "Sankri → Dehradun",
        description: "Drive 7 hrs back to Dehradun. Trek concludes.",
        meals: ["Breakfast"],
      },
    ],
  },

  ntr8: {
    _id: "ntr8",
    title: "Pin Parvati Pass Trek",
    type: "trekking",
    difficulty: "extreme",
    destination: "Kullu–Spiti, Himachal Pradesh",
    duration: { days: 11, nights: 10 },
    price: 30000,
    discountedPrice: 25499,
    coverImage: "/images/trips/pin parwati trek.jpg",
    gallery: [
      "/images/trips/pin parwati trek.jpg",
      "/images/trips/spiti valley.jpg",
      "/images/trips/hampta pass.jpg",
      "/images/trips/chadar trek.jpg",
    ],
    ratingsAverage: 5.0,
    ratingsCount: 62,
    availableSeats: 6,
    altitude: "5,319 m",
    startLocation: "Manali",
    endLocation: "Kaza (Spiti)",
    maxGroupSize: 8,
    description:
      "Pin Parvati Pass (5,319 m) is one of the most remote, challenging and spectacular high-altitude crossings in all of India. This legendary 110 km trans-Himalayan trek connects the lush Parvati Valley of Kullu to the barren, high-altitude desert of Spiti — crossing the pass that sits at 5,319 m above sea level with permanent snow and glaciers. Only experienced high-altitude trekkers with previous 4,500 m+ experience should attempt this breathtaking crossing. The contrast between the verdant Parvati side and the stark Tibetan landscape of Spiti is deeply dramatic.",
    highlights: [
      "Pin Parvati Pass at 5,319 m",
      "Complete green-to-desert landscape transition",
      "Mantalai Lake – sacred Shiva lake at 4,000 m",
      "Parvati Valley & Kheerganga hot springs",
      "Pin Valley National Park, Spiti",
      "Snow leopard territory",
      "One of India's toughest & most remote treks",
    ],
    inclusions: [
      "All camping on the route",
      "All meals (veg)",
      "Experienced high-altitude guide",
      "Support trekking staff & mule support",
      "All permits (both Kullu & Spiti)",
      "Emergency satellite communication",
      "Oxygen support & medical kit",
    ],
    exclusions: [
      "Travel to Manali & from Kaza",
      "Personal high-altitude gear (mandatory)",
      "Travel insurance (mandatory)",
      "Helicopter rescue charges (if needed)",
    ],
    itinerary: [
      {
        day: 1,
        title: "Manali → Kasol → Barsheni",
        description:
          "Drive to Barsheni (2,200 m) — the trek starting point in Parvati Valley. Briefing and gear check.",
        accommodation: "Guesthouse Barsheni",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Barsheni → Kheerganga",
        description:
          "Trek 12 km through forest to Kheerganga (2,950 m) — famous for its natural hot water spring. Soak in the healing springs overnight.",
        accommodation: "Camp Kheerganga",
        meals: ["Breakfast", "Dinner"],
        distance: "12 km",
        altitude: "2,950 m",
      },
      {
        day: 3,
        title: "Kheerganga → Tunda Bhuj",
        description:
          "Trek 11 km through open alpine meadows. Cross several streams. Camp at Tunda Bhuj.",
        accommodation: "Camp Tunda Bhuj",
        meals: ["Breakfast", "Dinner"],
        distance: "11 km",
        altitude: "3,350 m",
      },
      {
        day: 4,
        title: "Tunda Bhuj → Thakur Kuan",
        description:
          "Trek into the upper valley, increasingly remote. Dense boulder terrain. Reach Thakur Kuan camp.",
        accommodation: "Camp Thakur Kuan",
        meals: ["Breakfast", "Dinner"],
        distance: "10 km",
        altitude: "3,650 m",
      },
      {
        day: 5,
        title: "Thakur Kuan → Mantalai Lake",
        description:
          "Trek to the sacred Mantalai Lake (4,050 m) — Lord Shiva's cosmic lake in Hindu mythology. Camp by this sacred, serene lake.",
        accommodation: "Camp Mantalai",
        meals: ["Breakfast", "Dinner"],
        distance: "9 km",
        altitude: "4,050 m",
      },
      {
        day: 6,
        title: "Mantalai → Odi Thach (Pass Base)",
        description:
          "Approach the pass. Trek across glacial terrain to the high camp at 4,600 m.",
        accommodation: "Camp Odi Thach",
        meals: ["Breakfast", "Dinner"],
        distance: "8 km",
        altitude: "4,600 m",
      },
      {
        day: 7,
        title: "Pin Parvati Pass – Summit Day",
        description:
          "The epic summit day. Start 3 AM. Cross Pin Parvati Pass (5,319 m). The transition from green Kullu to grey Spiti happens in one step. Descend into Pin Valley on the Spiti side. Camp at Tiya.",
        accommodation: "Camp Tiya (Spiti)",
        meals: ["Breakfast", "Dinner"],
        distance: "12 km",
        altitude: "5,319 m",
      },
      {
        day: 8,
        title: "Tiya → Mudh Village",
        description:
          "Trek down through the spectacular Pin Valley, dotted with wild yaks and snow leopard territory. Reach Mudh, the first inhabited village of Spiti.",
        accommodation: "Homestay Mudh",
        meals: ["Breakfast", "Dinner"],
        distance: "15 km",
        altitude: "3,750 m",
      },
      {
        day: 9,
        title: "Mudh → Sagnam → Attargo",
        description:
          "Trek out of Pin Valley. Pass ancient Buddhist gompa. Drive option available for final stretch.",
        accommodation: "Camp/Guesthouse",
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 10,
        title: "Attargo → Kaza",
        description:
          "Drive to Kaza — the largest town in Spiti. Celebrate the completion of this incredible crossing.",
        accommodation: "Hotel Kaza",
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 11,
        title: "Kaza Exploration & Departure",
        description:
          "Key Monastery, Kibber village (optional). Depart for Manali or Shimla.",
        meals: ["Breakfast"],
      },
    ],
  },

  ntr9: {
    _id: "ntr9",
    title: "Hemkund Sahib Trek",
    type: "trekking",
    difficulty: "challenging",
    destination: "Chamoli, Uttarakhand",
    duration: { days: 5, nights: 4 },
    price: 12000,
    discountedPrice: 9799,
    coverImage: "/images/trips/hemkund sahib.jpg",
    gallery: [
      "/images/trips/hemkund sahib.jpg",
      "/images/trips/valley of flowers.jpg",
      "/images/trips/badrinath.jpg",
      "/images/trips/kedarnath.jpg",
    ],
    ratingsAverage: 4.9,
    ratingsCount: 109,
    availableSeats: 10,
    altitude: "4,329 m",
    startLocation: "Haridwar",
    endLocation: "Haridwar",
    maxGroupSize: 12,
    description:
      "Hemkund Sahib is one of the highest Gurudwaras in the world at 4,329 m, situated on the shores of a glacial lake in the Chamoli district of Uttarakhand. It is a sacred pilgrimage site for both Sikhs and Hindus. The trek from Ghangaria to Hemkund Sahib is one of the most spiritually powerful climbs in the Himalayas, and is often combined with the nearby Valley of Flowers — a UNESCO World Heritage Site. The blue lake reflecting the surrounding snow peaks and the Gurudwara's golden dome is an unforgettable sight.",
    highlights: [
      "Hemkund Sahib Gurudwara at 4,329 m",
      "Sacred glacial lake at Hemkund",
      "Valley of Flowers UNESCO Heritage Site",
      "Ghangaria base camp",
      "Govindghat Gurudwara & langar",
      "Nanda Devi National Park",
      "Breathtaking alpine meadow scenery",
    ],
    inclusions: [
      "Hotel & Gurudwara dharamshala stays",
      "All meals (langar included at Gurudwara)",
      "Certified guide",
      "Forest & national park permits",
      "Transport from Haridwar",
    ],
    exclusions: [
      "Train to Haridwar",
      "Personal trekking gear",
      "Porter/pony charges",
    ],
    itinerary: [
      {
        day: 1,
        title: "Haridwar → Govindghat",
        description:
          "Drive 8 hrs from Haridwar to Govindghat (1,828 m). Check in. Evening Gurudwara visit and langar.",
        accommodation: "Guesthouse Govindghat",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Govindghat → Ghangaria",
        description:
          "Trek or take mule 13 km from Govindghat to Ghangaria (3,050 m) — the base for both Hemkund Sahib and Valley of Flowers. Steep and forested.",
        accommodation: "Guesthouse Ghangaria",
        meals: ["Breakfast", "Dinner"],
        distance: "13 km",
        altitude: "3,050 m",
      },
      {
        day: 3,
        title: "Ghangaria → Hemkund Sahib",
        description:
          "Trek 6 km steeply uphill to Hemkund Sahib (4,329 m). The sacred lake surrounded by seven snow peaks is breathtaking. Gurudwara darshan, holy dip in the ice-cold lake. Return to Ghangaria.",
        accommodation: "Guesthouse Ghangaria",
        meals: ["Breakfast", "Dinner"],
        distance: "12 km",
        altitude: "4,329 m",
      },
      {
        day: 4,
        title: "Valley of Flowers",
        description:
          "Trek 4 km into the magical Valley of Flowers — 87 sq km of alpine meadow covered with hundreds of Himalayan wildflower species. A UNESCO World Heritage Site of extraordinary beauty.",
        accommodation: "Guesthouse Ghangaria",
        meals: ["Breakfast", "Dinner"],
        distance: "8 km",
        altitude: "3,658 m",
      },
      {
        day: 5,
        title: "Ghangaria → Govindghat → Haridwar",
        description:
          "Descend 13 km to Govindghat. Drive back to Haridwar. Trek concludes.",
        meals: ["Breakfast"],
        distance: "13 km",
      },
    ],
  },

  ntr10: {
    _id: "ntr10",
    title: "Netravati Peak Trek",
    type: "trekking",
    difficulty: "challenging",
    destination: "Chikmagalur, Karnataka",
    duration: { days: 4, nights: 3 },
    price: 9500,
    discountedPrice: 7799,
    coverImage: "/images/trips/netravati trek.jpg",
    gallery: [
      "/images/trips/netravati trek.jpg",
      "/images/trips/kumara parvatha.jpg",
      "/images/trips/chembra peek.jpg",
      "/images/trips/coorg friends.jpg",
    ],
    ratingsAverage: 4.8,
    ratingsCount: 54,
    availableSeats: 14,
    altitude: "1,516 m",
    startLocation: "Mangalore",
    endLocation: "Mangalore",
    maxGroupSize: 14,
    description:
      "Netravati Peak (1,516 m) is a hidden gem of the Western Ghats, located near Belthangady in the Dakshina Kannada district. The trek starts from the Dharga waterfalls area and winds through dense shola forests of the Western Ghats into a pristine biodiversity hotspot. Unlike the more commercialized peaks of South India, Netravati remains refreshingly raw and uncrowded. The route reveals stunning valley panoramas, massive rock faces, perennial streams and an incredible range of endemic flora and fauna of the Ghats ecosystem.",
    highlights: [
      "Netravati Peak – 1,516 m summit",
      "Pristine Western Ghats biodiversity hotspot",
      "Dharga & Onake Abbi waterfalls",
      "Shola forest ecosystem",
      "Endemic wildlife – Malabar hornbill, lion-tailed macaque",
      "Uncrowded & raw natural trail",
      "Dakshina Kannada coastal landscape views",
    ],
    inclusions: [
      "Forest guesthouse accommodation",
      "All meals",
      "Certified local forest guide",
      "Forest department permits",
      "Transport from Mangalore",
    ],
    exclusions: [
      "Travel to Mangalore",
      "Personal trekking gear",
      "Wildlife photography permits (extra)",
    ],
    itinerary: [
      {
        day: 1,
        title: "Mangalore → Belthangady → Dharga",
        description:
          "Drive 2.5 hrs to Belthangady. Check in at forest guesthouse near Dharga. Evening nature walk to Dharga waterfall.",
        accommodation: "Forest Guesthouse",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Netravati Peak Ascent",
        description:
          "Early 5:30 AM start. Trek 7 km through shola forest, crossing rocky ridges and perennial streams. Summit Netravati Peak (1,516 m) by mid-morning. Panoramic coastal views. Descend to base by afternoon. Rest.",
        accommodation: "Forest Guesthouse",
        meals: ["Breakfast", "Dinner"],
        distance: "14 km",
        altitude: "1,516 m",
      },
      {
        day: 3,
        title: "Onake Abbi Waterfall & Nature Trail",
        description:
          "Half-day trek to the dramatic Onake Abbi waterfall — a powerful single-drop waterfall deep in the forest. Afternoon rest and birdwatching session.",
        accommodation: "Forest Guesthouse",
        meals: ["Breakfast", "Dinner"],
      },
      {
        day: 4,
        title: "Return to Mangalore",
        description:
          "Morning at leisure. Drive back to Mangalore with memories of the untouched Western Ghats.",
        meals: ["Breakfast"],
      },
    ],
  },
};

const difficultyColors = {
  easy: "#10B981",
  moderate: "#F4C542",
  challenging: "#FF6B35",
  extreme: "#EF4444",
};

const TripDetailPage = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const trip = MOCK_TRIPS[id];
  const [activeImg, setActiveImg] = React.useState(0);
  const [selectedDate, setSelectedDate] = React.useState(
    trip?.availableDates?.[0] || null,
  );

  // Not found fallback
  if (!trip) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0F1337",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          paddingTop: "4rem",
        }}
      >
        <div style={{ fontSize: "5rem" }}>🏔️</div>
        <h1
          style={{
            fontFamily: "Outfit",
            fontSize: "2.5rem",
            fontWeight: 900,
            color: "#fff",
          }}
        >
          Trip Not Found
        </h1>
        <p style={{ color: "#9CA3AF" }}>
          This journey doesn't exist yet. Explore our other adventures.
        </p>
        <Link to="/trips" className="btn-primary" style={{ marginTop: "1rem" }}>
          ← Explore All Trips
        </Link>
      </div>
    );
  }

  const handleBook = () => {
    if (!isAuthenticated) {
      toast.error("Please login to book a trip");
      navigate("/login");
      return;
    }
    navigate(`/book/${trip._id}${selectedDate ? `?date=${selectedDate}` : ""}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0F1337",
        paddingTop: "4.5rem",
      }}
    >
      {/* Hero Image with gallery thumbnails */}
      <div
        style={{ position: "relative", height: "520px", overflow: "hidden" }}
      >
        <img
          src={(trip.gallery && trip.gallery[activeImg]) || trip.coverImage}
          alt={trip.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "opacity 0.4s",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(15,19,55,0.2), rgba(15,19,55,0.92))",
          }}
        />

        {/* Gallery thumbnails */}
        {trip.gallery && trip.gallery.length > 1 && (
          <div
            style={{
              position: "absolute",
              bottom: "7.5rem",
              right: "1.5rem",
              display: "flex",
              gap: "0.5rem",
              flexDirection: "column",
            }}
          >
            {trip.gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                style={{
                  width: "52px",
                  height: "40px",
                  borderRadius: "6px",
                  overflow: "hidden",
                  border:
                    activeImg === i
                      ? "2px solid #FF6B35"
                      : "2px solid rgba(255,255,255,0.25)",
                  padding: 0,
                  cursor: "pointer",
                  background: "none",
                  opacity: activeImg === i ? 1 : 0.6,
                  transition: "all 0.2s",
                }}
              >
                <img
                  src={img}
                  alt={`view ${i + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </button>
            ))}
          </div>
        )}

        <div
          className="container"
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                marginBottom: "0.75rem",
                flexWrap: "wrap",
              }}
            >
              <span className="badge badge-saffron">🏔️ {trip.type}</span>
              <span
                style={{
                  padding: "0.25rem 0.75rem",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  background: `${difficultyColors[trip.difficulty]}22`,
                  color: difficultyColors[trip.difficulty],
                  border: `1px solid ${difficultyColors[trip.difficulty]}55`,
                }}
              >
                {trip.difficulty}
              </span>
            </div>
            <h1
              style={{
                fontFamily: "Outfit",
                fontSize: "clamp(1.75rem, 4vw, 3rem)",
                fontWeight: 900,
                color: "#fff",
                marginBottom: "0.5rem",
              }}
            >
              {trip.title}
            </h1>
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                color: "#CBD5E1",
                fontSize: "0.9rem",
                flexWrap: "wrap",
              }}
            >
              <span>📍 {trip.destination}</span>
              <span>
                ⏱ {trip.duration.days}D/{trip.duration.nights}N
              </span>
              <span>👥 Max {trip.maxGroupSize} people</span>
              <span>🏔 {trip.altitude}</span>
              <span>
                ★ {trip.ratingsAverage} ({trip.ratingsCount} reviews)
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <div
        className="container"
        style={{ paddingTop: "2.5rem", paddingBottom: "5rem" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 360px",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {/* Left */}
          <div>
            <div
              className="glass"
              style={{ padding: "2rem", marginBottom: "1.5rem" }}
            >
              <h2
                style={{
                  fontFamily: "Outfit",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "1rem",
                }}
              >
                About This Trip
              </h2>
              <p style={{ color: "#CBD5E1", lineHeight: 1.8 }}>
                {trip.description}
              </p>
            </div>

            <div
              className="glass"
              style={{ padding: "2rem", marginBottom: "1.5rem" }}
            >
              <h2
                style={{
                  fontFamily: "Outfit",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "1rem",
                }}
              >
                ✨ Highlights
              </h2>
              <ul style={{ listStyle: "none" }}>
                {trip.highlights.map((h, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      color: "#CBD5E1",
                      marginBottom: "0.6rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    <span style={{ color: "#10B981", flexShrink: 0 }}>✓</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="glass"
              style={{ padding: "2rem", marginBottom: "1.5rem" }}
            >
              <h2
                style={{
                  fontFamily: "Outfit",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "1.25rem",
                }}
              >
                🗓 Itinerary
              </h2>
              {trip.itinerary.map((day) => (
                <div
                  key={day.day}
                  style={{
                    marginBottom: "1.25rem",
                    paddingLeft: "1rem",
                    borderLeft: "2px solid #FF6B35",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Outfit",
                      fontWeight: 700,
                      color: "#FF6B35",
                      fontSize: "0.8rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Day {day.day}
                  </div>
                  <div
                    style={{
                      fontFamily: "Outfit",
                      fontWeight: 700,
                      color: "#fff",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {day.title}
                  </div>
                  <p
                    style={{
                      color: "#9CA3AF",
                      fontSize: "0.875rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {day.description}
                  </p>
                  {day.distance && (
                    <span style={{ color: "#6B7280", fontSize: "0.78rem" }}>
                      📏 {day.distance} · 🏔 {day.altitude}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.25rem",
              }}
            >
              {[
                ["✅ Inclusions", trip.inclusions, "#10B981"],
                ["❌ Exclusions", trip.exclusions, "#EF4444"],
              ].map(([title, items, color]) => (
                <div
                  key={title}
                  className="glass"
                  style={{ padding: "1.5rem" }}
                >
                  <h3
                    style={{
                      fontFamily: "Outfit",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "#fff",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {title}
                  </h3>
                  {items.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        color: "#CBD5E1",
                        fontSize: "0.85rem",
                        marginBottom: "0.4rem",
                        display: "flex",
                        gap: "0.5rem",
                      }}
                    >
                      <span style={{ color, flexShrink: 0 }}>
                        {color === "#10B981" ? "✓" : "✗"}
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div style={{ position: "sticky", top: "6rem" }}>
            <div
              className="glass"
              style={{ padding: "2rem", borderRadius: "1.25rem" }}
            >
              <div style={{ marginBottom: "1.25rem" }}>
                {trip.discountedPrice && (
                  <div
                    style={{
                      color: "#6B7280",
                      textDecoration: "line-through",
                      fontSize: "1rem",
                    }}
                  >
                    ₹{trip.price.toLocaleString()}
                  </div>
                )}
                <div
                  style={{
                    fontFamily: "Outfit",
                    fontSize: "2.5rem",
                    fontWeight: 900,
                    color: "#FF6B35",
                    lineHeight: 1,
                  }}
                >
                  ₹{(trip.discountedPrice || trip.price).toLocaleString()}
                </div>
                <div style={{ color: "#9CA3AF", fontSize: "0.85rem" }}>
                  per person
                </div>
              </div>

              {trip.discountedPrice && (
                <div
                  style={{
                    background: "rgba(16,185,129,0.1)",
                    border: "1px solid rgba(16,185,129,0.2)",
                    borderRadius: "0.5rem",
                    padding: "0.5rem 0.75rem",
                    marginBottom: "1rem",
                    color: "#34D399",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                  }}
                >
                  🎉 Save ₹
                  {(trip.price - trip.discountedPrice).toLocaleString()} on this
                  trip!
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                  marginBottom: "1.5rem",
                }}
              >
                {[
                  [
                    "⏱ Duration",
                    `${trip.duration.days} Days / ${trip.duration.nights} Nights`,
                  ],
                  ["🪑 Seats Left", `${trip.availableSeats} available`],
                  ["🚀 Start", trip.startLocation],
                  ["🏁 End", trip.endLocation],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "#CBD5E1",
                      fontSize: "0.875rem",
                      padding: "0.5rem 0",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <span style={{ color: "#9CA3AF" }}>{label}</span>
                    <span style={{ fontWeight: 600 }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* Available dates selector */}
              <div style={{ marginBottom: "1rem" }}>
                <div
                  style={{
                    color: "#9CA3AF",
                    fontSize: "0.85rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  Available Dates
                </div>
                {trip.availableDates && trip.availableDates.length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      flexWrap: "wrap",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {trip.availableDates.map((d) => (
                      <button
                        key={d}
                        onClick={() => setSelectedDate(d)}
                        style={{
                          padding: "0.45rem 0.65rem",
                          borderRadius: "0.5rem",
                          background:
                            selectedDate === d ? "#FF6B35" : "transparent",
                          color: selectedDate === d ? "#fff" : "#CBD5E1",
                          border: "1px solid rgba(255,255,255,0.06)",
                          cursor: "pointer",
                        }}
                      >
                        {new Date(d).toLocaleDateString()}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div style={{ color: "#6B7280", marginBottom: "0.75rem" }}>
                    Dates to be announced
                  </div>
                )}
              </div>

              <button
                id="book-now-btn"
                className="btn-primary"
                onClick={handleBook}
                style={{
                  width: "100%",
                  padding: "1rem",
                  fontSize: "1rem",
                  marginBottom: "0.75rem",
                }}
              >
                🎒 Book This Trip
              </button>
              <p
                style={{
                  textAlign: "center",
                  color: "#6B7280",
                  fontSize: "0.78rem",
                }}
              >
                🔒 Safe & Secure. Free cancellation within 48 hours.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:768px){.trip-detail-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
};

export default TripDetailPage;
