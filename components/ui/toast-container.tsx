"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"
import { BasicToast } from "./toast"

type ToastType = "success" | "error" | "info" | "warning"

interface Toast {
  id: string
  message: string
  type: ToastType
  duration?: number
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType, duration?: number) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within ToastProvider")
  }
  return context
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: ToastType = "info", duration = 3000) => {
    const id = `${Date.now()}-${Math.random()}`
    setToasts((prev) => {
      // 防止重复添加相同内容的Toast
      const exists = prev.some(t => t.message === message && t.type === type)
      if (exists) return prev
      return [...prev, { id, message, type, duration }]
    })
    
    // 自动移除Toast
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, duration)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <BasicToast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
            isVisible={true}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

