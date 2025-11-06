"use client";

import {
  ComponentPropsWithoutRef,
  Dispatch,
  ReactNode,
  SetStateAction,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
} from "react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";

type SelectOptionProps = {
  value: string;
  children: string;
  setValue?: Dispatch<SetStateAction<string>>;
  handleSelection?: (text: string) => void;
  closeDropdown?: () => void;
};

export function Select({
  children,
  className,
  placeholder,
  setValue,
  ...props
}: {
  children: ReactNode;
  placeholder: string;
  className?: string;
  setValue: Dispatch<SetStateAction<string>>;
} & ComponentPropsWithoutRef<"button">) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [displayText, setDisplayText] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeDropdown = () => setIsOpened(false);

  // Handler for selection that updates both text and index
  const handleSelection = (text: string, index: number) => {
    setDisplayText(text);
    setSelectedIndex(index);
  };

  const childrenArray = Array.isArray(children) ? children : [children];

  const childrenWithProps = childrenArray.map((child, index) => {
    if (isValidElement<SelectOptionProps>(child)) {
      return cloneElement(child, {
        setValue,
        handleSelection: (text: string) => handleSelection(text, index),
        closeDropdown,
        key: child.props.value || index,
      });
    }
    return child;
  });

  return (
    <div className="relative" ref={selectRef}>
      <button
        onClick={() => setIsOpened(!isOpened)}
        className={cn(
          "h-[42px] flex items-center gap-2 rounded-lg py-2 px-3 bg-dark-primary text-[#d0d0d0] border border-dark-light outline-none hover:bg-[#1a1a1a] transition ease-in-out duration-200 cursor-pointer min-w-44 justify-between focus:ring-1 focus:ring-[#06d6a0] focus:border-[#06d6a0] overflow-hidden",
          className
        )}
        {...props}
      >
        <div className="relative flex-1 h-full flex items-center">
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-start transition-opacity duration-200 text-sm",
              displayText ? "opacity-0" : "opacity-100"
            )}
          >
            {placeholder}
          </div>

          <div
            className={cn(
              "absolute inset-0 flex items-center justify-start text-sm transition-opacity duration-200",
              displayText ? "opacity-100" : "opacity-0"
            )}
          >
            <span className={cn(selectedIndex >= 0 && "text-[#06d6a0]")}>
              {displayText}
            </span>
          </div>
        </div>

        <CaretDown
          className={cn(
            "transition-transform duration-200",
            isOpened && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {isOpened && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 left-0 right-0 border border-dark-light text-[#d0d0d0] rounded-xl p-1 bg-dark-secondary shadow-lg z-50"
          >
            {childrenWithProps}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SelectOption({
  children,
  value,
  setValue,
  handleSelection,
  closeDropdown,
}: SelectOptionProps) {
  return (
    <div
      className="hover:bg-[#06d6a0]/10 p-2 px-5 rounded-xl cursor-pointer transition ease-in-out duration-200"
      onClick={() => {
        setValue?.(value);
        handleSelection?.(children);
        closeDropdown?.();
      }}
    >
      {children}
    </div>
  );
}

