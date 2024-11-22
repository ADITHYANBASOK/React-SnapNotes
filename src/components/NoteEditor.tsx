import { useState } from 'react';
import { Note } from '../types/note';

interface NoteEditorProps {
  note?: Note;
  onSave: (note: Pick<Note, 'title' | 'content' | 'color'>) => void;
  onClose: () => void;
}

const COLORS = [
  '#fecaca',
  '#fde68a',
  '#bef264',
  '#67e8f9',
  '#c4b5fd',
  '#fca5a5',
];

export function NoteEditor({ note, onSave, onClose }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title ?? '');
  const [content, setContent] = useState(note?.content ?? '');
  const [color, setColor] = useState(note?.color ?? COLORS[0]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg animate-fade-in rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {note ? 'Edit Note' : 'Create Note'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          className="mb-4 w-full rounded-lg border-2 border-gray-100 bg-gray-50 p-3 outline-none transition-all focus:border-purple-500"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Note content (Markdown supported)"
          className="mb-6 h-48 w-full rounded-lg border-2 border-gray-100 bg-gray-50 p-3 outline-none transition-all focus:border-purple-500"
        />

        <div className="mb-6 flex gap-3">
          {COLORS.map((c) => (
            <button
              key={c}
              className={`h-10 w-10 rounded-full transition-all hover:scale-110 ${
                c === color ? 'ring-2 ring-purple-500 ring-offset-2' : ''
              }`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-100 px-6 py-2.5 font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave({ title, content, color })}
            className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-2.5 font-medium text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50"
            disabled={!title.trim() || !content.trim()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}