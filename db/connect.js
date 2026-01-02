import mongoose from "mongoose";

async function connectDB() {
  try {
    const conn = await mongoose.connect(
      "mongodb://localhost:27017/issuetracker"
    );
    console.log(`Connected to DB at ${conn.connection.host}`);
  } catch (err) {
    console.log("Error connecting DB:", err.message);
    process.exit(1);
  }
}

export default connectDB;
