import { Animal } from "@/data/models/dummy/animal_model";
import {
  AnimalCategory,
  AnimalAdopsiCategory,
} from "@/data/models/dummy/animal_category_model";
import { AnimalNewsBlog } from "@/data/models/dummy/animal_news_blog";
import {
  OrderAnimalItem,
  OrderAdopsi,
} from "@/data/models/dummy/animal_last_order";
import { IconAssets, ImageAssets } from "@/common/constant/assets";

export const dummyHewanUnggulan = [
  new Animal({
    id: 1,
    name: "Golden Retriever",
    price: 2000000,
    image: ImageAssets.placeholderAnimal,
  }),
  new Animal({
    id: 2,
    name: "Kucing Anggora",
    price: 1000000,
    image: ImageAssets.placeholderAnimal,
  }),
  new Animal({
    id: 3,
    name: "Landak Tajam",
    price: 3000000,
    image: ImageAssets.placeholderAnimal,
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
    image: ImageAssets.placeholderAnimal,
  }),
  new AnimalNewsBlog({
    id: 2,
    title: "Shiba Inu menjadi icon coin di crypto yang bernama doge coin",
    created_at: "24 May,2024",
    image: ImageAssets.placeholderAnimal,
  }),
  new AnimalNewsBlog({
    id: 3,
    title: "Burung termahal dan antik di tahun 2024",
    created_at: "24 May,2024",
    image: ImageAssets.placeholderAnimal,
  }),
];

export const dummyKategoriHewanAdopsi = [
  new AnimalAdopsiCategory({
    id: 1,
    name: "Kucing",
    activeIcon: IconAssets.categoryCatActive,
    icon: IconAssets.categoryCat,
  }),
  new AnimalAdopsiCategory({
    id: 2,
    name: "Hamster",
    activeIcon: IconAssets.categoryHasmterActive,
    icon: IconAssets.categoryHamster,
  }),
  new AnimalAdopsiCategory({
    id: 3,
    name: "Anjing",
    activeIcon: IconAssets.categoryDogActive,
    icon: IconAssets.categoryDog,
  }),
  new AnimalAdopsiCategory({
    id: 4,
    name: "Burung",
    activeIcon: IconAssets.categoryBirdActive,
    icon: IconAssets.categoryBird,
  }),
  new AnimalAdopsiCategory({
    id: 5,
    name: "Kelinci",
    activeIcon: IconAssets.categoryRabbitActive,
    icon: IconAssets.categoryRabbit,
  }),
  new AnimalAdopsiCategory({
    id: 6,
    name: "Kura-kura",
    activeIcon: IconAssets.categoryTurtleActive,
    icon: IconAssets.categoryTurtle,
  }),
  new AnimalAdopsiCategory({
    id: 7,
    name: "Ikan",
    activeIcon: IconAssets.categoryFishActive,
    icon: IconAssets.categoryFish,
  }),
  new AnimalAdopsiCategory({
    id: 8,
    name: "Ular",
    activeIcon: IconAssets.categorySnakeActive,
    icon: IconAssets.categorySnake,
  }),
  new AnimalAdopsiCategory({
    id: 9,
    name: "Iguana",
    activeIcon: IconAssets.categoryIguanaActive,
    icon: IconAssets.categoryIguana,
  }),
];

export const dummyHewan = [
  new Animal({
    id: 1,
    name: "Golden Retriever",
    price: 2000000,
    image: ImageAssets.placeholderAnimal,
  }),
  new Animal({
    id: 2,
    name: "Kucing Anggora",
    price: 1000000,
    image: ImageAssets.placeholderAnimal,
  }),
  new Animal({
    id: 3,
    name: "Landak Mini",
    price: 3000000,
    image: ImageAssets.placeholderAnimal,
  }),
  new Animal({
    id: 4,
    name: "Sugar Glider",
    price: 750000,
    image: ImageAssets.placeholderAnimal,
  }),
  new Animal({
    id: 5,
    name: "Bearded Dragon",
    price: 2500000,
    image: ImageAssets.placeholderAnimal,
  }),
  new Animal({
    id: 6,
    name: "Kelinci Holland Lop",
    price: 800000,
    image: ImageAssets.placeholderAnimal,
  }),
  new Animal({
    id: 7,
    name: "Burung Lovebird",
    price: 500000,
    image: ImageAssets.placeholderAnimal,
  }),
  new Animal({
    id: 8,
    name: "Hamster Syrian",
    price: 150000,
    image: ImageAssets.placeholderAnimal,
  }),
  new Animal({
    id: 9,
    name: "Ikan Cupang Halfmoon",
    price: 120000,
    image: ImageAssets.placeholderAnimal,
  }),
  new Animal({
    id: 10,
    name: "Tokek Leopard Gecko",
    price: 1800000,
    image: ImageAssets.placeholderAnimal,
  }),
  new Animal({
    id: 11,
    name: "Kura-Kura Sulcata",
    price: 3500000,
    image: ImageAssets.placeholderAnimal,
  }),
  new Animal({
    id: 12,
    name: "Burung Kenari",
    price: 400000,
    image: ImageAssets.placeholderAnimal,
  }),
  new Animal({
    id: 13,
    name: "Anjing Pomeranian",
    price: 5000000,
    image: ImageAssets.placeholderAnimal,
  }),
  new Animal({
    id: 14,
    name: "Kucing Persia",
    price: 1800000,
    image: ImageAssets.placeholderAnimal,
  }),
  new Animal({
    id: 15,
    name: "Chinchilla",
    price: 2500000,
    image: ImageAssets.placeholderAnimal,
  }),
  new Animal({
    id: 16,
    name: "Ikan Koi Kohaku",
    price: 750000,
    image: ImageAssets.placeholderAnimal,
  }),
  new Animal({
    id: 17,
    name: "Sugar Glider Mosaic",
    price: 1500000,
    image: ImageAssets.placeholderAnimal,
  }),
  new Animal({
    id: 18,
    name: "Burung Kakatua",
    price: 8000000,
    image: ImageAssets.placeholderAnimal,
  }),
  new Animal({
    id: 19,
    name: "Musang Rase",
    price: 1300000,
    image: ImageAssets.placeholderAnimal,
  }),
  new Animal({
    id: 20,
    name: "Ular Corn Snake",
    price: 2000000,
    image: ImageAssets.placeholderAnimal,
  }),
];

export const dummyPopularHewan = [
  new Animal({
    id: 1,
    name: "Golden Retriever",
    price: 2000000,
    image: ImageAssets.placeholderAnimal,
  }),
  new Animal({
    id: 2,
    name: "Kucing Anggora",
    price: 1000000,
    image: ImageAssets.placeholderAnimal,
  }),
  new Animal({
    id: 3,
    name: "Landak Mini",
    price: 3000000,
    image: ImageAssets.placeholderAnimal,
  }),
  new Animal({
    id: 4,
    name: "Sugar Glider",
    price: 750000,
    image: ImageAssets.placeholderAnimal,
  }),
  new Animal({
    id: 5,
    name: "Bearded Dragon",
    price: 2500000,
    image: ImageAssets.placeholderAnimal,
  }),
];

export const dummyOrderAdopsi = [
  new OrderAdopsi({
    orderId: "51746385",
    status: "BERHASIL",
    dateTimeText: "Dec 30, 2025 07:52",
    total: 2000000,
    items: [
      new OrderAnimalItem({
        id: 1,
        image: ImageAssets.placeholderAnimal,
        name: "Ali",
        gender: "Jantan",
        ageText: "2 Tahun",
        category: "Anjing Labrador Retriever Mangilao, GU",
        price: 1000000,
        quantity: 1,
        healthStatus: "Telah di Vaksin",
      }),
      new OrderAnimalItem({
        id: 2,
        image: ImageAssets.placeholderAnimal,
        name: "Gavin",
        gender: "Jantan",
        ageText: "1 Tahun",
        category: "Kucing Turkish Anggora",
        price: 1000000,
        quantity: 1,
        healthStatus: "Telah di Vaksin",
      }),
    ],
  }),

  new OrderAdopsi({
    orderId: "51746386",
    status: "GAGAL",
    dateTimeText: "Dec 4, 2025 21:42",
    total: 1500000,
    items: [
      new OrderAnimalItem({
        id: 3,
        image: ImageAssets.placeholderAnimal,
        name: "Milo",
        gender: "Jantan",
        ageText: "1 Tahun",
        category: "Kucing Persia",
        price: 1500000,
        quantity: 1,
        healthStatus: "Belum di Vaksin",
      }),
    ],
  }),

  new OrderAdopsi({
    orderId: "67397143",
    status: "BERHASIL",
    dateTimeText: "Feb 2, 2025 19:28",
    total: 1000000,
    items: [
      new OrderAnimalItem({
        id: 4,
        image: ImageAssets.placeholderAnimal,
        name: "Luna",
        gender: "Betina",
        ageText: "2 Tahun",
        category: "Kucing Domestic Short Hair",
        price: 1000000,
        quantity: 1,
        healthStatus: "Telah di Vaksin",
      }),
    ],
  }),

  new OrderAdopsi({
    orderId: "67397144",
    status: "BERHASIL",
    dateTimeText: "Mar 20, 2025 23:14",
    total: 1500000,
    items: [
      new OrderAnimalItem({
        id: 5,
        image: ImageAssets.placeholderAnimal,
        name: "Rocky",
        gender: "Jantan",
        ageText: "3 Tahun",
        category: "Anjing Golden Retriever",
        price: 1500000,
        quantity: 1,
        healthStatus: "Telah di Vaksin",
      }),
    ],
  }),

  new OrderAdopsi({
    orderId: "67397145",
    status: "BERHASIL",
    dateTimeText: "Apr 12, 2025 10:05",
    total: 2500000,
    items: [
      new OrderAnimalItem({
        id: 6,
        image: ImageAssets.placeholderAnimal,
        name: "Bella",
        gender: "Betina",
        ageText: "1 Tahun",
        category: "Anjing Pomeranian",
        price: 2500000,
        quantity: 1,
        healthStatus: "Telah di Vaksin",
      }),
    ],
  }),

  new OrderAdopsi({
    orderId: "67397146",
    status: "BERHASIL",
    dateTimeText: "May 1, 2025 15:30",
    total: 2000000,
    items: [
      new OrderAnimalItem({
        id: 7,
        image: ImageAssets.placeholderAnimal,
        name: "Simba",
        gender: "Jantan",
        ageText: "2 Tahun",
        category: "Kucing Bengal",
        price: 2000000,
        quantity: 1,
        healthStatus: "Telah di Vaksin",
      }),
    ],
  }),

  new OrderAdopsi({
    orderId: "67397147",
    status: "GAGAL",
    dateTimeText: "May 18, 2025 08:20",
    total: 1200000,
    items: [
      new OrderAnimalItem({
        id: 8,
        image: ImageAssets.placeholderAnimal,
        name: "Coco",
        gender: "Betina",
        ageText: "1 Tahun",
        category: "Kucing Scottish Fold",
        price: 1200000,
        quantity: 1,
        healthStatus: "Belum di Vaksin",
      }),
    ],
  }),

  new OrderAdopsi({
    orderId: "67397148",
    status: "BERHASIL",
    dateTimeText: "Jun 5, 2025 13:45",
    total: 3000000,
    items: [
      new OrderAnimalItem({
        id: 9,
        image: ImageAssets.placeholderAnimal,
        name: "Thor",
        gender: "Jantan",
        ageText: "4 Tahun",
        category: "Anjing Siberian Husky",
        price: 3000000,
        quantity: 1,
        healthStatus: "Telah di Vaksin",
      }),
    ],
  }),

  new OrderAdopsi({
    orderId: "67397149",
    status: "BERHASIL",
    dateTimeText: "Jun 22, 2022025 09:10",
    total: 1800000,
    items: [
      new OrderAnimalItem({
        id: 10,
        image: ImageAssets.placeholderAnimal,
        name: "Nala",
        gender: "Betina",
        ageText: "2 Tahun",
        category: "Kucing Maine Coon",
        price: 1800000,
        quantity: 1,
        healthStatus: "Telah di Vaksin",
      }),
    ],
  }),
];
