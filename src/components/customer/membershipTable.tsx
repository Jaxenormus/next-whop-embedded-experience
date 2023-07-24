"use client";

import { api } from "@/server/api";
import { dayjs } from "@/utils/dayjs";
import { Badge, Table } from "@whop/frosted-ui";

export const MembershipTable = () => {
  const [data] = api.customer.listMemberships.useSuspenseQuery();
  return (
    <Table
      columns={[
        { accessorKey: "id" },
        { accessorKey: "email" },
        {
          accessorKey: "status",
          cell: (data) => (
            <Badge
              colorScheme={
                data.row.original.status === "active" ||
                data.row.original.status === "completed"
                  ? "success-green"
                  : data.row.original.status === "trialing" ||
                    data.row.original.status === "past_due"
                  ? "warning-yellow"
                  : "error-red"
              }
              text={data.getValue()}
            />
          ),
        },
        {
          accessorKey: "created_at",
          accessorFn: (data) => {
            return dayjs(data.created_at).format("LLLL");
          },
        },
      ]}
      data={data}
      showHeader
    />
  );
};
