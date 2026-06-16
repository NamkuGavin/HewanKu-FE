"use client";

import { Column, Container, Text } from "@/components/shared/custom_widget";
import ReviewItem from "./review_item";

export default function ReviewList({ reviews = [] }) {
  if (reviews.length === 0) {
    return (
      <Container className="w-full rounded-md border border-dashed border-gray-200 p-4">
        <Text size={14} className="text-gray-500">
          Belum ada ulasan untuk hewan ini.
        </Text>
      </Container>
    );
  }

  return (
    <Container className="w-full">
      <Column className="w-full">
        {reviews.map((item, idx) => (
          <Container key={item.id} className="w-full">
            <ReviewItem review={item} />
            {idx !== reviews.length - 1 && (
              <div className="w-full border-b border-gray-200" />
            )}
          </Container>
        ))}
      </Column>
    </Container>
  );
}
