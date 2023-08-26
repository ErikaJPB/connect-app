import React from "react";
import { BiRepost } from "react-icons/bi";

function RepostButton() {
  return (
    <button>
      <BiRepost
        size={25}
        className="text-black cursor-pointer object-contain"
      />
    </button>
  );
}

export default RepostButton;
