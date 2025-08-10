// API client for interacting with the backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }
      
      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Health check
  async checkHealth() {
    return this.request('/health')
  }

  // Test database connection
  async testDatabase() {
    return this.request('/test-db')
  }

  // Notes API
  async createNote(noteData) {
    return this.request('/notes', {
      method: 'POST',
      body: JSON.stringify(noteData),
    })
  }

  async getNotes(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const endpoint = queryString ? `/notes?${queryString}` : '/notes'
    return this.request(endpoint)
  }

  async getNote(id) {
    return this.request(`/notes/${id}`)
  }

  async updateNote(id, updateData) {
    return this.request(`/notes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    })
  }

  async deleteNote(id) {
    return this.request(`/notes/${id}`, {
      method: 'DELETE',
    })
  }

  // User-specific notes
  async getUserNotes(userId, limit = 10, skip = 0) {
    return this.getNotes({ userId, limit, skip })
  }

  // Search notes
  async searchNotes(query, userId = null) {
    const params = { q: query }
    if (userId) params.userId = userId
    return this.getNotes(params)
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient()

// Convenience functions for common operations
export const api = {
  // Health and status
  health: () => apiClient.checkHealth(),
  testDb: () => apiClient.testDatabase(),

  // Notes operations
  notes: {
    create: (noteData) => apiClient.createNote(noteData),
    getAll: (params) => apiClient.getNotes(params),
    getById: (id) => apiClient.getNote(id),
    update: (id, data) => apiClient.updateNote(id, data),
    delete: (id) => apiClient.deleteNote(id),
    getByUser: (userId, limit, skip) => apiClient.getUserNotes(userId, limit, skip),
    search: (query, userId) => apiClient.searchNotes(query, userId),
  },
}

// Example usage:
/*
import { api } from '@/lib/api'

// Create a note
const newNote = await api.notes.create({
  title: 'My Note',
  content: 'This is the content',
  userId: 'user123'
})

// Get user's notes
const userNotes = await api.notes.getByUser('user123', 10, 0)

// Update a note
const updatedNote = await api.notes.update('noteId', {
  title: 'Updated Title',
  content: 'Updated content'
})

// Delete a note
await api.notes.delete('noteId')
*/ 