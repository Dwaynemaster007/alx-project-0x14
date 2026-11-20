import { ReactNode } from "react";

export interface ComponentProps {
  children: ReactNode;
}

export interface ButtonProps {
  title: string;
  onClick?: () => void;
  active?: boolean;
}

// One title from the MoviesDatabase API (fields can be null)
export interface MoviesProps {
  id: string;
  primaryImage: { url: string } | null;
  titleText: { text: string };
  releaseYear: { year: number } | null;
}

export interface MovieCardProps {
  title: string;
  posterImage?: string;
  releaseYear?: number;
}
