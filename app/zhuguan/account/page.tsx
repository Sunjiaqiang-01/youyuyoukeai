"use client";

import { SessionNavBar } from "@/components/ui/sidebar";
import AnimatedInput from "@/components/ui/animated-input";
import { PasswordInput } from "@/components/ui/password-input";
import { SimpleFileUpload } from "@/components/ui/simple-file-upload";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast, Toaster } from "sonner";

export default function ZhuguanAccountPage() {
  // 表单状态
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [intentionStandard, setIntentionStandard] = useState("");
  const [intentionFiles, setIntentionFiles] = useState<File[]>([]);
  const [precisionStandard, setPrecisionStandard] = useState("");
  const [precisionFiles, setPrecisionFiles] = useState<File[]>([]);
  const [salesScript, setSalesScript] = useState<File[]>([]);
  const [salesQA, setSalesQA] = useState<File[]>([]);
  const [productIntro, setProductIntro] = useState<File[]>([]);

  // 表单验证
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!account.trim()) {
      newErrors.account = "账号不能为空";
    }
    if (!password.trim()) {
      newErrors.password = "密码不能为空";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      toast.error("请填写必填项");
      return;
    }

    // 模拟保存成功
    toast.success("配置保存成功！");
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
              👔 主管分身 - 账号配置
            </h1>
            <p className="text-lg text-[#d0d0d0] font-normal mb-8">
              24小时在一线倾听的智能主管
            </p>
          </motion.div>

          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-xl bg-dark-secondary border border-dark-light"
            >
              <div className="space-y-6">
                {/* 1. 飞鱼/厅卡账号密码 */}
                <div className="space-y-4">
                  <h3 className="text-[#06d6a0] font-bold text-lg">飞鱼/厅卡账号配置</h3>
                  
                  <div>
                    <AnimatedInput
                      label="飞鱼管理员账号或厅卡账号"
                      value={account}
                      onChange={setAccount}
                      placeholder="请输入账号"
                      className="w-full"
                      inputClassName="bg-dark-primary border-dark-light text-[#f0f9ff] focus:ring-[#06d6a0] focus:border-[#06d6a0]"
                      labelClassName="text-[#a0a0a0]"
                    />
                    {errors.account && (
                      <p className="text-[#ff6b6b] text-xs mt-1 font-medium">{errors.account}</p>
                    )}
                  </div>

                  <div>
                    <PasswordInput
                      label="密码"
                      value={password}
                      onChange={setPassword}
                      placeholder="请输入密码"
                      required
                    />
                    {errors.password && (
                      <p className="text-[#ff6b6b] text-xs mt-1 font-medium">{errors.password}</p>
                    )}
                  </div>
                </div>

                {/* 2. 意向度评判标准 */}
                <div className="space-y-4 pt-6 border-t border-dark-light">
                  <h3 className="text-[#06d6a0] font-bold text-lg">意向度评判标准</h3>
                  
                  <AnimatedInput
                    label="评判标准描述"
                    value={intentionStandard}
                    onChange={setIntentionStandard}
                    placeholder="请输入意向度评判标准"
                    className="w-full"
                    inputClassName="bg-dark-primary border-dark-light text-[#f0f9ff] focus:ring-[#06d6a0] focus:border-[#06d6a0]"
                    labelClassName="text-[#a0a0a0]"
                  />

                  <div>
                    <label className="text-[#d0d0d0] font-normal text-sm mb-2 block">上传标准文件（可选）</label>
                    <SimpleFileUpload
                      label="选择文件"
                      accept=".pdf,.doc,.docx,.txt"
                      maxFiles={1}
                      onFileSelect={setIntentionFiles}
                    />
                  </div>
                </div>

                {/* 3. 客户精准度评判标准 */}
                <div className="space-y-4 pt-6 border-t border-dark-light">
                  <h3 className="text-[#06d6a0] font-bold text-lg">客户精准度评判标准</h3>
                  
                  <AnimatedInput
                    label="评判标准描述"
                    value={precisionStandard}
                    onChange={setPrecisionStandard}
                    placeholder="请输入客户精准度评判标准"
                    className="w-full"
                    inputClassName="bg-dark-primary border-dark-light text-[#f0f9ff] focus:ring-[#06d6a0] focus:border-[#06d6a0]"
                    labelClassName="text-[#a0a0a0]"
                  />

                  <div>
                    <label className="text-[#d0d0d0] font-normal text-sm mb-2 block">上传标准文件（可选）</label>
                    <SimpleFileUpload
                      label="选择文件"
                      accept=".pdf,.doc,.docx,.txt"
                      maxFiles={1}
                      onFileSelect={setPrecisionFiles}
                    />
                  </div>
                </div>

                {/* 4. 上传销售话术 */}
                <div className="space-y-2 pt-6 border-t border-dark-light">
                  <h3 className="text-[#06d6a0] font-bold text-lg">上传销售话术</h3>
                  <SimpleFileUpload
                    label="选择文件"
                    accept=".pdf,.doc,.docx,.txt"
                    maxFiles={1}
                    onFileSelect={setSalesScript}
                  />
                </div>

                {/* 5. 上传销售百问百答 */}
                <div className="space-y-2 pt-6 border-t border-dark-light">
                  <h3 className="text-[#06d6a0] font-bold text-lg">上传销售百问百答</h3>
                  <SimpleFileUpload
                    label="选择文件"
                    accept=".pdf,.doc,.docx,.txt"
                    maxFiles={1}
                    onFileSelect={setSalesQA}
                  />
                </div>

                {/* 6. 上传产品介绍 */}
                <div className="space-y-2 pt-6 border-t border-dark-light">
                  <h3 className="text-[#06d6a0] font-bold text-lg">上传产品介绍</h3>
                  <SimpleFileUpload
                    label="选择文件"
                    accept=".pdf,.doc,.docx,.txt"
                    maxFiles={1}
                    onFileSelect={setProductIntro}
                  />
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
