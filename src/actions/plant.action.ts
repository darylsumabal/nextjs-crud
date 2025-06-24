"use server";
import prisma from "@/lib/prisma";
import { getUserId } from "./user.action";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

export async function getPlants(searchTerm?: string) {
  try {
    const currentUserId = await getUserId();

    const whereClause: Prisma.PlantsWhereInput = {
      userId: currentUserId,
    };

    if (searchTerm) {
      whereClause.name = {
        contains: searchTerm,
        mode: "insensitive",
      };
    }

    const userPlants = await prisma.plants.findMany({
      where: whereClause,
    });
    revalidatePath("/");
    return { success: true, userPlants };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch plants");
  }
}

export async function getPlantById(id: string) {
  return await prisma.plants.findUnique({
    where: { id },
  });
}

export async function createPlant(data: Prisma.PlantsCreateInput) {
  console.log(data);
  console.log("creating plant");

  try {
    const currentUserId = await getUserId();
    if (!currentUserId) return;
    const newPlant = await prisma.plants.create({
      data: {
        ...data,
        userId: currentUserId,
      },
    });
    revalidatePath("/plants");
    return newPlant;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function editPlant(id: string, data: Prisma.PlantsUpdateInput) {
  try {
    const currentUserId = await getUserId();
    const updatePlant = await prisma.plants.update({
      where: { id },
      data: {
        ...data,
        userId: currentUserId,
      },
    });
    revalidatePath("/plants");
    return updatePlant;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deletePlant(id: string) {
  try {
    const userId = await getUserId();
    if (!userId) return;

    const deletePlant = await prisma.plants.delete({
      where: { id },
    });
    revalidatePath("/plants");
    return deletePlant;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
