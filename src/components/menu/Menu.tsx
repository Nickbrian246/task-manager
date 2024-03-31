import React, { ComponentPropsWithRef, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
interface Props extends ComponentPropsWithRef<"nav"> {
  className?: string;
  axisx: number;
}
export default function Menu(props: Props) {
  const { className, axisx } = props;
  return (
    <nav
      style={{ left: `${axisx}rem` }}
      {...props}
      className={twMerge(
        ` bg-white p-2 absolute rounded-md -bottom-20  
        }`,
        className
      )}
    >
      <ul>
        <li>menu de opciones</li>
        <li>menu de opciones</li>
        <li>menu de opciones</li>
      </ul>
    </nav>
  );
}
