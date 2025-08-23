interface BeverageProps {
  name: string;
  price: number;
  color: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Beverage({
  name,
  price,
  color,
  disabled,
  onClick,
}: BeverageProps) {
  return (
    <>
      <button
        className={`bg-${color}-500 text-white py-2 rounded hover:brightness-90 
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:cursor-pointer'}`}
        disabled={disabled}
        onClick={onClick}
      >
        {name}
        <span className="block text-xs mt-1">₩{price}</span>
      </button>
    </>
  );
}
