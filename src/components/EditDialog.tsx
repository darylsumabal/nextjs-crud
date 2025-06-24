import { editPlant, getPlantById } from "@/actions/plant.action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { Combobox } from "./ui/combo-box";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

// interface Plant {
//   id: string;
//   name: string;
//   description: string | null;
//   category: string;
//   stock: number;
//   price: number;
//   userId: string;
//   image?: string | null;
// }

type Plant = NonNullable<Awaited<ReturnType<typeof getPlantById>>>;

interface EditDialogProps {
  plant: Plant;
}

export default function EditDialog({ plant }: EditDialogProps) {
  const [formData, setFormData] = useState({
    name: plant.name.trim(),
    description: (plant.description || "").trim(),
    stock: plant.stock,
    price: plant.price,
    category: plant.category.trim(),
    userId: plant.userId.trim(),
    imageUrl: plant.imageUrl || "",
  });

  const handleChange = (field: string, value: string | number) => {
    console.log(`Field changed:${field}, New value: ${value}`);
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log("adding plant");
      const editedPlant = await editPlant(plant.id, formData);
      toast.success("Plant created edited successfully");
      return editedPlant;
    } catch (error) {
      console.log(error);
      toast.error("Failed to edit plant");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="ml-auto flex items-center gap-2"
          variant="outline"
          asChild
        >
          <span>
            <EditIcon className="w-4 h-4" />
            Edit Plant
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit a Plant</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Combobox
                value={formData.category}
                onChange={(val) => handleChange("category", val)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="name">Description</Label>
            <Textarea
              id="description"
              rows={5}
              placeholder="Enter description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Stock</Label>
              <Input
                id="stock"
                type="number"
                placeholder="Enter stock"
                value={formData.stock}
                min={1}
                onChange={(e) => handleChange("stock", Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="name">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter price"
                min={1}
                value={formData.price}
                onChange={(e) => handleChange("price", Number(e.target.value))}
              />
            </div>
          </div>
          {/* <h1>Image Upload</h1> */}

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Submit</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
