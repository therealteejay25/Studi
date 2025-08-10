'use client'

import { useState, useEffect } from 'react'
import { api } from '../lib/api'

interface Note {
  _id: string
  title: string
  content: string
  resources: []
  userId: string
  createdAt: string
  updatedAt: string
}

interface NotesManagerProps {
  userId: string
}

export default function NotesManager({ userId }: NotesManagerProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [newNote, setNewNote] = useState({ title: '', content: '', resources: [] })

  // Fetch user notes
  const fetchNotes = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await api.notes.getByUser(userId, 20, 0)
      if (response.success) {
        setNotes(response.data)
      } else {
        setError('Failed to fetch notes')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  // New note
  const createNote = async () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      setError('Title and content are required')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await api.notes.create({
        ...newNote,
        userId
      })

      if (response.success) {
        setNewNote({ title: '', content: '', resources: [] })
        await fetchNotes() // Refresh...
      } else {
        setError('Failed to create note')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Update note
  const updateNote = async (id: string, updates: Partial<Note>) => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.notes.update(id, updates)
      if (response.success) {
        await fetchNotes() // Refresh...
      } else {
        setError('Failed to update note')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Delete a note
  const deleteNote = async (id: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return

    setLoading(true)
    setError(null)

    try {
      const response = await api.notes.delete(id)
      if (response.success) {
        await fetchNotes() // Refresh the list
      } else {
        setError('Failed to delete note')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Load notes on component mount
  useEffect(() => {
    fetchNotes()
  }, [userId])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Notes</h1>
      
      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Create New Note Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Create New Note</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter note title"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              id="content"
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter note content"
            />
          </div>
          <button
            onClick={createNote}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Note'}
          </button>
        </div>
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Notes ({notes.length})</h2>
        
        {loading && notes.length === 0 ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading notes...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No notes yet. Create your first note above!
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onUpdate={updateNote}
                onDelete={deleteNote}
                loading={loading}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Individual Note Card Component
interface NoteCardProps {
  note: Note
  onUpdate: (id: string, updates: Partial<Note>) => Promise<void>
  onDelete: (id: string) => Promise<void>
  loading: boolean
}

function NoteCard({ note, onUpdate, onDelete, loading }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({ title: note.title, content: note.content })

  const handleSave = async () => {
    await onUpdate(note._id, editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({ title: note.title, content: note.content })
    setIsEditing(false)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={editData.content}
            onChange={(e) => setEditData({ ...editData, content: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              className="bg-gray-500 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="font-semibold text-lg mb-2">{note.title}</h3>
          <p className="text-gray-600 mb-3 line-clamp-3">{note.content}</p>
          <div className="text-xs text-gray-500 mb-3">
            Created: {new Date(note.createdAt).toLocaleDateString()}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(note._id)}
              disabled={loading}
              className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 