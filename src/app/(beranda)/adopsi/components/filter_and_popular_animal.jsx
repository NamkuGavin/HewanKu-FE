"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import { formatRupiah } from "@/utils/helper";
import { dummyPopularHewan } from "@/data/dummy/data_dummy";
import Image from "next/image";
import {
  Text,
  Column,
  Container,
  Padding,
  Row,
  SizedBox,
} from "@/components/shared/custom_widget";

const Slider = React.forwardRef(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
      <SliderPrimitive.Range className="absolute h-full bg-orange-500" />
    </SliderPrimitive.Track>
    {(props.value ?? props.defaultValue)?.map((_, index) => (
      <SliderPrimitive.Thumb
        key={index}
        className="block h-4 w-4 rounded-full bg-orange-500 shadow-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      />
    ))}
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export default function FilterAndPopularAnimal() {
  const [value, setValue] = React.useState([750000, 7500000]);
  const [from, to] = value;

  return (
    <Column className="w-1/4" crossAxisAlignment="start">
      <Text className="font-semibold mb-4">Telusuri berdasarkan Harga</Text>
      <Column className="w-full">
        <Row mainAxisAlignment="between" className="mb-2">
          <Text className="text-xs">500.000</Text>
          <Text className="text-xs">9.000.000</Text>
        </Row>
        <div className="w-full flex items-center justify-between gap-2">
          <Slider
            value={value}
            onValueChange={setValue}
            min={500000}
            max={9000000}
            step={100000}
          />
        </div>
        <Text className="mt-4 text-center text-xs font-medium">
          Harga: {formatRupiah(from)} - {formatRupiah(to)}
        </Text>
      </Column>
      <Text className="font-semibold mt-8 mb-4">Hewan Popular</Text>
      <div className="w-full grid grid-cols-1 gap-4">
        {dummyPopularHewan.map((animal, index) => (
          <Container key={animal.id} className="overflow-hidden cursor-pointer">
            <Row>
              <Image
                src={animal.image}
                alt={animal.name}
                width={999999}
                height={0}
                className="w-1/2 h-15 object-cover rounded-md mr-2"
              />
              <Column crossAxisAlignment="start">
                <Text size={12} className="font-semibold">
                  {animal.name}
                </Text>
                <Text size={12} className="font-semibold">
                  Rp{animal.price.toLocaleString("id-ID")}
                </Text>
              </Column>
            </Row>
          </Container>
        ))}
      </div>
    </Column>
  );
}
