import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    trainingPlans: [
      {
        _id: Schema.Types.ObjectId,
        category: String,
        name: String,
        info: String,
        wishFrom: String,
        duration: Number,
        weeks: [
          {
            week: Number,
            sessions: [
              {
                day: String,
                activity: String,
                description: String,
                isDone: Boolean,
                sessionParts: [
                  {
                    warmUp: [
                      {
                        multiplier: Number,
                        exercises: [
                          {
                            name: String,
                            distance: Number,
                            duration: Number,
                            zone: String,
                            imageLink: String,
                          },
                        ],
                      },
                    ],
                    main: [
                      {
                        multiplier: Number,
                        exercises: [
                          {
                            name: String,
                            distance: Number,
                            duration: Number,
                            zone: String,
                            imageLink: String,
                          },
                        ],
                      },
                    ],
                    coolDown: [
                      {
                        multiplier: Number,
                        exercises: [
                          {
                            name: String,
                            distance: Number,
                            duration: Number,
                            zone: String,
                            imageLink: String,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    heartRate: {
      type: Number,
      default: 160,
    },
    watt: {
      type: Number,
      default: 120,
    },
    swimTime: {
      type: Number,
      default: 1200,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: {
      type: String,
      default: "",
    },
    forgotPasswordTokenExpiry: {
      type: Date,
      default: "",
    },
    verifyToken: {
      type: String,
      default: "",
    },
    verifyTokenExpiry: {
      type: Date,
      default: "",
    },
  },
  { timestamps: true }
);

const User = models?.User || mongoose.model("User", UserSchema);

export default User;
