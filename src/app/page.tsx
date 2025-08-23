export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-purple-100 rounded-lg shadow-lg p-8 w-80">
          <h1 className="text-2xl font-bold mb-4 text-center text-black">
            지갑
          </h1>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <button className="bg-blue-400 text-white py-2 rounded hover:brightness-90">
              1000원
            </button>
            <button className="bg-yellow-400 text-white py-2 rounded hover:brightness-90">
              5000원
            </button>
            <button className="bg-green-500 text-white py-2 rounded hover:brightness-90">
              10000원
            </button>
            <button className="bg-gray-400 text-white py-2 rounded-full w-16 h-16 flex items-center justify-center hover:brightness-90">
              100원
            </button>
            <button className="bg-gray-500 text-white py-2 rounded-full w-16 h-16 flex items-center justify-center hover:brightness-90">
              500원
            </button>
            <button className="bg-fuchsia-500 text-white py-2 rounded hover:brightness-90">
              카드
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
