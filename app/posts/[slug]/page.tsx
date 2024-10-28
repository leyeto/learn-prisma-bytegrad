import prisma from "@/lib/db";
import { unstable_cache as cache } from "next/cache";

const getCachedPost = cache((slug) => {
  return prisma.post.findUnique({
    where: {
      slug: slug,
    },
  });
});

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getCachedPost(params.slug);
  return (
    <main>
      <h1>{post?.title}</h1>
      <p>{post?.content}</p>
    </main>
  );
}
