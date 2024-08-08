import dbConnect from "../../../database/dbConnect";
import User from "../../../database/models/User";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { email, trainingPlans } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const planIndex = user.trainingPlans.findIndex(
        (plan) => plan._id === trainingPlans._id
      );

      if (planIndex !== -1) {
        // Update existing plan
        user.trainingPlans[planIndex] = trainingPlans;
        await user.save();
        return res.status(200).json();
      } else {
        // Add new plan if not found
        const hasId = trainingPlans._id;
        if (!hasId) {
          const newId = new ObjectId();
          trainingPlans._id = newId;
        }
        user.trainingPlans.unshift(trainingPlans);
        await user.save();
        return res.status(201).json({ message: "Plan added successfully" });
      }
    } catch (error) {
      console.error("Error updating user plan:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while updating user" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
