import { deletePlant } from "@/actions/plant.action";
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
import { OctagonAlert, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteDialogProps {
  plant: {
    id: string;
  };
}

export default function DeleteDialog({ plant }: DeleteDialogProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log(plant.id);
      console.log("adding plant");
      await deletePlant(plant.id);
      toast.success("Plant deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete plant");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <span>
            <Trash2 className="w-4 h-4 " />
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="mx-auto sm:mx-0 mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-destructive/10">
              <OctagonAlert className="h-5 w-5 text-destructive" />
            </div>
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[15px]">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit}>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
