"use client";

import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import type { LordIconTrigger } from "./LordIcon";

interface LordIconInnerProps {
  src: string;
  trigger?: LordIconTrigger;
  colors?: {
    primary?: string;
    secondary?: string;
  };
  delay?: number;
  size?: number;
  className?: string;
}

export default function LordIconInner({
  src,
  trigger = "hover",
  colors,
  delay,
  size = 24,
  className,
}: LordIconInnerProps) {
  const iconRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        // @ts-expect-error lordicon element API
        defineElement(lottie.loadAnimation);
      } catch (error) {
        console.error("Erro ao inicializar Lordicon:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (iconRef.current && colors) {
      const element = iconRef.current as HTMLElement & { colors?: string };
      element.colors = `primary:${colors.primary},secondary:${colors.secondary}`;
    }
  }, [colors]);

  return (
    <div
      className={`flex items-center justify-center ${className || ""}`}
      style={{ width: size, height: size }}
    >
      <lord-icon
        ref={iconRef}
        src={src}
        trigger={trigger}
        delay={delay}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lord-icon": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          trigger?: string;
          delay?: number;
          colors?: string;
        },
        HTMLElement
      >;
    }
  }
}
