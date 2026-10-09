"use client"

import * as React from "react"
import { cn } from "cn"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "font-sans text-[16px] leading-none font-normal text-foreground",
        className,
      )}
      {...props}
    />
  )
}

export { Label }
