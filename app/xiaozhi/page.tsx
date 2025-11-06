"use client";

import { useState, useEffect } from "react";
import { SessionNavBar } from "@/components/ui/sidebar";
import { ChatArea } from "@/components/xiaozhi/chat-area";
import { ConfigPanel } from "@/components/xiaozhi/config-panel";
import { ChatSessionSidebar } from "@/components/xiaozhi/chat-session-sidebar";
import { cn } from "@/lib/utils";
import {
  Message, 
  ChatStorage,
  loadSessions, 
  saveSessions,
  createNewSession,
  updateSessionMessages,
  deleteSession,
  getCurrentSession
} from "@/lib/chat-storage";

export default function XiaozhiPage() {
  const [currentStage, setCurrentStage] = useState<'stage1' | 'stage2' | 'stage3'>('stage1');
  const [storage, setStorage] = useState<ChatStorage>({ sessions: [], currentSessionId: '' });
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  // 加载会话数据
  useEffect(() => {
    const loadedStorage = loadSessions();
    setStorage(loadedStorage);
    const current = getCurrentSession(loadedStorage);
    if (current) {
      setMessages(current.messages);
      setCurrentStage(current.stage);
    }
  }, []);

  // 保存会话数据
  useEffect(() => {
    if (storage.sessions.length > 0) {
      const updated = updateSessionMessages(storage, storage.currentSessionId, messages);
      setStorage(updated);
      saveSessions(updated);
    }
  }, [messages]);

  // 切换会话
  const handleSessionSelect = (sessionId: string) => {
    const newStorage = { ...storage, currentSessionId: sessionId };
    setStorage(newStorage);
    saveSessions(newStorage);
    
    const session = newStorage.sessions.find(s => s.id === sessionId);
    if (session) {
      setMessages(session.messages);
      setCurrentStage(session.stage);
    }
  };

  // 新建会话
  const handleNewSession = () => {
    const newSession = createNewSession(currentStage);
    const newStorage = {
      sessions: [newSession, ...storage.sessions],
      currentSessionId: newSession.id,
    };
    setStorage(newStorage);
    saveSessions(newStorage);
    setMessages([]);
  };

  // 删除会话
  const handleDeleteSession = (sessionId: string) => {
    const newStorage = deleteSession(storage, sessionId);
    setStorage(newStorage);
    saveSessions(newStorage);
    
    const current = getCurrentSession(newStorage);
    if (current) {
      setMessages(current.messages);
      setCurrentStage(current.stage);
    }
  };

  // 计算各阶段对话数（统计用户消息数量）
  const calculateStageCount = (stage: 'stage1' | 'stage2' | 'stage3'): number => {
    return messages.filter(msg => msg.sender === 'user' && msg.stage === stage).length;
  };

  const stage1Count = calculateStageCount('stage1');
  const stage2Count = calculateStageCount('stage2');
  const stage3Count = calculateStageCount('stage3');

  return (
    <div className="flex h-screen bg-[#050a0f]">
      {/* 左侧：全局导航（悬停展开） */}
      <SessionNavBar />
      
      {/* 历史会话侧边栏（固定在 SessionNavBar 右侧，可折叠） */}
      <ChatSessionSidebar
        sessions={storage.sessions}
        currentSessionId={storage.currentSessionId}
        onSessionSelect={handleSessionSelect}
        onNewSession={handleNewSession}
        onDeleteSession={handleDeleteSession}
        isExpanded={isSidebarExpanded}
        onToggleExpand={() => setIsSidebarExpanded(!isSidebarExpanded)}
      />

      {/* 主内容区：聊天 + 配置（无缝连接，根据侧边栏状态调整） */}
      <div 
        className="fixed top-0 right-0 bottom-0 flex h-screen transition-all duration-300"
        style={{
          left: isSidebarExpanded ? 'calc(3.05rem + 280px)' : 'calc(3.05rem + 80px)'
        }}
      >
        <ChatArea 
          messages={messages}
          setMessages={setMessages}
          currentStage={currentStage}
          onStageClick={setCurrentStage}
          stageCounts={{
            stage1: stage1Count,
            stage2: stage2Count,
            stage3: stage3Count,
          }}
        />

        {/* 右侧：配置面板 */}
        <ConfigPanel currentStage={currentStage} />
      </div>
    </div>
  );
}
