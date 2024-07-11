import dbConnect from "../../../database/dbConnect";
import { Session } from "../../../database/models/Session";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const sessions = await Session.aggregate([
        {
          $match: { sessionCategory: "bikeSession" },
        },
        {
          $unionWith: {
            coll: "bike_sessions_beginner",
            pipeline: [{ $match: { sessionCategory: "bikeSession" } }],
          },
        },
        {
          $unionWith: {
            coll: "bike_sessions_lit",
            pipeline: [{ $match: { sessionCategory: "bikeSession" } }],
          },
        },
        {
          $unionWith: {
            coll: "bike_sessions_mit",
            pipeline: [{ $match: { sessionCategory: "bikeSession" } }],
          },
        },
        {
          $unionWith: {
            coll: "bike_sessions_hit",
            pipeline: [{ $match: { sessionCategory: "bikeSession" } }],
          },
        },
      ]);

      return response.status(200).json({ sessions });
    } catch (error) {
      console.error("Error fetching bike sessions:", error);
      return response
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
