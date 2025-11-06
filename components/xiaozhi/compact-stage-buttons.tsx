"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CompactStageButtonsProps {
  stages: Array<{
    id: 'stage1' | 'stage2' | 'stage3';
    num: string;
    label: string;
    desc: string;
    count: number;
  }>;
  currentStage: 'stage1' | 'stage2' | 'stage3';
  onStageClick: (stageId: 'stage1' | 'stage2' | 'stage3') => void;
}

export function CompactStageButtons({ stages, currentStage, onStageClick }: CompactStageButtonsProps) {
  return (
    <div className="flex items-center gap-3 mt-3">
      {stages.map((stage, index) => {
        const isActive = currentStage === stage.id;
        
        return (
          <div key={stage.id} className="flex items-center gap-3">
            <motion.button
              onClick={() => onStageClick(stage.id)}
              className={cn(
                "relative flex items-center gap-2.5 px-4 py-2.5 rounded-lg transition-all duration-300",
                "border-2 backdrop-blur-sm",
                isActive
                  ? "bg-[#0a1420]/80 border-[#14b8a6] shadow-lg shadow-[#14b8a6]/20"
                  : "bg-[#0a0a0a]/50 border-[#1a1a1a] hover:border-[#262626] hover:bg-[#0a1420]/40"
              )}
              whileHover={!isActive ? { scale: 1.02 } : undefined}
              whileTap={!isActive ? { scale: 0.98 } : undefined}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {/* 脉动光晕（仅活跃状态，减弱版） */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(20, 184, 166, 0.3)",
                      "0 0 0 8px rgba(20, 184, 166, 0)",
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}

              <div className="relative z-10 flex items-center gap-2.5">
                {/* 数字标识 */}
                <span
                  className={cn(
                    "text-base font-bold",
                    isActive ? "text-[#14b8a6]" : "text-[#606060]"
                  )}
                >
                  {stage.num}
                </span>

                {/* 文字信息 */}
                <div className="text-left min-w-[80px]">
                  <div
                    className={cn(
                      "text-sm font-semibold leading-tight",
                      isActive ? "text-[#14b8a6]" : "text-[#d0d0d0]"
                    )}
                  >
                    {stage.label}·{stage.desc}
                  </div>
                  {isActive && stage.count > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-xs text-[#06b6d4] mt-0.5"
                    >
                      {stage.count}次对话
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.button>

            {/* 连接箭头 */}
            {index < stages.length - 1 && (
              <ArrowRight
                className={cn(
                  "h-4 w-4 transition-colors duration-300",
                  currentStage === stages[index].id || currentStage === stages[index + 1].id
                    ? "text-[#14b8a6]"
                    : "text-[#1a1a1a]"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

