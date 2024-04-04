import { Outlet } from "react-router-dom";

export default function Operational() {
  return (
    <div>
      {/*
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Operational
      </h1>
      */}
      <Outlet />
    </div>
  );
}
