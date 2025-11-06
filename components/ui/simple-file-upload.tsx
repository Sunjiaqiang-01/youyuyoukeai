"use client";

import { useState, useRef } from "react";
import { Upload, X, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SimpleFileUploadProps {
  label: string;
  onFileSelect?: (files: File[]) => void;
  accept?: string;
  maxFiles?: number;
}

export function SimpleFileUpload({ 
  label, 
  onFileSelect, 
  accept = "*",
  maxFiles = 1 
}: SimpleFileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: FileList | null) => {
    if (!newFiles) return;
    
    const fileArray = Array.from(newFiles).slice(0, maxFiles);
    setFiles(fileArray);
    onFileSelect?.(fileArray);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFileSelect?.(newFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={maxFiles > 1}
        onChange={(e) => handleFileChange(e.target.files)}
        className="hidden"
      />

      {files.length === 0 ? (
        <button
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            w-full px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2
            ${isDragging 
              ? 'bg-gradient-to-r from-[#06d6a0]/30 to-[#00b4d8]/30 border-2 border-[#06d6a0] text-[#06d6a0]' 
              : 'bg-gradient-to-r from-[#06d6a0]/20 to-[#00b4d8]/20 border border-[#06d6a0] text-[#06d6a0] hover:bg-[#06d6a0]/30'
            }
          `}
        >
          <Upload className="size-4" />
          {label}
        </button>
      ) : (
        <div className="space-y-2">
          <AnimatePresence>
            {files.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-between p-2 bg-dark-primary rounded-lg border border-dark-light"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <FileText className="size-4 text-accent-teal flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-primary truncate">{file.name}</p>
                    <p className="text-xs text-text-secondary">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="p-1 hover:bg-dark-light rounded transition-colors flex-shrink-0"
                >
                  <X className="size-4 text-text-secondary hover:text-accent-teal" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

