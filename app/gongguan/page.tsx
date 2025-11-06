"use client";

import { SessionNavBar } from "@/components/ui/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Target, Settings } from "lucide-react";

export default function GongguanPage() {
  return (
    <div className="flex h-screen w-screen flex-row bg-dark-primary">
      <SessionNavBar />
      <main className="flex h-screen grow flex-col overflow-auto ml-[3.05rem]">
        <div className="container mx-auto px-8 py-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent-bright via-accent-teal to-accent-cyan bg-clip-text text-transparent">
            👥 公关师
          </h1>
          <p className="text-lg text-[#d0d0d0] mb-8">
            AI挖掘增量用户
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI智能触达 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link href="/gongguan/reach">
                <div className="group p-6 rounded-xl bg-dark-secondary border border-dark-light hover:border-[#06d6a0] transition-all cursor-pointer hover:shadow-lg hover:shadow-[#06d6a0]/20">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-dark-primary group-hover:bg-[#06d6a0]/10 transition-colors">
                        <Target className="size-6 text-[#06d6a0]" />
                      </div>
                      <h3 className="text-xl font-bold text-[#06d6a0]">AI智能触达</h3>
                    </div>
                    <ChevronRight className="size-5 text-[#a0a0a0] group-hover:text-[#06d6a0] group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-[#d0d0d0] leading-relaxed">
                    智能维护私域群、高潜用户、粉丝行为学习等功能
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs rounded-md bg-[#06d6a0]/10 text-[#06d6a0] border border-[#06d6a0]/30">
                      私域群维护
                    </span>
                    <span className="px-2 py-1 text-xs rounded-md bg-[#06d6a0]/10 text-[#06d6a0] border border-[#06d6a0]/30">
                      高潜用户识别
                    </span>
                    <span className="px-2 py-1 text-xs rounded-md bg-[#06d6a0]/10 text-[#06d6a0] border border-[#06d6a0]/30">
                      粉丝行为学习
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
            
            {/* 基础配置 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link href="/gongguan/settings">
                <div className="group p-6 rounded-xl bg-dark-secondary border border-dark-light hover:border-[#06d6a0] transition-all cursor-pointer hover:shadow-lg hover:shadow-[#06d6a0]/20">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-dark-primary group-hover:bg-[#06d6a0]/10 transition-colors">
                        <Settings className="size-6 text-[#06d6a0]" />
                      </div>
                      <h3 className="text-xl font-bold text-[#06d6a0]">基础配置</h3>
                    </div>
                    <ChevronRight className="size-5 text-[#a0a0a0] group-hover:text-[#06d6a0] group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-[#d0d0d0] leading-relaxed">
                    Cookie设置、浏览器指纹配置等环境管理
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs rounded-md bg-[#06d6a0]/10 text-[#06d6a0] border border-[#06d6a0]/30">
                      Cookie管理
                    </span>
                    <span className="px-2 py-1 text-xs rounded-md bg-[#06d6a0]/10 text-[#06d6a0] border border-[#06d6a0]/30">
                      浏览器指纹
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

