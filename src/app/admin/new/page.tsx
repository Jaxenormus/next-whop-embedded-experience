import { CreateExperienceForm } from "@/components/admin/createExperienceForm";
import { CreateExperienceCrumbs } from "@/components/admin/createExperienceCrumbs";

const AdminNewPage = () => {
  return (
    <div className="space-y-5">
      <CreateExperienceCrumbs />
      <div className="flex flex-col sm:flex-row md:items-center justify-between gap-2 items-end">
        <h2 className="text-2xl font-bold tracking-tight">New Experience</h2>
      </div>
      <CreateExperienceForm />
    </div>
  );
};

export default AdminNewPage;
