import { useState, useCallback, useRef } from "react";
import { IoSearchSharp, IoCloseCircle } from "react-icons/io5";

const SearchInput = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const timerRef = useRef(null);

  const debouncedSearch = useCallback(
    (value) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        onSearch(value);
      }, 300);
    },
    [onSearch]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setSearch("");
    onSearch("");
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <div className="relative flex-1">
      <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
      <input
        type="text"
        placeholder="Search chats…"
        className="input input-bordered input-sm w-full pl-9 pr-8 bg-base-300/50 focus:bg-base-300 border-base-300"
        value={search}
        onChange={handleChange}
      />
      {search && (
        <button
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
        >
          <IoCloseCircle className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
export default SearchInput;
