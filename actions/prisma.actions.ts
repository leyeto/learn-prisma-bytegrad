"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const slug = (formData.get("title") as string)
      .replace(/\s+/g, "-")
      .toLowerCase();
    const content = formData.get("content") as string;
    await prisma.post.create({
      data: {
        title: title,
        slug: slug,
        content: content,
        author: {
          connect: { email: "john@doe.com" },
        },
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error("Email must be unique");
      }
    }
  }

  revalidatePath("/posts");
}
export async function editPost(formData: FormData, id: string) {
  const title = formData.get("title") as string;
  const slug = (formData.get("title") as string)
    .replace(/\s+/g, "-")
    .toLowerCase();
  const content = formData.get("content") as string;
  await prisma.post.update({
    where: { id },
    data: {
      title: title,
      slug: slug,
      content: content,
    },
  });
}

export async function deletePost(id: string) {
  await prisma.post.delete({ where: { id } });
}
