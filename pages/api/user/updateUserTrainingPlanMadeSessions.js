import dbConnect from "../../../database/dbConnect";
import User from "../../../database/models/User";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { email, planId, week, session } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const planToUpdate = user.trainingPlans.find(
        (plan) => plan.id === planId
      );
      if (!planToUpdate) {
        return res.status(404).json({ message: "Training plan not found" });
      }

      planToUpdate.weeks[week].sessions[session].isDone =
        !planToUpdate.weeks[week].sessions[session].isDone;

      await user.save();

      return res
        .status(201)
        .json({ message: "Session marked as done", updatedPlan: planToUpdate });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "An error occurred while updating user" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
