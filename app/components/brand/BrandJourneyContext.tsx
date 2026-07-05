"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { useReducedMotion } from "framer-motion";
import { BrandMark } from "./BrandMark";

interface BrandJourneyContextValue {
  startRef: RefObject<HTMLDivElement>;
  endRef: RefObject<HTMLDivElement>;
  landed: boolean;
  journeying: boolean;
}

const BrandJourneyContext = createContext<BrandJourneyContextValue | null>(null);

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function docY(el: HTMLElement) {
  return el.getBoundingClientRect().top + window.scrollY;
}

function BrandScrollCompanion({
  onLandedChange,
  onJourneyingChange,
}: {
  onLandedChange: (landed: boolean) => void;
  onJourneyingChange: (journeying: boolean) => void;
}) {
  const ctx = useContext(BrandJourneyContext);
  const prefersReducedMotion = useReducedMotion();
  const companionRef = useRef<HTMLDivElement>(null);
  const originRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);
  const landedRef = useRef(false);
  const journeyingRef = useRef(false);

  const setLanded = useCallback(
    (value: boolean) => {
      if (landedRef.current === value) return;
      landedRef.current = value;
      onLandedChange(value);
    },
    [onLandedChange]
  );

  const setJourneying = useCallback(
    (value: boolean) => {
      if (journeyingRef.current === value) return;
      journeyingRef.current = value;
      onJourneyingChange(value);
    },
    [onJourneyingChange]
  );

  const update = useCallback(() => {
    const node = companionRef.current;
    if (!ctx?.startRef.current || !ctx?.endRef.current || !node || prefersReducedMotion) return;

    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!desktop) {
      node.style.display = "none";
      setJourneying(false);
      setLanded(true);
      return;
    }

    const startEl = ctx.startRef.current;
    const endEl = ctx.endRef.current;

    if (!originRef.current || window.scrollY <= 12) {
      const start = startEl.getBoundingClientRect();
      originRef.current = {
        x: start.left + start.width / 2,
        y: start.top + start.height / 2,
      };
    }

    const origin = originRef.current;
    const end = endEl.getBoundingClientRect();
    const endX = end.left + end.width / 2;
    const endY = end.top + end.height / 2;

    const journeyStartScroll = Math.max(docY(startEl) - window.innerHeight * 0.2, 0);
    const journeyEndScroll = docY(endEl) - 140;
    const raw =
      (window.scrollY - journeyStartScroll) / Math.max(journeyEndScroll - journeyStartScroll, 1);
    const progress = easeInOutCubic(clamp(raw, 0, 1));

    if (progress >= 0.995) {
      node.style.display = "none";
      setLanded(true);
      setJourneying(false);
      return;
    }

    setLanded(false);
    const isJourneying = window.scrollY > 12;
    setJourneying(isJourneying);

    if (!isJourneying) {
      node.style.display = "none";
      return;
    }

    const x = origin.x + (endX - origin.x) * progress;
    const y = origin.y + (endY - origin.y) * progress;
    const scale = 0.42 + progress * 0.58;

    node.style.display = "block";
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    node.style.transform = `translate(-50%, -50%) scale(${scale})`;
    node.style.opacity = "1";
    node.style.zIndex = "55";
  }, [ctx, prefersReducedMotion, setJourneying, setLanded]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setLanded(true);
      setJourneying(false);
      return;
    }

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    const onResize = () => {
      originRef.current = null;
      onScroll();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [update, prefersReducedMotion, setJourneying, setLanded]);

  return (
    <div
      ref={companionRef}
      className="fixed z-[45] pointer-events-none hidden"
      style={{ left: 0, top: 0 }}
      aria-hidden
    >
      <BrandMark size="sm" showFrames={false} />
    </div>
  );
}

export function BrandJourneyProvider({ children }: { children: ReactNode }) {
  const startRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [landed, setLanded] = useState(false);
  const [journeying, setJourneying] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setLanded(true);
      setJourneying(false);
    }
  }, [prefersReducedMotion]);

  return (
    <BrandJourneyContext.Provider value={{ startRef, endRef, landed, journeying }}>
      {children}
      <BrandScrollCompanion onLandedChange={setLanded} onJourneyingChange={setJourneying} />
    </BrandJourneyContext.Provider>
  );
}

export function useBrandJourney() {
  const ctx = useContext(BrandJourneyContext);
  if (!ctx) {
    throw new Error("useBrandJourney must be used within BrandJourneyProvider");
  }
  return ctx;
}
