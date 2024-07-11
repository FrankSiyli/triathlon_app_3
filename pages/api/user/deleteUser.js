import dbConnect from "../../../database/dbConnect";
import User from "../../../database/models/User";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { email } = await req.body;
      const deleteUser = await User.deleteOne({ email }).select("_id");

      if (deleteUser.deletedCount === 1) {
        return res.status(200).json({ message: "User deleted successfully" });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "An error occurred" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
