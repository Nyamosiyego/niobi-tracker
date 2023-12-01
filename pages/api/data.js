import { mongooseConnect } from "@/lib/mongoose";
import { Datas } from "@/model/Datas";

export default async function handler(req, res) {
  await mongooseConnect();

  const { method } = req;

  if (method === "GET") {
    const data = await Datas.find({});
    res.status(200).json(data);
  }
}
