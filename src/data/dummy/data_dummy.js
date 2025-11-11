import { Animal } from "@/data/models/dummy/animal_model";
import { AnimalCategory } from "@/data/models/dummy/animal_category_model";
import { AnimalNewsBlog } from "@/data/models/dummy/animal_news_blog";
import { ImageAssets } from "@/common/constant/assets";

export const dummyHewanUnggulan = [
  new Animal({
    id: 1,
    name: "Golden Retriever",
    price: 2000000,
    image: ImageAssets.dog,
  }),
  new Animal({
    id: 2,
    name: "Kucing Anggora",
    price: 1000000,
    image: ImageAssets.cat,
  }),
  new Animal({
    id: 3,
    name: "Landak Tajam",
    price: 3000000,
    image: ImageAssets.landak,
  }),
];

export const dummyKategoriHewan = [
  new AnimalCategory({
    id: 1,
    name: "Anjing",
    unit: 84,
    image: ImageAssets.dog1,
  }),
  new AnimalCategory({
    id: 2,
    name: "Kucing",
    unit: 64,
    image: ImageAssets.cat1,
  }),
  new AnimalCategory({
    id: 3,
    name: "Kelinci",
    unit: 22,
    image: ImageAssets.kelinci,
  }),
  new AnimalCategory({
    id: 4,
    name: "Ikan",
    unit: 16,
    image: ImageAssets.ikanMas,
  }),
  new AnimalCategory({
    id: 5,
    name: "Burung",
    unit: 91,
    image: ImageAssets.burung,
  }),
  new AnimalCategory({
    id: 6,
    name: "Hamster",
    unit: 57,
    image: ImageAssets.hamster,
  }),
  new AnimalCategory({
    id: 7,
    name: "Kura-kura",
    unit: 35,
    image: ImageAssets.kuraKura,
  }),
  new AnimalCategory({
    id: 8,
    name: "Iguana",
    unit: 1,
    image: ImageAssets.iguana,
  }),
  new AnimalCategory({
    id: 9,
    name: "Ular",
    unit: 10,
    image: ImageAssets.ular,
  }),
];

export const dummyNewsBlog = [
  new AnimalNewsBlog({
    id: 1,
    title: "Anjing Polisi Terkenal Bernama Ali",
    created_at: "24 May,2024",
    image: ImageAssets.dog2,
  }),
  new AnimalNewsBlog({
    id: 2,
    title: "Shiba Inu menjadi icon coin di crypto yang bernama doge coin",
    created_at: "24 May,2024",
    image: ImageAssets.dog3,
  }),
  new AnimalNewsBlog({
    id: 3,
    title: "Burung termahal dan antik di tahun 2024",
    created_at: "24 May,2024",
    image: ImageAssets.burung1,
  }),
];
