import { Input } from '../ui/input';

const SearchBar = ({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (query: string) => void;
}) => {
 

  return (
    <div
      className=' relative z-40 w-sm mt-5 mx-auto'
    >
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search your favourite attire..."
        className="ml-1 outline-none bg-transparent w-full text-sm"
      />
    </div>
  );
};

export default SearchBar;
