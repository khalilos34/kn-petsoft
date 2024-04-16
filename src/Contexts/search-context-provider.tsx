"use client";
import { createContext, useState } from "react";
type ISearchContext = {
  SearchQuery: string;
  handleSearchQuery: (searchTerm: string) => void;
};

export const SearchContext = createContext<ISearchContext | null>(null);

const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [SearchQuery, setSearchQuery] = useState("");
  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);
  };
  return (
    <SearchContext.Provider value={{ handleSearchQuery, SearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
