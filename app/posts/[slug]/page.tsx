import prisma from "@/lib/db";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await prisma.post.findUnique({
    where: {
      id: params.slug,
    },
  });
  return (
    <main>
      <h1>{post?.title}</h1>
      <p>{post?.content}</p>
    </main>
  );
}
