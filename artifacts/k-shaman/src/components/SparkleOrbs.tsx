const ORBS = [
  { top: "8%",  left: "6%",  size: 5,  dur: 6.2, delay: 0 },
  { top: "14%", left: "88%", size: 4,  dur: 8.1, delay: 1.3 },
  { top: "22%", left: "4%",  size: 6,  dur: 7.4, delay: 2.8 },
  { top: "30%", left: "92%", size: 4,  dur: 9.0, delay: 0.5 },
  { top: "38%", left: "9%",  size: 5,  dur: 6.8, delay: 4.1 },
  { top: "45%", left: "95%", size: 3,  dur: 7.2, delay: 1.9 },
  { top: "53%", left: "3%",  size: 6,  dur: 8.5, delay: 3.5 },
  { top: "60%", left: "90%", size: 4,  dur: 6.4, delay: 0.8 },
  { top: "68%", left: "7%",  size: 5,  dur: 9.3, delay: 2.2 },
  { top: "75%", left: "93%", size: 3,  dur: 7.7, delay: 5.0 },
  { top: "82%", left: "5%",  size: 4,  dur: 6.9, delay: 1.6 },
  { top: "88%", left: "85%", size: 5,  dur: 8.8, delay: 3.2 },
  { top: "18%", left: "50%", size: 3,  dur: 7.0, delay: 4.6 },
  { top: "62%", left: "48%", size: 4,  dur: 9.5, delay: 0.3 },
  { top: "5%",  left: "72%", size: 3,  dur: 6.6, delay: 2.5 },
  { top: "92%", left: "40%", size: 5,  dur: 8.3, delay: 1.1 },
];

export function SparkleOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {ORBS.map((orb, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: orb.top,
            left: orb.left,
            width: orb.size,
            height: orb.size,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(216,180,254,0.9) 0%, rgba(167,139,250,0.4) 60%, transparent 100%)",
            animation: `shimmer-orb ${orb.dur}s ease-in-out ${orb.delay}s infinite`,
            opacity: 0,
            boxShadow: `0 0 ${orb.size * 2}px ${orb.size}px rgba(167,139,250,0.3)`,
          }}
        />
      ))}
    </div>
  );
}
