"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Paperclip, Mic, CornerDownLeft, Sparkles } from "lucide-react";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat-message-list";
import { ChatInput } from "@/components/ui/chat-input";
import { Button } from "@/components/ui/button";
import { CompactStageButtons } from "@/components/xiaozhi/compact-stage-buttons";
import { Message } from "@/lib/chat-storage";

interface ChatAreaProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  currentStage: 'stage1' | 'stage2' | 'stage3';
  onStageClick: (stageId: 'stage1' | 'stage2' | 'stage3') => void;
  stageCounts: {
    stage1: number;
    stage2: number;
    stage3: number;
  };
}

export function ChatArea({ messages, setMessages, currentStage, onStageClick, stageCounts }: ChatAreaProps) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 添加用户消息，自动标记当前阶段
    const userMessage: Message = {
      id: Date.now(),
      content: input,
      sender: "user",
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      stage: currentStage, // 标记当前阶段
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // 模拟AI回复
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        content: "我理解您的需求。基于当前的配置和训练数据，我建议采用渐进式沟通策略，先建立信任关系，再深入了解客户需求。您觉得如何？",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        stage: currentStage, // AI回复也标记当前阶段
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleAttachFile = () => {
    // TODO: 实现文件上传
  };

  const handleMicrophoneClick = () => {
    // TODO: 实现语音输入
  };

  // 准备三阶段数据
  const stages = [
    {
      id: 'stage1' as const,
      num: '①',
      label: '破冰',
      desc: '客户信任',
      count: stageCounts.stage1,
    },
    {
      id: 'stage2' as const,
      num: '②',
      label: '挖需',
      desc: '客户了解',
      count: stageCounts.stage2,
    },
    {
      id: 'stage3' as const,
      num: '③',
      label: '链接',
      desc: '客户约谈',
      count: stageCounts.stage3,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex-1 flex flex-col overflow-hidden bg-[#0a0a0a]"
    >
      {/* 聊天头部 - 融合三阶段按钮 */}
      <div className="px-8 py-4 border-b border-[#1a1a1a] bg-[#0a0a0a]">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl text-[#06d6a0] font-bold flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            销智助理
          </h2>
        </div>
        <p className="text-xs text-[#a0a0a0] font-normal">
          AI拟人化信任破冰 · 24小时智能销售顾问
        </p>
        
        {/* 三阶段按钮 - 紧凑版 */}
        <CompactStageButtons
          stages={stages}
          currentStage={currentStage}
          onStageClick={onStageClick}
        />
      </div>

      {/* 聊天消息区 */}
      <div className="flex-1 overflow-hidden">
        <ChatMessageList>
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              variant={message.sender === "user" ? "sent" : "received"}
            >
              <ChatBubbleAvatar
                className="h-10 w-10 shrink-0"
                fallback={message.sender === "user" ? "你" : "AI"}
              />
              <ChatBubbleMessage
                variant={message.sender === "user" ? "sent" : "received"}
                className={
                  message.sender === "user"
                    ? "bg-gradient-to-r from-[#06d6a0] to-[#14b8a6] text-[#f0f9ff] shadow-lg shadow-[#06d6a0]/20"
                    : "bg-[#1a1a1a] text-[#d0d0d0] border border-[#262626] shadow-md"
                }
              >
                {message.content}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}

          {isLoading && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar
                className="h-10 w-10 shrink-0"
                fallback="AI"
              />
              <ChatBubbleMessage isLoading className="bg-[#1a1a1a] border border-[#262626]" />
            </ChatBubble>
          )}
        </ChatMessageList>
      </div>

      {/* 输入区 */}
      <div className="p-6 border-t border-[#1a1a1a] bg-[#0a0a0a]">
        <form
          onSubmit={handleSubmit}
          className="relative rounded-xl border-0 bg-[#121212] focus-within:ring-2 focus-within:ring-[#06d6a0]/40 transition-all"
        >
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="请输入您的销售场景问题，我会提供专业的销售建议..."
            className="min-h-16 resize-none rounded-xl bg-transparent border-0 px-4 pt-4 pb-14 shadow-none focus-visible:ring-0 text-[#f0f9ff] placeholder:text-[#606060]"
          />
          <div className="absolute bottom-3 left-0 right-0 flex items-center px-4 justify-between">
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={handleAttachFile}
                className="h-9 w-9 text-[#a0a0a0] hover:text-[#06d6a0] hover:bg-[#1a1a1a] transition-all duration-200"
              >
                <Paperclip className="size-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={handleMicrophoneClick}
                className="h-9 w-9 text-[#a0a0a0] hover:text-[#06d6a0] hover:bg-[#1a1a1a] transition-all duration-200"
              >
                <Mic className="size-4" />
              </Button>
            </div>
            <Button 
              type="submit" 
              size="sm" 
              disabled={!input.trim()}
              className="gap-1.5 bg-gradient-to-r from-[#06d6a0] to-[#14b8a6] text-[#f0f9ff] font-semibold hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed px-5 h-9 shadow-lg shadow-[#06d6a0]/20 transition-all duration-200"
            >
              发送
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
