import React from "react"
import { X } from 'lucide-react'
import { Note } from "./NotesApp"
import { themes } from "./themes/theme"
import { Button } from "./ui/button"

interface NotePreviewProps {
  note: Note
  onClose: () => void
}

export const NotePreview: React.FC<NotePreviewProps> = ({ note, onClose }) => {
  const theme = themes.find((t) => t.id === note.theme)

  const formatContent = (content: string) => {
    return content.split('').map((char) => {
      if (char === ' ') return ' '
      if (char === '\n') return '\n'
      return char
    }).join('')
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 flex justify-center items-center">
      <div
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md relative"
        style={{
          backgroundImage: theme?.backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(255, 255, 255, 0.40)",
          backgroundBlendMode: "overlay",
        }}
      >
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold mb-4">{note.title}</h2>
        <div className="text-sm text-gray-800 dark:text-gray-200 mb-4 whitespace-pre-wrap font-mono">
          {formatContent(note.content)}
        </div>
        <div className="text-xs text-gray-800 dark:text-gray-200">{note.date}</div>
      </div>
    </div>
  )
}

