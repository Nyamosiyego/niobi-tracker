import React from 'react'
import { Card } from 'flowbite-react';
import forecast from '@/public/forecast.png';
import Link from 'next/link';

const ForecastCard = () => {
    return (
        <Card className="max-w-sm" imgSrc={forecast.src} horizontal>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Check out your forecast
          </h5>
            <Link href={"/forecast"}>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Forecast
                </button>
            </Link>
        </Card>
      );
}

export default ForecastCard