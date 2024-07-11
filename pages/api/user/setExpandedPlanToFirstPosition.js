import dbConnect from "../../../database/dbConnect";
import User from "../../../database/models/User";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { email, expandedTrainingPlan } = req.body;
      const user = await User.findOne({ email });
      const planId = expandedTrainingPlan._id;
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } else {
        user.trainingPlans.unshift(expandedTrainingPlan);
        const updatedTrainingPlans = user.trainingPlans.filter(
          (plan) => plan._id.toString() !== planId.toString()
        );
        user.trainingPlans = updatedTrainingPlans;
        user.trainingPlans.unshift(expandedTrainingPlan);

        await user.save();
        return res.status(201).json();
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
