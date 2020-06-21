import { Schema, model } from "mongoose";


const DialogSchema = new Schema(
  {
    partner: { type: Schema.Types.ObjectId, ref: "User" },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" }
  },
  {
    timestamps: true
  }
);


export default model("Dialog", DialogSchema);
