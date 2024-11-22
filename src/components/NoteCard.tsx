import { forwardRef } from 'react';
import { Note } from '../types/note';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { cn } from '../utils/cn';

interface NoteCardProps {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const NoteCard = forwardRef<HTMLDivElement, NoteCardProps>(
  ({ note, onEdit, onDelete, className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'group relative overflow-hidden rounded-2xl p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl',
          'cursor-grab active:cursor-grabbing',
          'animate-slide-up',
          className
        )}
        style={{ backgroundColor: note.color, ...style }}
        {...props}
      >
        <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={onEdit}
            className="rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/30"
            aria-label="Edit note"
          >
            ✏️
          </button>
          <button
            onClick={onDelete}
            className="rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/30"
            aria-label="Delete note"
          >
            🗑️
          </button>
        </div>

        <h3 className="mb-3 text-xl font-bold">{note.title}</h3>
        <div className="prose prose-sm max-h-48 overflow-y-auto">
          <ReactMarkdown>{note.content}</ReactMarkdown>
        </div>
        <div className="mt-4 text-xs font-medium opacity-70">
          {format(note.updatedAt, 'MMM d, yyyy HH:mm')}
        </div>
      </div>
    );
  }
);