"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useRef } from "react";

const LordIconInner = dynamic(() => import("./LordIconInner"), {
  ssr: false,
  loading: () => <span className="inline-block bg-muted/30 animate-pulse rounded" style={{ width: 24, height: 24 }} />,
});

export type LordIconTrigger =
  | "hover"
  | "click"
  | "loop"
  | "loop-on-hover"
  | "morph"
  | "boomerang";

interface LordIconProps {
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

export default function LordIcon(props: LordIconProps) {
  return <LordIconInner {...props} />;
}

