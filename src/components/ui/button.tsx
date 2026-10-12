import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex min-h-11 shrink-0 items-center justify-center rounded-[50px] border-0 bg-clip-padding px-5 py-2 text-center font-sans text-[16px] font-medium whitespace-normal transition-[transform,background-color,background-image,box-shadow,border-color] select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "glass-cta",
        outline: "glass-cta glass-cta-quiet",
        secondary: "glass-cta glass-cta-quiet",
        ghost: "border-transparent bg-transparent text-foreground hover:text-foreground",
        destructive: "glass-cta",
        link: "border-transparent text-foreground hover:text-foreground",
      },
      size: {
        default: "h-auto min-h-11 gap-2 px-5",
        xs: "h-8 gap-1 px-2 text-[13px]",
        sm: "h-9 gap-1.5 px-3",
        lg: "h-12 gap-2 px-6",
        icon: "size-11",
        "icon-xs": "size-8",
        "icon-sm": "size-9",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
