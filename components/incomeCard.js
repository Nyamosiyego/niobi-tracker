// IncomeCard.js
import React from 'react';
import { Card } from 'flowbite-react';

const IncomeCard = ({ totalIncome }) => {
  return (
    <Card className="max-w-sm">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Total Income
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {`KES ${totalIncome}`}
      </p>
    </Card>
  );
};

export default IncomeCard;
