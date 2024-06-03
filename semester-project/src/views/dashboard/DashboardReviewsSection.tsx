import Link from "next/link";
import DashboardBookCover from "./DashboardBookCover";
import DashboardSectionTitle from "./DashboardSectionTitle";
import Image from "next/image";
import ButtonAddBook from "./ButtonAddBook";
import { useEffect, useState } from "react";
import axios from "axios";
import { Backend_URL } from "@/lib/constants";
import ContentfulService from "@/services/ContentfulService";
import Spinner from "@/components/icons/Spinner";
import YellowStar from "@/components/icons/YellowStar";
import GreyStar from "@/components/icons/GreyStar";

interface Session {
  user: { id: number; email: string; firstName: string };
  backendTokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

interface ReviewFetch {
  id: number;
  bookId: number;
  stars: number;
  comment: string;
  user: {
    firstName: string;
    lastName: string;
  };
}

interface RecentReviewInterface {
  id: number;
  bookId: number;
  stars: number;
  comment: string;
  user: {
    firstName: string;
    lastName: string;
  };
  title: string;
  author: string;
  bookImgSrc: string;
}
interface Props {
  session: Session;
}

export default function DashboardReviewsSection({ session }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [reviews, setReviews] = useState<RecentReviewInterface[]>([]);

  const Stars = (num: number) => {
    const starArray = Array.from({ length: 5 }, (_, index) =>
      index < num ? <YellowStar key={index} /> : <GreyStar key={index} />
    );

    return starArray;
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await axios.get(`${Backend_URL}/dashboard/reviews`);
      const recentReviews = await Promise.all(
        response.data.map(async (item: ReviewFetch) => {
          console.log("hi");
          const book = await ContentfulService.getBookById(item.bookId);
          return {
            id: item.id,
            bookId: item.bookId,
            stars: item.stars,
            comment: item.comment,
            user: {
              firstName: item.user.firstName,
              lastName: item.user.lastName,
            },
            title: book.title,
            author: book.author,
            bookImgSrc: book.cover.url,
          } as RecentReviewInterface;
        })
      );
      setReviews(recentReviews);
      setLoading(false);
    })();
  }, [session, session?.backendTokens.accessToken]);
  return (
    <section className="px-2">
      {/* Section title and line below */}
      <DashboardSectionTitle sectionName="Latest reviews on BookVoyage" />

      <div className="max-w-full mx-auto grid grid-cols-1 gap-6 md:grid-cols-2">
        {loading ? (
          <div className="h-[calc(100vh-78px)] flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="border p-5 pb-6 pr-6 rounded-lg shadow-md bg-slate-900"
            >
              <div className="flex items-center gap-2 pb-2 text-xs md:text-sm text-gray-400 mb-1">
                <button className="relative w-6 h-6 overflow-hidden bg-gray-300 hover:bg-gray-200 rounded-full">
                  <Link
                    href={"/profile"}
                    className="flex justify-center items-center"
                  >
                    {/* User's image */}
                  </Link>
                </button>
                <p className="text-white">
                  {review.user.firstName + " " + review.user.lastName}{" "}
                </p>
                <p>|</p>
                <p>2 days ago</p>
              </div>

              <div className="flex gap-4 ">
                <div className="w-24 md:w-32 lg:w-40 shrink-0">
                  {review.bookId ? (
                    <Link href={`/discover/${review.bookId}`}>
                      <div className="w-full h-36 md:h-48 lg:h-60 border-white border-2 hover:border-[3px] hover:border-bv-purple transition-colors duration-300">
                        <Image
                          src={review.bookImgSrc}
                          alt="book"
                          width={150}
                          height={250}
                          className="w-full h-full"
                        />
                      </div>
                    </Link>
                  ) : (
                    <div className="w-full h-36 md:h-48 lg:h-60 border-white border-2 hover:border-[3px] hover:border-bv-purple transition-colors duration-300">
                      <Image
                        src="/no-book-in-category.png"
                        alt="book"
                        width={150}
                        height={250}
                        className="w-full h-full"
                      />
                    </div>
                  )}
                </div>
                <div className="font-light text-xs md:text-sm lg:mt-8 lg:mb-5 mr-2 flex flex-col justify-between">
                  <div>
                    <p className="text-gray-300">read and reviewed</p>
                    <h3 className="text-sm md:text-base font-medium">
                      <Link href={`/discover/${review.bookId}`}>
                        <span className="hover:text-bv-purple transition-colors duration-300">
                          {review.title}{" "}
                        </span>
                      </Link>
                      <span className="font-light">by </span>
                      <span>{review.author}</span>
                    </h3>
                    <p className="mt-2 text-gray-300 md:h-11 lg:h-16 overflow-hidden text-ellipsis line-clamp-2 lg:line-clamp-3">
                      {review.comment}
                    </p>
                  </div>
                  <ButtonAddBook bookId={review.bookId} />
                </div>
              </div>

              {/* <div className="grid grid-rows-3 grid-cols-5 lg:grid-cols-none grid-flow-row lg:grid-rows-2 lg:grid-flow-col justify-between items-end gap-x-4">
                <div className="col-span-2 row-span-2 lg:row-span-3 ">
                  <div className="w-24 md:w-32 lg:w-40 shrink-0">
                    {review.bookId ? (
                      <Link href={`/discover/${review.bookId}`}>
                        <div className="w-full h-36 md:h-48 lg:h-60 border-white border-2 hover:border-[3px] hover:border-bv-purple transition-colors duration-300">
                          <Image
                            src={review.bookImgSrc}
                            alt="book"
                            width={150}
                            height={250}
                            className="w-full h-full"
                          />
                        </div>
                      </Link>
                    ) : (
                      <div className="w-full h-36 md:h-48 lg:h-60 border-white border-2 hover:border-[3px] hover:border-bv-purple transition-colors duration-300">
                        <Image
                          src="/no-book-in-category.png"
                          alt="book"
                          width={150}
                          height={250}
                          className="w-full h-full"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-span-3 row-span-2 lg:col-span-2 font-light lg:mb-2 text-sm mr-2 ml-4 lg:ml-0 self-center">
                  <p className="text-sm text-gray-300">read and reviewed</p>
                  <h3 className="text-base font-medium">
                    <Link href={`/discover/${review.bookId}`}>
                      <span className="hover:text-bv-purple transition-colors duration-300">
                        {review.title}{" "}
                      </span>
                    </Link>
                    <span className="font-light">by </span>
                    <span>{review.author}</span>
                  </h3>
                  <div className="flex items-start mt-1">
                    {Stars(review.stars)}
                  </div>
                </div>
                <div className="row-span-1 col-span-5 lg:row-span-1 lg:col-span-2 font-light text-sm  mr-2">
                  <p className="lg:mt-2 text-sm text-gray-300 md:h-11 lg:h-16 overflow-hidden text-ellipsis line-clamp-2 lg:line-clamp-3">
                    {review.comment}
                  </p>
                  <ButtonAddBook bookId={review.bookId} />
                </div>
              </div> */}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
