"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock3, Sparkles } from "lucide-react";
import { apiUrl } from "@/lib/api";

interface Blog {
  title: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  image: {
    url: string;
  };
  slug: string;
}

function renderInlineMarkdown(text: string): ReactNode[] {
  const segments: ReactNode[] = [];
  const inlinePattern = /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let lastIndex = 0;
  let matchIndex = 0;

  for (const match of text.matchAll(inlinePattern)) {
    const fullMatch = match[0];
    const matchStart = match.index ?? 0;

    if (matchStart > lastIndex) {
      segments.push(text.slice(lastIndex, matchStart));
    }

    if (match[2] && match[3]) {
      segments.push(
        <a
          key={`link-${matchIndex}`}
          href={match[3]}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-primary underline decoration-primary/40 underline-offset-4 transition hover:decoration-primary"
        >
          {match[2]}
        </a>
      );
    } else if (match[4]) {
      segments.push(
        <strong key={`bold-${matchIndex}`} className="font-semibold text-foreground">
          {match[4]}
        </strong>
      );
    } else if (match[5]) {
      segments.push(
        <em key={`italic-${matchIndex}`} className="font-medium italic text-foreground/90">
          {match[5]}
        </em>
      );
    }

    lastIndex = matchStart + fullMatch.length;
    matchIndex += 1;
  }

  if (lastIndex < text.length) {
    segments.push(text.slice(lastIndex));
  }

  return segments.length ? segments : [text];
}

function renderContent(content: string) {
  return content
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => {
      if (block.startsWith("### ")) {
        return (
          <h3 key={index} className="mt-10 text-xl font-semibold tracking-tight text-foreground">
            {renderInlineMarkdown(block.replace(/^###\s+/, ""))}
          </h3>
        );
      }

      if (block.startsWith("## ")) {
        return (
          <h2 key={index} className="mt-12 text-2xl font-bold tracking-tight text-foreground">
            {renderInlineMarkdown(block.replace(/^##\s+/, ""))}
          </h2>
        );
      }

      if (block.startsWith("# ")) {
        return (
          <h1 key={index} className="mt-12 text-3xl font-bold tracking-tight text-foreground">
            {renderInlineMarkdown(block.replace(/^#\s+/, ""))}
          </h1>
        );
      }

      if (block.startsWith("> ")) {
        const quoteLines = block
          .split("\n")
          .map((line) => line.replace(/^>\s?/, "").trim())
          .filter(Boolean);

        return (
          <blockquote
            key={index}
            className="my-8 rounded-[1.5rem] border border-primary/15 bg-primary/5 px-5 py-5 text-lg leading-8 text-foreground shadow-sm"
          >
            <div className="space-y-3">
              {quoteLines.map((line, lineIndex) => (
                <p key={lineIndex}>{renderInlineMarkdown(line)}</p>
              ))}
            </div>
          </blockquote>
        );
      }

      if (block.startsWith("- ")) {
        const items = block
          .split("\n")
          .map((line) => line.replace(/^-\s+/, "").trim())
          .filter(Boolean);

        return (
          <ul key={index} className="my-8 space-y-3 text-lg leading-8 text-muted-foreground">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="flex gap-3">
                <span className="mt-3 h-2 w-2 rounded-full bg-primary/70" />
                <span>{renderInlineMarkdown(item)}</span>
              </li>
            ))}
          </ul>
        );
      }

      return (
        <p key={index} className="text-lg leading-8 text-muted-foreground">
          {renderInlineMarkdown(block)}
        </p>
      );
    });
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        const response = await fetch(apiUrl(`/api/blogs/${slug}`));

        if (!response.ok) {
          throw new Error("Blog not found");
        }

        const data = await response.json();
        setBlog(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const articleContent = useMemo(() => {
    if (!blog?.content) return null;
    return renderContent(blog.content);
  }, [blog?.content]);

  if (loading) {
    return (
      <div className="page-aura flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="font-medium text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="page-aura flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md rounded-[2rem] border border-border bg-card p-8 text-center shadow-[0_20px_70px_rgba(0,0,0,0.08)]">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <Sparkles className="h-7 w-7" />
          </div>
          <h2 className="mb-3 text-2xl font-bold text-foreground">Article unavailable</h2>
          <p className="mb-6 text-muted-foreground">
            The story you&apos;re looking for may have moved, been removed, or isn&apos;t published yet.
          </p>
          <button
            onClick={() => router.push("/blogs")}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-aura min-h-screen pt-20">
      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-8 flex">
          <button
            onClick={() => router.push("/blogs")}
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blogs
          </button>
        </div>

        <article className="overflow-hidden rounded-[2rem] border border-white/40 bg-background/80 shadow-[0_20px_80px_rgba(15,23,42,0.12)] backdrop-blur dark:border-white/8 dark:bg-card/80 dark:shadow-[0_24px_90px_rgba(0,0,0,0.35)]">
          <div className="border-b border-border/70 px-6 py-10 sm:px-8 lg:px-14 lg:py-14">
            <div className="mx-auto max-w-4xl">
              <span className="inline-flex items-center rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                {blog.category}
              </span>
              <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                {blog.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                A focused read on {blog.category.toLowerCase()} with practical notes, ideas, and details worth slowing down for.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:max-w-xl">
                <div className="rounded-2xl border border-border/70 bg-background/70 p-4 backdrop-blur">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Published</p>
                  <p className="mt-2 text-base font-semibold text-foreground">{blog.date}</p>
                </div>

                <div className="rounded-2xl border border-border/70 bg-background/70 p-4 backdrop-blur">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Clock3 className="h-5 w-5" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Read Time</p>
                  <p className="mt-2 text-base font-semibold text-foreground">{blog.readTime}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-10 sm:px-8 lg:px-14 lg:py-14">
            <div className="mx-auto max-w-3xl space-y-6">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="h-4 w-4" />
                </span>
                <span>Settle in. This one is designed for a slower read.</span>
              </div>

              <div className="space-y-6">
                {articleContent}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
