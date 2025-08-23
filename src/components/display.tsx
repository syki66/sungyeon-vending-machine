interface DisplayProps {
  text: string;
  subText?: string;
}

export default function Display({ text, subText }: DisplayProps) {
  return (
    <div className="text-center bg-gray-900 text-green-400 font-mono rounded-lg p-4 shadow-lg border-4 border-green-500 text-sm">
      {text}
      {subText && (
        <div className="text-xs text-green-300 mt-2 text-right">{subText}</div>
      )}
    </div>
  );
}
