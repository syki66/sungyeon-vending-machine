interface BeverageProps {
  name: string;
  price: number;
  icon?: React.ReactNode;
  color: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Beverage({
  name,
  price,
  icon,
  color,
  disabled,
  onClick,
}: BeverageProps) {
  return (
    <>
      <div
        className={`${color} text-white py-2 rounded hover:brightness-90 text-center
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:cursor-pointer'}`}
        onClick={onClick}
      >
        <span className="block">{icon}</span>
        <span className="block mt-1">{name}</span>
        <span className="block text-xs mt-1">₩{price.toLocaleString()}</span>
      </div>
    </>
  );
}
