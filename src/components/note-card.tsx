import React from "react"
import { PencilIcon, Trash2Icon } from 'lucide-react'
import { Note } from "./NotesApp"
import { themes } from "./themes/theme"
import { Button } from "./ui/button"

interface NoteCardProps {
  note: Note
  onEdit: () => void
  onDelete: () => void
  onClick: () => void
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete, onClick }) => {
  const theme = themes.find((t) => t.id === note.theme)

  const formatContent = (content: string) => {
    return content.split('').map((char) => {
      if (char === ' ') return ' '
      if (char === '\n') return '\n'
      return char
    }).join('')
  }

  return (
    <div
      className="rounded-lg shadow-lg p-4 border bg-opacity-75 relative flex flex-col justify-between cursor-pointer"
      style={{
        backgroundImage: theme?.backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        backgroundBlendMode: "overlay",
      }}
      onClick={onClick}
    >
      {/* Icons positioned at the top right */}
      <div className="absolute top-2 right-2 flex gap-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation()
            onEdit()
          }}
        >
          <PencilIcon className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
        >
          <Trash2Icon className="h-4 w-4 text-red-600 hover:shadow-red-700" />
        </Button>
      </div>

      {/* Main content of the note */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 pb-3">{note.title}</h2>
        <div className="text-sm text-gray-800 dark:text-gray-200 mb-4 line-clamp-6 whitespace-pre-wrap font-mono">
          {formatContent(note.content)}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-500 dark:text-gray-400">{note.date}</div>
      </div>
    </div>
  )
}
