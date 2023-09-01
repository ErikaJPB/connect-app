"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface Props {
  pageNumber: number;
  isNext: boolean;
  path: string;
}

function Pagination({ pageNumber, isNext, path }: Props) {
  const router = useRouter();

  const handleNavigation = (type: string) => {
    let nextPageNumber = pageNumber;

    if (type === "prev") {
      nextPageNumber = Math.max(1, pageNumber - 1);
    } else if (type === "next") {
      nextPageNumber = pageNumber + 1;
    }

    if (nextPageNumber > 1) {
      router.push(`/${path}?page=${nextPageNumber}`);
    } else {
      router.push(`/${path}`);
    }
  };

  if (!isNext && pageNumber === 1) return null;

  return (
    <div className="flex w-full mt-10 items-center justify-center gap-5">
      <Button
        className="!text-small-regular text-gray-500"
        onClick={() => handleNavigation("prev")}
        disabled={pageNumber === 1}
      >
        Prev
      </Button>

      <p className="!text-small-semibold text-gray-400">{pageNumber}</p>

      <Button
        onClick={() => handleNavigation("next")}
        disabled={!isNext}
        className="!text-small-regular text-gray-500"
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;
