import { bill } from './bill';
import { card } from './card';
import { coin } from './coin';

interface MoneyProps {
  type: 100 | 500 | 1000 | 5000 | 10000 | 'card';
  color: string;
}

export function Money({ type, color }: MoneyProps) {
  if (type === 'card') return card(color); // 카드일 경우
  if (type === 100 || type === 500) return coin(type, color); // 동전일 경우
  return bill(type, color); // 지폐일 경우
}
