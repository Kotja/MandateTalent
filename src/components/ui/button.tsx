import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding font-sans text-[16px] font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-accent hover:text-primary-foreground active:bg-accent",
        outline:
          "border-border bg-background text-foreground hover:border-accent hover:bg-accent hover:text-primary-foreground active:bg-accent",
        secondary:
          "border-border bg-background text-foreground hover:border-accent hover:bg-accent hover:text-primary-foreground",
        ghost:
          "bg-transparent text-foreground hover:bg-accent hover:text-primary-foreground",
        destructive:
          "bg-accent text-primary-foreground hover:bg-accent active:bg-accent",
        link: "text-primary hover:text-accent",
      },
      size: {
        default: "h-11 gap-2 px-5",
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
