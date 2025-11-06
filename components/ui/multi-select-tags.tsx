'use client';

import {
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import * as React from 'react';

export type TTag = {
  key: string;
  name: string;
};

type MultiSelectTagsProps = {
  tags: TTag[];
  customTag?: (item: TTag) => ReactNode | string;
  onChange?: (value: string[]) => void;
  defaultValue?: string[];
};

export const MultiSelectTags = ({
  tags,
  customTag,
  onChange,
  defaultValue,
}: MultiSelectTagsProps) => {
  const [selected, setSelected] = useState<string[]>(defaultValue ?? []);

  useEffect(() => {
    onChange?.(selected);
  }, [selected, onChange]);

  const toggleSelect = (key: string) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <AnimatePresence mode='popLayout'>
      <div className='flex w-full flex-wrap gap-3'>
        {tags.map((item) => (
          <Tag
            name={item.key}
            key={item.key}
            isSelected={selected.includes(item.key)}
            onClick={() => toggleSelect(item.key)}
          >
            {customTag ? (
              customTag(item)
            ) : (
              <motion.span layout className='text-nowrap'>
                {item.name}
              </motion.span>
            )}
          </Tag>
        ))}
      </div>
    </AnimatePresence>
  );
};

type TagProps = PropsWithChildren &
  Pick<HTMLAttributes<HTMLDivElement>, 'onClick'> & {
    name?: string;
    isSelected?: boolean;
  };

export const Tag = ({ children, name, isSelected, onClick }: TagProps) => {
  return (
    <motion.div
      layout
      layoutId={name}
      onClick={onClick}
      className={`cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium transition-all flex items-center gap-2 ${
        isSelected
          ? 'bg-gradient-to-r from-[#06d6a0] to-[#00b4d8] text-[#f0f9ff] shadow-lg'
          : 'bg-dark-primary border border-dark-light text-[#d0d0d0] hover:border-[#06d6a0]/50 hover:bg-dark-light'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      {children}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Check className='size-4' />
        </motion.div>
      )}
    </motion.div>
  );
};

