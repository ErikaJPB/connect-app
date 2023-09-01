"use client";

import { BsSearch } from "react-icons/bs";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  searchTerm: string;
}

const SearchBar = ({ searchTerm }: Props) => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        router.push(`/${searchTerm}/?q=${search}`);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, searchTerm]);

  return (
    <div className="flex gap-2 rounded-lg bg-secondary  py-2 px-8  mb-8">
      <Input
        id="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for users"
        className="search-input"
      />

      <button>
        <BsSearch className="text-gray-500 my-2 object-contain" size={25} />
      </button>
    </div>
  );
};

export default SearchBar;
