interface BillProps {
  amount: number;
  color: string;
  disabled?: boolean;
  onClick?: () => void;
}

// 지폐 컴포넌트
export const Bill = ({ amount, color, disabled, onClick }: BillProps) => (
  <div
    className={`bg-${color}-400 text-white py-2 rounded hover:brightness-90 flex items-center justify-center ${
      disabled ? 'opacity-40 cursor-not-allowed' : 'hover:cursor-pointer'
    }`}
    onClick={disabled ? undefined : onClick}
  >
    {amount.toLocaleString()}원
  </div>
);
