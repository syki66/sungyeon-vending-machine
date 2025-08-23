// 지폐 컴포넌트
export const bill = (amount: number, color: string) => (
  <div
    className={`bg-${color}-400 text-white py-2 rounded hover:brightness-90 flex items-center justify-center`}
  >
    {amount.toLocaleString()}원
  </div>
);
