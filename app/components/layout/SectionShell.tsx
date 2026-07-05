import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SectionTone = "default" | "muted" | "contrast";

const toneClasses: Record<SectionTone, string> = {
  default: "bg-background",
  muted: "bg-surface-elevated/60",
  contrast: "bg-surface-elevated",
};

interface SectionShellProps {
  id?: string;
  tone?: SectionTone;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  labelledBy?: string;
  /** Skip top border on first sections after hero */
  bordered?: boolean;
}

export function SectionShell({
  id,
  tone = "default",
  children,
  className,
  containerClassName,
  labelledBy,
  bordered = true,
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative section-padding overflow-x-clip",
        bordered && "border-t border-border",
        toneClasses[tone],
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent"
        aria-hidden
      />
      <div className={cn("container relative", containerClassName)}>{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  index?: string;
  label: string;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
  align?: "left" | "split";
}

export function SectionHeader({
  index,
  label,
  title,
  subtitle,
  className,
  align = "left",
}: SectionHeaderProps) {
  if (align === "split") {
    return (
      <header
        className={cn(
          "mb-10 sm:mb-14 md:mb-16 pb-8 sm:pb-10 border-b border-border/80",
          className
        )}
      >
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-5 flex items-start gap-4 sm:gap-5 min-w-0">
            {index && <SectionIndexMark index={index} />}
            <div className="min-w-0">
              <p className="editorial-label mb-3 sm:mb-4">{label}</p>
              <div className="headline-lg">{title}</div>
            </div>
          </div>
          {subtitle && (
            <div className="lg:col-span-7 text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl lg:max-w-none lg:ml-auto">
              {subtitle}
            </div>
          )}
        </div>
        <div className="mt-6 sm:mt-8 h-0.5 w-10 sm:w-14 bg-primary" aria-hidden />
      </header>
    );
  }

  return (
    <header
      className={cn(
        "mb-10 sm:mb-14 md:mb-16 pb-8 sm:pb-10 border-b border-border/80 max-w-3xl",
        className
      )}
    >
      <div className="flex items-start gap-4 sm:gap-5">
        {index && <SectionIndexMark index={index} />}
        <div className="min-w-0 flex-1">
          <p className="editorial-label mb-3 sm:mb-4">{label}</p>
          <div className="headline-lg">{title}</div>
          {subtitle && (
            <div className="text-muted-foreground text-base sm:text-lg mt-4 leading-relaxed">
              {subtitle}
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 sm:mt-8 h-0.5 w-10 sm:w-14 bg-primary" aria-hidden />
    </header>
  );
}

function SectionIndexMark({ index }: { index: string }) {
  return (
    <span
      className="font-display text-3xl sm:text-4xl md:text-5xl text-primary/20 tabular-nums leading-none shrink-0 select-none"
      aria-hidden
    >
      {index}
    </span>
  );
}

interface SectionBlockProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

/** Bordered inner panel to group related content within a section */
export function SectionBlock({ children, className, title }: SectionBlockProps) {
  return (
    <div
      className={cn(
        "border border-border bg-card/30 p-5 sm:p-6 md:p-8",
        className
      )}
    >
      {title && <p className="editorial-label mb-4 sm:mb-5">{title}</p>}
      {children}
    </div>
  );
}
