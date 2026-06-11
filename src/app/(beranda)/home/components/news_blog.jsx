"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageAssets } from "@/common/constant/assets";
import { Padding, SizedBox, Text } from "@/components/shared/custom_widget";
import { viewRandomNews } from "@/actions/news.action";
import { useApiRequest } from "@/hooks/use-api-request";

const NEWS_LIMIT = 3;

function stripHtml(value) {
  return String(value || "").replace(/<[^>]*>/g, "");
}

function decodeHtml(value) {
  if (typeof window === "undefined") {
    return value;
  }

  const textarea = document.createElement("textarea");
  textarea.innerHTML = value;
  return textarea.value;
}

function formatDate(value) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getNewsImage(news) {
  const image =
    news?.yoast_head_json?.og_image?.[0]?.url ||
    news?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return typeof image === "string" && image.trim()
    ? image
    : ImageAssets.placeholderAnimal;
}

function mapNews(news) {
  const title = decodeHtml(stripHtml(news?.title?.rendered));

  return {
    id: news.id,
    title: title || "Berita tanpa judul",
    createdAt: formatDate(news.date),
    image: getNewsImage(news),
    url: news.link || news?.guid?.rendered || "#",
  };
}

function NewsImage({ src, alt }) {
  const imageSrc =
    typeof src === "string" && src.trim() ? src : ImageAssets.placeholderAnimal;
  const className = "w-full h-60 object-cover rounded-t-lg";

  if (imageSrc.startsWith("/")) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        width={999999}
        height={0}
        className={className}
      />
    );
  }

  return <img src={imageSrc} alt={alt} className={className} />;
}

export default function NewsBlog() {
  const { run } = useApiRequest();
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadNews = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await run(() => viewRandomNews(), {
          errorMessage: "Gagal mengambil News & Blog",
        });

        if (ignore) {
          return;
        }

        if (response?.success === false) {
          setNewsList([]);
          setErrorMessage(response?.message || "Gagal mengambil News & Blog");
          return;
        }

        const news = Array.isArray(response?.data) ? response.data : [];
        const latestNews = news.slice(-NEWS_LIMIT).reverse().map(mapNews);

        setNewsList(latestNews);
      } catch (error) {
        if (!ignore) {
          setNewsList([]);
          setErrorMessage(error?.message || "Gagal mengambil News & Blog");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadNews();

    return () => {
      ignore = true;
    };
  }, [run]);

  const hasNews = newsList.length > 0;

  return (
    <>
      <Text size={20} className="font-semibold">
        News & Blog
      </Text>
      <SizedBox height={20} />

      {isLoading ? (
        <Text className="text-gray-500">Memuat News & Blog...</Text>
      ) : null}

      {!isLoading && errorMessage ? (
        <Text className="text-sm text-red-500">{errorMessage}</Text>
      ) : null}

      {!isLoading && !errorMessage && !hasNews ? (
        <Text className="text-gray-500">Belum ada News & Blog.</Text>
      ) : null}

      {hasNews ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.map((news) => (
            <a
              key={news.id}
              href={news.url}
              className="rounded-lg overflow-hidden shadow-md border border-gray-100 bg-white cursor-pointer hover:shadow-lg transition-shadow duration-200"
            >
              <div className="relative">
                <NewsImage src={news.image} alt={news.title} />
                <div className="absolute top-4 left-4 bg-black text-white text-xs font-semibold px-5 py-1 rounded-full">
                  News
                </div>
              </div>

              <Padding vertical={12} horizontal={12}>
                <Text size={15} className="font-regular text-gray-500 mb-2">
                  {news.createdAt}
                </Text>
                <Text size={15} className="font-semibold">
                  {news.title}
                </Text>
              </Padding>
            </a>
          ))}
        </div>
      ) : null}
    </>
  );
}
