import mongoose from "mongoose";

export const ConnectDB = async () => {
  const primaryUri = process.env.MONGO_URI || "mongodb://mongodb:27017/tech-cart";
  
  try {
    const conn = await mongoose.connect(primaryUri);
    console.log(`✅ MongoDB connected successfully to: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`⚠️ Failed to connect to primary MongoDB URI (${primaryUri}):`, error.message);

    // If primary failed (e.g. invalid Atlas DNS or container networking mismatch), attempt fallbacks
    const fallbackUris = [
      "mongodb://mongodb:27017/tech-cart",
      "mongodb://127.0.0.1:27017/tech-cart",
      "mongodb://localhost:27017/tech-cart"
    ].filter((uri) => uri !== primaryUri);

    for (const fallback of fallbackUris) {
      try {
        console.log(`🔄 Attempting fallback connection to: ${fallback}...`);
        const conn = await mongoose.connect(fallback, { serverSelectionTimeoutMS: 3000 });
        console.log(`✅ MongoDB connected successfully via fallback: ${conn.connection.host}`);
        return conn;
      } catch (fallbackErr) {
        console.error(`❌ Fallback to ${fallback} failed: ${fallbackErr.message}`);
      }
    }

    throw new Error(`Could not establish MongoDB connection to primary or any fallback URIs: ${error.message}`);
  }
};

