import dbConnect from "../../../database/dbConnect";
import User from "../../../database/models/User";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { email } = await req.body;
      const user = await User.findOne({ email }).select("_id");
      res.json({ user });
    } catch (error) {
      return res.status(500).json({ message: "An error occurred " });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
