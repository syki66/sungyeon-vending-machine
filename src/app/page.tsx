'use client';

import Beverage from '@/components/beverage';
import Display from '@/components/display';
import { Money } from '@/components/money';
import { useEffect, useState } from 'react';

export default function Home() {
  const [balance, setBalance] = useState<number>(0); // 잔액
  const [displayText, setDisplayText] =
    useState<string>('현금 또는 카드를 투입해주세요.'); // 디스플레이에 표시되는 문구

  const handleBalanceChange = (amount: number) => {
    setBalance((prev) => prev + amount);
  };

  useEffect(() => {
    if (balance > 0) {
      setDisplayText(`${balance.toLocaleString()}원 투입됨`);
    }
  }, [balance]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8 w-80">
          <h1 className="text-2xl font-bold mb-4 text-center text-black">
            자판기
          </h1>
          <Display text={displayText} />
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Beverage
              onClick={() => handleBalanceChange(-1100)}
              name="콜라"
              price={1100}
              color="red"
              disabled={balance < 1100}
            />
            <Beverage
              onClick={() => handleBalanceChange(-600)}
              name="물"
              price={600}
              color="blue"
              disabled={balance < 600}
            />
            <Beverage
              onClick={() => handleBalanceChange(-700)}
              name="커피"
              price={700}
              color="yellow"
              disabled={balance < 700}
            />
          </div>
          </div>
        </div>

        <div className="bg-purple-100 rounded-lg shadow-lg p-8 w-80">
          <h1 className="text-2xl font-bold mb-4 text-center text-black">
            지갑
          </h1>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Money
              onClick={() => handleBalanceChange(1000)}
              type={1000}
              color="blue"
            />
            <Money
              onClick={() => handleBalanceChange(5000)}
              type={5000}
              color="yellow"
            />
            <Money
              onClick={() => handleBalanceChange(10000)}
              type={10000}
              color="green"
            />
            <Money
              onClick={() => handleBalanceChange(100)}
              type={100}
              color="gray"
            />
            <Money
              onClick={() => handleBalanceChange(500)}
              type={500}
              color="gray"
            />
            <Money type={'card'} color="fuchsia" />
          </div>
        </div>
      </div>
    </>
  );
}
