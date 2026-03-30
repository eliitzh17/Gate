import { type ReactNode } from "react";

export function renderGoldTitle(text: string): ReactNode[] {
  return text.split("{gold}").map((part, i) => {
    if (i === 0) return part;
    const [gold, rest] = part.split("{/gold}");
    return (
      <span key={i}>
        <span className="text-gold">{gold}</span>
        {rest}
      </span>
    );
  });
}
