"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "@whop/frosted-ui";
import Link from "next/link";

export const CreateExperienceCrumbs = () => {
  return (
    <Breadcrumb className="-mx-2">
      <Link href="/admin">
        <BreadcrumbItem>Home</BreadcrumbItem>
      </Link>
      <BreadcrumbSeparator />
      <BreadcrumbItem isLastItem>New Experience</BreadcrumbItem>
    </Breadcrumb>
  );
};
