"use client"

import React, { useState, useEffect } from "react"
import { AddNoteDialog } from "./add-note-dialog"
import { NoteCard } from "./note-card"
import { NotePreview } from "./note-preview"
import Navbar from "./Navbar"

export interface Note {
  id: number
  title: string
  content: string
  date: string
  isFavorite: boolean
  theme: string
}

export const NotesApp: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([])
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes")
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes))
      setFilteredNotes(JSON.parse(storedNotes))
    }
  }, [])

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes))
    }
  }, [notes])

  useEffect(() => {
    const filtered = notes.filter(note => 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredNotes(filtered)
  }, [searchQuery, notes])

  const handleAddNote = (newNote: Omit<Note, "id" | "date" | "isFavorite">) => {
    const noteToAdd: Note = {
      ...newNote,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      isFavorite: false,
    }
    setNotes([...notes, noteToAdd])
    setIsAdding(false)
  }

  const handleEditNote = (editedNote: Omit<Note, "id" | "date" | "isFavorite">) => {
    if (editingNote) {
      const updatedNote: Note = {
        ...editingNote,
        ...editedNote,
      }
      const updatedNotes = notes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      )
      setNotes(updatedNotes)
      setEditingNote(null)
      setIsAdding(false)
    }
  }

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const startEditNote = (note: Note) => {
    setEditingNote(note)
    setIsAdding(true)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className="space-y-6">
      <Navbar setIsAdding={setIsAdding} onSearch={handleSearch} />
      <AddNoteDialog
        isOpen={isAdding}
        onClose={() => {
          setIsAdding(false)
          setEditingNote(null)
        }}
        onSubmit={editingNote ? handleEditNote : handleAddNote}
        editingNote={editingNote}
      />

      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 p-6 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={() => startEditNote(note)}
              onDelete={() => handleDeleteNote(note.id)}
              onClick={() => setSelectedNote(note)}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <div className="grid min-h-full place-items-center bg-white mt-60 px-6 py-24 sm:py-32 lg:px-8">
  <div className="text-center">
    <p className="text-base font-semibold text-red-600">404</p>
    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Note not found</h1>
    <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the Note you’re looking for.</p>
    <div className="mt-10 flex items-center justify-center gap-x-6">
      <a href="/" className="rounded-mid bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Go back home</a>
    </div>
  </div>
</div>
        </div>
      )}

      {selectedNote && (
        <NotePreview
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
        />
      )}
    </div>
  )
}

