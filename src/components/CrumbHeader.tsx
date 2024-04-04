import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import React from "react";
import { useLocation } from "react-router-dom";

import { routeNames } from "@/data";

interface CrumbHeaderProps {
  className: string;
}

export default function CrumbHeader({ className }: CrumbHeaderProps) {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {paths.map((path, index) => {
          const route = routeNames.find((route) => route.path === path);
          const label = route?.label;
          return (
            <React.Fragment key={path}>
              <BreadcrumbItem>
                {index < paths.length - 1 ? (
                  <BreadcrumbLink
                    href={`/${paths.slice(0, index + 1).join("/")}`}
                  >
                    {label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < paths.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
