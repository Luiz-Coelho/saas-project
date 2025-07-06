import { Outlet } from "react-router-dom";
import "./App.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Outlet />
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default App;
