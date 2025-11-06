"use client";

import React, { useState, useEffect } from 'react';
import { 
  MessageSquare,
  Plus,
  Trash2,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  Clock
} from 'lucide-react';
import { ChatSession } from "@/lib/chat-storage";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ChatSessionSidebarProps {
  sessions: ChatSession[];
  currentSessionId: string;
  onSessionSelect: (sessionId: string) => void;
  onNewSession: () => void;
  onDeleteSession?: (sessionId: string) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  className?: string;
}

export function ChatSessionSidebar({
  sessions,
  currentSessionId,
  onSessionSelect,
  onNewSession,
  onDeleteSession,
  isExpanded,
  onToggleExpand,
  className = ""
}: ChatSessionSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Auto-open sidebar on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleSessionClick = (sessionId: string) => {
    onSessionSelect(sessionId);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return "今天";
    if (days === 1) return "昨天";
    if (days < 7) return `${days}天前`;
    if (days < 30) return `${Math.floor(days / 7)}周前`;
    return `${Math.floor(days / 30)}月前`;
  };

  // Filter sessions by search query
  const filteredSessions = sessions.filter(session => 
    session.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-6 left-6 z-50 p-3 rounded-lg bg-[#0a0a0a] shadow-md border border-[#1a1a1a] md:hidden hover:bg-[#121212] transition-all duration-200"
        aria-label="Toggle sidebar"
      >
        {isOpen ? 
          <X className="h-5 w-5 text-[#06d6a0]" /> : 
          <Menu className="h-5 w-5 text-[#06d6a0]" />
        }
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300" 
          onClick={toggleSidebar} 
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 h-full bg-[#0a0a0a] border-r border-[#1a1a1a] transition-all duration-300 ease-in-out flex flex-col",
          // Mobile
          "left-0 z-40",
          isOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop
          "md:translate-x-0 md:left-[3.05rem] md:z-30",
          // Width
          isExpanded ? "w-[280px]" : "w-20",
          className
        )}
      >
        {/* Header with title and collapse button */}
        <div className="flex items-center justify-between p-5 border-b border-[#1a1a1a] bg-[#0a0a0a]">
          {isExpanded && (
            <div className="flex flex-col">
              <span className="font-semibold text-[#f0f9ff] text-base">对话历史</span>
              <span className="text-xs text-[#606060]">{sessions.length} 个会话</span>
            </div>
          )}

          {/* Desktop collapse button */}
          <button
            onClick={onToggleExpand}
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg bg-[#1a1a1a] hover:bg-[#06d6a0] border border-[#262626] hover:border-[#06d6a0] transition-all duration-200 group shadow-md"
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isExpanded ? (
              <ChevronLeft className="h-5 w-5 text-[#06d6a0] group-hover:text-[#0a0a0a] transition-colors duration-200" />
            ) : (
              <ChevronRight className="h-5 w-5 text-[#06d6a0] group-hover:text-[#0a0a0a] transition-colors duration-200" />
            )}
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              onNewSession();
              if (window.innerWidth < 768) {
                setIsOpen(false);
              }
            }}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#06d6a0] to-[#00b4d8] text-[#0a0a0a] font-bold text-sm hover:shadow-lg hover:shadow-[#06d6a0]/30 transition-all duration-300",
              !isExpanded && "px-2"
            )}
            title={!isExpanded ? "新建对话" : undefined}
          >
            <Plus className="h-4 w-4" />
            {isExpanded && <span>新建对话</span>}
          </motion.button>
        </div>

        {/* Search Bar */}
        {isExpanded && (
          <div className="px-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-[#606060]" />
              <input
                type="text"
                placeholder="搜索对话..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#121212] border border-[#1a1a1a] rounded-md text-sm text-[#f0f9ff] placeholder-[#606060] focus:outline-none focus:ring-2 focus:ring-[#06d6a0]/40 focus:border-[#06d6a0] transition-all duration-200"
              />
            </div>
          </div>
        )}

        {/* Sessions List */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto scrollbar-thin scrollbar-thumb-[#06d6a0]/30 scrollbar-track-transparent">
          <ul className="space-y-1">
            <AnimatePresence mode="popLayout">
              {filteredSessions
                .sort((a, b) => b.updatedAt - a.updatedAt)
                .map((session, index) => {
                  const isActive = session.id === currentSessionId;
                  const isHovered = hoveredId === session.id;

                  return (
                    <motion.li
                      key={session.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.03,
                      }}
                      layout
                    >
                      <div
                        className={cn(
                          "relative group rounded-xl p-3 cursor-pointer transition-all duration-200",
                          "border border-transparent",
                          isActive
                            ? "bg-gradient-to-r from-[#06d6a0]/20 to-[#00b4d8]/10 border-[#06d6a0]/40"
                            : "hover:bg-[#1a1a1a] hover:border-[#1a1a1a]",
                          !isExpanded && "px-2"
                        )}
                        onMouseEnter={() => setHoveredId(session.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onClick={() => handleSessionClick(session.id)}
                      >
                        {/* Active Indicator */}
                        {isActive && isExpanded && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#06d6a0] to-[#00b4d8] rounded-r-full"
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                          />
                        )}

                        <div className="flex items-start gap-3">
                          {/* Icon */}
                          <div
                            className={cn(
                              "flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200",
                              isActive
                                ? "bg-gradient-to-br from-[#06d6a0] to-[#00b4d8] text-[#0a0a0a]"
                                : "bg-[#1a1a1a] text-[#06d6a0] group-hover:bg-[#06d6a0]/20"
                            )}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </div>

                          {/* Content */}
                          {isExpanded && (
                            <div className="flex-1 min-w-0">
                              <h3
                                className={cn(
                                  "text-sm font-medium truncate transition-colors duration-200",
                                  isActive
                                    ? "text-[#f0f9ff]"
                                    : "text-[#d0d0d0] group-hover:text-[#f0f9ff]"
                                )}
                              >
                                {session.title}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Clock className="h-3 w-3 text-[#606060]" />
                                <span className="text-xs text-[#606060]">
                                  {formatTime(session.updatedAt)}
                                </span>
                                <span
                                  className={cn(
                                    "text-xs px-1.5 py-0.5 rounded",
                                    "bg-[#1a1a1a] text-[#606060]"
                                  )}
                                >
                                  {session.messages.length}条
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Delete Button */}
                          {isExpanded && onDeleteSession && sessions.length > 1 && (
                            <motion.button
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{
                                opacity: isHovered ? 1 : 0,
                                scale: isHovered ? 1 : 0.8,
                              }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteSession(session.id);
                              }}
                              className="flex-shrink-0 p-1.5 rounded-lg bg-[#ff6b6b]/10 text-[#ff6b6b] hover:bg-[#ff6b6b]/20 transition-all duration-200"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </motion.button>
                          )}
                        </div>

                        {/* Glow Effect */}
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#06d6a0]/5 to-[#00b4d8]/5 -z-10 blur-xl"
                          />
                        )}

                        {/* Tooltip for collapsed state */}
                        {!isExpanded && (
                          <div className="absolute left-full ml-2 px-3 py-2 bg-[#1a1a1a] border border-[#262626] text-[#f0f9ff] text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
                            <div className="font-medium">{session.title}</div>
                            <div className="text-[#606060] text-[10px] mt-0.5">
                              {session.messages.length}条消息 · {formatTime(session.updatedAt)}
                            </div>
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-1.5 h-1.5 bg-[#1a1a1a] border-l border-t border-[#262626] rotate-45" />
                          </div>
                        )}
                      </div>
                    </motion.li>
                  );
                })}
            </AnimatePresence>

            {/* Empty State */}
            {filteredSessions.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12 px-4"
              >
                {searchQuery ? (
                  <>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#1a1a1a] flex items-center justify-center">
                      <Search className="h-8 w-8 text-[#606060]" />
                    </div>
                    <p className="text-sm text-[#606060]">未找到匹配的对话</p>
                    <p className="text-xs text-[#404040] mt-1">
                      尝试其他关键词
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#1a1a1a] flex items-center justify-center">
                      <MessageSquare className="h-8 w-8 text-[#606060]" />
                    </div>
                    <p className="text-sm text-[#606060]">暂无对话</p>
                    <p className="text-xs text-[#404040] mt-1">
                      点击上方按钮创建新对话
                    </p>
                  </>
                )}
              </motion.div>
            )}
          </ul>
        </nav>

        {/* Footer - Session Stats */}
        <div className="mt-auto border-t border-[#1a1a1a]">
          <div className={cn(
            "border-b border-[#1a1a1a] bg-[#0a0a0a]",
            isExpanded ? "p-3" : "py-3 px-2"
          )}>
            {isExpanded ? (
              <div className="flex items-center px-3 py-2 rounded-md bg-[#121212] hover:bg-[#1a1a1a] transition-colors duration-200">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#06d6a0] to-[#00b4d8] flex items-center justify-center text-[#0a0a0a] font-bold text-xs">
                  {sessions.length}
                </div>
                <div className="flex-1 min-w-0 ml-2.5">
                  <p className="text-xs text-[#d0d0d0] font-medium">
                    历史会话
                  </p>
                  <p className="text-xs text-[#606060]">
                    {sessions.reduce((acc, s) => acc + s.messages.length, 0)} 条消息
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#06d6a0] to-[#00b4d8] flex items-center justify-center text-[#0a0a0a] font-bold text-xs">
                  {sessions.length}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

