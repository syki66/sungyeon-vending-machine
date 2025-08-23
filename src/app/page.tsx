'use client';

import Beverage from '@/components/beverage';
import Display from '@/components/display';
import { Money } from '@/components/money';
import PRICE_LIST from '@/constant/price';
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
              onClick={() => handleBalanceChange(-PRICE_LIST.cola)}
              name="콜라"
              price={PRICE_LIST.cola}
              color="red"
              disabled={balance < PRICE_LIST.cola}
            />
            <Beverage
              onClick={() => handleBalanceChange(-PRICE_LIST.water)}
              name="물"
              price={PRICE_LIST.water}
              color="blue"
              disabled={balance < PRICE_LIST.water}
            />
            <Beverage
              onClick={() => handleBalanceChange(-PRICE_LIST.coffee)}
              name="커피"
              price={PRICE_LIST.coffee}
              color="yellow"
              disabled={balance < PRICE_LIST.coffee}
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
