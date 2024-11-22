import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Note } from '../types/note';

interface NotesState {
  notes: Note[];
  searchQuery: string;
  sortBy: 'date' | 'title';
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  reorderNotes: (notes: Note[]) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: 'date' | 'title') => void;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: [],
      searchQuery: '',
      sortBy: 'date',
      addNote: (note) => set((state) => ({
        notes: [
          {
            ...note,
            id: crypto.randomUUID(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
          },
          ...state.notes,
        ],
      })),
      updateNote: (id, updates) => set((state) => ({
        notes: state.notes.map((note) =>
          note.id === id
            ? { ...note, ...updates, updatedAt: Date.now() }
            : note
        ),
      })),
      deleteNote: (id) => set((state) => ({
        notes: state.notes.filter((note) => note.id !== id),
      })),
      reorderNotes: (notes) => set({ notes }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setSortBy: (sortBy) => set({ sortBy }),
    }),
    {
      name: 'notes-storage',
    }
  )
);