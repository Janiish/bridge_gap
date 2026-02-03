import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-slate-400 dark:placeholder:text-slate-500 selection:bg-blue-600 selection:text-white dark:bg-slate-800/50 border-slate-300 dark:border-slate-600 h-10 w-full min-w-0 rounded-lg border bg-white px-4 py-2 text-base shadow-sm transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20",
        "aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-400/20 aria-invalid:border-red-500 dark:aria-invalid:border-red-400",
        className
      )}
      {...props}
    />
  )
}

export { Input }
