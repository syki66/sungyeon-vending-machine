import Beverage from '@/components/beverage';
import Display from '@/components/display';
import { Money } from '@/components/money';

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8 w-80">
          <h1 className="text-2xl font-bold mb-4 text-center text-black">
            자판기
          </h1>
          <Display text={'현금 또는 카드를 투입해주세요.'} />
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Beverage name="콜라" price={1100} color="red" disabled={true} />
            <Beverage name="물" price={600} color="blue" disabled={false} />
            <Beverage name="커피" price={700} color="yellow" disabled={false} />
          </div>
        </div>

        <div className="bg-purple-100 rounded-lg shadow-lg p-8 w-80">
          <h1 className="text-2xl font-bold mb-4 text-center text-black">
            지갑
          </h1>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Money type={1000} color="blue" />
            <Money type={5000} color="yellow" />
            <Money type={10000} color="green" />
            <Money type={100} color="gray" />
            <Money type={500} color="gray" />

            <Money type={'card'} color="fuchsia" />
          </div>
        </div>
      </div>
    </>
  );
}
