import { Outlet } from "react-router-dom";

export default function Financial() {
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Financial
      </h1>
      <Outlet />
    </div>
  );
}
