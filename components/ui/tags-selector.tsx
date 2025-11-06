"use client" 

import * as React from "react"

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

type Tag = {
  id: string;
  label: string;
};

type TagsSelectorProps = {
  tags: Tag[];
  onSelectionChange?: (selectedTags: Tag[]) => void;
};

export function TagsSelector({ tags, onSelectionChange }: TagsSelectorProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const selectedsContainerRef = useRef<HTMLDivElement>(null);

  const removeSelectedTag = (id: string) => {
    const newSelectedTags = selectedTags.filter((tag) => tag.id !== id);
    setSelectedTags(newSelectedTags);
    onSelectionChange?.(newSelectedTags);
  };

  const addSelectedTag = (tag: Tag) => {
    const newSelectedTags = [...selectedTags, tag];
    setSelectedTags(newSelectedTags);
    onSelectionChange?.(newSelectedTags);
  };

  useEffect(() => {
    if (selectedsContainerRef.current) {
      selectedsContainerRef.current.scrollTo({
        left: selectedsContainerRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [selectedTags]);

  return (
    <div className="w-full flex flex-col">
      <motion.h2 layout className="text-xl font-semibold text-[#06d6a0] mb-2">
        已选标签
      </motion.h2>
      <motion.div
        className="w-full flex items-center justify-start gap-1.5 bg-[#0a1420] border border-[#162332] h-14 mt-2 mb-3 overflow-x-auto p-1.5 no-scrollbar"
        style={{
          borderRadius: 16,
        }}
        ref={selectedsContainerRef}
        layout
      >
        {selectedTags.map((tag) => (
          <motion.div
            key={tag.id}
            className="flex items-center gap-1 pl-3 pr-1 py-1 bg-gradient-to-r from-[#06d6a0]/20 to-[#00b4d8]/20 shadow-md border border-[#06d6a0]/30 h-full shrink-0"
            style={{
              borderRadius: 14,
            }}
            layoutId={`tag-${tag.id}`}
          >
            <motion.span
              layoutId={`tag-${tag.id}-label`}
              className="text-[#06d6a0] font-medium"
            >
              {tag.label}
            </motion.span>
            <button
              onClick={() => removeSelectedTag(tag.id)}
              className="p-1 rounded-full hover:bg-[#162332] transition-colors"
            >
              <X className="size-5 text-[#8c8c8c] hover:text-[#06d6a0]" />
            </button>
          </motion.div>
        ))}
      </motion.div>
      {tags.length > selectedTags.length && (
        <motion.div
          className="bg-[#0a1420] shadow-sm p-2 border border-[#162332] w-full"
          style={{
            borderRadius: 16,
          }}
          layout
        >
          <motion.div className="flex flex-wrap gap-2">
            {tags
              .filter(
                (tag) =>
                  !selectedTags.some((selected) => selected.id === tag.id)
              )
              .map((tag) => (
                <motion.button
                  key={tag.id}
                  layoutId={`tag-${tag.id}`}
                  className="flex items-center gap-1 px-4 py-2.5 bg-[#162332] hover:bg-[#2a2a2a] rounded-full shrink-0 transition-colors"
                  onClick={() => addSelectedTag(tag)}
                  style={{
                    borderRadius: 14,
                  }}
                >
                  <motion.span
                    layoutId={`tag-${tag.id}-label`}
                    className="text-[#8c8c8c] font-medium"
                  >
                    {tag.label}
                  </motion.span>
                </motion.button>
              ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

