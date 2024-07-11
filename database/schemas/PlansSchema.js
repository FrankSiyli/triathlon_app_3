import mongoose from "mongoose";

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const exerciseSchema = new Schema({
  name: { type: String },
  distance: { type: Number },
  duration: { type: Number },
  zone: { type: String },
  imageLink: { type: String },
});

const PlansSchema = new Schema({
  _id: { type: String },
  category: { type: String },
  name: { type: String },
  info: { type: String },
  wishFrom: { type: String },
  duration: { type: Number },
  weeks: [
    {
      week: { type: Number },
      sessions: [
        {
          day: { type: String },
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
        },
      ],
    },
  ],
});

export { PlansSchema };
