"use client"

import * as React from "react"

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";

type TagItem = {
  id: string;
  label: string;
  parentLabel?: string;
};

type HierarchicalTag = {
  id: string;
  label: string;
  expandable: boolean;
  children?: TagItem[];
};

type HierarchicalTagsSelectorProps = {
  tags: HierarchicalTag[];
  onSelectionChange?: (selectedTags: TagItem[]) => void;
};

export function HierarchicalTagsSelector({ tags, onSelectionChange }: HierarchicalTagsSelectorProps) {
  const [selectedTags, setSelectedTags] = useState<TagItem[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const selectedsContainerRef = useRef<HTMLDivElement>(null);

  const removeSelectedTag = (id: string) => {
    const newSelectedTags = selectedTags.filter((tag) => tag.id !== id);
    setSelectedTags(newSelectedTags);
    onSelectionChange?.(newSelectedTags);
  };

  const addSelectedTag = (tag: TagItem) => {
    const newSelectedTags = [...selectedTags, tag];
    setSelectedTags(newSelectedTags);
    onSelectionChange?.(newSelectedTags);
  };

  const isTagSelected = (tagId: string) => {
    return selectedTags.some((tag) => tag.id === tagId);
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleTagClick = (tag: HierarchicalTag | TagItem, parentLabel?: string) => {
    const tagItem: TagItem = {
      id: tag.id,
      label: tag.label,
      parentLabel: parentLabel,
    };

    if (isTagSelected(tag.id)) {
      removeSelectedTag(tag.id);
    } else {
      addSelectedTag(tagItem);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
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
        <AnimatePresence>
          {selectedTags.map((tag) => (
            <motion.div
              key={tag.id}
              className="flex items-center gap-1 pl-3 pr-1 py-1 bg-gradient-to-r from-[#06d6a0]/20 to-[#00b4d8]/20 shadow-md border border-[#06d6a0]/30 h-full shrink-0"
              style={{
                borderRadius: 14,
              }}
              layoutId={`tag-${tag.id}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <motion.span
                layoutId={`tag-${tag.id}-label`}
                className="text-[#06d6a0] font-medium text-sm whitespace-nowrap"
              >
                {tag.parentLabel ? `${tag.parentLabel} > ${tag.label}` : tag.label}
              </motion.span>
              <button
                onClick={() => removeSelectedTag(tag.id)}
                className="p-1 rounded-full"
              >
                <X className="size-5 text-[#06d6a0]" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="bg-[#0a1420] shadow-sm p-4 border border-[#162332] w-full"
        style={{
          borderRadius: 16,
        }}
        layout
      >
        <motion.div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <React.Fragment key={tag.id}>
              {tag.expandable ? (
                // 可展开的分类标签
                <>
                  <motion.button
                    layoutId={`tag-${tag.id}`}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border transition-colors ${
                      expandedCategories.includes(tag.id)
                        ? 'border-[#06d6a0] bg-[#06d6a0]/10 text-white font-bold'
                        : 'border-[#162332] bg-[#0a1420] text-[#f0f9ff] font-semibold hover:border-[#06d6a0] hover:bg-[#162332]'
                    }`}
                    onClick={() => toggleCategory(tag.id)}
                    style={{
                      borderRadius: 14,
                    }}
                  >
                    <motion.span layoutId={`tag-${tag.id}-label`}>
                      {tag.label}
                    </motion.span>
                    <ChevronDown
                      className={`size-3 transition-transform ${
                        expandedCategories.includes(tag.id) ? 'rotate-180' : ''
                      }`}
                    />
                  </motion.button>

                  {/* 子标签（独立占一整行）*/}
                  <AnimatePresence>
                    {expandedCategories.includes(tag.id) && tag.children && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="w-full pl-4 flex flex-wrap gap-2"
                      >
                        {tag.children
                          .filter((child) => !selectedTags.some((selected) => selected.id === child.id))
                          .map((child) => (
                            <motion.button
                              key={child.id}
                              layoutId={`tag-${child.id}`}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-md border transition-colors ${
                                isTagSelected(child.id)
                                  ? 'border-[#06d6a0] bg-[#06d6a0]/20 text-[#06d6a0] font-bold'
                                  : 'border-[#162332] bg-[#0a1420] text-[#d0d0d0] font-medium hover:border-[#06d6a0] hover:text-white hover:font-semibold'
                              }`}
                              onClick={() => handleTagClick(child, tag.label)}
                              style={{
                                borderRadius: 10,
                              }}
                            >
                              <motion.span layoutId={`tag-${child.id}-label`}>
                                {child.label}
                              </motion.span>
                            </motion.button>
                          ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                // 独立标签（不可展开）
                !isTagSelected(tag.id) && (
                  <motion.button
                    layoutId={`tag-${tag.id}`}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded-full border transition-colors ${
                      isTagSelected(tag.id)
                        ? 'border-[#06d6a0] bg-[#06d6a0]/20 text-[#06d6a0] font-bold'
                        : 'border-[#162332] bg-[#0a1420] text-[#f0f9ff] font-semibold hover:border-[#06d6a0] hover:bg-[#162332]'
                    }`}
                    onClick={() => handleTagClick(tag)}
                    style={{
                      borderRadius: 14,
                    }}
                  >
                    <motion.span layoutId={`tag-${tag.id}-label`}>
                      {tag.label}
                    </motion.span>
                  </motion.button>
                )
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

