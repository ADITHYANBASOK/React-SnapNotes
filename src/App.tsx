import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { Note } from './types/note';
import { useNotesStore } from './store/useNotesStore';
import { NoteCard } from './components/NoteCard';
import { NoteEditor } from './components/NoteEditor';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';

function App() {
  const {
    notes,
    searchQuery,
    sortBy,
    addNote,
    updateNote,
    deleteNote,
    reorderNotes,
    setSearchQuery,
    setSortBy,
  } = useNotesStore();

  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isAddingNote, setIsAddingNote] = useState(false);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    })
  );

  const filteredNotes = notes
    .filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return b.updatedAt - a.updatedAt;
      }
      return a.title.localeCompare(b.title);
    });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = notes.findIndex((note) => note.id === active.id);
    const newIndex = notes.findIndex((note) => note.id === over.id);
    reorderNotes(arrayMove(notes, oldIndex, newIndex));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Header onAddNote={() => setIsAddingNote(true)} />
        
        <SearchBar
          searchQuery={searchQuery}
          sortBy={sortBy}
          onSearchChange={setSearchQuery}
          onSortChange={setSortBy}
        />

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={notes} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={() => setEditingNote(note)}
                  onDelete={() => deleteNote(note.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {filteredNotes.length === 0 && (
          <div className="mt-8 text-center">
            <p className="text-lg text-gray-500">No notes found</p>
          </div>
        )}

        {(isAddingNote || editingNote) && (
          <NoteEditor
            note={editingNote ?? undefined}
            onSave={(noteData) => {
              if (editingNote) {
                updateNote(editingNote.id, noteData);
                setEditingNote(null);
              } else {
                addNote(noteData);
                setIsAddingNote(false);
              }
            }}
            onClose={() => {
              setEditingNote(null);
              setIsAddingNote(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;