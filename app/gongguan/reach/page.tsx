"use client";

import { SessionNavBar } from "@/components/ui/sidebar";

export default function GongguanReachPage() {
  return (
    <div className="flex h-screen w-screen flex-row bg-gradient-to-b from-dark-primary to-dark-secondary">
      <SessionNavBar />
      <main className="flex h-screen grow flex-col overflow-auto ml-[3.05rem]">
        <div className="container mx-auto px-8 py-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent-cyan to-accent-teal bg-clip-text text-transparent">
            👥 公关师 - AI智能触达
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            智能化用户触达与维护
          </p>
          
          <div className="p-8 rounded-xl bg-dark-secondary border border-dark-light">
            <p className="text-text-secondary">功能开发中...</p>
          </div>
        </div>
      </main>
    </div>
  );
}

