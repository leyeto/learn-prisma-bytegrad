"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
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
    },
  });

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
