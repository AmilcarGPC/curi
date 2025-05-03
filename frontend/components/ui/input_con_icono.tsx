import * as React from "react"

interface InputConIconoProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

const InputConIcono = React.forwardRef<HTMLInputElement, InputConIconoProps>(
  ({ icon, className, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          {...props}
          className={`pl-4 pr-10 py-2 border border-yellow-500 rounded-md bg-transparent text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${className}`}
        />
      </div>
    )
  }
)

InputConIcono.displayName = "InputConIcono"

export { InputConIcono }




