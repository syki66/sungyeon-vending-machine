'use client';

import Beverage from '@/components/beverage';
import Display from '@/components/display';
import { Money } from '@/components/money';
import PRICE_LIST from '@/constant/price';
import { useEffect, useState } from 'react';
import { BottleWine, GlassWater, Coffee } from 'lucide-react';

export default function Home() {
  const [machineBalance, setMachineBalance] = useState<number>(0); // 자판기 잔액
  const [walletBalance, setWalletBalance] = useState<number>(50000); // 지갑 잔액
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash'); // 결제 수단 (현금 또는 카드)
  const [cardSpent, setCardSpent] = useState<number>(0); // 카드로 결제한 금액
  const [displayMainText, setDisplayMainText] =
    useState<string>('현금 또는 카드를 투입해주세요.'); // 디스플레이에 표시되는 메인 문구
  const [displaySubText, setDisplaySubText] =
    useState<string>('현재 잔액: 0원'); // 디스플레이의 오른쪽 하단에 표시되는 잔액 문구
  const [dispensedDrinks, setDispensedDrinks] = useState<string[]>([]); // 뽑은 음료 목록

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
        usedText = `콜라를`;
      } else if (amount === -PRICE_LIST.water) {
        usedText = `물을`;
      } else if (amount === -PRICE_LIST.coffee) {
        usedText = `커피를`;
      }

      // 카드 결제 중 이거나 버튼 비활성화가 아닌 경우에만 문구 출력
      if (paymentMethod === 'card' || machineBalance + amount >= 0) {
        setDisplayMainText(`${usedText} 뽑았습니다.`);
        setDispensedDrinks((prev) => [usedText.slice(0, -1), ...prev]); // 뽑은 음료 목록에 추가
      } else {
        // 비활성화된 경우 자판기 잔액 부족 문구 출력
        setDisplayMainText('잔액이 부족합니다.');
      }
    }

    // 카드 결제 시 금액 추적
    if (paymentMethod === 'card' && amount < 0) {
      setCardSpent((prev) => prev + amount); // 카드로 결제한 금액 업데이트
      setDisplaySubText(
        `카드 사용 금액: ${Math.abs(cardSpent + amount).toLocaleString()}원`
      );
      return;
    }

    // 현금 결제 시
    setPaymentMethod('cash'); // 결제 수단을 현금으로 설정
    setCardSpent(0); // 카드 사용 금액 초기화
    setMachineBalance((prev) => (prev + amount < 0 ? prev : prev + amount)); // 자판기 잔액 업데이트
    amount > 0 &&
      setWalletBalance((prev) => (prev - amount < 0 ? prev : prev - amount)); // 지갑 잔액 업데이트 (금액 투입 시에만)
  };

  // 카드 클릭 시
  const handleCardClick = () => {
    // 기계에 잔액이 남아있다면 반환 후 카드 사용 가능
    if (paymentMethod === 'cash' && machineBalance > 0) {
      setDisplayMainText('잔액 반환 후 카드를 사용해주세요.');
      return;
    }

    setPaymentMethod('card');
    setDisplayMainText('카드가 투입되었습니다.');
    setDisplaySubText(
      `카드 사용 금액: ${Math.abs(cardSpent).toLocaleString()}원`
    );
  };

  // 잔돈 반환 레버 클릭 시
  const handleReturnChange = () => {
    if (machineBalance > 0) {
      setDisplayMainText(
        `${machineBalance.toLocaleString()}원이 반환되었습니다.`
      );
      setWalletBalance((prev) => prev + machineBalance); // 지갑 잔액 업데이트
      setMachineBalance(0); // 자판기 잔액 0으로 초기화
    } else {
      setDisplayMainText(
        paymentMethod === 'cash'
          ? '반환할 잔액이 없습니다.'
          : '카드 사용 중 입니다.'
      );
    }
  };

  // 자판기 잔액이 변경될 때마다 디스플레이 서브 텍스트 업데이트
  useEffect(() => {
    setDisplaySubText(`현재 잔액: ${machineBalance.toLocaleString()}원`);
  }, [machineBalance]);

  return (
    <>
      <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-5 select-none">
        {/* 지갑 컴포넌트 */}
        <div className="bg-orange-50 border border-gray-200 rounded-lg shadow-lg p-5 md:p-8 w-full md:w-80 md:fixed bottom-10 right-10">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
            지갑
          </h1>

          {/* 지갑 잔액 표시 */}
          <h2 className="text-lg font-semibold text-gray-800 bg-gray-100 p-2 rounded text-right mb-4">
            잔액: {walletBalance.toLocaleString()}원
          </h2>

          {/* 현금 및 카드 버튼 */}
          <div className="grid grid-cols-3 gap-4 place-items-center">
            <Money
              onClick={() => handleBalanceChange(1000)}
              type={1000}
              color="bg-blue-400"
              disabled={walletBalance < 1000}
            />
            <Money
              onClick={() => handleBalanceChange(5000)}
              type={5000}
              color="bg-yellow-400"
              disabled={walletBalance < 5000}
            />
            <Money
              onClick={() => handleBalanceChange(10000)}
              type={10000}
              color="bg-green-400"
              disabled={walletBalance < 10000}
            />
            <Money
              onClick={() => handleBalanceChange(100)}
              type={100}
              color="bg-gray-400"
              disabled={walletBalance < 100}
            />
            <Money
              onClick={() => handleBalanceChange(500)}
              type={500}
              color="bg-stone-400"
              disabled={walletBalance < 500}
            />
            <Money
              onClick={() => handleCardClick()}
              type={'card'}
              color="bg-fuchsia-500"
            />
          </div>
        </div>

        {/* 자판기 컴포넌트 */}
        <div className="bg-white rounded-lg shadow-lg m-5 md:m-10 p-5 md:p-8 w-full md:w-80 border border-gray-200">
          <h1 className="text-2xl font-bold mb-4 text-center text-black">
            자판기
          </h1>

          {/* 디스플레이 컴포넌트 */}
          <Display text={displayMainText} subText={displaySubText} />

          {/* 음료 선택 버튼 */}
          <div className="grid grid-cols-3 gap-4 my-6">
            <Beverage
              onClick={() => handleBalanceChange(-PRICE_LIST.cola)}
              name="콜라"
              icon={<BottleWine color="#FFFFFF" className="inline" />}
              price={PRICE_LIST.cola}
              color="bg-red-600"
              disabled={
                paymentMethod === 'cash' && machineBalance < PRICE_LIST.cola
              }
            />
            <Beverage
              onClick={() => handleBalanceChange(-PRICE_LIST.water)}
              name="물"
              icon={<GlassWater color="#FFFFFF" className="inline" />}
              price={PRICE_LIST.water}
              color="bg-blue-600"
              disabled={
                paymentMethod === 'cash' && machineBalance < PRICE_LIST.water
              }
            />
            <Beverage
              onClick={() => handleBalanceChange(-PRICE_LIST.coffee)}
              name="커피"
              icon={<Coffee color="#FFFFFF" className="inline" />}
              price={PRICE_LIST.coffee}
              color="bg-yellow-800"
              disabled={
                paymentMethod === 'cash' && machineBalance < PRICE_LIST.coffee
              }
            />
          </div>

          {/* 잔돈 반환 레버 */}
          <div className="flex justify-center mb-6">
            <button
              className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 font-semibold cursor-pointer"
              onClick={handleReturnChange}
            >
              잔돈 반환
            </button>
          </div>

          <hr className="mb-5" />

          {/* 음료 출구 */}
          <h2 className="text-xl font-bold mb-2 text-center text-black">
            음료 출구
          </h2>
          <div className="overflow-auto max-h-44 bg-gray-50 p-2 rounded">
            {dispensedDrinks.map((drink, index) => (
              <span key={index} className="text-black text-center">
                {drink === '콜라' && (
                  <BottleWine color="#d42422" className="inline mb-1" />
                )}
                {drink === '물' && (
                  <GlassWater color="#2c5cf2" className="inline mb-1" />
                )}
                {drink === '커피' && (
                  <Coffee color="#804E13" className="inline mb-1" />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
