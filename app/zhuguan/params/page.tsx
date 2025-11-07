"use client";

import { SessionNavBar } from "@/components/ui/sidebar";
import AnimatedInput from "@/components/ui/animated-input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast, Toaster } from "sonner";

export default function ZhuguanParamsPage() {
  // 表单状态
  const [webhookUrl, setWebhookUrl] = useState("");
  const [adAuthId, setAdAuthId] = useState("");

  // 表单验证
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Webhook URL验证
    if (!webhookUrl.trim()) {
      newErrors.webhookUrl = "Webhook地址不能为空";
    } else if (!/^https?:\/\/.+/.test(webhookUrl)) {
      newErrors.webhookUrl = "请输入有效的URL格式（以http://或https://开头）";
    }

    // 广告授权ID验证
    if (!adAuthId.trim()) {
      newErrors.adAuthId = "广告授权ID不能为空";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      toast.error("请填写所有必填项并确保格式正确");
      return;
    }

    // 模拟保存成功
    toast.success("参数配置保存成功！");
  };

  return (
    <div className="flex h-screen w-screen flex-row bg-dark-primary">
      <SessionNavBar />
      <Toaster />
      <main className="flex h-screen grow flex-col overflow-auto ml-[3.05rem]">
        <div className="container mx-auto px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent-bright via-accent-teal to-accent-cyan bg-clip-text text-transparent">
              👔 主管分身 - 参数配置
            </h1>
            <p className="text-lg text-[#d0d0d0] font-normal mb-8">
              24小时在一线倾听的智能主管
            </p>
          </motion.div>

          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-xl bg-dark-secondary border border-dark-light"
            >
              <div className="space-y-6">
                {/* 1. 企业微信机器人webhook地址 */}
                <div>
                  <AnimatedInput
                    label="企业微信机器人Webhook地址"
                    value={webhookUrl}
                    onChange={setWebhookUrl}
                    placeholder="https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=..."
                    className="w-full"
                    inputClassName="bg-dark-primary border-dark-light text-[#f0f9ff] focus:ring-[#06d6a0] focus:border-[#06d6a0]"
                    labelClassName="text-[#a0a0a0]"
                  />
                  {errors.webhookUrl && (
                    <p className="text-[#ff6b6b] text-xs mt-1 font-medium">{errors.webhookUrl}</p>
                  )}
                  <p className="text-[#a0a0a0] font-normal text-xs mt-2">
                    用于接收主管分身的实时通知和报告
                  </p>
                </div>

                {/* 2. 广告授权ID */}
                <div className="pt-4 border-t border-dark-light">
                  <AnimatedInput
                    label="广告授权ID"
                    value={adAuthId}
                    onChange={setAdAuthId}
                    placeholder="请输入广告授权ID"
                    className="w-full"
                    inputClassName="bg-dark-primary border-dark-light text-[#f0f9ff] focus:ring-[#06d6a0] focus:border-[#06d6a0]"
                    labelClassName="text-[#a0a0a0]"
                  />
                  {errors.adAuthId && (
                    <p className="text-[#ff6b6b] text-xs mt-1 font-medium">{errors.adAuthId}</p>
                  )}
                  <p className="text-[#a0a0a0] font-normal text-xs mt-2">
                    用于关联广告投放数据和主管分身分析
                  </p>
                </div>

                {/* 保存按钮 */}
                <div className="pt-6">
                  <Button
                    onClick={handleSave}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#06d6a0] to-[#00b4d8] text-[#f0f9ff] font-semibold text-lg hover:opacity-90 transition-opacity"
                  >
                    保存配置
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
