"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface RadioOption {
  id: string
  label: string
  value: string
  color: {
    border: string
    dot: string
    glow: string
    shadow: string
  }
}

interface RadioProps {
  options: RadioOption[]
  name?: string
  defaultValue?: string
  onChange?: (value: string) => void
  className?: string
}

export default function Radio({
  options,
  name = "radio-group",
  defaultValue,
  onChange,
  className,
}: RadioProps) {
  const [selectedValue, setSelectedValue] = useState(defaultValue || options[0]?.value)

  const handleChange = (value: string) => {
    setSelectedValue(value)
    onChange?.(value)
  }

  const handleKeyDown = (event: React.KeyboardEvent, value: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      handleChange(value)
    }
  }

  return (
    <div
      className={cn(
        "space-y-6",
        className,
      )}
      role="radiogroup"
      aria-label="Radio selection"
    >
      {options.map((option) => {
        const isSelected = selectedValue === option.value

        return (
          <label key={option.id} className="flex items-center cursor-pointer group select-none" htmlFor={option.id}>
            <div className="relative flex items-center justify-center">
              <input
                id={option.id}
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => handleChange(option.value)}
                onKeyDown={(e) => handleKeyDown(e, option.value)}
                className="sr-only"
                aria-describedby={`${option.id}-description`}
              />

              {/* Custom radio button */}
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 transition-all duration-300 ease-out flex items-center justify-center mr-3 flex-shrink-0",
                  isSelected
                    ? cn(option.color.border)
                    : "border-[#5a5a5a] group-hover:border-[#8a8a8a]",
                )}
              >
                {/* Inner dot */}
                <div
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                    isSelected ? cn(option.color.dot, "scale-100") : "scale-0",
                  )}
                />
              </div>
            </div>

            {/* Label text */}
            <span
              id={`${option.id}-description`}
              className={cn(
                "text-lg font-medium transition-colors duration-300",
                isSelected
                  ? "text-[#f0f9ff] font-bold"
                  : "text-[#d0d0d0] group-hover:text-[#f0f9ff]",
              )}
            >
              {option.label}
            </span>
          </label>
        )
      })}
    </div>
  )
}


