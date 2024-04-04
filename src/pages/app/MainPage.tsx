import { Separator } from "@/components/ui/separator";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import CrumbHeader from "@/components/CrumbHeader";

export default function MainPage() {
  return (
    <div className="flex h-screen">
      <Navbar />
      <Separator orientation="vertical" />
      <div className="w-full flex flex-col">
        <CrumbHeader className="p-5 self-center" />
        <Separator />
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
