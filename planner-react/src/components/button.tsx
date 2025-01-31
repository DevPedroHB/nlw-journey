import type { ComponentProps, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "rounded-lg px-5 font-medium flex items-center justify-center gap-2 transition-colors",
  variants: {
    variant: {
      primary: "bg-lime-300 text-lime-950 hover:bg-lime-400",
      secondary: "bg-zinc-800 text-zinc-200 hover:bg-zinc-700",
    },
    size: {
      default: "py-2",
      full: "w-full h-11",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

interface IButton
  extends ComponentProps<"button">,
    VariantProps<typeof button> {
  children: ReactNode;
}

export function Button({ children, variant, size, ...rest }: IButton) {
  return (
    <button {...rest} className={button({ variant, size })}>
      {children}
    </button>
  );
}
