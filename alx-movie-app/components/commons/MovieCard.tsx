import Image from "next/image";
import { MovieCardProps } from "@/interfaces";

const MovieCard: React.FC<MovieCardProps> = ({ title, posterImage, releaseYear }) => {
  return (
    <div className="h-full">
      <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-gray-800">
        {posterImage ? (
          <Image
            src={posterImage}
            alt={title}
            fill
            sizes="(min-width: 1280px) 16vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-2 text-center text-sm text-gray-400">No poster</div>
        )}
      </div>
      <div className="mt-2 flex justify-between gap-2 py-2">
        <p className="text-lg font-bold">{title}</p>
        {releaseYear && <p className="text-sm text-[#E2D609]">{releaseYear}</p>}
      </div>
    </div>
  );
};

export default MovieCard;
