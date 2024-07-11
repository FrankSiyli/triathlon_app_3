import dbConnect from "../../../database/dbConnect";
import User from "../../../database/models/User";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { email, trainingPlans, id } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const existingTrainingPlanIds = user.trainingPlans.map((plan) => plan.id);
      if (!existingTrainingPlanIds.includes(id)) {
        const hasId = trainingPlans.id;
        if (!hasId) {
          const newId = new ObjectId();
          trainingPlans.id = newId;
        }
        user.trainingPlans.unshift(trainingPlans);
        await user.save();
        return res.status(201).json();
      } else {
        return res
          .status(200)
          .json({ message: "Plan wurde bereits gespeichert" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "An error occurred while updating user" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
