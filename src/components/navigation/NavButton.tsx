import * as React from "react";
import { NavButtonProps } from "./types";

export const NavButton: React.FC<NavButtonProps> = ({ label, variant }) => {
  return (
    <button
      className={`gap-2 self-stretch px-5 py-2 my-auto ${
        variant === "solid" ? "text-white bg-black" : "text-black"
      } whitespace-nowrap border border-black border-solid`}
    >
      {label}
    </button>
  );
};
