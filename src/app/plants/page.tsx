import { getPlants } from "@/actions/plant.action";
import InventoryTable from "@/components/InventoryTable";
import { stackServerApp } from "@/stack";
import { SignUp } from "@stackframe/stack";

const page = async () => {
  const user = await stackServerApp.getUser();
  const plant = await getPlants();
  return (
    <>
      {user ? (
        <div className="mt-7 max-w-7xl mx-auto px-4 grid  grid-cols-1 lg:grid-cols-10 gap-6">
          <div className="lg:col-span-full">
            <InventoryTable plants={plant} />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center mt-20">
          <SignUp />
        </div>
      )}
    </>
  );
};

export default page;
