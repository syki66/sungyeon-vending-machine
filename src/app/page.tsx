'use client';

import Beverage from '@/components/beverage';
import Display from '@/components/display';
import { Money } from '@/components/money';
import PRICE_LIST from '@/constant/price';
import { useEffect, useState } from 'react';

export default function Home() {
  const [machineBalance, setMachineBalance] = useState<number>(0); // 자판기 잔액
  const [walletBalance, setWalletBalance] = useState<number>(50000); // 지갑 잔액
  const [displayMainText, setDisplayMainText] =
    useState<string>('현금 또는 카드를 투입해주세요.'); // 디스플레이에 표시되는 메인 문구
  const [displaySubText, setDisplaySubText] =
    useState<string>('현재 잔액: 0원'); // 디스플레이의 오른쪽 하단에 표시되는 잔액 문구

  // 잔액 변경 함수
  const handleBalanceChange = (amount: number) => {
    // 디스플레이 메인 텍스트 업데이트
    if (amount > 0) {
      // 금액 투입일 경우
      setDisplayMainText(`${amount.toLocaleString()}원이 투입되었습니다.`);
    } else if (amount < 0) {
      // 음료 구매일 경우
      let usedText = '';
      if (amount === -PRICE_LIST.cola) {
        usedText = `콜라를 뽑았습니다.`;
      } else if (amount === -PRICE_LIST.water) {
        usedText = `물을 뽑았습니다.`;
      } else if (amount === -PRICE_LIST.coffee) {
        usedText = `커피를 뽑았습니다.`;
      }
      // 버튼 비활성화가 아닌 경우에만 문구 출력
      if (machineBalance + amount >= 0 && usedText) {
        setDisplayMainText(`${usedText}`);
      } else {
        // 비활성화된 경우 자판기 잔액 부족 문구 출력
        setDisplayMainText('잔액이 부족합니다.');
      }
    }

    // 잔액 업데이트 (잔액이 음수가 되지 않도록 처리)
    setMachineBalance((prev) => (prev + amount < 0 ? prev : prev + amount)); // 자판기 잔액 업데이트
    amount > 0 &&
      setWalletBalance((prev) => (prev - amount < 0 ? prev : prev - amount)); // 지갑 잔액 업데이트 (금액 투입 시에만)
  };

  // 자판기 잔액이 변경될 때마다 디스플레이 서브 텍스트 업데이트
  useEffect(() => {
    setDisplaySubText(`현재 잔액: ${machineBalance.toLocaleString()}원`);
  }, [machineBalance]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8 w-80">
          <h1 className="text-2xl font-bold mb-4 text-center text-black">
            자판기
          </h1>
          <Display text={displayMainText} subText={displaySubText} />
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Beverage
              onClick={() => handleBalanceChange(-PRICE_LIST.cola)}
              name="콜라"
              price={PRICE_LIST.cola}
              color="red"
              disabled={machineBalance < PRICE_LIST.cola}
            />
            <Beverage
              onClick={() => handleBalanceChange(-PRICE_LIST.water)}
              name="물"
              price={PRICE_LIST.water}
              color="blue"
              disabled={machineBalance < PRICE_LIST.water}
            />
            <Beverage
              onClick={() => handleBalanceChange(-PRICE_LIST.coffee)}
              name="커피"
              price={PRICE_LIST.coffee}
              color="yellow"
              disabled={machineBalance < PRICE_LIST.coffee}
            />
          </div>
          </div>
        </div>

        <div className="bg-purple-100 rounded-lg shadow-lg p-8 w-80">
          <h1 className="text-2xl font-bold mb-4 text-center text-black">
            지갑
          </h1>
          <h2 className="text-black text-right mb-4">
            잔액: {walletBalance.toLocaleString()}원
          </h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Money
              onClick={() => handleBalanceChange(1000)}
              type={1000}
              color="blue"
              disabled={walletBalance < 1000}
            />
            <Money
              onClick={() => handleBalanceChange(5000)}
              type={5000}
              color="yellow"
              disabled={walletBalance < 5000}
            />
            <Money
              onClick={() => handleBalanceChange(10000)}
              type={10000}
              color="green"
              disabled={walletBalance < 10000}
            />
            <Money
              onClick={() => handleBalanceChange(100)}
              type={100}
              color="gray"
              disabled={walletBalance < 100}
            />
            <Money
              onClick={() => handleBalanceChange(500)}
              type={500}
              color="gray"
              disabled={walletBalance < 500}
            />
            <Money type={'card'} color="fuchsia" />
          </div>
        </div>
      </div>
    </>
  );
}
