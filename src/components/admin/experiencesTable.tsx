"use client";

import { api } from "@/server/api";
import { Table } from "@whop/frosted-ui";

export const ExperiencesTable = () => {
  const [data] = api.admin.listExperiences.useSuspenseQuery();
  return (
    <Table
      columns={[
        { accessorKey: "id" },
        { accessorKey: "name" },
        { accessorKey: "experience_type" },
      ]}
      data={data}
      showHeader
    />
  );
};
