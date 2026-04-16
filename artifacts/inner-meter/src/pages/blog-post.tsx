import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { Helmet } from "react-helmet-async";
import { ChevronLeft } from "lucide-react";
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

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: JSX.Element[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="text-xl font-black text-foreground mt-10 mb-3 leading-snug"
        >
          {line.slice(3)}
        </h2>
      );
    } else if (line.trim() === "") {
      // skip blank lines between paragraphs
    } else {
      elements.push(
        <p
          key={i}
          className="text-[15px] text-foreground/80 leading-[1.85] mb-0"
        >
          {line}
        </p>
      );
    }
    i++;
  }

  return elements;
}

export default function BlogPost() {
  const [, params] = useRoute("/blog/:id");
  const [post, setPost] = useState<Post | null>(null);
  const [related, setRelated] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) return;
    fetch(`${import.meta.env.BASE_URL}posts.json`)
      .then((r) => r.json())
      .then((all: Post[]) => {
        const found = all.find((p) => p.id === params.id);
        setPost(found ?? null);
        setRelated(all.filter((p) => p.id !== params.id).slice(0, 3));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params?.id]);

  if (loading) {
    return (
      <Layout>
        <div className="py-32 text-center text-muted-foreground text-sm">
          불러오는 중...
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="py-32 text-center">
          <p className="text-muted-foreground mb-4">글을 찾을 수 없습니다.</p>
          <Link href="/blog" className="text-primary font-semibold text-sm hover:underline">
            ← 목록으로
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>{post.title} | 심리 칼럼 · MyTestType</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={`${post.title} | MyTestType`} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.imageUrl} />
      </Helmet>

      <article className="max-w-2xl mx-auto px-4 pb-16">
        {/* Back link */}
        <div className="pt-6 pb-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            심리 칼럼
          </Link>
        </div>

        {/* Hero image */}
        <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden mb-8 bg-muted">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[11px] font-bold text-primary bg-primary/8 px-2.5 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-xs text-muted-foreground">{post.date}</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-black text-foreground leading-snug mb-4">
          {post.title}
        </h1>

        {/* Description lead */}
        <p className="text-base text-muted-foreground leading-relaxed mb-8 pb-8 border-b border-border">
          {post.description}
        </p>

        {/* Content */}
        <div className="space-y-4">
          {renderContent(post.content)}
        </div>

        {/* Divider */}
        <div className="mt-16 pt-10 border-t border-border">
          <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest mb-5">
            다른 칼럼
          </p>
          <div className="flex flex-col gap-0 divide-y divide-border">
            {related.map((r) => (
              <Link key={r.id} href={`/blog/${r.id}`}>
                <div className="flex gap-3 py-4 group cursor-pointer hover:bg-muted/30 -mx-2 px-2 rounded-xl transition-colors">
                  <div className="shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-muted">
                    <img
                      src={r.imageUrl}
                      alt={r.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-1 min-w-0">
                    <span className="text-[10px] font-bold text-primary">{r.category}</span>
                    <p className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                      {r.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </Layout>
  );
}
