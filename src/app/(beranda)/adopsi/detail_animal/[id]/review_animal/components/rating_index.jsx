import {
  Text,
  Row,
} from "@/components/shared/custom_widget";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { Progress } from "@/components/ui/progress";

function getRatingRow(summary, star) {
  const value = Array.isArray(summary?.[`bintang${star}`])
    ? summary[`bintang${star}`]
    : [0, 0];
  const count = Number(value[0]);
  const rawPercentage = Number(value[1]);
  const percentage = rawPercentage <= 1 ? rawPercentage * 100 : rawPercentage;

  return {
    count: Number.isFinite(count) ? count : 0,
    percentage: Number.isFinite(percentage)
      ? Math.min(Math.max(percentage, 0), 100)
      : 0,
  };
}

function formatCount(value) {
  return new Intl.NumberFormat("id-ID").format(value);
}

export default function RatingIndex({ ratingSummary }) {
  const rows = [5, 4, 3, 2, 1].map((star) => ({
    star,
    ...getRatingRow(ratingSummary, star),
  }));

  return (
    <>
      {rows.map((row) => (
        <Row key={row.star} className="gap-4">
          <Rating defaultValue={row.star} readOnly>
            {Array.from({ length: 5 }).map((_, index) => (
              <RatingButton className="text-[#F87537]" key={index} size={15} />
            ))}
          </Rating>
          <Progress
            value={row.percentage}
            className="w-[60%] [&>div]:bg-[#F87537] [&>div]:rounded-r-full bg-[#E4E7E9]"
          />
          <Text className="text-sm font-medium">
            {Math.round(row.percentage)}%
          </Text>
          <Text className="text-sm text-[#77878F]">
            ({formatCount(row.count)})
          </Text>
        </Row>
      ))}
    </>
  );
}
