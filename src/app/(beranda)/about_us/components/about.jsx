import {
  Text,
  Column,
  Container,
  Padding,
  Row,
  SizedBox,
  ReadMoreText,
} from "@/components/shared/custom_widget";

export default function About() {
  return (
    <>
      <Text size={30} className="font-semibold text-left">
        Tentang Website Kami
      </Text>
      <SizedBox height={20} />
      <Row
        className="w-full"
        mainAxisAlignment="between"
        crossAxisAlignment="start"
      >
        <Container className="w-2/5">
          <ReadMoreText
            maxLines={3}
            className="font-normal text-left"
            textSize={15}
          >
            At et vehicula sodales est proin turpis pellentesque sinulla a
            aliquam amet rhoncus quisque eget sit. Sociis blandit et
            pellentesque aliquet at quisque tortor lacinia nullam. Mattis aenean
            scelerisque dui libero cras arcu in egestas sagittis.
          </ReadMoreText>
        </Container>
        <Container className="w-2/5">
          <ReadMoreText
            maxLines={3}
            className="font-normal text-left"
            textSize={15}
          >
            Aliquet ultrices risus dolor gravida. Faucibus sodales semper a
            magnis sapien viverra purus sed tortor. Amet risus blandit nunc odio
            rutrum. Adipiscing tincidunt imperdiet at cursus ipsum vulputate
            pharetra. Tellus nulla commodo ut ut auctor orci blandit at elit .
            Turpis pulvinar sagittis tristique aliquam vitae ipsum dui. Amet
            tempor posuere mi amet vel lobortis bibendum. Commodo purus
            tincidunt cursus tellus massa vel viverra.
          </ReadMoreText>
        </Container>
      </Row>
      <SizedBox height={30} />
      <Row mainAxisAlignment="between">
        <Column crossAxisAlignment="start">
          <Text size={25} className="font-semibold text-orange-500">
            2k+
          </Text>
          <Text size={15} className="font-normal">
            Happy Clients
          </Text>
        </Column>
        <Column crossAxisAlignment="start">
          <Text size={25} className="font-semibold text-orange-500">
            72
          </Text>
          <Text size={15} className="font-normal">
            Brands
          </Text>
        </Column>
        <Column crossAxisAlignment="start">
          <Text size={25} className="font-semibold text-orange-500">
            1.8k+
          </Text>
          <Text size={15} className="font-normal">
            Products
          </Text>
        </Column>
        <Column crossAxisAlignment="start">
          <Text size={25} className="font-semibold text-orange-500">
            28
          </Text>
          <Text size={15} className="font-normal">
            Years in business
          </Text>
        </Column>
      </Row>
    </>
  );
}
