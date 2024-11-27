import React, { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Label } from "./ui/label"
import { Note } from "./NotesApp"
import { themes } from "./themes/theme"

interface AddNoteDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (note: Omit<Note, "id" | "date" | "isFavorite">) => void
  editingNote: Note | null
}

export const AddNoteDialog: React.FC<AddNoteDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingNote,
}) => {
  const [note, setNote] = useState<Omit<Note, "id" | "date" | "isFavorite">>({
    title: "",
    content: "",
    theme: "theme1",
  })
  
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (editingNote) {
      setNote({
        title: editingNote.title,
        content: editingNote.content,
        theme: editingNote.theme,
      })
    } else {
      setNote({
        title: "",
        content: "",
        theme: "theme1",
      })
    }
  }, [editingNote])

  const handleSubmit = () => {
    setIsSubmitted(true)
    if (note.title.trim() && note.content.trim()) {
      onSubmit(note)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2/3 h-2/3 bg-white rounded-2xl"> {/* Increased the size of the dialog */}
        <DialogHeader>
          <DialogTitle>{editingNote ? "Edit Note" : "Add Note"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Title and Theme in Same Line */}
          <div className="grid grid-cols-2 gap-4">
            {/* Title Input */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Add title"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
                className="py-5 bg-gray-100 rounded-mid"
              />
              {isSubmitted && note.title.trim() === "" && (
                <p className="text-sm text-red-500">This field is required</p>
              )}
            </div>

            {/* Theme Selector */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="theme">Theme</Label>
              <div className="bg-gray-100">
              <Select
                value={note.theme}
                onValueChange={(value) => setNote({ ...note, theme: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" className="py-5" />
                </SelectTrigger>
                <SelectContent className="backdrop-blur-lg rounded-mid"> {/* Added blur effect */}
                  {themes.map((theme) => (
                    <SelectItem
                      key={theme.id}
                      value={theme.id}
                      className="hover:bg-blue-700 bg-gray-50"
                    >
                      {theme.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              </div>
            </div>
          </div>

          {/* Description Input */}
          <div className="grid gap-2">
            <div className="flex justify-between">
              <Label htmlFor="description">Description (optional)</Label>
              <span className="text-sm text-muted-foreground">
                {note.content.length}/200
              </span>
            </div>
            <Textarea
              id="description"
              placeholder="Add description"
              value={note.content}
              onChange={(e) => {
                if (e.target.value.length <= 200) {
                  setNote({ ...note, content: e.target.value })
                }
              }}
              className="resize-none bg-gray-100 rounded-mid h-full"
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="danger" className="rounded-xl">
            {editingNote ? "Save" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
