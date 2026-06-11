"use client";

import { IconAssets, ImageAssets } from "@/common/constant/assets";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import {
  Text,
  Column,
  Container,
  Row,
  SizedBox,
} from "@/components/shared/custom_widget";
import Image from "next/image";
import { formatRupiah, useNavigator } from "@/utils/helper";
import { useFavorites } from "@/contexts/favorite-context";

function formatValue(value, fallback = "-") {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  return value;
}

function formatAge(value) {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  return `${value} Tahun`;
}

function toSafeNumber(value) {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
}

function normalizeWhatsappNumber(value) {
  const digits = String(value || "").replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  if (digits.startsWith("0")) {
    return `62${digits.slice(1)}`;
  }

  if (digits.startsWith("62")) {
    return digits;
  }

  if (digits.startsWith("8")) {
    return `62${digits}`;
  }

  return digits;
}

function resolveAnimalStatus(status) {
  const normalizedStatus = String(status || "").toLowerCase();

  if (normalizedStatus === "terjual") {
    return {
      label: "Sudah di adopsi",
      className: "text-red-500",
      isSold: true,
    };
  }

  if (normalizedStatus === "tersedia") {
    return {
      label: "Belum di adopsi",
      className: "text-[#27C840]",
      isSold: false,
    };
  }

  return {
    label: status || "-",
    className: "text-[#475156]",
    isSold: false,
  };
}

export default function AnimalInfo({ animal, animalId }) {
  const nav = useNavigator();
  const { isFavorite, isFavoriteUpdating, toggleFavorite } = useFavorites();
  const currentAnimalId = animal?.id ?? animalId;
  const fav = currentAnimalId ? isFavorite(currentAnimalId) : false;
  const isUpdatingFavorite = currentAnimalId
    ? isFavoriteUpdating(currentAnimalId)
    : false;
  const statusInfo = resolveAnimalStatus(animal?.status);
  const rating = toSafeNumber(animal?.rating);
  const phoneNumber = normalizeWhatsappNumber(
    animal?.nomorTelepon || animal?.shelter?.noTelepon
  );
  const animalName = formatValue(animal?.nama, "Hewan tanpa nama");
  const animalType = formatValue(animal?.jenis);

  if (!animal) {
    return null;
  }

  return (
    <Column crossAxisAlignment="start" className="w-full">
      <Row className="gap-2">
        <Rating defaultValue={rating} readOnly>
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton className="text-yellow-500" key={index} size={15} />
          ))}
        </Rating>
        <Text className="font-semibold text-xs">
          {rating.toFixed(1)} Star Rating
        </Text>
      </Row>

      <SizedBox height={5} />
      <Text className="font-normal mb-2">
        {animalName} - {animalType}
      </Text>

      <SizedBox height={5} />
      <div className="w-full grid grid-cols-2 gap-2">
        <div className="flex gap-1">
          <Text className="text-xs">Jenis Kelamin: </Text>
          <span className="font-semibold text-xs">
            {formatValue(animal.jenisKelamin)}
          </span>
        </div>
        <div className="flex gap-1">
          <Text className="text-xs">Status: </Text>
          <span className={`font-semibold text-xs ${statusInfo.className}`}>
            {statusInfo.label}
          </span>
        </div>
        <div className="flex gap-1">
          <Text className="text-xs">Umur: </Text>
          <span className="font-semibold text-xs">{formatAge(animal.umur)}</span>
        </div>
        <div className="flex gap-1">
          <Text className="text-xs">Category: </Text>
          <span className="font-semibold text-xs">{animalType}</span>
        </div>
      </div>

      <SizedBox height={15} />
      <Row className="gap-2">
        <Text className="font-semibold text-[#2DA5F3] text-lg">
          {formatRupiah(toSafeNumber(animal.harga))}
        </Text>
      </Row>

      <Separator className="my-5" />

      <Button
        onClick={() =>
          nav.push(`/adopsi/detail_animal/${currentAnimalId}/forum_informasi`)
        }
        disabled={statusInfo.isSold}
        className="h-[48px] w-[200px] border-2 border-[#FA8232] bg-white hover:bg-orange-50 cursor-pointer rounded-sm disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100"
        variant="outline"
      >
        <Text
          className={`font-bold text-base ${
            statusInfo.isSold ? "text-gray-400" : "text-[#FA8232]"
          }`}
        >
          Adopsi sekarang
        </Text>
      </Button>

      <Row mainAxisAlignment="between" className="w-full my-4">
        <div className="flex items-center justify-center">
          <Button
            onClick={() => toggleFavorite(currentAnimalId)}
            disabled={!currentAnimalId || isUpdatingFavorite}
            className="border-none hover:bg-transparent cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            variant="ghost"
            aria-label="Add to wishlist"
          >
            <Heart
              className={`transition-all ${
                fav ? "fill-[#FF8D28] text-[#FF8D28]" : "fill-transparent"
              }`}
            />
          </Button>

          <Text className="font-normal text-[#475156] text-xs">
            {fav ? "Tersimpan di Favorit" : "Tambahkan ke Favorit"}
          </Text>
        </div>
        <div
          onClick={() =>
            nav.push(`/adopsi/detail_animal/${currentAnimalId}/review_animal`)
          }
        >
          <Text className="font-normal text-[#F87537] text-xs cursor-pointer hover:underline">
            Lihat Review Hewan
          </Text>
        </div>
        <div className="flex items-center justify-center gap-5">
          <Text className="font-normal text-[#475156] text-xs">
            Kontak Penjual
          </Text>
          <button
            type="button"
            onClick={() => {
              if (phoneNumber) {
                window.open(
                  `https://wa.me/${phoneNumber}`,
                  "_blank",
                  "noopener,noreferrer"
                );
              }
            }}
            disabled={!phoneNumber}
            className="flex items-center justify-center gap-1 cursor-pointer hover:opacity-80 transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Image
              src={IconAssets.waOrangeIcon}
              alt="WA_Orange_Icon"
              width={15}
              height={15}
              className="object-cover"
            />
            <Text className="font-normal text-[#F87537] text-xs">
              {phoneNumber ? `+${phoneNumber}` : "Nomor tidak tersedia"}
            </Text>
          </button>
        </div>
      </Row>

      <Container className="bg-transparent border border-[#E4E7E9] px-5 pt-5 pb-2 w-full">
        <Column crossAxisAlignment="start">
          <Text className="font-normal text-xs">
            Checkout Aman 100% Terjamin
          </Text>
          <Row
            mainAxisAlignment="start"
            crossAxisAlignment="center"
            className="w-auto gap-3"
          >
            <Image
              src={ImageAssets.gopayLogo}
              alt="gopay"
              width={50}
              height={50}
            />
            <Image
              src={ImageAssets.qrisLogo}
              alt="qris"
              width={50}
              height={50}
            />
            <Image
              src={ImageAssets.mandiriLogo}
              alt="mandiri"
              width={50}
              height={50}
            />
            <Image
              src={ImageAssets.danaLogo}
              alt="dana"
              width={50}
              height={50}
            />
          </Row>
        </Column>
      </Container>
    </Column>
  );
}
