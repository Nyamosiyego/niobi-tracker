import mongoose, { models } from "mongoose";

const { Schema, model } = mongoose;

const DataSchema = new Schema({
  date: { type: String, required: true },
  income: { type: Number, required: true },
  expenses: { type: Number, required: true },
  currency: { type: String, required: true },
});

export const Datas = models.Datas || model("Datas", DataSchema);
