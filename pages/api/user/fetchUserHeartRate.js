import dbConnect from "../../../database/dbConnect";
import User from "../../../database/models/User";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const { email } = req.query;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(user.heartRate);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "An error occurred while fetching user heartrate" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
