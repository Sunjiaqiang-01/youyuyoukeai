"use client";

import * as React from 'react';
import { BarChart2, ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

const weeklyData = [
  { day: 'M', visitors: 120 },
  { day: 'T', visitors: 180 },
  { day: 'W', visitors: 150 },
  { day: 'T', visitors: 220 },
  { day: 'F', visitors: 300 },
  { day: 'S', visitors: 250 },
  { day: 'S', visitors: 280 },
];

const chartWidth = 240;
const chartHeight = 100;

interface AnimatedChartCardProps {
  title: string;
  value: string;
  data: { day: string; visitors: number }[];
}

export const AnimatedChartCard = ({ title, value, data = weeklyData }: AnimatedChartCardProps) => {
  const [activeDay, setActiveDay] = React.useState(data[data.length - 1]);

  // Convert data to SVG path string
  const maxVisitors = Math.max(...data.map(d => d.visitors));
  const pathData = data.map((d, i) => {
    const x = (i / (data.length - 1)) * chartWidth;
    const y = chartHeight - (d.visitors / maxVisitors) * chartHeight;
    return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
  }).join(' ');

  return (
    <motion.div
      className="bg-[#0d0d0d] p-3 rounded-3xl w-full space-y-3 shadow-md border border-[#2a2a2a]"
      initial="collapsed"
      whileHover="expanded"
    >
      <div className="bg-[#1a1a1a] rounded-xl px-4 pt-4 pb-2 shadow-sm flex flex-col">
        <div className='h-16'>
          <AnimatePresence mode="wait">
              <motion.div
                key={activeDay.day + activeDay.visitors}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="flex items-baseline gap-2"
              >
                  <p className="text-3xl font-bold text-[#ffffff]">{activeDay.visitors}</p>
                  <p className="text-sm font-medium text-[#8c8c8c]">{title}</p>
              </motion.div>
          </AnimatePresence>
        </div>
        <div className="relative -ml-1">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 10}`} className="w-full h-auto">
            <motion.path
              d={pathData}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#06d6a0" />
                <stop offset="100%" stopColor="#00b4d8" />
              </linearGradient>
            </defs>
             {/* Interaction layer */}
            {data.map((d, i) => (
                <rect key={i} onMouseEnter={() => setActiveDay(d)}
                  x={(i / (data.length - 1)) * chartWidth - (chartWidth / (data.length - 1))/2}
                  y="0"
                  width={chartWidth / (data.length - 1)}
                  height={chartHeight + 10}
                  fill="transparent"
                />
            ))}
          </svg>
        </div>
        <div className="flex justify-between mt-1">
          {data.map((d) => <span key={d.day} className="text-xs font-medium text-[#5a5a5a]">{d.day}</span>)}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="size-5 rounded-full bg-[#06d6a0] text-white flex items-center justify-center">
          <BarChart2 className="size-3" />
        </div>
        <span className="grid">
          <motion.span className="text-sm font-medium text-[#8c8c8c] row-start-1 col-start-1" variants={{collapsed: {opacity: 1}, expanded: {opacity: 0}}}>Weekly Data</motion.span>
          <motion.a href="#" className="text-sm font-medium text-[#06d6a0] flex items-center gap-1 cursor-pointer select-none row-start-1 col-start-1" variants={{collapsed: {opacity: 0}, expanded: {opacity: 1}}}>View Details <ArrowUpRight className="size-4" /></motion.a>
        </span>
      </div>
    </motion.div>
  );
};

