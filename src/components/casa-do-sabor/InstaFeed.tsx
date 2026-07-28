import { Instagram, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import videoAsset from "@/assets/instagram_video.mp4.asset.json";
import post1Asset from "@/assets/instagram_post_1.png.asset.json";
import post2Asset from "@/assets/instagram_post_2.png.asset.json";

const INSTA_POSTS = [
  {
    id: "video-1",
    type: "video",
    url: videoAsset.url,
    link: "https://www.instagram.com/casadosaborjti/",
    caption: "Energia e sabor para o seu dia! ☕✨",
  },
  {
    id: "post-1",
    type: "image",
    url: post1Asset.url,
    link: "https://www.instagram.com/casadosaborjatai/",
    caption: "Momentos especiais na Casa do Sabor. 🧺💖",
  },
  {
    id: "post-2",
    type: "image",
    url: post2Asset.url,
    link: "https://www.instagram.com/casadosaborjatai/",
    caption: "Celebrando a doçura e a força de cada mulher! 🌸",
  },
];

export function InstaFeed() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const index = Math.round(el.scrollLeft / el.offsetWidth);
      setActiveIndex(index);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="bg-cream px-5 pb-8 pt-4">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-ink/60">
            No nosso Instagram
          </h3>
          <a
            href="https://www.instagram.com/casadosaborjatai/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-terracotta hover:underline"
          >
            <Instagram className="h-3.5 w-3.5" />
            @casadosabor
          </a>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="hide-scrollbar flex snap-x snap-mandatory overflow-x-auto gap-4"
          >
            {INSTA_POSTS.map((post) => (
              <a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square w-[75%] flex-shrink-0 snap-center overflow-hidden rounded-2xl bg-blush-deep sm:w-[45%]"
              >
                {post.type === "video" ? (
                  <div className="relative h-full w-full">
                    <video
                      src={post.url}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      muted
                      playsInline
                      autoPlay
                      loop
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-transparent transition-colors">
                      <div className="rounded-full bg-white/20 p-3 backdrop-blur-md">
                        <Play className="h-6 w-6 text-white fill-white" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={post.url}
                    alt={post.caption}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 transition-all duration-300 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                  <p className="text-[10px] text-white line-clamp-2 leading-tight">
                    {post.caption}
                  </p>
                </div>
                <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white">
                  <Instagram className="h-3 w-3" />
                </div>
              </a>
            ))}
          </div>

          <div className="mt-4 flex justify-center gap-1.5">
            {INSTA_POSTS.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  activeIndex === i ? "w-4 bg-terracotta" : "w-1.5 bg-terracotta/20"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
