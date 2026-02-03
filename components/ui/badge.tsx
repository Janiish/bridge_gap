import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2.5 py-1 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-all duration-200 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-700 [a&]:hover:from-blue-700 [a&]:hover:to-blue-800",
        secondary:
          "bg-gradient-to-r from-purple-600 to-purple-700 text-white border-purple-700 [a&]:hover:from-purple-700 [a&]:hover:to-purple-800",
        destructive:
          "bg-red-600 text-white border-red-700 [a&]:hover:bg-red-700 focus-visible:ring-red-600/20 dark:focus-visible:ring-red-400/20",
        outline:
          "border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 [a&]:hover:bg-slate-100 dark:hover:bg-slate-700",
        ghost: "border-transparent text-slate-700 dark:text-slate-300 [a&]:hover:bg-slate-100 dark:hover:bg-slate-700",
        link: "text-blue-600 dark:text-blue-400 border-transparent underline-offset-4 [a&]:hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
