import { mongooseConnect } from "@/lib/mongoose";
import { Datas } from "@/model/Datas";

export default async function handler(req, res) {
  await mongooseConnect();

  const { method } = req;

  if (method === "GET") {
    // Fetch existing data
    const data = await Datas.find({});

    // Calculate forecast
    const averageIncome = calculateAverage(data, 'income');
    const averageExpenses = calculateAverage(data, 'expenses');

    const nextMonthForecast = {
      date: "2023-12-01",
      income: averageIncome,
      expenses: averageExpenses,
      currency: 'KES', // Adjust the currency based on your needs
    };

    // Append forecast to the data
    const responseData = [...data, nextMonthForecast];

    // Send the response
    res.status(200).json(responseData);
  }
}

// Function to calculate average
function calculateAverage(dataArray, key) {
  const sum = dataArray.reduce((acc, entry) => acc + entry[key], 0);
  return dataArray.length > 0 ? sum / dataArray.length : 0;
}
