import React, { useEffect, useState } from 'react';
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';
import { Database, HardDrive, Activity } from 'lucide-react';
import { motion, useSpring, useTransform } from 'framer-motion';

// --- 数据类型定义 ---
interface AnalyticsCardData {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: any;
  chartData: { name: string; uv: number }[];
}

interface AnalyticsDashboardProps {
  fullDataCount: number;
  localDataCount: number;
  couplingProgress: number;
  fullDataChartData: { name: string; uv: number }[];
  localDataChartData: { name: string; uv: number }[];
  couplingChartData: { name: string; uv: number }[];
}

// --- CUSTOM TOOLTIP ---
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-lg border border-[#06d6a0]/20
                   bg-[#000000]/90 p-2 text-sm
                   shadow-md backdrop-blur-sm"
      >
        <p className="text-[#06d6a0]">{`数值: ${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

// --- ANIMATED NUMBER COMPONENT ---
function AnimatedNumber({ value, isPercentage = false }: { value: string; isPercentage?: boolean }) {
  // 提取数值（移除千分位逗号和百分号）
  const numericValue = parseFloat(value.replace(/,/g, '').replace(/%/g, ''));
  
  const spring = useSpring(numericValue, {
    stiffness: 50,
    damping: 30,
    mass: 1,
  });

  const display = useTransform(spring, (latest) => {
    if (isPercentage) {
      return latest.toFixed(2) + '%';
    }
    return Math.floor(latest).toLocaleString();
  });

  return (
    <motion.p className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-[#00f5ff] via-[#06d6a0] to-[#00b4d8] bg-clip-text text-transparent">
      {display}
    </motion.p>
  );
}

// --- STAT CARD COMPONENT ---
function StatCard({ title, value, change, changeType, icon: Icon, chartData }: any) {
  const chartColor = changeType === 'positive' ? '#06d6a0' : '#ff6b6b';
  const isPercentage = value.includes('%');

  return (
    <div
      className="group rounded-2xl border border-[#2a2a2a]
                 bg-[#0d0d0d] p-5 shadow-lg
                 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                 hover:border-[#06d6a0]/50 hover:bg-[#1a1a1a]
                 hover:shadow-[0_0_30px_rgba(6,214,160,0.15)]
                 transform hover:-translate-y-2 cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium text-[#8c8c8c]">{title}</h3>
        <Icon className="h-5 w-5 text-[#06d6a0]" />
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div className="flex flex-col">
          <AnimatedNumber value={value} isPercentage={isPercentage} />
          <p
            className={`mt-1 text-xs ${
              changeType === 'positive' ? 'text-[#06d6a0]' : 'text-[#ff6b6b]'
            }`}
          >
            {change}
          </p>
        </div>
        <div className="h-12 w-28">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id={`colorUv-${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.6} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: 'rgba(6,214,160,0.2)',
                  strokeWidth: 1,
                  strokeDasharray: '3 3',
                }}
              />
              <Line
                type="basis"
                dataKey="uv"
                stroke={chartColor}
                strokeWidth={2.5}
                dot={false}
                fillOpacity={1}
                fill={`url(#colorUv-${title})`}
                animationDuration={1000}
                animationEasing="ease-in-out"
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// --- DASHBOARD COMPONENT ---
export default function AnalyticsDashboard({
  fullDataCount,
  localDataCount,
  couplingProgress,
  fullDataChartData,
  localDataChartData,
  couplingChartData,
}: AnalyticsDashboardProps) {
  const analyticsData: AnalyticsCardData[] = [
    {
      title: '完整数据包人群',
      value: fullDataCount.toLocaleString(),
      change: '实时增长中',
      changeType: 'positive',
      icon: Database,
      chartData: fullDataChartData,
    },
    {
      title: '本地储存数据包',
      value: localDataCount.toLocaleString(),
      change: '持续累积',
      changeType: 'positive',
      icon: HardDrive,
      chartData: localDataChartData,
    },
    {
      title: '耦合数据进度',
      value: `${couplingProgress.toFixed(2)}%`,
      change: '稳步提升',
      changeType: 'positive',
      icon: Activity,
      chartData: couplingChartData,
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {analyticsData.map((data) => (
          <StatCard
            key={data.title}
            title={data.title}
            value={data.value}
            change={data.change}
            changeType={data.changeType}
            icon={data.icon}
            chartData={data.chartData}
          />
        ))}
      </div>
    </div>
  );
}

