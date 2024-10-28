import { createPost } from "@/actions/prisma.actions";
import prisma from "@/lib/db";
import Link from "next/link";

export default async function PostsPage() {
  // const posts = await prisma.post.findMany();    All Posts

  const user = await prisma.user.findUnique({
    where: {
      email: "john@doe.com",
    },
    include: {
      posts: true,
    },
  });

  const postCount = await prisma.post.count();

  return (
    <main>
      <h1>All Posts ({postCount})</h1>
      <ul>
        {user?.posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>

      <form action={createPost} className="flex flex-col gap-y-2 w-[300px]">
        <input type="text" name="title" placeholder="Title" />
        <textarea name="content" rows={5} placeholder="Content"></textarea>
        <button>Submit</button>
      </form>
    </main>
  );
}
