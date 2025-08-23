interface BeverageProps {
  name: string;
  price: number;
  color: string;
  disabled?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function Beverage({
  name,
  price,
  color,
  disabled,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: BeverageProps) {
  return (
    <>
      <div
        className={`bg-${color}-500 text-white py-2 rounded hover:brightness-90 text-center
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:cursor-pointer'}`}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {name}
        <span className="block text-xs mt-1">₩{price}</span>
      </div>
    </>
  );
}
