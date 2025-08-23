import { Bill } from './bill';
import { Card } from './card';
import { Coin } from './coin';

interface MoneyProps {
  type: 100 | 500 | 1000 | 5000 | 10000 | 'card';
  color: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function Money({ type, color, disabled, onClick }: MoneyProps) {
  if (type === 'card')
    return <Card color={color} disabled={disabled} onClick={onClick} />; // 카드일 경우
  if (type === 100 || type === 500)
    return (
      <Coin amount={type} color={color} disabled={disabled} onClick={onClick} />
    ); // 동전일 경우
  return (
    <Bill amount={type} color={color} disabled={disabled} onClick={onClick} />
  ); // 지폐일 경우
}
