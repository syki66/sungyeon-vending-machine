import { Money } from '@/components/money';

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-purple-100 rounded-lg shadow-lg p-8 w-80">
          <h1 className="text-2xl font-bold mb-4 text-center text-black">
            지갑
          </h1>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Money type={1000} color="blue" />
            <Money type={5000} color="yellow" />
            <Money type={10000} color="red" />
            <Money type={100} color="gray" />
            <Money type={500} color="gray" />
            <Money type={'card'} color="fuchsia" />
          </div>
        </div>
      </div>
    </>
  );
}
