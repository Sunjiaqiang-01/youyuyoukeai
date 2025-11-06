"use client"

import { AlertCircle, CheckCircle, Info, X, XCircle } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

type ToastType = "success" | "error" | "info" | "warning"

interface ToastProps {
  message: string
  type?: ToastType
  duration?: number
  onClose?: () => void
  isVisible?: boolean
  className?: string
}

const toastIcons = {
  success: <CheckCircle className="h-5 w-5 text-[#06d6a0]" />,
  error: <XCircle className="h-5 w-5 text-red-500" />,
  warning: <AlertCircle className="h-5 w-5 text-amber-500" />,
  info: <Info className="h-5 w-5 text-[#00b4d8]" />,
}

const toastClasses = {
  success:
    "border-[#06d6a0]/30 bg-[#06d6a0]/10 text-[#f0f9ff]",
  error: "border-red-500/30 bg-red-500/10 text-[#f0f9ff]",
  warning:
    "border-amber-500/30 bg-amber-500/10 text-[#f0f9ff]",
  info: "border-[#00b4d8]/30 bg-[#00b4d8]/10 text-[#f0f9ff]",
}

function BasicToast({
  message,
  type = "info",
  duration = 3000,
  onClose,
  isVisible = true,
  className = "",
}: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`flex w-80 items-center gap-3 rounded-lg border p-4 shadow-lg ${toastClasses[type]} ${className}`}
          initial={{ opacity: 0, x: 50, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{
            opacity: 0,
            x: 50,
            scale: 0.8,
            transition: { duration: 0.15 },
          }}
          transition={{ type: "spring", bounce: 0.25 }}
        >
          <div className="flex-shrink-0">{toastIcons[type]}</div>
          <p className="flex-1 text-sm">{message}</p>
          <button
            onClick={onClose}
            className="flex-shrink-0 rounded-full p-1 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function ToastDemo() {
  const [showToast, setShowToast] = useState(false)
  const [toastType, setToastType] = useState<ToastType>("success")

  const handleShowToast = (type: ToastType) => {
    setToastType(type)
    setShowToast(true)
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleShowToast("success")}
          className="rounded-md bg-emerald-500 px-3 py-1.5 text-sm text-white hover:bg-emerald-600"
        >
          Success Toast
        </button>
        <button
          onClick={() => handleShowToast("error")}
          className="rounded-md bg-red-500 px-3 py-1.5 text-sm text-white hover:bg-red-600"
        >
          Error Toast
        </button>
        <button
          onClick={() => handleShowToast("warning")}
          className="rounded-md bg-amber-500 px-3 py-1.5 text-sm text-white hover:bg-amber-600"
        >
          Warning Toast
        </button>
        <button
          onClick={() => handleShowToast("info")}
          className="rounded-md bg-blue-500 px-3 py-1.5 text-sm text-white hover:bg-blue-600"
        >
          Info Toast
        </button>
      </div>

      <AnimatePresence>
        {showToast && (
          <BasicToast
            message={`This is a ${toastType} message example!`}
            type={toastType}
            duration={3000}
            onClose={() => setShowToast(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export { BasicToast }

