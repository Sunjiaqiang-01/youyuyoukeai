"use client";

import { SessionNavBar } from "@/components/ui/sidebar";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { BubbleCloud } from "@/components/ui/bubble-cloud";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function YupanDashboardPage() {
  // 完整数据包人群：6000万为基础，每次增加几十
  const [fullDataCount, setFullDataCount] = useState(60000000);
  const [fullDataHistory, setFullDataHistory] = useState<number[]>([60000000]);
  
  // 本地储存数据包：100万为基础，每次增加几十
  const [localDataCount, setLocalDataCount] = useState(1000000);
  const [localDataHistory, setLocalDataHistory] = useState<number[]>([1000000]);
  
  // 耦合数据进度：30.15%为基础，零点零几增长
  const [couplingProgress, setCouplingProgress] = useState(30.15);
  const [couplingHistory, setCouplingHistory] = useState<number[]>([30.15]);
  const [couplingDataCount, setCouplingDataCount] = useState(80000000); // 8000万

  // 30个人群特征标签数据（暂时保留，供后续tooltip功能使用）
  const crowdTags = [
    "男性 52%",
    "女性 48%",
    "18-24岁 28%",
    "25-34岁 35%",
    "35-44岁 22%",
    "45岁以上 15%",
    "一线城市 42%",
    "新一线 31%",
    "二线城市 18%",
    "三线及以下 9%",
    "高消费力 38%",
    "中消费力 45%",
    "低消费力 17%",
    "本科学历 48%",
    "硕士及以上 12%",
    "专科学历 28%",
    "高中及以下 12%",
    "已婚 56%",
    "未婚 38%",
    "离异 6%",
    "有子女 52%",
    "无子女 48%",
    "白领 45%",
    "学生 18%",
    "自由职业 12%",
    "企业主 8%",
    "其他职业 17%",
    "月收入1万+ 35%",
    "月收入5千-1万 42%",
    "月收入5千以下 23%",
  ];

  useEffect(() => {
    // 完整数据包动画：每2秒增加20-80
    const fullDataInterval = setInterval(() => {
      setFullDataCount(prev => {
        const newValue = prev + Math.floor(Math.random() * 61) + 20;
        setFullDataHistory(history => {
          const newHistory = [...history, newValue];
          return newHistory.slice(-7); // 保留最近7个数据点
        });
        return newValue;
      });
    }, 2000);

    // 本地储存数据包动画：每3秒增加10-50
    const localDataInterval = setInterval(() => {
      setLocalDataCount(prev => {
        const newValue = prev + Math.floor(Math.random() * 41) + 10;
        setLocalDataHistory(history => {
          const newHistory = [...history, newValue];
          return newHistory.slice(-7);
        });
        return newValue;
      });
    }, 3000);

    // 耦合进度动画：每4秒增加0.01-0.05
    const couplingInterval = setInterval(() => {
      const increment = (Math.random() * 0.04 + 0.01);
      setCouplingProgress(prev => {
        const newProgress = prev + increment;
        const finalProgress = newProgress > 100 ? 100 : parseFloat(newProgress.toFixed(2));
        setCouplingHistory(history => {
          const newHistory = [...history, finalProgress];
          return newHistory.slice(-7);
        });
        return finalProgress;
      });
      // 数据数量同步增长（按比例）
      setCouplingDataCount(prev => prev + Math.floor(Math.random() * 100000) + 50000);
    }, 4000);

    return () => {
      clearInterval(fullDataInterval);
      clearInterval(localDataInterval);
      clearInterval(couplingInterval);
    };
  }, []);

  return (
    <div className="flex h-screen w-screen flex-row bg-dark-primary">
      <SessionNavBar />
      <main className="flex h-screen grow flex-col overflow-auto ml-[3.05rem]">
        <div className="container mx-auto px-8 py-16">
          {/* 顶部标题 */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent-bright via-accent-teal to-accent-cyan bg-clip-text text-transparent">
              🧠 预判军师 - 数据看板
            </h1>
            <p className="text-lg text-text-secondary">
              实时数据分析与人群特征可视化
            </p>
          </div>

          {/* 顶部智能导航栏 */}
          <div className="mb-8 flex gap-4 items-center">
            {/* 全局搜索框 */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="🔍 搜索人群包、标签..."
                className="w-full px-4 py-3 rounded-xl bg-dark-secondary border border-dark-light text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-teal transition-colors"
              />
            </div>
            
            {/* 实时数据状态指示器 */}
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-dark-secondary border border-dark-light">
              <motion.div
                className="w-2 h-2 rounded-full bg-accent-teal"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="text-sm text-text-secondary">AI模型运行中</span>
            </div>
          </div>
          
                 {/* 数据指标卡片 - 使用21st.dev Neon Gradient Card */}
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.5, delay: 0.1 }}
                   className="mb-8"
                 >
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <NeonGradientCard neonColors={{ firstColor: "#06d6a0", secondColor: "#00f5ff" }}>
                       <div className="flex flex-col h-full min-h-[100px] p-3">
                         <h3 className="text-sm font-semibold text-[#06d6a0] mb-auto">完整数据包人群</h3>
                         <motion.div
                           animate={{ scale: [1, 1.02, 1] }}
                           transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                           className="text-3xl font-bold text-white text-center"
                         >
                           <CountUp 
                             end={fullDataCount} 
                             duration={2}
                             separator=","
                             preserveValue={true}
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
                             end={localDataCount} 
                             duration={2}
                             separator=","
                             preserveValue={true}
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
                             end={couplingProgress} 
                             duration={2}
                             decimals={2}
                             suffix="%"
                             preserveValue={true}
                             useEasing={true}
                             easingFn={(t, b, c, d) => c * ((t = t / d - 1) * t * t + 1) + b}
                           />
                           <span className="mx-2 text-[#8c8c8c]">/</span>
                           <CountUp 
                             end={couplingDataCount} 
                             duration={2}
                             separator=","
                             preserveValue={true}
                             useEasing={true}
                             easingFn={(t, b, c, d) => c * ((t = t / d - 1) * t * t + 1) + b}
                           />
                         </motion.div>
                       </div>
                     </NeonGradientCard>
                   </div>
                 </motion.div>

          {/* 人群特征云图 - 气泡云图 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="rounded-xl bg-dark-secondary border border-dark-light overflow-hidden"
          >
            <div className="flex items-center justify-between px-8 pt-6 pb-4">
              <h3 className="text-xl font-semibold text-accent-teal">人群特征云图</h3>
              <p className="text-xs text-text-secondary">30个维度 · 浮动气泡可视化</p>
            </div>
            <div className="h-[600px] relative flex items-center justify-center bg-dark-primary p-8">
              <BubbleCloud tags={crowdTags} width={1200} height={550} />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

