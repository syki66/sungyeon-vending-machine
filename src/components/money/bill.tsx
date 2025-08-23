// 지폐 컴포넌트
export const bill = (amount: number, color: string, onClick?: () => void) => (
  <div
    className={`bg-${color}-400 text-white py-2 rounded hover:brightness-90 flex items-center justify-center`}
    onClick={onClick}
  >
    {amount.toLocaleString()}원
  </div>
);
