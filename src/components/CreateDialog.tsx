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
import { Sprout } from "lucide-react";
import { Input } from "./ui/input";
import { Combobox } from "./ui/combo-box";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import React, { useState } from "react";
import { createPlant } from "@/actions/plant.action";
import { toast } from "sonner";
import ImageUpload from "./ImageUpload";

export default function CreateDialog() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    stock: 1,
    price: 1,
    category: "",
    userId: "",
    imageUrl: "",
  });

  const handleChange = (field: string, value: string | number) => {
    console.log(`Field changed:${field}, New value: ${value}`);
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log("adding plant");
      const newPlant = await createPlant(formData);
      toast.success("Plant created successfully");
      return newPlant;
    } catch (error) {
      console.log(error);
      toast.error("Failed to create plant");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="ml-auto flex items-center gap-2"
          variant="default"
          asChild
        >
          <span>
            <Sprout className="w-4 h-4" />
            Add Plant
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add a Plant</AlertDialogTitle>
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
          {/* Image Upload*/}
          <div className="py-5">
            <ImageUpload
              endpoint="postImage"
              value={formData.imageUrl}
              onChange={(url) => {
                handleChange("imageUrl", url);
              }}
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Submit</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
