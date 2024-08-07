import mongoose from "mongoose";

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const exerciseSchema = new Schema({
  name: { type: String, required: true },
  distance: { type: Number, default: 0 },
  duration: { type: Number, default: 0 },
  zone: { type: String },
  imageLink: { type: String },
});

const sessionSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  activity: { type: String, required: true },
  description: { type: String },
  isDone: { type: Boolean, default: false },
  sessionParts: {
    warmUp: [{
      multiplier: { type: Number, default: 1 },
      exercises: [exerciseSchema],
    }],
    main: [{
      multiplier: { type: Number, default: 1 },
      exercises: [exerciseSchema],
    }],
    coolDown: [{
      multiplier: { type: Number, default: 1 },
      exercises: [exerciseSchema],
    }],
  },
  sessionType: { type: String },
  sessionCategory: { type: String },
});

const PlansSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true }, 
  category: { type: String, required: true },
  name: { type: String, required: true },
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
