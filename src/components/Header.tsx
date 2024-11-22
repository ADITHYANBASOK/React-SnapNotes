interface HeaderProps {
  onAddNote: () => void;
}

export function Header({ onAddNote }: HeaderProps) {
  return (
    <div className="mb-8 text-center">
      <h1 className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
      SnapNotes
      </h1>
      <p className="mt-2 text-gray-600">Organize your thoughts in vibrant colors</p>
      <button
        onClick={onAddNote}
        className="mt-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-2.5 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-100"
      >
        Create Note
      </button>
    </div>
  );
}