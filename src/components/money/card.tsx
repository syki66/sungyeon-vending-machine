interface CardProps {
  color: string;
  disabled?: boolean;
  onClick?: () => void;
}

// 카드 컴포넌트
export const Card = ({ color, disabled, onClick }: CardProps) => (
  <div
    className={`${color} text-white py-2 rounded hover:brightness-90 flex items-center justify-center w-full ${
      disabled ? 'opacity-40 cursor-not-allowed' : 'hover:cursor-pointer'
    }`}
    onClick={disabled ? undefined : onClick}
  >
    카드
  </div>
);
