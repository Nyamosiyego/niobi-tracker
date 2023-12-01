import React from 'react'
import { Card } from 'flowbite-react';
import history from '@/public/history.png';
import Link from 'next/link';

const HistoryCard = () => {
    return (
        <Card className="max-w-sm" imgSrc={history.src} horizontal>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Check out your history
          </h5>
            <Link href={"/history"}>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    History
                </button>
            </Link>
        </Card>
      );
    
}

export default HistoryCard