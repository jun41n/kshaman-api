import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout";

interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  category: string;
  content: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}posts.json`)
      .then((r) => r.json())
      .then(setPosts)
      .catch(console.error);
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>심리 칼럼 | MyTestType</title>
        <meta
          name="description"
          content="MBTI, 색채 심리학, 애착 이론, 타로 심리학 등 현대 심리학의 최신 통찰을 전문적으로 다루는 심리 칼럼입니다."
        />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
            Psychology Column
          </p>
          <h1 className="text-3xl font-black text-foreground mb-3">심리 칼럼</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            MBTI, 색채 심리학, 애착 이론, 타로 심리학 등<br />
            현대 심리학의 깊이 있는 이야기를 전달합니다.
          </p>
        </div>

        {/* Post list */}
        <div className="flex flex-col gap-0 divide-y divide-border">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <article className="flex gap-4 py-6 group cursor-pointer hover:bg-muted/30 -mx-4 px-4 rounded-xl transition-colors">
                {/* Thumbnail */}
                <div className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-muted">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col justify-center gap-1.5 min-w-0">
                  <span className="inline-flex items-center text-[11px] font-bold text-primary bg-primary/8 px-2 py-0.5 rounded-full w-fit">
                    {post.category}
                  </span>
                  <h2 className="text-base font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed hidden sm:block">
                    {post.description}
                  </p>
                  <p className="text-[11px] text-muted-foreground/60 mt-0.5">
                    {post.date}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="py-20 text-center text-muted-foreground text-sm">
            불러오는 중...
          </div>
        )}
      </div>
    </Layout>
  );
}
