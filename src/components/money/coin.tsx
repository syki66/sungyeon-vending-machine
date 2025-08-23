interface CoinProps {
  amount: number;
  color: string;
  disabled?: boolean;
  onClick?: () => void;
}

// 동전 컴포넌트
export const Coin = ({ amount, color, disabled, onClick }: CoinProps) => (
  <div
    className={`bg-${color}-400 text-white py-2 rounded-full w-16 h-16 flex items-center justify-center hover:brightness-90 ${
      disabled ? 'opacity-40 cursor-not-allowed' : 'hover:cursor-pointer'
    }`}
    onClick={disabled ? undefined : onClick}
  >
    {amount.toLocaleString()}원
  </div>
);
