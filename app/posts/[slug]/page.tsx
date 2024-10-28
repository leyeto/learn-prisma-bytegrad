import prisma from "@/lib/db";
import { unstable_cache as cache } from "next/cache";

// CACHE A POST
// const getCachedPost = cache((slug) => {
//   return prisma.post.findUnique({
//     where: {
//       slug: slug,
//     },
//   });
// });

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  // const post = await getCachedPost(params.slug);    // CACHE A POST

  const post = await prisma.post.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      author: true,
    },
  });

  return (
    <main>
      <h1>{post?.title}</h1>
      <p>{post?.content}</p>
    </main>
  );
}
