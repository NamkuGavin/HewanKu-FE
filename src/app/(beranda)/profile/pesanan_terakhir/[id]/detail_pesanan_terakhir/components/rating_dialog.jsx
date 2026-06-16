"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function RatingDialog({
  open,
  onClose,
  animal,
  onSubmit,
  isSubmitting = false,
}) {
  const [rating, setRating] = React.useState("5");
  const [review, setReview] = React.useState("");
  const ratingNumber = Number(String(rating).replace(",", "."));
  const activeRating = Number.isFinite(ratingNumber) ? ratingNumber : 0;

  React.useEffect(() => {
    if (open) {
      setRating("5");
      setReview("");
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isSubmitting) {
      onSubmit?.({ rating, review, animal });
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={isSubmitting ? undefined : onClose}
      />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl rounded-xl bg-white shadow-xl"
        >
          <div className="p-8">
            <div className="border rounded-md px-5 py-4 text-sm font-semibold text-gray-700">
              SILAHKAN RATING HEWAN ANDA
            </div>
            {animal?.name && (
              <div className="mt-4 text-sm text-gray-600">
                Untuk: <span className="font-semibold">{animal.name}</span>
              </div>
            )}

            <div className="mt-6">
              <Label htmlFor="rating" className="mb-3">
                Rating
              </Label>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRating(String(value))}
                      disabled={isSubmitting}
                      className="cursor-pointer rounded-full p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                      aria-label={`Pilih rating ${value}`}
                    >
                      <Star
                        size={28}
                        className={
                          value <= Math.ceil(activeRating)
                            ? "fill-orange-500 text-orange-500"
                            : "text-gray-300"
                        }
                      />
                    </button>
                  ))}
                </div>
                <Input
                  id="rating"
                  inputMode="decimal"
                  placeholder="Contoh: 4,5"
                  value={rating}
                  onChange={(event) => setRating(event.target.value)}
                  disabled={isSubmitting}
                  className="bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
                />
              </div>
            </div>

            <div className="mt-6">
              <Label htmlFor="ulasan" className="mb-3">
                Ulasan
              </Label>
              <Textarea
                id="ulasan"
                placeholder="Tuliskan Ulasanmu"
                value={review}
                onChange={(event) => setReview(event.target.value)}
                disabled={isSubmitting}
                className="bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
              />
            </div>

            <div className="mt-8 flex items-center gap-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 rounded-md"
              >
                {isSubmitting ? "MENGIRIM..." : "KIRIM"}
              </Button>
              <Button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="cursor-pointer text-gray-500 hover:text-gray-700 text-sm bg-transparent hover:bg-transparent"
              >
                Batal
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
