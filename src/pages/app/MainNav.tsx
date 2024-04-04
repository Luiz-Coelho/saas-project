import { NavLink, To } from "react-router-dom";

type DashLinkProps = {
  to: To;
  text: string;
};

export default function MainNav({ to, text }: DashLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        return isActive
          ? "py-1 px-2 bg-secondary rounded"
          : "py-1 px-2 hover:bg-secondary/60 rounded";
      }}
    >
      {text}
    </NavLink>
  );
}
