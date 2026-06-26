"use client";

import { use, useEffect, useMemo, useState } from "react";
import { getAnimalById, viewAnimalsForUser } from "@/actions/animal.action";
import {
  Text,
  Column,
  Container,
  Row,
} from "@/components/shared/custom_widget";
import HeroSectionBeranda from "@/components/shared/hero_section_beranda";
import AnimalImageSlider from "./components/animal_image_slider";
import AnimalInfo from "./components/animal_info";
import { useApiRequest } from "@/hooks/use-api-request";
import { useFavorites } from "@/contexts/favorite-context";

export default function DetailAnimal({ params }) {
  const resolvedParams = use(params);
  const animalId = resolvedParams.id;
  const { run } = useApiRequest();
  const { syncFavoriteAnimals } = useFavorites();
  const [animal, setAnimal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadAnimal = async () => {
      setIsLoading(true);
      setErrorMessage("");

      const syncFavoriteState = async () => {
        try {
          const favoriteResponse = await viewAnimalsForUser();

          if (!ignore && favoriteResponse?.success !== false) {
            syncFavoriteAnimals(favoriteResponse?.data?.daftarFavorit);
          }
        } catch {
          // Favorite tetap bisa diubah lewat tombol, jadi gagal sync tidak memblokir detail.
        }
      };

      try {
        const response = await run(() => getAnimalById(animalId), {
          errorMessage: "Gagal mengambil detail hewan",
        });

        if (ignore) {
          return;
        }

        if (response?.success === false || !response?.data) {
          setAnimal(null);
          setErrorMessage(response?.message || "Detail hewan tidak ditemukan.");
          return;
        }

        setAnimal(response.data);
        void syncFavoriteState();
      } catch (error) {
        if (!ignore) {
          setAnimal(null);
          setErrorMessage(error?.message || "Gagal mengambil detail hewan.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    if (animalId) {
      loadAnimal();
    }

    return () => {
      ignore = true;
    };
  }, [animalId, run, syncFavoriteAnimals]);

  const animalImages = useMemo(() => {
    return animal?.urlFoto ? [animal.urlFoto] : [];
  }, [animal?.urlFoto]);

  return (
    <>
      <HeroSectionBeranda showButton={false} />
      <Container bg="bg-white" className="py-16 px-25">
        <Column
          mainAxisAlignment="start"
          crossAxisAlignment="start"
          className="min-h-96"
        >
          <Row className="w-full gap-8" mainAxisAlignment="center">
            <AnimalImageSlider
              images={animalImages}
              animalName={animal?.nama}
            />
            {isLoading ? (
              <Column crossAxisAlignment="center" className="w-full">
                <Text className="text-gray-500">Memuat detail hewan...</Text>
              </Column>
            ) : errorMessage ? (
              <Column crossAxisAlignment="center" className="w-full">
                <Text className="text-sm text-red-500">{errorMessage}</Text>
              </Column>
            ) : (
              <AnimalInfo animal={animal} animalId={animalId} />
            )}
          </Row>
        </Column>
      </Container>
    </>
  );
}
