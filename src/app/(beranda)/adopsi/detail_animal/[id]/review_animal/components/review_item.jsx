"use client";

import Image from "next/image";
import {
  Column,
  Container,
  Row,
  SizedBox,
  Text,
} from "@/components/shared/custom_widget";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";

export default function ReviewItem({ review }) {
  return (
    <Row className="w-full py-4 gap-4 items-start">
      {/* Avatar */}
      <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-100">
        <Image
          src={review.userAvatar}
          alt={review.userName}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <Column className="flex-1" crossAxisAlignment="start">
        <Row className="items-center gap-2">
          <Text size={14} className="font-semibold text-gray-900">
            {review.userName}
          </Text>
          <Text size={12} className="text-gray-400">
            •
          </Text>
          <Text size={12} className="text-gray-500">
            {review.time}
          </Text>
        </Row>

        <SizedBox height={6} />

        {/* Rating */}
        <Rating defaultValue={review.rating} readOnly>
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton key={index} size={15} className="text-[#F87537]" />
          ))}
        </Rating>

        <SizedBox height={8} />

        {/* Comment */}
        <Text size={14} className="text-gray-700">
          {review.comment}
        </Text>
      </Column>
    </Row>
  );
}
