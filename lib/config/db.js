import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://prathamesh7376:8329173454@cluster0.ekbmtrg.mongodb.net/Blog-App"
    );
    console.log("DB Connected");
  } catch (error) {
    console.error("DB Connection Error:", error); // Improved error handling
  }
};
