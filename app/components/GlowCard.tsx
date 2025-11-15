import { useRef, MouseEvent, ReactNode } from "react";

interface CardData {
  title: string;
  description?: string;
  icon?: string;
}

interface GlowCardProps {
  card: CardData;
  index: number;
  children?: ReactNode;
}

const GlowCard: React.FC<GlowCardProps> = ({ card, index, children }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty("--mouse-x", `${x}%`);
    card.style.setProperty("--mouse-y", `${y}%`);

    let angle = Math.atan2(
      e.clientY - (rect.top + rect.height / 2),
      e.clientX - (rect.left + rect.width / 2)
    ) * (180 / Math.PI);
    angle = (angle + 360) % 360;
    card.style.setProperty("--start", `${angle + 90}`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="card rounded-xl p-8 min-h-[280px] backdrop-blur-lg"
      style={{
        "--mouse-x": "50%",
        "--mouse-y": "50%",
      } as React.CSSProperties}
    >
      <div className="glow" />
      {card.icon && (
        <div className="card-background-icon">
          <i className={card.icon}></i>
        </div>
      )}
      <div className="relative z-10 card-content-wrapper">
        <h3>{card.title}</h3>
        <div className="card-description-wrapper">
          {card.description && (
            <p>{card.description}</p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default GlowCard; 