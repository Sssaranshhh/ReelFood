/**
 * seed.js — Inserts demo food items into the database so the app looks
 * great for portfolio viewers without needing any real uploads.
 *
 * Usage:  node seed.js
 *
 * What it does:
 *  1. Creates a demo "Food Partner" account (DemoKitchen)
 *  2. Inserts 6 food items with real publicly-hosted food videos
 *  3. Safe to run multiple times — skips if demo data already exists
 */

import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import foodPartnerModel from "./src/models/foodPartner.model.js";
import foodModel from "./src/models/food.model.js";

// ──────────────────────────────────────────────────────────────
// Demo food partner
// ──────────────────────────────────────────────────────────────
const DEMO_PARTNER = {
  name: "DemoKitchen",
  contactName: "Chef Demo",
  phone: "9999999999",
  address: "123 Food Street, Flavour Town",
  email: "demo@reelfood.app",
  password: "Demo@1234",
};

// ──────────────────────────────────────────────────────────────
// Demo food items — local video files served by express static
// ──────────────────────────────────────────────────────────────
const DEMO_FOODS = [
  {
    name: "Sizzling Beef Burger",
    description: "Juicy double-patty smash burger with caramelised onions and special sauce.",
    video: "http://localhost:3000/videos/6277641-hd_1080_1920_25fps.mp4",
  },
  {
    name: "Wood-Fired Margherita Pizza",
    description: "Classic Neapolitan pizza with San Marzano tomatoes and fresh mozzarella.",
    video: "http://localhost:3000/videos/14000992_1080_1920_30fps.mp4",
  },
  {
    name: "Golden Honey Pancakes",
    description: "Fluffy buttermilk pancakes stacked high with maple syrup and fresh berries.",
    video: "http://localhost:3000/videos/15075825_1080_1920_60fps.mp4",
  },
  {
    name: "Chocolate Glazed Donuts",
    description: "Delectable fresh donuts with a warm rich chocolate coating.",
    video: "http://localhost:3000/videos/donuts.mp4",
  },
  {
    name: "Fresh Flower Bread",
    description: "Warm, artisan pull-apart bread shaped like a blooming flower.",
    video: "http://localhost:3000/videos/flower-bread.mp4",
  },
];

// ──────────────────────────────────────────────────────────────
async function seed() {
  console.log("🌱  Connecting to MongoDB...");
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("✅  Connected.\n");

  // ── 1. Create or find the demo food partner ────────────────
  let partner = await foodPartnerModel.findOne({ email: DEMO_PARTNER.email });

  if (partner) {
    console.log(`ℹ️   Demo partner already exists (${partner.name}). Skipping partner creation.`);
  } else {
    const hashedPassword = await bcrypt.hash(DEMO_PARTNER.password, 10);
    partner = await foodPartnerModel.create({
      ...DEMO_PARTNER,
      password: hashedPassword,
    });
    console.log(`✅  Created demo food partner: "${partner.name}"`);
  }

  // ── 2. Insert demo food items (always overwrite to apply local static paths) ────
  console.log("🧹  Cleaning up old food items for demo partner...");
  await foodModel.deleteMany({ foodPartner: partner._id });

  const foodDocs = DEMO_FOODS.map((f) => ({
    ...f,
    foodPartner: partner._id,
  }));

  await foodModel.insertMany(foodDocs);
  console.log(`✅  Inserted ${DEMO_FOODS.length} local demo food items.\n`);


  // ── 3. Print a summary ────────────────────────────────────
  console.log("─────────────────────────────────────────────────────────");
  console.log("🎉  Seed complete! Your demo data:");
  console.log(`    Partner login  →  ${DEMO_PARTNER.email} / ${DEMO_PARTNER.password}`);
  console.log(`    Food items     →  ${DEMO_FOODS.length} videos ready to play`);
  console.log("─────────────────────────────────────────────────────────\n");

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err.message);
  process.exit(1);
});
