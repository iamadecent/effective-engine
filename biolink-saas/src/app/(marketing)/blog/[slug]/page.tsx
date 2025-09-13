export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // In a real app, you would fetch the blog post content from a CMS
  // based on the slug.
  const post = {
    title: "Example Blog Post",
    content: "This is the content of the blog post.",
    author: "Jules",
    date: "October 26, 2025",
  };

  return (
    <div className="container mx-auto py-20 max-w-3xl">
      <article className="prose dark:prose-invert">
        <h1>{post.title}</h1>
        <p className="text-sm text-muted-foreground">By {post.author} on {post.date}</p>
        <p>{post.content}</p>
      </article>
    </div>
  );
}
