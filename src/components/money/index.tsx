import { bill } from './bill';
import { card } from './card';
import { coin } from './coin';

interface MoneyProps {
  type: 100 | 500 | 1000 | 5000 | 10000 | 'card';
  color: string;
  onClick?: () => void;
}

export function Money({ type, color, onClick }: MoneyProps) {
  if (type === 'card') return card(color, onClick); // 카드일 경우
  if (type === 100 || type === 500) return coin(type, color, onClick); // 동전일 경우
  return bill(type, color, onClick); // 지폐일 경우
}
