// 카드 컴포넌트
export const card = (color: string, onClick?: () => void) => (
  <div
    className={`bg-${color}-500 text-white py-2 rounded hover:brightness-90 flex items-center justify-center`}
    onClick={onClick}
  >
    카드
  </div>
);
