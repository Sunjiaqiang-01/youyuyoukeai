'use client';

import {
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { motion } from 'framer-motion';
import * as React from 'react';

export type TTag = {
  key: string;
  name: string;
};

type SingleSelectTagsProps = {
  tags: TTag[];
  customTag?: (item: TTag) => ReactNode | string;
  onChange?: (value: string) => void;
  defaultValue?: string;
};

export const SingleSelectTags = ({
  tags,
  customTag,
  onChange,
  defaultValue,
}: SingleSelectTagsProps) => {
  const [selected, setSelected] = useState<string>(defaultValue ?? '');

  useEffect(() => {
    if (selected) {
      onChange?.(selected);
    }
  }, [selected, onChange]);

  const onSelect = (key: string) => {
    setSelected(key);
  };

  return (
    <div className='flex w-full flex-wrap gap-3'>
      {tags.map((item) => (
        <Tag
          name={item.key}
          key={item.key}
          isSelected={selected === item.key}
          onClick={() => onSelect(item.key)}
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
      className={`cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
        isSelected
          ? 'bg-gradient-to-r from-[#06d6a0] to-[#00b4d8] text-[#f0f9ff] shadow-lg'
          : 'bg-dark-primary border border-dark-light text-[#d0d0d0] hover:border-[#06d6a0]/50 hover:bg-dark-light'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
};

