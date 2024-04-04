import { ReactNode } from "react";

type ListProps = {
  children: ReactNode;
};

export default function List({ children }: ListProps) {
  return (
    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
      {children}
    </ul>
  );
}
