"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useId, useState } from "react";

interface PasswordInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  required?: boolean;
}

export function PasswordInput({
  label,
  placeholder = "Password",
  value,
  onChange,
  className = "",
  required = false,
}: PasswordInputProps) {
  const id = useId();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <Label htmlFor={id}>{label}{required && <span className="text-[#ff6b6b]"> *</span>}</Label>}
      <div className="relative">
        <Input
          id={id}
          className="pe-9"
          placeholder={placeholder}
          type={isVisible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          required={required}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-[#a0a0a0] outline-offset-2 transition-colors hover:text-[#06d6a0] hover:bg-transparent focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#06d6a0]/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={toggleVisibility}
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-pressed={isVisible}
          aria-controls="password"
        >
          {isVisible ? (
            <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
          ) : (
            <Eye size={16} strokeWidth={2} aria-hidden="true" />
          )}
        </Button>
      </div>
    </div>
  );
}

