import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TRIP_TYPES, DIFFICULTY_LEVELS } from "../constants";

const MOCK_TRIPS = [
  {
    _id: "1",
    title: "Kedarnath Trek",
    type: "trekking",
    difficulty: "challenging",
    destination: "Uttarakhand",
    duration: { days: 6, nights: 5 },
    price: 12500,
    discountedPrice: 9999,
    coverImage: "/images/trips/kedarnath.jpg",
    ratingsAverage: 4.9,
    ratingsCount: 128,
    availableSeats: 8,
  },
  {
    _id: "2",
    title: "Spiti Valley Expedition",
    type: "friends",
    difficulty: "moderate",
    destination: "Himachal Pradesh",
    duration: { days: 8, nights: 7 },
    price: 18000,
    coverImage: "/images/trips/spiti valley.jpg",
    ratingsAverage: 4.8,
    ratingsCount: 94,
    availableSeats: 4,
  },
  {
    _id: "3",
    title: "Solo Rishikesh Retreat",
    type: "solo",
    difficulty: "easy",
    destination: "Uttarakhand",
    duration: { days: 4, nights: 3 },
    price: 7500,
    discountedPrice: 5999,
    coverImage: "/images/trips/rishikesh.jpg",
    ratingsAverage: 4.7,
    ratingsCount: 76,
    availableSeats: 12,
  },
  {
    _id: "4",
    title: "11 Shiv Yatra Package",
    type: "spiritual",
    difficulty: "moderate",
    destination: "Pan India",
    duration: { days: 21, nights: 20 },
    price: 45000,
    discountedPrice: 38999,
    coverImage: "/images/trips/somnath.jpg",
    ratingsAverage: 5.0,
    ratingsCount: 64,
    availableSeats: 6,
  },
  {
    _id: "5",
    title: "Goa Friends Bonanza",
    type: "friends",
    difficulty: "easy",
    destination: "Goa",
    duration: { days: 5, nights: 4 },
    price: 15000,
    discountedPrice: 11999,
    coverImage: "/images/trips/goa.jpg",
    ratingsAverage: 4.6,
    ratingsCount: 112,
    availableSeats: 14,
  },
  {
    _id: "6",
    title: "Valley of Flowers Trek",
    type: "trekking",
    difficulty: "moderate",
    destination: "Uttarakhand",
    duration: { days: 7, nights: 6 },
    price: 16000,
    coverImage: "/images/trips/valley of flowers.jpg",
    ratingsAverage: 4.8,
    ratingsCount: 87,
    availableSeats: 10,
  },
  {
    _id: "7",
    title: "Rajasthan Friends Ride",
    type: "friends",
    difficulty: "easy",
    destination: "Rajasthan",
    duration: { days: 6, nights: 5 },
    price: 13500,
    coverImage: "/images/trips/rajasthan.jpg",
    ratingsAverage: 4.7,
    ratingsCount: 45,
    availableSeats: 8,
  },
  {
    _id: "fr4",
    title: "Coorg Friends Getaway",
    type: "friends",
    difficulty: "easy",
    destination: "Karnataka",
    duration: { days: 4, nights: 3 },
    price: 12000,
    discountedPrice: 9499,
    coverImage: "/images/trips/coorg friends.jpg",
    ratingsAverage: 4.6,
    ratingsCount: 63,
    availableSeats: 12,
  },
  {
    _id: "fr5",
    title: "Manali Squad Trip",
    type: "friends",
    difficulty: "moderate",
    destination: "Himachal Pradesh",
    duration: { days: 6, nights: 5 },
    price: 17500,
    discountedPrice: 13999,
    coverImage: "/images/trips/manali.jpg",
    ratingsAverage: 4.8,
    ratingsCount: 91,
    availableSeats: 6,
  },
  {
    _id: "8",
    title: "Chadar Trek Ladakh",
    type: "trekking",
    difficulty: "extreme",
    destination: "Ladakh",
    duration: { days: 10, nights: 9 },
    price: 28000,
    coverImage: "/images/trips/chadar trek.jpg",
    ratingsAverage: 4.9,
    ratingsCount: 56,
    availableSeats: 6,
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    _id: "tr5",
    title: "Kinner Kailash Circuit trek ",
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    _id: "9",
    title: "Varanasi Solo Spiritual",
    type: "solo",
    difficulty: "easy",
    destination: "Uttar Pradesh",
    duration: { days: 3, nights: 2 },
    price: 5500,
    coverImage: "/images/trips/kashivishwanath.jpg",
    ratingsAverage: 4.8,
    ratingsCount: 92,
    availableSeats: 20,
  },
  {
    _id: "sp1",
    title: "Omkareshwar Yatra",
    type: "spiritual",
    difficulty: "easy",
    destination: "Madhya Pradesh",
    duration: { days: 3, nights: 2 },
    price: 8500,
    discountedPrice: 6999,
    coverImage: "/images/trips/omkareshwar.jpg",
    ratingsAverage: 4.9,
    ratingsCount: 108,
    availableSeats: 15,
  },
  {
    _id: "sp2",
    title: "Badrinath Dham Yatra",
    type: "spiritual",
    difficulty: "moderate",
    destination: "Uttarakhand",
    duration: { days: 5, nights: 4 },
    price: 14000,
    discountedPrice: 11499,
    coverImage: "/images/trips/badrinath.jpg",
    ratingsAverage: 5.0,
    ratingsCount: 89,
    availableSeats: 10,
  },
  {
    _id: "sp3",
    title: "Mahakaleshwar Ujjain",
    type: "spiritual",
    difficulty: "easy",
    destination: "Ujjain, Madhya Pradesh",
    duration: { days: 2, nights: 1 },
    price: 5500,
    discountedPrice: 3999,
    coverImage: "/images/trips/ujjain.jpg",
    ratingsAverage: 4.8,
    ratingsCount: 156,
    availableSeats: 20,
  },
  {
    _id: "sp4",
    title: "Somnath Temple Yatra",
    type: "spiritual",
    difficulty: "easy",
    destination: "Gujarat",
    duration: { days: 3, nights: 2 },
    price: 9500,
    discountedPrice: 7499,
    coverImage: "/images/trips/somnath.jpg",
    ratingsAverage: 4.9,
    ratingsCount: 132,
    availableSeats: 18,
  },
  {
    _id: "sp5",
    title: "Kashi Vishwanath Yatra",
    type: "spiritual",
    difficulty: "easy",
    destination: "Varanasi, Uttar Pradesh",
    duration: { days: 4, nights: 3 },
    price: 10500,
    discountedPrice: 8499,
    coverImage: "/images/trips/kashivishwanath.jpg",
    ratingsAverage: 4.9,
    ratingsCount: 198,
    availableSeats: 16,
  },
  {
    _id: "sp6",
    title: "Trimbakeshwar Darshan",
    type: "spiritual",
    difficulty: "easy",
    destination: "Maharashtra",
    duration: { days: 2, nights: 1 },
    price: 6000,
    discountedPrice: 4499,
    coverImage: "/images/trips/trimbakeshwar.jpg",
    ratingsAverage: 4.7,
    ratingsCount: 74,
    availableSeats: 22,
  },
  {
    _id: "sp7",
    title: "Tungnath Chandrashila Trek",
    type: "trekking",
    difficulty: "moderate",
    destination: "Uttarakhand",
    duration: { days: 4, nights: 3 },
    price: 11500,
    discountedPrice: 8999,
    coverImage: "/images/trips/tungnath.jpg",
    ratingsAverage: 4.8,
    ratingsCount: 67,
    availableSeats: 12,
  },
  {
    _id: "sp8",
    title: "Amarnath Yatra",
    type: "spiritual",
    difficulty: "challenging",
    destination: "Jammu & Kashmir",
    duration: { days: 7, nights: 6 },
    price: 22000,
    discountedPrice: 18499,
    coverImage: "/images/trips/amarnath.jpg",
    ratingsAverage: 5.0,
    ratingsCount: 143,
    availableSeats: 7,
  },
  // ── Solo Shiv Bhakt Trips ──────────────────────────────────────────────────
  {
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
    tag: "World's Highest Shiva Temple · 12,073 ft",
  },
  {
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
    tag: "Sacred Dham + Hidden Alpine Lake",
  },
  {
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
    tag: "Dense Forest · Raw Solitude · Panch Kedar",
  },
  {
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
    tag: "Hidden Gem · Green Grasslands · Meditation",
  },
  {
    _id: "sl5",
    title: "Kalpeshwar + Urgam Valley",
    type: "solo",
    difficulty: "easy",
    destination: "Chamoli, Uttarakhand",
    duration: { days: 3, nights: 2 },
    price: 7500,
    discountedPrice: 5999,
    coverImage: "/images/trips/neelkanth.jpg",
    ratingsAverage: 4.8,
    ratingsCount: 54,
    availableSeats: 18,
    tag: "Hidden Panch Kedar · Village Life · Caves",
  },
  {
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
    tag: "Shiva–Parvati Wedding Site · Eternal Flame",
  },
  {
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
    tag: "Ancient Temples · Cedar Forest · Mystical",
  },
  {
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
    tag: "Sacred Rock Shivling · Wild Himalayas",
  },
  {
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
    tag: "Holy Lake + Kailash Peak · Spiritual & Scenic",
  },
  {
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
    tag: "Local Trails · Mandakini Views · Hidden Gem",
  },
  // ── New Trek Additions ────────────────────────────────────────────────────
  {
    _id: "ntr1",
    title: "Kashmir Great Lakes Trek",
    type: "trekking",
    difficulty: "challenging",
    destination: "Sonamarg, Jammu & Kashmir",
    duration: { days: 8, nights: 7 },
    price: 22500,
    discountedPrice: 18999,
    coverImage: "/images/trips/kashmir great lakes.jpg",
    ratingsAverage: 5.0,
    ratingsCount: 174,
    availableSeats: 10,
  },
  {
    _id: "ntr2",
    title: "Hampta Pass Trek",
    type: "trekking",
    difficulty: "moderate",
    destination: "Kullu, Himachal Pradesh",
    duration: { days: 6, nights: 5 },
    price: 13500,
    discountedPrice: 10999,
    coverImage: "/images/trips/hampta pass.jpg",
    ratingsAverage: 4.8,
    ratingsCount: 143,
    availableSeats: 12,
  },
  {
    _id: "ntr3",
    title: "Goecha La Trek",
    type: "trekking",
    difficulty: "extreme",
    destination: "Sikkim",
    duration: { days: 11, nights: 10 },
    price: 28000,
    discountedPrice: 23999,
    coverImage: "/images/trips/goecha la.jpg",
    ratingsAverage: 4.9,
    ratingsCount: 88,
    availableSeats: 8,
  },
  {
    _id: "ntr4",
    title: "Kumara Parvatha Trek",
    type: "trekking",
    difficulty: "challenging",
    destination: "Coorg, Karnataka",
    duration: { days: 3, nights: 2 },
    price: 8500,
    discountedPrice: 6999,
    coverImage: "/images/trips/kumara parvatha.jpg",
    ratingsAverage: 4.7,
    ratingsCount: 96,
    availableSeats: 14,
  },
  {
    _id: "ntr5",
    title: "Chembra Peak Trek",
    type: "trekking",
    difficulty: "moderate",
    destination: "Wayanad, Kerala",
    duration: { days: 2, nights: 1 },
    price: 5500,
    discountedPrice: 4299,
    coverImage: "/images/trips/chembra peek.jpg",
    ratingsAverage: 4.7,
    ratingsCount: 118,
    availableSeats: 16,
  },
  {
    _id: "ntr6",
    title: "Laitlum Canyons Trek",
    type: "trekking",
    difficulty: "easy",
    destination: "Shillong, Meghalaya",
    duration: { days: 3, nights: 2 },
    price: 7000,
    discountedPrice: 5499,
    coverImage: "/images/trips/laitlum canyons.jpg",
    ratingsAverage: 4.6,
    ratingsCount: 72,
    availableSeats: 18,
  },
  {
    _id: "ntr7",
    title: "Har Ki Dun Trek",
    type: "trekking",
    difficulty: "moderate",
    destination: "Uttarkashi, Uttarakhand",
    duration: { days: 7, nights: 6 },
    price: 14500,
    discountedPrice: 11999,
    coverImage: "/images/trips/har ki dhun.jpg",
    ratingsAverage: 4.9,
    ratingsCount: 131,
    availableSeats: 12,
  },
  {
    _id: "ntr8",
    title: "Pin Parvati Pass Trek",
    type: "trekking",
    difficulty: "extreme",
    destination: "Kullu–Spiti, Himachal Pradesh",
    duration: { days: 11, nights: 10 },
    price: 30000,
    discountedPrice: 25499,
    coverImage: "/images/trips/pin parwati trek.jpg",
    ratingsAverage: 5.0,
    ratingsCount: 62,
    availableSeats: 6,
  },
  {
    _id: "ntr9",
    title: "Hemkund Sahib Trek",
    type: "trekking",
    difficulty: "challenging",
    destination: "Chamoli, Uttarakhand",
    duration: { days: 5, nights: 4 },
    price: 12000,
    discountedPrice: 9799,
    coverImage: "/images/trips/hemkund sahib.jpg",
    ratingsAverage: 4.9,
    ratingsCount: 109,
    availableSeats: 10,
  },
  {
    _id: "ntr10",
    title: "Netravati Peak Trek",
    type: "trekking",
    difficulty: "challenging",
    destination: "Chikmagalur, Karnataka",
    duration: { days: 4, nights: 3 },
    price: 9500,
    discountedPrice: 7799,
    coverImage: "/images/trips/netravati trek.jpg",
    ratingsAverage: 4.8,
    ratingsCount: 54,
    availableSeats: 14,
  },
  // ── User Added Treks: Annapurna, Kedarkantha, Brahmatal
  {
    _id: "ntr11",
    title: "Annapurna Base Camp Trek",
    type: "trekking",
    difficulty: "challenging",
    destination: "Annapurna Region, Nepal",
    duration: { days: 10, nights: 9 },
    price: 32000,
    discountedPrice: 27999,
    coverImage: "/images/trips/annapurna base camp.jpg",
    ratingsAverage: 4.9,
    ratingsCount: 142,
    availableSeats: 12,
  },
  {
    _id: "ntr12",
    title: "Kedarkantha Trek",
    type: "trekking",
    difficulty: "moderate",
    destination: "Sankri, Uttarakhand",
    duration: { days: 4, nights: 3 },
    price: 11500,
    discountedPrice: 9499,
    coverImage: "/images/trips/kedarkantha.jpg",
    ratingsAverage: 4.8,
    ratingsCount: 98,
    availableSeats: 16,
  },
  {
    _id: "ntr13",
    title: "Brahmatal Trek",
    type: "trekking",
    difficulty: "moderate",
    destination: "Munsiyari, Uttarakhand",
    duration: { days: 5, nights: 4 },
    price: 12500,
    discountedPrice: 10499,
    coverImage: "/images/trips/brahmatal trek.jpg",
    ratingsAverage: 4.8,
    ratingsCount: 86,
    availableSeats: 14,
  },
  // ── Bike Ride Additions ───────────────────────────────────────────────────
  {
    _id: "bike1",
    title: "Leh–Ladakh Bike Adventure",
    type: "bike",
    difficulty: "challenging",
    destination: "Leh, Ladakh",
    duration: { days: 7, nights: 6 },
    price: 30000,
    coverImage: "/images/trips/leh.jpg",
    ratingsAverage: 4.9,
    ratingsCount: 210,
    ratingsCount: 210,
    availableSeats: 10,
    availableDates: [],
  },
  {
    _id: "bike2",
    title: "Spiti Valley Bike Ride",
    type: "bike",
    difficulty: "challenging",
    destination: "Spiti Valley, Himachal Pradesh",
    duration: { days: 6, nights: 5 },
    price: 22000,
    coverImage: "/images/trips/spiti ride.jpg",
    ratingsAverage: 4.8,
    ratingsCount: 156,
    ratingsCount: 156,
    availableSeats: 12,
    availableDates: [],
  },
  {
    _id: "bike3",
    title: "Manali to Leh Ride",
    type: "bike",
    difficulty: "challenging",
    destination: "Manali → Leh",
    duration: { days: 6, nights: 5 },
    price: 25000,
    coverImage: "/images/trips/manali to leh ride.jpg",
    ratingsAverage: 4.9,
    ratingsCount: 198,
    ratingsCount: 198,
    availableSeats: 10,
    availableDates: [],
  },
  {
    _id: "bike4",
    title: "Manali Local Ride",
    type: "bike",
    difficulty: "moderate",
    destination: "Manali, Himachal Pradesh",
    duration: { days: 3, nights: 2 },
    price: 9500,
    coverImage: "/images/trips/manali.jpg",
    ratingsAverage: 4.7,
    ratingsCount: 112,
    ratingsCount: 112,
    availableSeats: 14,
    availableDates: [],
  },
  {
    _id: "bike5",
    title: "Tawang Bike Circuit",
    type: "bike",
    difficulty: "challenging",
    destination: "Tawang, Arunachal Pradesh",
    duration: { days: 7, nights: 6 },
    price: 32000,
    coverImage: "/images/trips/tawang ride.jpg",
    ratingsAverage: 4.8,
    ratingsCount: 74,
    ratingsCount: 74,
    availableSeats: 8,
    availableDates: [],
  },
  {
    _id: "bike6",
    title: "Zanskar Valley Ride",
    type: "bike",
    difficulty: "challenging",
    destination: "Zanskar, Ladakh",
    duration: { days: 8, nights: 7 },
    price: 34000,
    coverImage: "/images/trips/zanskar valeey ride.jpg",
    ratingsAverage: 4.9,
    ratingsCount: 63,
    ratingsCount: 63,
    availableSeats: 8,
    availableDates: [],
  },
  {
    _id: "bike7",
    title: "Rishikesh – Chopta Bike Ride",
    type: "bike",
    difficulty: "moderate",
    destination: "Rishikesh → Chopta, Uttarakhand",
    duration: { days: 3, nights: 2 },
    price: 8500,
    coverImage: "/images/trips/rishikesh to chopta ride.jpg",
    ratingsAverage: 4.7,
    ratingsCount: 88,
    ratingsCount: 88,
    availableSeats: 16,
    availableDates: [],
  },
  {
    _id: "bike8",
    title: "Nainital Bike Getaway",
    type: "bike",
    difficulty: "easy",
    destination: "Nainital, Uttarakhand",
    duration: { days: 2, nights: 1 },
    price: 5500,
    coverImage: "/images/trips/nainital ride.jpg",
    ratingsAverage: 4.6,
    ratingsCount: 92,
    ratingsCount: 92,
    availableSeats: 20,
    availableDates: [],
  },
  {
    _id: "bike9",
    title: "Mussoorie – Dhanaulti Ride",
    type: "bike",
    difficulty: "easy",
    destination: "Mussoorie, Uttarakhand",
    duration: { days: 2, nights: 1 },
    price: 6000,
    coverImage: "/images/trips/mussoorie to dhanaulti ride.jpg",
    ratingsAverage: 4.7,
    ratingsCount: 64,
    ratingsCount: 64,
    availableSeats: 18,
    availableDates: [],
  },
  {
    _id: "bike10",
    title: "Kasol & Parvati Valley Ride",
    type: "bike",
    difficulty: "moderate",
    destination: "Kasol → Parvati Valley",
    duration: { days: 3, nights: 2 },
    price: 9000,
    coverImage: "/images/trips/kasol ride.jpg",
    ratingsAverage: 4.8,
    ratingsCount: 86,
    ratingsCount: 86,
    availableSeats: 14,
    availableDates: [],
  },
  {
    _id: "bike11",
    title: "Shimla Bike Weekend",
    type: "bike",
    difficulty: "easy",
    destination: "Shimla, Himachal Pradesh",
    duration: { days: 2, nights: 1 },
    price: 6500,
    coverImage: "/images/trips/shimla ride.jpg",
    ratingsAverage: 4.6,
    ratingsCount: 78,
    ratingsCount: 78,
    availableSeats: 20,
    availableDates: [],
  },
  {
    _id: "bike12",
    title: "Jaipur – Jaisalmer Desert Ride",
    type: "bike",
    difficulty: "moderate",
    destination: "Rajasthan",
    duration: { days: 5, nights: 4 },
    price: 16000,
    coverImage: "/images/trips/jaipur ride.jpg",
    ratingsAverage: 4.7,
    ratingsCount: 102,
    ratingsCount: 102,
    availableSeats: 12,
    availableDates: [],
  },
  {
    _id: "bike13",
    title: "Jaisalmer Sand Dunes Ride",
    type: "bike",
    difficulty: "moderate",
    destination: "Jaisalmer, Rajasthan",
    duration: { days: 3, nights: 2 },
    price: 9000,
    coverImage: "/images/trips/jaisalmer ride.jpg",
    ratingsAverage: 4.7,
    ratingsCount: 58,
    ratingsCount: 58,
    availableSeats: 16,
    availableDates: [],
  },
  {
    _id: "bike14",
    title: "Mount Abu Hill Ride",
    type: "bike",
    difficulty: "easy",
    destination: "Mount Abu, Rajasthan",
    duration: { days: 2, nights: 1 },
    price: 7000,
    coverImage: "/images/trips/mount abu ride.jpg",
    ratingsAverage: 4.6,
    ratingsCount: 44,
    ratingsCount: 44,
    availableSeats: 20,
    availableDates: [],
  },
  {
    _id: "bike15",
    title: "Goa Coastal Ride",
    type: "bike",
    difficulty: "easy",
    destination: "Goa",
    duration: { days: 3, nights: 2 },
    price: 8500,
    coverImage: "/images/trips/goa ride.jpg",
    ratingsAverage: 4.7,
    ratingsCount: 132,
    ratingsCount: 132,
    availableSeats: 18,
    availableDates: [],
  },
  {
    _id: "bike16",
    title: "Gokarna Beach Ride",
    type: "bike",
    difficulty: "easy",
    destination: "Gokarna, Karnataka",
    duration: { days: 2, nights: 1 },
    price: 6500,
    coverImage: "/images/trips/gokarna ride.jpg",
    ratingsAverage: 4.6,
    ratingsCount: 48,
    ratingsCount: 48,
    availableSeats: 20,
    availableDates: [],
  },
  {
    _id: "bike17",
    title: "Munnar Tea Estate Ride",
    type: "bike",
    difficulty: "easy",
    destination: "Munnar, Kerala",
    duration: { days: 3, nights: 2 },
    price: 9500,
    coverImage: "/images/trips/munnar ride.jpg",
    ratingsAverage: 4.8,
    ratingsCount: 52,
    ratingsCount: 52,
    availableSeats: 14,
    availableDates: [],
  },
  {
    _id: "bike18",
    title: "Ooty Nilgiris Ride",
    type: "bike",
    difficulty: "easy",
    destination: "Ooty, Tamil Nadu",
    duration: { days: 2, nights: 1 },
    price: 8000,
    coverImage: "/images/trips/ooty ride.jpg",
    ratingsAverage: 4.6,
    ratingsCount: 46,
    ratingsCount: 46,
    availableSeats: 18,
    availableDates: [],
  },
  {
    _id: "bike19",
    title: "Puducherry Coastal Ride",
    type: "bike",
    difficulty: "easy",
    destination: "Puducherry",
    duration: { days: 2, nights: 1 },
    price: 7500,
    coverImage: "/images/trips/puducherry ride.jpg",
    ratingsAverage: 4.6,
    ratingsCount: 40,
    ratingsCount: 40,
    availableSeats: 20,
    availableDates: [],
  },
];

const difficultyColors = {
  easy: "#10B981",
  moderate: "#F4C542",
  challenging: "#FF6B35",
  extreme: "#EF4444",
};
const typeEmoji = {
  trekking: "🏔️",
  solo: "🧭",
  group: "👥",
  friends: "🎉",
  spiritual: "🕉️",
};

const Stars = ({ rating }) => <span>{"★".repeat(Math.round(rating))}</span>;

const TripsPage = () => {
  const [activeType, setActiveType] = useState("");
  const [activeDiff, setActiveDiff] = useState("");
  const [search, setSearch] = useState("");

  const filtered = MOCK_TRIPS.filter(
    (t) =>
      (!activeType || t.type === activeType) &&
      (!activeDiff || t.difficulty === activeDiff) &&
      (!search ||
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.destination.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <div
      style={{ minHeight: "100vh", background: "#0F1337", paddingTop: "5rem" }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #080B25, #1A1F4B)",
          padding: "3rem 0 2rem",
        }}
      >
        <div className="container">
          <h1
            style={{
              fontFamily: "Outfit",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              color: "#fff",
              marginBottom: "0.5rem",
            }}
          >
            All <span className="text-gradient">Adventures</span>
          </h1>
          <p style={{ color: "#9CA3AF", marginBottom: "1.5rem" }}>
            Find your perfect journey — {filtered.length} trips available
          </p>

          {/* Search */}
          <input
            type="text"
            id="trip-search"
            placeholder="🔍 Search trips or destinations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field"
            style={{ maxWidth: "500px" }}
          />
        </div>
      </div>

      <div className="container" style={{ paddingTop: "2rem" }}>
        {/* Filters */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            marginBottom: "2.5rem",
          }}
        >
          <button
            onClick={() => setActiveType("")}
            className={activeType === "" ? "btn-primary" : "btn-outline"}
            style={{ padding: "0.4rem 1.1rem", fontSize: "0.85rem" }}
          >
            All
          </button>
          {TRIP_TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveType(t.id === activeType ? "" : t.id)}
              style={{
                padding: "0.4rem 1.1rem",
                fontSize: "0.85rem",
                borderRadius: "9999px",
                border: "1px solid",
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "Outfit",
                background:
                  activeType === t.id ? "rgba(255,107,53,0.15)" : "transparent",
                color: activeType === t.id ? "#FF8C5C" : "#9CA3AF",
                borderColor:
                  activeType === t.id
                    ? "rgba(255,107,53,0.4)"
                    : "rgba(255,255,255,0.12)",
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
          <div style={{ width: "1px", background: "rgba(255,255,255,0.1)" }} />
          {DIFFICULTY_LEVELS.map((d) => (
            <button
              key={d.id}
              onClick={() => setActiveDiff(d.id === activeDiff ? "" : d.id)}
              style={{
                padding: "0.4rem 1.1rem",
                fontSize: "0.85rem",
                borderRadius: "9999px",
                border: "1px solid",
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "Outfit",
                background:
                  activeDiff === d.id
                    ? `${difficultyColors[d.id]}22`
                    : "transparent",
                color: activeDiff === d.id ? difficultyColors[d.id] : "#9CA3AF",
                borderColor:
                  activeDiff === d.id
                    ? `${difficultyColors[d.id]}55`
                    : "rgba(255,255,255,0.12)",
              }}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Trip Grid */}
        {filtered.length === 0 ? (
          <div
            style={{ textAlign: "center", padding: "5rem 0", color: "#6B7280" }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
            <p>No trips found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "1.5rem",
              paddingBottom: "4rem",
            }}
          >
            {filtered.map((trip, i) => (
              <motion.div
                key={trip._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="trip-card"
              >
                <Link
                  to={`/trips/${trip._id}`}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <img
                      src={trip.coverImage}
                      alt={trip.title}
                      className="trip-card-img"
                      loading="lazy"
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "0.75rem",
                        left: "0.75rem",
                        display: "flex",
                        gap: "0.4rem",
                      }}
                    >
                      <span
                        className="badge badge-saffron"
                        style={{ fontSize: "0.7rem", padding: "0.2rem 0.6rem" }}
                      >
                        {typeEmoji[trip.type]} {trip.type}
                      </span>
                      <span
                        style={{
                          padding: "0.2rem 0.6rem",
                          borderRadius: "9999px",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          background: `${difficultyColors[trip.difficulty]}22`,
                          color: difficultyColors[trip.difficulty],
                          border: `1px solid ${difficultyColors[trip.difficulty]}44`,
                        }}
                      >
                        {trip.difficulty}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: "1.25rem" }}>
                    <h3
                      style={{
                        fontFamily: "Outfit",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: "#F9FAFB",
                        marginBottom: "0.35rem",
                      }}
                    >
                      {trip.title}
                    </h3>
                    <p
                      style={{
                        color: "#9CA3AF",
                        fontSize: "0.82rem",
                        marginBottom: "0.6rem",
                      }}
                    >
                      📍 {trip.destination} · {trip.duration.days}D/
                      {trip.duration.nights}N
                    </p>

                    {trip.availableDates && trip.availableDates.length > 0 ? (
                      <div
                        style={{
                          color: "#34D399",
                          fontSize: "0.82rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Next:{" "}
                        {new Date(trip.availableDates[0]).toLocaleDateString()}{" "}
                        {trip.availableDates.length > 1 &&
                          `· ${trip.availableDates.length} dates`}
                      </div>
                    ) : (
                      <div
                        style={{
                          color: "#6B7280",
                          fontSize: "0.82rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Dates TBA
                      </div>
                    )}

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        {trip.discountedPrice && (
                          <span
                            style={{
                              color: "#6B7280",
                              textDecoration: "line-through",
                              fontSize: "0.8rem",
                              marginRight: "0.3rem",
                            }}
                          >
                            ₹{trip.price.toLocaleString()}
                          </span>
                        )}
                        <span
                          style={{
                            fontFamily: "Outfit",
                            fontSize: "1.25rem",
                            fontWeight: 800,
                            color: "#FF6B35",
                          }}
                        >
                          ₹
                          {(
                            trip.discountedPrice || trip.price
                          ).toLocaleString()}
                        </span>
                      </div>
                      <span style={{ color: "#F4C542", fontSize: "0.82rem" }}>
                        ★ {trip.ratingsAverage} ({trip.ratingsCount})
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripsPage;
