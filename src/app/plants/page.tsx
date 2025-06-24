import { getPlants } from "@/actions/plant.action";
import { getUserDetails } from "@/actions/user.action";
import InventoryTable from "@/components/InventoryTable";
import { stackServerApp } from "@/stack";
import { SignIn, SignUp } from "@stackframe/stack";
import React from "react";

const page = async () => {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;
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
