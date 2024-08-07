"use client";

import ContentfulService from "@/services/ContentfulService";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import BookItem from "../../../../types/interfaces/BookItem";
import Spinner from "@/components/icons/Spinner";
import Reviews from "@/views/book/Reviews";
import AddBookOnBookshelf from "@/components/AddBookOnBookshelf";
import YellowStar from "@/components/icons/YellowStar";
import { Backend_URL } from "@/lib/constants";
import axios from "axios";
import Link from "next/link";
import ButtonAddBook from "@/views/dashboard/ButtonAddBook";
import BookPageSectionTitle from "@/views/book/BookPageSectionTitle";

type Title = {
  title: string;
};

type Genre = {
  bookId: number;
  genre: Title;
};

export default function Book() {
  const [book, setBook] = useState<BookItem | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname().replace("/discover/", "");
  const [averageRating, setAverageRating] = useState<number>();
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const newBook = await ContentfulService.getBookById(parseInt(pathname));
      const res = (await axios.get(`${Backend_URL}/genre/book/${pathname}`))
        .data;
      setGenres(res);
      setBook(newBook);
      setLoading(false);
    })();
  }, [pathname]);

  return (
    <main className="flex flex-col mt-16">
      <div className="flex flex-col max-w-screen-lg mx-auto px-6 sm:px-8">
        <div className="flex flex-row">
          {loading ? (
            <div className="h-[calc(100vh-78px)] flex justify-center items-center">
              <Spinner />
            </div>
          ) : book === undefined ? (
            <p>No book.</p>
          ) : (
            <div className="flex flex-col gap-24">
              <div className="flex gap-4 flex-col md:flex-row">
                <div className="flex justify-center">
                  <Image
                    src={book.cover?.url}
                    alt="Cover"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "250px", height: "auto" }}
                  />
                </div>
                <div className="flex flex-col gap-4 md:gap-8 md:mt-8 md:ml-8">
                  <div className="flex flex-col items-center md:items-start  gap-2">
                    <h1 className="text-center text-3xl font-bold">
                      {book.title}
                    </h1>
                    <div className="flex text-lg flex-row gap-1 items-center">
                      <h1 className="">by</h1>
                      <h1 className="font-semibold">{book.author}</h1>
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-center md:justify-normal gap-4">
                    Genres:
                    {genres.map((item: Genre) => (
                      <Link
                        href={`/genres/${item.genre.title.toLowerCase()}`}
                        key={item.genre.title}
                      >
                        <div className="bg-slate-500 py-1 px-2 rounded-md">
                          {item.genre.title}
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="flex flex-col items-center gap-4 md:flex-row ">
                    <ButtonAddBook
                      bookId={parseInt(pathname)}
                      pageComponentisUsedOn="BookPage"
                    />
                    {averageRating && (
                      <div className="flex items-center gap-2 mt-3">
                        <YellowStar />
                        <h1 className="text-xl font-bold">{averageRating}</h1>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <BookPageSectionTitle sectionName="Book Info" />
                <p className="whitespace-pre-line">{book.description}</p>
              </div>
              <Reviews
                setAverageRating={setAverageRating}
                pathname={pathname}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
