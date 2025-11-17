import {
  Text,
  Column,
  Container,
  Padding,
  Row,
  SizedBox,
  ReadMoreText,
} from "@/components/shared/custom_widget";
import Image from "next/image";
import { ImageAssets } from "@/common/constant/assets";

export default function FounderSection() {
  return (
    <Row
      mainAxisAlignment="center"
      crossAxisAlignment="center"
      className="w-full"
    >
      <Image
        src={ImageAssets.zuhriBlur}
        alt="zuhriBlur"
        width={1250}
        height={1250}
        className="rounded-2xl object-cover"
      />
      <SizedBox width={150} />
      <Column crossAxisAlignment="start">
        <Text size={30} className="font-semibold text-left">
          Zuhri Pratisto
        </Text>
        <Text size={15} className="font-semibold text-left text-stone-500">
          Founder
        </Text>
        <SizedBox height={30} />
        <ReadMoreText
          maxLines={3}
          className="font-semibold text-left text-stone-500 italic"
          textSize={15}
        >
          Nisl nunc vitae integer ridiculus ultrices quam a scelerisque est.
          Sollicitudin volutpat blandit maecenas ornare dictum tempor. Amet sem
          non rutrum et duis. Id nisi ac vitae enim neque sapien.
          <br />
          <br />
          Eu arcu consectetur etiam bibendum fermentum sed lobortis fringilla
          imperdiet. Aliquet ultrices risus dolor gravida. Faucibus sodales
          semper a magnis sapien viverra purus sed tortor. Amet risus blandit
          nunc odio rutrum. <br />
          <br />
          Adipiscing tincidunt imperdiet at cursus ipsum vulputate pharetra.
          Tellus nulla commodo ut ut auctor orci blandit at elit. Turpis
          pulvinar sagittis tristique aliquam vitae ipsum dui. Amet tempor
          posuere mi amet vel lobortis bibendum. Commodo purus tincidunt cursus
          tellus massa vel viverra.
        </ReadMoreText>
        <SizedBox height={20} />
        <Image
          src={ImageAssets.ttdZuhri}
          alt="ttdZuhri"
          width={100}
          height={100}
          className="rounded-2xl object-cover"
        />
      </Column>
    </Row>
  );
}
