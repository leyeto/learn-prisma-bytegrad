import prisma from "@/lib/db";

export default async function PostsPage() {
  const posts = await prisma.post.findMany();
  return (
    <main>
      <h1>All Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </main>
  );
}
