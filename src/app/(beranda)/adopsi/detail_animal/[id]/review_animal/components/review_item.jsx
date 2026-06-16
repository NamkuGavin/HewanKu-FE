"use client";

import { ImageAssets } from "@/common/constant/assets";
import { Column, Row, SizedBox, Text } from "@/components/shared/custom_widget";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";

function normalizeText(value) {
  return String(value || "").trim();
}

function resolveReviewerName(review) {
  const user = review?.user || {};
  const fullName = [user?.namaDepan, user?.namaBelakang]
    .map(normalizeText)
    .filter(Boolean)
    .join(" ");

  return (
    normalizeText(review?.userName) ||
    normalizeText(user?.displayName) ||
    normalizeText(user?.nama) ||
    fullName ||
    normalizeText(user?.username) ||
    normalizeText(user?.email) ||
    "Pengguna HewanKu"
  );
}

function resolveReviewerAvatar(review) {
  const user = review?.user || {};

  return (
    normalizeText(review?.userAvatar) ||
    normalizeText(user?.urlFoto) ||
    normalizeText(user?.fotoProfil) ||
    normalizeText(user?.profileImage) ||
    ImageAssets.placeholderAnimal
  );
}

function resolveReviewRating(review) {
  const rating = Number(review?.rating);

  return Number.isFinite(rating) ? rating : 0;
}

export default function ReviewItem({ review }) {
  const userName = resolveReviewerName(review);
  const userAvatar = resolveReviewerAvatar(review);
  const reviewDate =
    normalizeText(review?.time) || normalizeText(review?.dateAdded) || "-";
  const rating = resolveReviewRating(review);
  const comment =
    normalizeText(review?.comment) ||
    normalizeText(review?.komen) ||
    "Belum ada komentar.";

  return (
    <Row className="w-full py-4 gap-4 items-start">
      <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-100">
        <img
          src={userAvatar}
          alt={userName}
          className="h-full w-full object-cover"
        />
      </div>

      <Column className="flex-1" crossAxisAlignment="start">
        <Row className="items-center gap-2">
          <Text size={14} className="font-semibold text-gray-900">
            {userName}
          </Text>
          <Text size={12} className="text-gray-400">
            -
          </Text>
          <Text size={12} className="text-gray-500">
            {reviewDate}
          </Text>
        </Row>

        <SizedBox height={6} />

        <Rating defaultValue={rating} readOnly>
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton key={index} size={15} className="text-[#F87537]" />
          ))}
        </Rating>

        <SizedBox height={8} />

        <Text size={14} className="text-gray-700">
          {comment}
        </Text>
      </Column>
    </Row>
  );
}
