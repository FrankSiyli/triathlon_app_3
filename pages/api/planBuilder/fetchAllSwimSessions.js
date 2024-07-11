import dbConnect from "../../../database/dbConnect";
import { Session } from "../../../database/models/Session";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const sessions = await Session.aggregate([
        {
          $match: { sessionCategory: "swimSession" },
        },
        {
          $unionWith: {
            coll: "indoor_swim_sessions_500er",
            pipeline: [{ $match: { sessionCategory: "swimSession" } }],
          },
        },
        {
          $unionWith: {
            coll: "indoor_swim_sessions_beginner",
            pipeline: [{ $match: { sessionCategory: "swimSession" } }],
          },
        },
        {
          $unionWith: {
            coll: "indoor_swim_sessions_increases",
            pipeline: [{ $match: { sessionCategory: "swimSession" } }],
          },
        },
        {
          $unionWith: {
            coll: "indoor_swim_sessions_pace_change",
            pipeline: [{ $match: { sessionCategory: "swimSession" } }],
          },
        },
        {
          $unionWith: {
            coll: "indoor_swim_sessions_tabata",
            pipeline: [{ $match: { sessionCategory: "swimSession" } }],
          },
        },
        {
          $unionWith: {
            coll: "indoor_swim_sessions_technique",
            pipeline: [{ $match: { sessionCategory: "swimSession" } }],
          },
        },
        {
          $unionWith: {
            coll: "indoor_swim_sessions_tempo",
            pipeline: [{ $match: { sessionCategory: "swimSession" } }],
          },
        },
        {
          $unionWith: {
            coll: "indoor_swim_sessions_exercises",
            pipeline: [{ $match: { sessionCategory: "swimSession" } }],
          },
        },
      ]);

      return response.status(200).json({ sessions });
    } catch (error) {
      console.error("Error fetching swim sessions:", error);
      return response
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
