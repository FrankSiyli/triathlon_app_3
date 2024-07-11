import mongoose from "mongoose";
import { PlansSchema } from "../schemas/PlansSchema";

const Plans = mongoose.models.Plans || mongoose.model("Plans", PlansSchema);

export { Plans };
