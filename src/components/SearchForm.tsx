const SearchForm = () => {
  return (
    <form className="size-full">
      <input
        type="search"
        placeholder="Search pets"
        className="size-full rounded-md bg-white/20 px-5 outline-none transition placeholder:text-white/50 hover:bg-white/30 focus:bg-white/50"
      />
    </form>
  );
};

export default SearchForm;
