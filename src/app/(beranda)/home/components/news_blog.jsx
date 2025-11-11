"use client";

import { useState } from "react";
import {
  Text,
  Column,
  Container,
  Padding,
  SizedBox,
  Row,
} from "@/components/shared/custom_widget";
import Image from "next/image";
import { dummyNewsBlog } from "@/data/dummy/data_dummy";

export default function NewsBlog() {
  return (
    <>
      <Text size={20} className="font-semibold">
        News & Blog
      </Text>
      <SizedBox height={20} />
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyNewsBlog.map((news, index) => (
          <div
            key={news.id}
            className="rounded-lg overflow-hidden shadow-md border border-gray-100 bg-white cursor-pointer hover:shadow-lg transition-shadow duration-200"
          >
            <div className="relative">
              {" "}
              <Image
                src={news.image}
                alt={news.title}
                width={999999}
                height={0}
                className="w-full h-60 object-cover rounded-t-lg"
              />
              <div className="absolute top-4 left-4 bg-black text-white text-xs font-semibold px-5 py-1 rounded-full">
                News
              </div>
            </div>

            <Padding vertical={12} horizontal={12}>
              <Text size={15} className="font-regular text-gray-500 mb-2">
                {news.created_at}
              </Text>
              <Text size={15} className="font-semibold">
                {news.title}
              </Text>
            </Padding>
          </div>
        ))}
      </div>
    </>
  );
}
