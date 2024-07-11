import dbConnect from "../../../database/dbConnect";
import User from "../../../database/models/User";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "DELETE") {
    try {
      const { planId, email } = req.query;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const updatedTrainingPlans = user.trainingPlans.filter(
        (plan) => plan._id.toString() !== planId.toString()
      );

      user.trainingPlans = updatedTrainingPlans;
      await user.save();

      return res.status(200).json({ message: "Plan deleted successfully" });
    } catch (error) {
      console.error("An error occurred while deleting the plan:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
