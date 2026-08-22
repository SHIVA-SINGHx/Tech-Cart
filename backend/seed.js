import mongoose from "mongoose";
import "dotenv/config";
import { Product } from "./models/productModel.js";

const sampleProducts = [
  {
    productName: "Apple MacBook Pro 16\" M3 Max",
    productDescription: "16-inch Liquid Retina XDR display, Apple M3 Max chip with 16-core CPU and 40-core GPU, 36GB Unified Memory, 1TB SSD Storage.",
    price: 249999,
    category: "Laptops",
    brand: "Apple",
    productImg: [
      {
        url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
        public_id: "seed_macbook_pro_16",
      },
    ],
  },
  {
    productName: "Sony WH-1000XM5 Wireless Headphones",
    productDescription: "Industry-leading noise canceling with two processors and 8 microphones, Ultra-comfortable design, up to 30-hour battery life.",
    price: 29990,
    category: "Audio",
    brand: "Sony",
    productImg: [
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
        public_id: "seed_sony_headphones",
      },
    ],
  },
  {
    productName: "Apple iPhone 16 Pro Max",
    productDescription: "Titanium design, A18 Pro chip, 48MP Fusion camera system with 5x Telephoto, 6.9-inch Super Retina XDR display with ProMotion.",
    price: 139900,
    category: "Mobiles",
    brand: "Apple",
    productImg: [
      {
        url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80",
        public_id: "seed_iphone_16_pro",
      },
    ],
  },
  {
    productName: "Samsung Galaxy S24 Ultra",
    productDescription: "Galaxy AI powered flagship with 200MP camera, built-in S Pen, Snapdragon 8 Gen 3 for Galaxy, and 6.8\" Dynamic AMOLED 2X display.",
    price: 129999,
    category: "Mobiles",
    brand: "Samsung",
    productImg: [
      {
        url: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80",
        public_id: "seed_samsung_s24_ultra",
      },
    ],
  },
  {
    productName: "Dell XPS 15 OLED",
    productDescription: "15.6-inch 3.5K OLED InfinityEdge touch display, Intel Core i9 13th Gen, NVIDIA GeForce RTX 4070, 32GB RAM, 1TB SSD.",
    price: 214990,
    category: "Laptops",
    brand: "Dell",
    productImg: [
      {
        url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80",
        public_id: "seed_dell_xps_15",
      },
    ],
  },
  {
    productName: "Logitech MX Master 3S Wireless Mouse",
    productDescription: "Ergonomic wireless mouse with Quiet Clicks, 8K DPI any-surface tracking, MagSpeed electromagnetic scrolling, USB-C fast charging.",
    price: 8995,
    category: "Accessories",
    brand: "Logitech",
    productImg: [
      {
        url: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80",
        public_id: "seed_logitech_mx_master",
      },
    ],
  },
  {
    productName: "Keychron Q1 Pro Wireless Custom Mechanical Keyboard",
    productDescription: "75% layout QMK/VIA wireless custom mechanical keyboard, full aluminum body, double-gasket design, hot-swappable switches.",
    price: 16999,
    category: "Accessories",
    brand: "Keychron",
    productImg: [
      {
        url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
        public_id: "seed_keychron_q1_pro",
      },
    ],
  },
  {
    productName: "Samsung 34\" Odyssey OLED G8 Curved Gaming Monitor",
    productDescription: "34-inch UWQHD (3440 x 1440) 175Hz 0.03ms OLED curved gaming monitor with Neo Quantum Processor and Smart TV experience.",
    price: 84999,
    category: "Monitors",
    brand: "Samsung",
    productImg: [
      {
        url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80",
        public_id: "seed_samsung_monitor",
      },
    ],
  },
];

async function seedDatabase() {
  const uris = [
    process.env.MONGO_URI,
    "mongodb://mongodb:27017/tech-cart",
    "mongodb://127.0.0.1:27017/tech-cart",
    "mongodb://localhost:27017/tech-cart",
  ].filter(Boolean);

  let connected = false;
  for (const uri of uris) {
    try {
      console.log(`Connecting to MongoDB at: ${uri}...`);
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
      console.log(`Connected to MongoDB successfully!`);
      connected = true;
      break;
    } catch (err) {
      console.log(`Failed connecting to ${uri}: ${err.message}`);
    }
  }

  if (!connected) {
    console.error("Could not connect to any MongoDB instance.");
    process.exit(1);
  }

  try {
    const existingCount = await Product.countDocuments();
    if (existingCount > 0) {
      console.log(`Database already has ${existingCount} products.`);
      console.log("Removing old products and reseeding with fresh catalog...");
      await Product.deleteMany({});
    }

    const inserted = await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully seeded ${inserted.length} products into the database!`);
  } catch (error) {
    console.error("Error seeding products:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB connection closed.");
    process.exit(0);
  }
}

seedDatabase();
