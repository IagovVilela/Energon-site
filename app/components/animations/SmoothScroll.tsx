"use client";

import { ReactNode } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

/** Native scroll — Lenis removed for snappier, less “floaty” navigation. */
export function SmoothScroll({ children }: SmoothScrollProps) {
  return <>{children}</>;
}
