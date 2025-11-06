"use client";

import { SessionNavBar } from "@/components/ui/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, User, Sparkles } from "lucide-react";

export default function ChuangyiPage() {
  return (
    <div className="flex h-screen w-screen flex-row bg-dark-primary">
      <SessionNavBar />
      <main className="flex h-screen grow flex-col overflow-auto ml-[3.05rem]">
        <div className="container mx-auto px-8 py-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent-bright via-accent-teal to-accent-cyan bg-clip-text text-transparent">
            ✨ 创意创作师
          </h1>
          <p className="text-lg text-[#d0d0d0] mb-8">
            数字人视频与爆款内容创作
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 定向仿真人 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link href="/chuangyi/digital-human">
                <div className="group p-6 rounded-xl bg-dark-secondary border border-dark-light hover:border-[#06d6a0] transition-all cursor-pointer hover:shadow-lg hover:shadow-[#06d6a0]/20">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-dark-primary group-hover:bg-[#06d6a0]/10 transition-colors">
                        <User className="size-6 text-[#06d6a0]" />
                      </div>
                      <h3 className="text-xl font-bold text-[#06d6a0]">定向仿真人</h3>
                    </div>
                    <ChevronRight className="size-5 text-[#a0a0a0] group-hover:text-[#06d6a0] group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-[#d0d0d0] leading-relaxed">
                    通过参数定制，生成适配产品场景的平面/3D数字人视频
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs rounded-md bg-[#06d6a0]/10 text-[#06d6a0] border border-[#06d6a0]/30">
                      2D/3D数字人
                    </span>
                    <span className="px-2 py-1 text-xs rounded-md bg-[#06d6a0]/10 text-[#06d6a0] border border-[#06d6a0]/30">
                      语音定制
                    </span>
                    <span className="px-2 py-1 text-xs rounded-md bg-[#06d6a0]/10 text-[#06d6a0] border border-[#06d6a0]/30">
                      行为仿真
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
            
            {/* 创意爆款库 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link href="/chuangyi/templates">
                <div className="group p-6 rounded-xl bg-dark-secondary border border-dark-light hover:border-[#06d6a0] transition-all cursor-pointer hover:shadow-lg hover:shadow-[#06d6a0]/20">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-dark-primary group-hover:bg-[#06d6a0]/10 transition-colors">
                        <Sparkles className="size-6 text-[#06d6a0]" />
                      </div>
                      <h3 className="text-xl font-bold text-[#06d6a0]">创意爆款库</h3>
                    </div>
                    <ChevronRight className="size-5 text-[#a0a0a0] group-hover:text-[#06d6a0] group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-[#d0d0d0] leading-relaxed">
                    聚合高热度创意模板，降低创作门槛，快速产出爆款内容
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs rounded-md bg-[#06d6a0]/10 text-[#06d6a0] border border-[#06d6a0]/30">
                      热门模板
                    </span>
                    <span className="px-2 py-1 text-xs rounded-md bg-[#06d6a0]/10 text-[#06d6a0] border border-[#06d6a0]/30">
                      快速产出
                    </span>
                    <span className="px-2 py-1 text-xs rounded-md bg-[#06d6a0]/10 text-[#06d6a0] border border-[#06d6a0]/30">
                      追热点
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

