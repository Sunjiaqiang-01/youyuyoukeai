"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StageIndicatorProps {
  currentStage?: 1 | 2 | 3;
  className?: string;
}

const stages = [
  { id: 1, number: "①", label: "破冰", subtitle: "客户信任" },
  { id: 2, number: "②", label: "挖需", subtitle: "客户了解" },
  { id: 3, number: "③", label: "链接", subtitle: "客户约谈" },
];

export function StageIndicator({ currentStage = 1, className }: StageIndicatorProps) {
  return (
    <div className={cn("flex items-center justify-center gap-8", className)}>
      {stages.map((stage, index) => {
        const isActive = currentStage === stage.id;
        const isPassed = currentStage > stage.id;
        
        return (
          <div key={stage.id} className="flex items-center">
            {/* 阶段圆形 */}
            <motion.div
              className="relative flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              {/* 数字圆环 */}
              <motion.div
                className={cn(
                  "relative flex h-16 w-16 items-center justify-center rounded-full border-2 transition-all duration-300",
                  isActive && "border-[#06d6a0] bg-gradient-to-br from-[#06d6a0]/20 to-[#00b4d8]/20",
                  isPassed && "border-[#06d6a0]/50 bg-[#06d6a0]/10",
                  !isActive && !isPassed && "border-[#2a2a2a] bg-[#0d0d0d]"
                )}
                whileHover={{ scale: 1.05 }}
              >
                {/* 激活时的光晕 */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#06d6a0]"
                    initial={{ opacity: 0.3, scale: 1 }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ filter: "blur(10px)" }}
                  />
                )}
                
                {/* 数字 */}
                <span
                  className={cn(
                    "relative z-10 text-2xl font-bold transition-colors duration-300",
                    isActive && "text-[#06d6a0]",
                    isPassed && "text-[#06d6a0]/70",
                    !isActive && !isPassed && "text-[#d0d0d0]"
                  )}
                >
                  {stage.number}
                </span>
              </motion.div>
              
              {/* 标签文字 */}
              <div className="mt-3 text-center">
                <p
                  className={cn(
                    "text-base font-semibold transition-colors duration-300",
                    isActive && "text-[#06d6a0]",
                    isPassed && "text-[#06d6a0]/70",
                    !isActive && !isPassed && "text-[#d0d0d0]"
                  )}
                >
                  {stage.label}
                </p>
                <p
                  className={cn(
                    "text-xs transition-colors duration-300",
                    isActive && "text-[#f0f9ff]",
                    !isActive && "text-[#a0a0a0]"
                  )}
                >
                  {stage.subtitle}
                </p>
              </div>
            </motion.div>
            
            {/* 连接线 */}
            {index < stages.length - 1 && (
              <motion.div
                className="relative mx-4 h-0.5 w-20"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: index * 0.2 + 0.1, duration: 0.3 }}
              >
                <div
                  className={cn(
                    "h-full w-full rounded-full transition-colors duration-300",
                    isPassed ? "bg-[#06d6a0]" : "bg-[#2a2a2a]"
                  )}
                />
                {/* 动画流光效果 */}
                {isPassed && (
                  <motion.div
                    className="absolute inset-0 h-full w-full rounded-full bg-gradient-to-r from-transparent via-[#00f5ff] to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}

