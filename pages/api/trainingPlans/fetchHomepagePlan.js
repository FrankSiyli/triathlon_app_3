import dbConnect from "../../../database/dbConnect";
import { Plans } from "../../../database/models/Plans";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const homepagePlan = await Plans.find({ category: "homepage" });
      return response.status(200).json({ homepagePlan });
    } catch (error) {
      console.error("Error fetching homepagePlan:", error);
      return response
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
