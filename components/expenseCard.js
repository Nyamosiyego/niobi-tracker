// ExpensesCard.js
import React from 'react';
import { Card } from 'flowbite-react';

const ExpensesCard = ({ totalExpenses }) => {
  return (
    <Card className="max-w-sm">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Total Expenses
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {`KES ${totalExpenses}`}
      </p>
    </Card>
  );
};

export default ExpensesCard;
