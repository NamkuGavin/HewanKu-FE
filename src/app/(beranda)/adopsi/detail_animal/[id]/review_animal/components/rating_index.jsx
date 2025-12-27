import {
  Text,
  Column,
  Container,
  Padding,
  Row,
  SizedBox,
} from "@/components/shared/custom_widget";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { Progress } from "@/components/ui/progress";

export default function RatingIndex() {
  return (
    <>
      <Row className="gap-4">
        <Rating defaultValue={5} readOnly>
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton className="text-[#F87537]" key={index} size={15} />
          ))}
        </Rating>
        <Progress
          value={63}
          className="w-[60%] [&>div]:bg-[#F87537] [&>div]:rounded-r-full bg-[#E4E7E9]"
        />
        <Text className="text-sm font-medium">{63}%</Text>
        <Text className="text-sm text-[#77878F]">(94,532)</Text>
      </Row>
      <Row className="gap-4">
        <Rating defaultValue={4} readOnly>
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton className="text-[#F87537]" key={index} size={15} />
          ))}
        </Rating>
        <Progress
          value={24}
          className="w-[60%] [&>div]:bg-[#F87537] [&>div]:rounded-r-full bg-[#E4E7E9]"
        />
        <Text className="text-sm font-medium">{24}%</Text>
        <Text className="text-sm text-[#77878F]">(6.717)</Text>
      </Row>
      <Row className="gap-4">
        <Rating defaultValue={3} readOnly>
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton className="text-[#F87537]" key={index} size={15} />
          ))}
        </Rating>
        <Progress
          value={9}
          className="w-[60%] [&>div]:bg-[#F87537] [&>div]:rounded-r-full bg-[#E4E7E9]"
        />
        <Text className="text-sm font-medium">{9}%</Text>
        <Text className="text-sm text-[#77878F]">(714)</Text>
      </Row>
      <Row className="gap-4">
        <Rating defaultValue={2} readOnly>
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton className="text-[#F87537]" key={index} size={15} />
          ))}
        </Rating>
        <Progress
          value={1}
          className="w-[60%] [&>div]:bg-[#F87537] [&>div]:rounded-r-full bg-[#E4E7E9]"
        />
        <Text className="text-sm font-medium">{1}%</Text>
        <Text className="text-sm text-[#77878F]">(152)</Text>
      </Row>
      <Row className="gap-4">
        <Rating defaultValue={1} readOnly>
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton className="text-[#F87537]" key={index} size={15} />
          ))}
        </Rating>
        <Progress
          value={7}
          className="w-[60%] [&>div]:bg-[#F87537] [&>div]:rounded-r-full bg-[#E4E7E9]"
        />
        <Text className="text-sm font-medium">{7}%</Text>
        <Text className="text-sm text-[#77878F]">(643)</Text>
      </Row>
    </>
  );
}
