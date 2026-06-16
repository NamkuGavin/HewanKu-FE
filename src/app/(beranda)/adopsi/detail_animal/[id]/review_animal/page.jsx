"use client";

import * as React from "react";
import {
  Text,
  Column,
  Container,
  SizedBox,
} from "@/components/shared/custom_widget";
import HeroSectionBeranda from "@/components/shared/hero_section_beranda";
import { getAnimalReviews } from "@/actions/review.action";
import { useApiRequest } from "@/hooks/use-api-request";
import { useParams } from "next/navigation";
import RatingIndex from "./components/rating_index";
import ReviewList from "./components/review_list";

export default function ReviewAnimal() {
  const params = useParams();
  const animalId = params?.id;
  const { run } = useApiRequest();
  const [reviewData, setReviewData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    let ignore = false;

    const loadReviews = async () => {
      if (!animalId) {
        setIsLoading(false);
        setErrorMessage("ID hewan tidak ditemukan.");
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await run(() => getAnimalReviews(animalId), {
          errorMessage: "Gagal mengambil ulasan hewan",
        });

        if (ignore) {
          return;
        }

        if (response?.success === false) {
          setReviewData(null);
          setErrorMessage(response?.message || "Gagal mengambil ulasan hewan");
          return;
        }

        setReviewData(response?.data || null);
      } catch (error) {
        if (!ignore) {
          setReviewData(null);
          setErrorMessage(error?.message || "Gagal mengambil ulasan hewan");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadReviews();

    return () => {
      ignore = true;
    };
  }, [animalId, run]);

  const reviews = Array.isArray(reviewData?.ulasan) ? reviewData.ulasan : [];

  return (
    <>
      <HeroSectionBeranda showButton={false} />

      <Container bg="bg-white" className="py-16 px-50">
        <Container className="w-full bg-white border border-gray-200 rounded-lg">
          <Container className="border-b">
            <Text size={15} className="font-medium p-4">
              Review
            </Text>
          </Container>
          <Column className="w-full p-4 gap-4" crossAxisAlignment="start">
            <RatingIndex ratingSummary={reviewData} />
            <SizedBox height={15} />
            <Text size={15} className="font-medium">
              Balasan Pengguna
            </Text>
            {isLoading ? (
              <Text size={14} className="text-gray-500">
                Memuat ulasan hewan...
              </Text>
            ) : null}
            {!isLoading && errorMessage ? (
              <Text size={14} className="text-red-500">
                {errorMessage}
              </Text>
            ) : null}
            {!isLoading && !errorMessage ? <ReviewList reviews={reviews} /> : null}
          </Column>
        </Container>
      </Container>
    </>
  );
}
