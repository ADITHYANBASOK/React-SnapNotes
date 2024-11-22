interface SearchBarProps {
  searchQuery: string;
  sortBy: 'date' | 'title';
  onSearchChange: (query: string) => void;
  onSortChange: (sort: 'date' | 'title') => void;
}

export function SearchBar({
  searchQuery,
  sortBy,
  onSearchChange,
  onSortChange,
}: SearchBarProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-lg sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search notes..."
          className="w-full rounded-lg border-2 border-gray-100 bg-gray-50 p-3 pl-10 outline-none transition-all focus:border-purple-500"
        />
        <svg
          className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as 'date' | 'title')}
        className="rounded-lg border-2 border-gray-100 bg-gray-50 p-3 outline-none transition-all focus:border-purple-500"
      >
        <option value="date">Sort by Date</option>
        <option value="title">Sort by Title</option>
      </select>
    </div>
  );
}