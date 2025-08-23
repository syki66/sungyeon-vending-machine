// 동전 컴포넌트
export const coin = (amount: number, color: string) => (
  <div
    className={`bg-${color}-400 text-white py-2 rounded-full w-16 h-16 flex items-center justify-center hover:brightness-90`}
  >
    {amount.toLocaleString()}원
  </div>
);
