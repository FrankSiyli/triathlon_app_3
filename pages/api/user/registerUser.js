import dbConnect from "../../../database/dbConnect";
import User from "../../../database/models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });
      await user.save();

      return res.status(201).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "An error occurred while registration" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
