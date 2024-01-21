"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CloseButton from "./icons/CloseButton";
import ContentfulService from "@/services/ContentfulService";
import BookItem from "../../types/interfaces/BookItem";
import Spinner from "./icons/Spinner";

interface HandleSearchbarProps {
  handleSearchbar: () => void;
}

export default function Searchbar({ handleSearchbar }: HandleSearchbarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState<BookItem[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (searchTerm !== "") {
        setLoading(true);
        const newBooks = await ContentfulService.getBooksByTitle(searchTerm);
        setBooks(newBooks);
        setLoading(false);
      }
    })();
  }, [searchTerm]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="flex flex-col border-2 rounded-md w-9/12 md:w-8/12 lg:w-7/12 xl:w-6/12 mx-auto bg-slate-800">
        <div className="flex justify-end">
          <button className="text-white m-6 md:m-8" onClick={handleSearchbar}>
            <CloseButton />
          </button>
        </div>
        <div className="flex items-center flex-col">
          <div className="w-full md:h-12 flex justify-center gap-4 flex-col px-8">
            <input
              className="border rounded-md pl-2 h-full md:text-2xl text-black"
              type="text"
              placeholder="Search for books"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <br />
          <div className="w-full h-96 overflow-y-auto overflow-x-clip">
            <ul className="flex flex-col items-start gap-4 flex-wrap px-4 sm:px-6 lg:px-8 mt-4">
              {loading ? (
                <div className="flex h-48 w-full justify-center items-center">
                  <Spinner />
                </div>
              ) : books.length === 0 && searchTerm !== "" ? (
                <p>No books.</p>
              ) : (
                books.map((book) => (
                  <div key={book.bookId}>
                    <Link
                      href={`/discover/${book.bookId}`}
                      onClick={handleSearchbar}
                    >
                      <li className="flex flex-row gap-4">
                        <Image
                          src={book.cover?.url}
                          alt="Cover"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100px", height: "auto" }}
                        />
                        <div className="flex flex-col">
                          <h2 className="font-bold md:text-xl">{book.title}</h2>
                          <div className="flex flex-row gap-1 md:text-md">
                            <p>By:</p>
                            <p className="font-medium">{book.author}</p>
                          </div>
                        </div>
                      </li>
                    </Link>
                    <br />
                  </div>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
