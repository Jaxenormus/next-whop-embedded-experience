"use client";

import { MembershipTable } from "@/components/customer/membershipTable";
import { ComponentSuspense } from "@/components/componentSuspense";
import { Button } from "@whop/frosted-ui";
import Link from "next/link";

const HubPage = () => {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row md:items-center justify-between gap-2 items-end">
        <h2 className="text-2xl font-bold tracking-tight">My Memberships</h2>
        <div className="w-full sm:w-auto">
          <Link href="/admin/new" className="w-full sm:w-auto">
            <Button colorScheme="brand" size="sm" variant="primary">
              Create
            </Button>
          </Link>
        </div>
      </div>
      <ComponentSuspense>
        <MembershipTable />
      </ComponentSuspense>
    </div>
  );
};

export default HubPage;
