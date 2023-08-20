import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const result = await fetchPosts(1, 30);
  const user = await currentUser();
  // console.log(user)
  return (
    <div>
      <h1 className="text-white">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No Threads found</p>
        ) : (
          <>
            {result.posts.map((post) => {
              return(<ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user?.id||''}
                parentId={post.parentId}
                author={post.author}
                content={post.text}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />);
            })}
          </>
        )}
      </section>
    </div>
  );
}
