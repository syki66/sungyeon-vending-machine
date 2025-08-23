interface DisplayProps {
  text: string;
}

export default function Display({ text }: DisplayProps) {
  return (
    <div className="text-center bg-gray-900 text-green-400 font-mono rounded-lg p-4 shadow-lg border-4 border-green-500">
      {text}
    </div>
  );
}
