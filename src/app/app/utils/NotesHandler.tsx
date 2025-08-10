import { api } from '../lib/api'
import { useState, useEffect } from 'react'


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

  // Load notes...
  useEffect(() => {
    fetchNotes()
  }, [userId])

}