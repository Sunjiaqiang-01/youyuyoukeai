"use client";

import { SessionNavBar } from "@/components/ui/sidebar";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { AnimatedChartCard } from "@/components/ui/animated-chart-card";
import { AnimatedGradient } from "@/components/ui/animated-gradient-svg";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";

type DemoType = "neon" | "chart" | "gradient";

export default function DemoShowcasePage() {
  const [activeDemo, setActiveDemo] = useState<DemoType>("neon");

  // 模拟数据
  const chartData = [
    { day: 'M', visitors: 60000000 },
    { day: 'T', visitors: 60050000 },
    { day: 'W', visitors: 60100000 },
    { day: 'T', visitors: 60200000 },
    { day: 'F', visitors: 60350000 },
    { day: 'S', visitors: 60500000 },
    { day: 'S', visitors: 60750000 },
  ];

  return (
    <div className="flex h-screen w-screen flex-row bg-dark-primary">
      <SessionNavBar />
      <main className="flex h-screen grow flex-col overflow-auto ml-[3.05rem]">
        <div className="container mx-auto px-8 py-16">
          {/* 顶部标题 */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent-bright via-accent-teal to-accent-cyan bg-clip-text text-transparent">
              🎨 顶级组件展示
            </h1>
            <p className="text-lg text-text-secondary">
              从21st.dev精选的4个最高端组件 · 逐一体验
            </p>
          </div>

          {/* 切换按钮 */}
          <div className="mb-12 flex gap-4">
            <button
              onClick={() => setActiveDemo("neon")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeDemo === "neon"
                  ? "bg-accent-teal text-white shadow-[0_0_30px_rgba(6,214,160,0.3)]"
                  : "bg-dark-secondary text-text-secondary hover:bg-dark-hover border border-dark-light"
              }`}
            >
              方案A · Neon Gradient Card
            </button>
            <button
              onClick={() => setActiveDemo("chart")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeDemo === "chart"
                  ? "bg-accent-cyan text-white shadow-[0_0_30px_rgba(0,180,216,0.3)]"
                  : "bg-dark-secondary text-text-secondary hover:bg-dark-hover border border-dark-light"
              }`}
            >
              方案B · Animated Chart Card
            </button>
            <button
              onClick={() => setActiveDemo("gradient")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeDemo === "gradient"
                  ? "bg-accent-bright text-white shadow-[0_0_30px_rgba(0,245,255,0.3)]"
                  : "bg-dark-secondary text-text-secondary hover:bg-dark-hover border border-dark-light"
              }`}
            >
              方案C · Animated Gradient SVG
            </button>
          </div>

          {/* 组件展示区域 */}
          <AnimatePresence mode="wait">
            {activeDemo === "neon" && (
              <motion.div
                key="neon"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-accent-teal mb-2">✨ Neon Gradient Card</h2>
                  <p className="text-text-secondary">霓虹渐变边框 · 动态旋转光晕 · 极简高级</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <NeonGradientCard>
                    <div className="flex flex-col h-full min-h-[100px] p-3">
                      <h3 className="text-sm font-semibold text-[#06d6a0] mb-auto">完整数据包人群</h3>
                      <motion.div
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                        className="text-3xl font-bold text-white text-center"
                      >
                        <CountUp 
                          end={60000000} 
                          duration={2}
                          separator=","
                          useEasing={true}
                          easingFn={(t, b, c, d) => c * ((t = t / d - 1) * t * t + 1) + b}
                        />
                      </motion.div>
                    </div>
                  </NeonGradientCard>
                  <NeonGradientCard neonColors={{ firstColor: "#00b4d8", secondColor: "#00f5ff" }}>
                    <div className="flex flex-col h-full min-h-[100px] p-3">
                      <h3 className="text-sm font-semibold text-[#00b4d8] mb-auto">本地储存数据包</h3>
                      <motion.div
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                        className="text-3xl font-bold text-white text-center"
                      >
                        <CountUp 
                          end={1000000} 
                          duration={2}
                          separator=","
                          useEasing={true}
                          easingFn={(t, b, c, d) => c * ((t = t / d - 1) * t * t + 1) + b}
                        />
                      </motion.div>
                    </div>
                  </NeonGradientCard>
                  <NeonGradientCard neonColors={{ firstColor: "#00f5ff", secondColor: "#06d6a0" }}>
                    <div className="flex flex-col h-full min-h-[100px] p-3">
                      <h3 className="text-sm font-semibold text-[#00f5ff] mb-auto">耦合数据进度</h3>
                      <motion.div
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                        className="text-2xl font-bold text-white text-center"
                      >
                        <CountUp 
                          end={30.15} 
                          duration={2}
                          decimals={2}
                          suffix="%"
                          useEasing={true}
                          easingFn={(t, b, c, d) => c * ((t = t / d - 1) * t * t + 1) + b}
                        />
                        <span className="mx-2 text-[#8c8c8c]">/</span>
                        <CountUp 
                          end={80000000} 
                          duration={2}
                          separator=","
                          useEasing={true}
                          easingFn={(t, b, c, d) => c * ((t = t / d - 1) * t * t + 1) + b}
                        />
                      </motion.div>
                    </div>
                  </NeonGradientCard>
                </div>
              </motion.div>
            )}

            {activeDemo === "chart" && (
              <motion.div
                key="chart"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-accent-cyan mb-2">📊 Animated Chart Card</h2>
                  <p className="text-text-secondary">SVG曲线动画 · 悬停交互 · 数据可视化</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <AnimatedChartCard 
                    title="完整数据包人群" 
                    value="60,750,000"
                    data={chartData}
                  />
                  <AnimatedChartCard 
                    title="本地储存数据包" 
                    value="1,050,000"
                    data={[
                      { day: 'M', visitors: 1000000 },
                      { day: 'T', visitors: 1010000 },
                      { day: 'W', visitors: 1020000 },
                      { day: 'T', visitors: 1025000 },
                      { day: 'F', visitors: 1035000 },
                      { day: 'S', visitors: 1045000 },
                      { day: 'S', visitors: 1050000 },
                    ]}
                  />
                  <AnimatedChartCard 
                    title="耦合数据进度" 
                    value="30.15%"
                    data={[
                      { day: 'M', visitors: 29.8 },
                      { day: 'T', visitors: 29.9 },
                      { day: 'W', visitors: 30.0 },
                      { day: 'T', visitors: 30.05 },
                      { day: 'F', visitors: 30.1 },
                      { day: 'S', visitors: 30.12 },
                      { day: 'S', visitors: 30.15 },
                    ]}
                  />
                </div>
              </motion.div>
            )}

            {activeDemo === "gradient" && (
              <motion.div
                key="gradient"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-accent-bright mb-2">🌊 Animated Gradient SVG</h2>
                  <p className="text-text-secondary">流动渐变背景 · 多色云团 · 奢华视觉</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* 卡片1 */}
                  <div className="relative overflow-hidden h-[200px] bg-[#0d0d0d] rounded-2xl">
                    <AnimatedGradient colors={["#06d6a0", "#00b4d8", "#00f5ff", "#06d6a0"]} speed={0.05} blur="medium" />
                    <div className="relative z-10 p-8 text-foreground backdrop-blur-sm h-full flex flex-col items-center justify-center">
                      <p className="text-4xl font-bold text-white mb-2">60,000,000</p>
                      <p className="text-sm text-[#8c8c8c]">完整数据包人群</p>
                    </div>
                  </div>
                  {/* 卡片2 */}
                  <div className="relative overflow-hidden h-[200px] bg-[#0d0d0d] rounded-2xl">
                    <AnimatedGradient colors={["#00b4d8", "#00f5ff", "#06d6a0", "#00b4d8"]} speed={0.05} blur="medium" />
                    <div className="relative z-10 p-8 text-foreground backdrop-blur-sm h-full flex flex-col items-center justify-center">
                      <p className="text-4xl font-bold text-white mb-2">1,000,000</p>
                      <p className="text-sm text-[#8c8c8c]">本地储存数据包</p>
                    </div>
                  </div>
                  {/* 卡片3 */}
                  <div className="relative overflow-hidden h-[200px] bg-[#0d0d0d] rounded-2xl">
                    <AnimatedGradient colors={["#00f5ff", "#06d6a0", "#00b4d8", "#00f5ff"]} speed={0.05} blur="medium" />
                    <div className="relative z-10 p-8 text-foreground backdrop-blur-sm h-full flex flex-col items-center justify-center">
                      <p className="text-4xl font-bold text-white mb-2">30.15%</p>
                      <p className="text-sm text-[#8c8c8c]">耦合数据进度</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 底部说明 */}
          <div className="mt-12 p-6 bg-dark-secondary border border-dark-light rounded-xl">
            <h3 className="text-lg font-semibold text-accent-teal mb-3">💡 使用说明</h3>
            <ul className="space-y-2 text-text-secondary">
              <li>• <strong className="text-white">Neon Gradient Card</strong>: 边框会持续旋转变色，光晕跟随旋转，极具视觉冲击力</li>
              <li>• <strong className="text-white">Animated Chart Card</strong>: 悬停到图表的不同区域可查看具体数据，曲线会平滑绘制</li>
              <li>• <strong className="text-white">Animated Gradient SVG</strong>: 背景渐变云团会缓慢流动，营造奢华氛围</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

