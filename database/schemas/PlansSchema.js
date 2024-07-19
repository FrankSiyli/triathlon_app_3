import mongoose from "mongoose";

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

// Define the exercise schema
const exerciseSchema = new Schema({
  name: { type: String },
  distance: { type: Number },
  duration: { type: Number },
  zone: { type: String },
  imageLink: { type: String },
});

// Define the session schema
const sessionSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  activity: { type: String },
  description: { type: String },
  isDone: { type: Boolean, default: false },
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

// Define the plans schema
const PlansSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  category: { type: String },
  name: { type: String },
  info: { type: String },
  wishFrom: { type: String },
  duration: { type: Number },
  weeks: [
    {
      week: { type: Number },
      days: {
        Montag: [sessionSchema],
        Dienstag: [sessionSchema],
        Mittwoch: [sessionSchema],
        Donnerstag: [sessionSchema],
        Freitag: [sessionSchema],
        Samstag: [sessionSchema],
        Sonntag: [sessionSchema],
      },
    },
  ],
});

export { PlansSchema };
