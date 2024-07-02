import Link from "next/link";
import React from "react";

interface ButtonProps {
  title: string;
  link: string;
}

export default function Button({ title, link }: ButtonProps) {
  console.log(link);
  return (
    <div>
      <Link href={link}>
        <button className="bg-bv-green max-w-fit rounded-lg hover:bg-bv-green-dark">
          {link === "/signup" || link === "/discover" ? (
            <h2 className="px-6 py-4 text-lg">{title}</h2>
          ) : (
            <h2 className="px-4 py-2">{title}</h2>
          )}
        </button>
      </Link>
    </div>
  );
}
