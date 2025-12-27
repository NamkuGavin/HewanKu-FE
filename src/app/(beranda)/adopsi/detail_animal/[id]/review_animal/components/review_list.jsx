"use client";

import { dummyReviews } from "@/data/dummy/data_dummy";
import { Column, Container } from "@/components/shared/custom_widget";
import ReviewItem from "./review_item";

export default function ReviewList() {
  return (
    <Container className="w-full">
      <Column className="w-full">
        {dummyReviews.map((item, idx) => (
          <Container key={item.id} className="w-full">
            <ReviewItem review={item} />
            {idx !== dummyReviews.length - 1 && (
              <div className="w-full border-b border-gray-200" />
            )}
          </Container>
        ))}
      </Column>
    </Container>
  );
}
