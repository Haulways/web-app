import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

type Props = {
  id?: string | number;
  src: string;
  alt?: string;
  handleDelete: (idx?: number) => void;
  className?: string;
};

const ImageCard = ({ src, alt = "", handleDelete, id, className }: Props) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img src={src} alt={alt} className={className} />
      <span
        className={`absolute inset-y-0 flex w-full justify-end bg-primary-8/50 p-1 hover:cursor-move${
          hover ? "visible" : "invisible"
        }`}
      >
        <div
          onClick={() => handleDelete(id as any)}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-white hover:cursor-pointer hover:bg-gray-200"
        >
          <AiOutlineDelete className="text-red-600" />
        </div>
      </span>
    </div>
  );
};

export default ImageCard;
