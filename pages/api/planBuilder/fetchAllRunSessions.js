import dbConnect from "../../../database/dbConnect";
import { Session } from "../../../database/models/Session";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const sessions = await Session.aggregate([
        {
          $match: { sessionCategory: "runSession" },
        },
        {
          $unionWith: {
            coll: "run_sessions_beginner",
            pipeline: [{ $match: { sessionCategory: "runSession" } }],
          },
        },
        {
          $unionWith: {
            coll: "run_sessions_construction",
            pipeline: [{ $match: { sessionCategory: "runSession" } }],
          },
        },
        {
          $unionWith: {
            coll: "run_sessions_final_acceleration",
            pipeline: [{ $match: { sessionCategory: "runSession" } }],
          },
        },
        {
          $unionWith: {
            coll: "run_sessions_intervals",
            pipeline: [{ $match: { sessionCategory: "runSession" } }],
          },
        },
        {
          $unionWith: {
            coll: "run_sessions_pace_change",
            pipeline: [{ $match: { sessionCategory: "runSession" } }],
          },
        },
        {
          $unionWith: {
            coll: "run_sessions_technique",
            pipeline: [{ $match: { sessionCategory: "runSession" } }],
          },
        },
        {
          $unionWith: {
            coll: "run_sessions_tempo",
            pipeline: [{ $match: { sessionCategory: "runSession" } }],
          },
        },
        {
          $unionWith: {
            coll: "run_sessions_z2",
            pipeline: [{ $match: { sessionCategory: "runSession" } }],
          },
        },
        {
          $unionWith: {
            coll: "run_sessions_z3",
            pipeline: [{ $match: { sessionCategory: "runSession" } }],
          },
        },
        {
          $unionWith: {
            coll: "run_sessions_z4",
            pipeline: [{ $match: { sessionCategory: "runSession" } }],
          },
        },
      ]);

      return response.status(200).json({ sessions });
    } catch (error) {
      console.error("Error fetching run sessions:", error);
      return response
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
