interface PriceBadgeProps {
  price: number;
  currency: string;
}

export function PriceBadge({ price, currency }: PriceBadgeProps) {
  const formatted =
    currency === "KRW"
      ? `₩${price.toLocaleString("ko-KR")}`
      : `$${(price / 1000).toFixed(2)}`;

  return (
    <div className="mt-3 inline-flex items-center gap-1">
      <span className="text-2xl font-bold text-white">{formatted}</span>
      {currency === "KRW" && (
        <span className="text-xs text-white/40 self-end mb-1">원</span>
      )}
    </div>
  );
}
