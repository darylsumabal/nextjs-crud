"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Combobox } from "./ui/combo-box";
import { useState } from "react";
import { getPlants } from "@/actions/plant.action";
import { useRouter } from "next/navigation";
import CreateDialog from "./CreateDialog";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";

type Plant = Awaited<ReturnType<typeof getPlants>>;

interface InventoryTableProps {
  plants: Plant;
}

export default function InventoryTable({ plants }: InventoryTableProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  const filterPlants = plants?.userPlants?.filter(
    (plant: { name: string; category: string }) =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || plant.category === selectedCategory)
  );

  if (!plants) return <div>No plants</div>;

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        <div className="relative max-w-sm w-full">
          <Input
            placeholder="Filter plants..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-2" />
        </div>
        <Combobox
          value={selectedCategory}
          onChange={(val) => setSelectedCategory(val)}
        />
        <CreateDialog />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Plant ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterPlants?.map((plant) => {
            const slugifiedName = plant.name.toLowerCase().replace(/\s+/g, "-");
            const slug = `${plant.id}--${slugifiedName}`;
            const plantUrl = `/plants/${slug}`;

            return (
              <TableRow key={plant.id} onClick={() => router.push(plantUrl)}>
                <TableCell>{plant.id}</TableCell>
                <TableCell>{plant.name}</TableCell>
                <TableCell>{plant.category}</TableCell>
                <TableCell>{plant.price}</TableCell>
                <TableCell className="font-bold">{plant.stock}</TableCell>
                <TableCell
                  className="text-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-end space-x-4">
                    <EditDialog plant={plant} />
                    <DeleteDialog plant={plant} />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
