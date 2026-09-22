import { useEffect, useRef, useState } from "react";
import { personal } from "../data/portfolio";

/**
 * Splash intro — name revealed character-by-character with orbiting rings
 * and floating geometric shapes. Fades/blur-zooms away on completion.
 */
export default function SplashScreen({ onFinish }) {
  const [phase, setPhase] = useState("enter"); // enter | exit
  const [namesReady, setNamesReady] = useState(false);
  const timerRef = useRef([]);

  const name1 = personal.firstName.split(" ")[0]; // DARA
  const name2 = personal.firstName.split(" ").slice(1).join(" "); // RAMANANDHU

  useEffect(() => {
    // After first paint, trigger name reveal
    const t1 = setTimeout(() => setNamesReady(true), 200);
    // Begin exit after names have had time to show
    const t2 = setTimeout(() => setPhase("exit"), 2600);
    // Notify parent once fully gone
    const t3 = setTimeout(() => onFinish?.(), 3600);

    timerRef.current = [t1, t2, t3];
    return () => timerRef.current.forEach(clearTimeout);
  }, [onFinish]);

  return (
    <div
      aria-hidden="true"
      className={`splash fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-cosmic ${
        phase === "exit" ? "splash-exit" : ""
      }`}
    >
      {/* rotating orbit rings */}
      <div className="relative flex items-center justify-center">
        <div className="splash-ring absolute h-[280px] w-[280px] rounded-full sm:h-[360px] sm:w-[360px]">
          <div className="ring-orbit absolute inset-0 rounded-full border border-accent-purple/30 animate-spin [animation-duration:4s]" />
          <div
            className="ring-orbit absolute inset-[15px] rounded-full border border-accent-cyan/25 animate-spin [animation-duration:6s] [animation-direction:reverse]"
          />
          <div
            className="ring-orbit absolute inset-[30px] rounded-full border border-accent-pink/20 animate-spin [animation-duration:8s]"
          />
        </div>

        {/* floating shapes */}
        <div className="splash-geo splash-geo-1 absolute h-[60px] w-[60px] border border-accent-purple top-[15%] left-[8%] rotate-45" />
        <div className="splash-geo splash-geo-2 absolute h-[40px] w-[40px] rounded-full border border-accent-cyan bottom-[22%] right-[10%]" />
        <div className="splash-geo splash-geo-3 absolute h-[50px] w-[50px] border border-accent-pink top-[22%] right-[12%] [clip-path:polygon(50%_0%,0%_100%,100%_100%)]" />

        {/* name */}
        <div className="relative text-center">
          <div className="flex justify-center overflow-hidden">
            {name1.split("").map((char, i) => (
              <span
                key={`a-${i}`}
                className={`font-heading bg-gradient-to-r from-white to-violet-300 bg-clip-text text-transparent text-5xl font-extrabold tracking-[0.15em] sm:text-7xl ${
                  namesReady ? "animate-char-reveal" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                {char}
              </span>
            ))}
          </div>
          <div className="mt-2 flex justify-center overflow-hidden">
            {name2.split("").map((char, i) => (
              <span
                key={`b-${i}`}
                className={`font-heading bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent text-3xl font-bold tracking-[0.28em] sm:text-5xl ${
                  namesReady ? "animate-char-reveal" : "opacity-0"
                }`}
                style={{ animationDelay: `${0.5 + i * 0.05}s` }}
              >
                {char}
              </span>
            ))}
          </div>

          <p
            className={`mt-4 flex items-center justify-center gap-3 text-sm font-semibold tracking-widest text-slate-400 uppercase transition-all duration-500 ${
              namesReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
            style={{ transitionDelay: "1.1s" }}
          >
            <span>{personal.role.split("|")[0].trim()}</span>
            <span className="text-accent-purple font-extrabold">✦</span>
          </p>
        </div>
      </div>
    </div>
  );
}