import User from "../../../database/models/User";
import dbConnect from "../../../database/dbConnect";

export default async function Post(req, res) {
  dbConnect();
  try {
    const { token } = req.body;

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(500).json({ message: "invalid token" });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return res.status(201).json({ message: "User verified" });
  } catch (error) {
    return res.status(500).json({ message: "token validation failed" });
  }
}
