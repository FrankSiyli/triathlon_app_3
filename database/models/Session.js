import mongoose, { Schema, models } from "mongoose";

const exerciseSchema = new Schema({
  name: { type: String },
  distance: { type: Number },
  duration: { type: Number },
  zone: { type: String },
  imageLink: { type: String },
});

const SessionSchema = new Schema({
  _id: Schema.Types.ObjectId,
  day: { type: String },
  activity: { type: String },
  description: { type: String },
  sessionParts: [
    {
      warmUp: [
        {
          multiplier: { type: Number },
          exercises: [exerciseSchema],
        },
      ],
      main: [
        {
          multiplier: { type: Number },
          exercises: [exerciseSchema],
        },
      ],
      coolDown: [
        {
          multiplier: { type: Number },
          exercises: [exerciseSchema],
        },
      ],
    },
  ],
  sessionType: { type: String },
  sessionCategory: { type: String },
});

const Session = models.Session || mongoose.model("Session", SessionSchema);

export { Session };
