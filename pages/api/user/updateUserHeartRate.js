import dbConnect from "../../../database/dbConnect";
import User from "../../../database/models/User";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { email, newHeartRate } = req.body;
      const user = await User.findOne({ email });
      console.log("user", user);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } else {
        user.heartRate = newHeartRate;
      }
      await user.save();
      return res.status(201).json();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "An error occurred while updating user" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
