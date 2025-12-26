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
          <Text maxLines={3} className="font-normal text-left" textSize={15}>
            HewanKu adalah platform digital yang dirancang untuk menjembatani
            kebutuhan adopsi hewan dengan proses yang aman, transparan, dan
            bertanggung jawab.
          </Text>
        </Container>
        <Container className="w-2/5">
          <Text maxLines={3} className="font-normal text-left" textSize={15}>
            HewanKu percaya bahwa setiap hewan berhak mendapatkan rumah yang
            layak dan penuh kasih. Oleh karena itu, kami berkomitmen untuk
            membangun ekosistem adopsi hewan demi menciptakan dampak sosial yang
            positif bagi masyarakat dan kesejahteraan hewan.
          </Text>
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
