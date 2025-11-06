// 聊天历史持久化工具（多会话版本）
export interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
  stage: 'stage1' | 'stage2' | 'stage3';
}

export interface ChatSession {
  id: string;
  title: string;
  stage: 'stage1' | 'stage2' | 'stage3';
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

export interface ChatStorage {
  sessions: ChatSession[];
  currentSessionId: string;
}

const STORAGE_KEY = 'xiaozhi_chat_sessions';

// 初始化2个历史对话（用户提供的内容）
export const initialMessages: Message[] = [
  {
    id: 1,
    content: "您好！我是有鱼有客AI销售助理，很高兴为您服务。我可以帮您了解我们的产品、价格方案、回答常见问题，或者提供销售建议。请问有什么可以帮到您的吗？",
    sender: "ai",
    timestamp: "今天 14:30",
    stage: "stage1"
  },
  {
    id: 2,
    content: "你们的产品主要有哪些功能?",
    sender: "user",
    timestamp: "今天 14:31",
    stage: "stage1"
  },
  {
    id: 3,
    content: "有鱼有客AI同事管理后台提供五大核心功能模块：\n\n1. **预判军师**：提供数据看板和自训练数据模型，帮助您分析客户数据，预测潜在客户行为。\n\n2. **销智助理**：即我现在的角色，可以回答产品问题，提供销售话术，帮助处理客户咨询。\n\n3. **公关师**：包含智能触达和基础配置功能，帮助您自动化客户沟通和维护客户关系。\n\n4. **创意创作师**：提供定向仿真人和爆款库功能，帮助生成营销内容和创意素材。\n\n5. **主管分身**：模拟主管角色，提供团队管理和业绩分析功能。\n\n每个模块都经过专业训练，可以大幅提升您的工作效率和客户转化率。您对哪个功能特别感兴趣，需要我详细介绍吗？",
    sender: "ai",
    timestamp: "今天 14:32",
    stage: "stage1"
  },
  {
    id: 4,
    content: "预判军师具体是怎么帮助预测客户行为的?",
    sender: "user",
    timestamp: "今天 14:33",
    stage: "stage1"
  },
  {
    id: 5,
    content: "预判军师是我们的数据分析和预测模块，它通过以下方式帮助预测客户行为：\n\n**• 数据看板**：实时展示您的客户数据状态，包括：\n  - 完整数据包人群数量和分布\n  - 本地储存的数据包人群\n  - 数据耦合进度\n  - 人群特征云图分析\n\n**• 自训练数据模型**：允许您根据业务需求自定义特征选择：\n  - 年龄、地域、消费能力等多维度特征选择\n  - 标签云配置，精准定位目标客户群体\n  - 行动轨迹分析，了解客户活动规律\n  - 运营商数据覆盖，扩大数据来源\n\n系统会基于这些数据构建AI预测模型，帮助您：\n1. 识别高价值潜在客户\n2. 预测客户购买意向和时机\n3. 分析客户行为模式\n4. 优化销售策略和资源分配\n\n通过预判军师，您可以提前了解客户需求，实现精准营销，大幅提升转化率和ROI。\n\n我很高兴您对预判军师感兴趣！如果您想了解更多细节或者想要查看实际演示，我可以为您安排一次在线演示，展示预判军师如何在实际业务场景中发挥作用。\n\n您还有其他关于预判军师或其他功能模块的问题吗？",
    sender: "ai",
    timestamp: "今天 14:35",
    stage: "stage1"
  }
];

// 生成唯一ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// 从消息生成会话标题
function generateSessionTitle(messages: Message[]): string {
  const userMessages = messages.filter(m => m.sender === 'user');
  if (userMessages.length > 0) {
    const firstMessage = userMessages[0].content;
    return firstMessage.length > 20 ? firstMessage.substring(0, 20) + '...' : firstMessage;
  }
  return '新对话';
}

// 加载所有会话数据
export function loadSessions(): ChatStorage {
  if (typeof window === 'undefined') {
    const defaultSession: ChatSession = {
      id: generateId(),
      title: '演示对话',
      stage: 'stage1',
      messages: initialMessages,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    return {
      sessions: [defaultSession],
      currentSessionId: defaultSession.id,
    };
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load sessions:', error);
  }
  
  // 首次加载，创建默认会话
  const defaultSession: ChatSession = {
    id: generateId(),
    title: '演示对话',
    stage: 'stage1',
    messages: initialMessages,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  
  const storage: ChatStorage = {
    sessions: [defaultSession],
    currentSessionId: defaultSession.id,
  };
  
  saveSessions(storage);
  return storage;
}

// 保存所有会话数据
export function saveSessions(storage: ChatStorage): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
  } catch (error) {
    console.error('Failed to save sessions:', error);
  }
}

// 创建新会话
export function createNewSession(stage: 'stage1' | 'stage2' | 'stage3' = 'stage1'): ChatSession {
  return {
    id: generateId(),
    title: '新对话',
    stage,
    messages: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

// 更新会话消息
export function updateSessionMessages(
  storage: ChatStorage,
  sessionId: string,
  messages: Message[]
): ChatStorage {
  const updatedSessions = storage.sessions.map(session => {
    if (session.id === sessionId) {
      return {
        ...session,
        messages,
        title: generateSessionTitle(messages),
        updatedAt: Date.now(),
      };
    }
    return session;
  });
  
  return {
    ...storage,
    sessions: updatedSessions,
  };
}

// 删除会话
export function deleteSession(storage: ChatStorage, sessionId: string): ChatStorage {
  const filteredSessions = storage.sessions.filter(s => s.id !== sessionId);
  
  // 如果删除的是当前会话，切换到第一个会话
  let newCurrentId = storage.currentSessionId;
  if (sessionId === storage.currentSessionId && filteredSessions.length > 0) {
    newCurrentId = filteredSessions[0].id;
  }
  
  return {
    sessions: filteredSessions,
    currentSessionId: newCurrentId,
  };
}

// 获取当前会话
export function getCurrentSession(storage: ChatStorage): ChatSession | undefined {
  return storage.sessions.find(s => s.id === storage.currentSessionId);
}

// 兼容旧版本的函数（向后兼容）
export function loadChatHistory(): Message[] {
  const storage = loadSessions();
  const current = getCurrentSession(storage);
  return current?.messages || initialMessages;
}

export function saveChatHistory(messages: Message[]): void {
  const storage = loadSessions();
  const updated = updateSessionMessages(storage, storage.currentSessionId, messages);
  saveSessions(updated);
}

export function clearChatHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear sessions:', error);
  }
}

