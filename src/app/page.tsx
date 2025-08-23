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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8 w-80">
          <h1 className="text-2xl font-bold mb-4 text-center text-black">
            자판기
          </h1>
          <Display text={displayMainText} subText={displaySubText} />
          <div className="grid grid-cols-3 gap-4 my-6">
            <Beverage
              onClick={() => handleBalanceChange(-PRICE_LIST.cola)}
              name="콜라"
              price={PRICE_LIST.cola}
              color="red"
              disabled={
                paymentMethod === 'cash' && machineBalance < PRICE_LIST.cola
              }
            />
            <Beverage
              onClick={() => handleBalanceChange(-PRICE_LIST.water)}
              name="물"
              price={PRICE_LIST.water}
              color="blue"
              disabled={
                paymentMethod === 'cash' && machineBalance < PRICE_LIST.water
              }
            />
            <Beverage
              onClick={() => handleBalanceChange(-PRICE_LIST.coffee)}
              name="커피"
              price={PRICE_LIST.coffee}
              color="yellow"
              disabled={
                paymentMethod === 'cash' && machineBalance < PRICE_LIST.coffee
              }
            />
          </div>
          <div className="flex justify-center mb-6">
            <button
              className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 font-semibold"
              onClick={handleReturnChange}
            >
              잔돈 반환
            </button>
          </div>

          <hr className="mb-5" />

          <h2 className="text-xl font-bold mb-2 text-center text-black">
            음료 출구
          </h2>
          <div className="overflow-scroll max-h-60">
            {dispensedDrinks.map((drink, index) => (
              <span key={index} className="text-black text-center">
                {drink === '콜라' && (
                  <BottleWine color="red" className="inline mb-1" />
                )}
                {drink === '물' && (
                  <GlassWater color="blue" className="inline mb-1" />
                )}
                {drink === '커피' && (
                  <Coffee color="brown" className="inline mb-1" />
                )}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-purple-100 rounded-lg shadow-lg p-8 w-80 fixed bottom-10 right-10">
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
            <Money
              onClick={() => handleCardClick()}
              type={'card'}
              color="fuchsia"
            />
          </div>
        </div>
      </div>
    </>
  );
}
