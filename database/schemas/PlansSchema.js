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

const sessionSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  activity: { type: String },
  description: { type: String },
  isDone: { type: Boolean, default: false },
  sessionParts: [{
    warmUp: [{
      multiplier: { type: Number },
      exercises: [exerciseSchema],
    }],
    main: [{
      multiplier: { type: Number },
      exercises: [exerciseSchema],
    }],
    coolDown: [{
      multiplier: { type: Number },
      exercises: [exerciseSchema],
    }],
  }],
  sessionType: { type: String },
  sessionCategory: { type: String },
});

// Define the schema for the training plans
const PlansSchema = new Schema({
  _id: { type: String },
  category: { type: String },
  name: { type: String },
  info: { type: String },
  wishFrom: { type: String },
  duration: { type: Number, required: true }, 
  weeks: [{
    week: { type: Number, required: true },
    days: {
      Montag: [sessionSchema],
      Dienstag: [sessionSchema],
      Mittwoch: [sessionSchema],
      Donnerstag: [sessionSchema],
      Freitag: [sessionSchema],
      Samstag: [sessionSchema],
      Sonntag: [sessionSchema],
    },
  }],
});

export { PlansSchema };
