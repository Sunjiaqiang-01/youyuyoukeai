import { useRef, useState } from "react"
import { motion } from "framer-motion"

const SPRING = {
  type: "spring",
  // Damping controls how quickly the spring comes to rest (higher = less oscillation)
  damping: 10,
  // Mass affects the weight of the spring (higher = slower, heavier motion)
  mass: 0.75,
  // Stiffness controls the tension of the spring (higher = snappier, lower = softer)
  stiffness: 100,
}

const LABEL_TRANSITION = {
  duration: 0.28,
  ease: [0.4, 0, 0.2, 1] as [number, number, number, number], // standard material easing
}

export interface AnimatedInputProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  label: string
  placeholder?: string
  disabled?: boolean
  className?: string
  inputClassName?: string
  labelClassName?: string
  icon?: React.ReactNode
}

export default function AnimatedInput({
  value,
  defaultValue = "",
  onChange,
  label,
  placeholder = "",
  disabled = false,
  className = "",
  inputClassName = "",
  labelClassName = "",
  icon,
}: AnimatedInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const isControlled = value !== undefined
  const val = isControlled ? value : internalValue
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const isFloating = !!val || isFocused

  return (
    <div className={`relative flex items-center ${className}`}>
      {icon && (
        <span className="absolute top-1/2 left-3 -translate-y-1/2">{icon}</span>
      )}
      <input
        ref={inputRef}
        type="text"
        value={val}
        onChange={(e) => {
          if (!isControlled) setInternalValue(e.target.value)
          onChange?.(e.target.value)
        }}
        placeholder={isFloating ? placeholder : ""}
        disabled={disabled}
        className={`peer w-full rounded-lg border border-dark-light bg-dark-primary px-3 py-2 text-sm text-[#d0d0d0] transition outline-none focus:ring-1 focus:ring-[#06d6a0] focus:border-[#06d6a0] ${icon ? "pl-10" : ""} ${inputClassName}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <motion.label
        className={`pointer-events-none absolute left-3 origin-left rounded-sm bg-dark-primary px-1 text-sm text-[#a0a0a0] ${labelClassName}`}
        animate={
          isFloating
            ? {
                top: "-10px",
                y: 0,
                scale: 0.85,
                color: "#06d6a0",
              }
            : { top: "50%", y: "-50%", scale: 1, color: "#a0a0a0" }
        }
        transition={LABEL_TRANSITION}
        style={{
          zIndex: 2,
        }}
      >
        {label}
      </motion.label>
    </div>
  )
}

