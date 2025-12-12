"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RatingDialog({ open, onClose, animal, onSubmit }) {
  const [rating, setRating] = React.useState(5);
  const [review, setReview] = React.useState("");

  React.useEffect(() => {
    if (open) {
      setRating(5);
      setReview("");
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl rounded-xl bg-white shadow-xl">
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
              <Select>
                <SelectTrigger className="w-full bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500">
                  <SelectValue placeholder="Pilih Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Rating</SelectLabel>
                    <SelectItem value={5}>★★★★★ 5 Star Rating</SelectItem>
                    <SelectItem value={4}>★★★★☆ 4 Star Rating</SelectItem>
                    <SelectItem value={3}>★★★☆☆ 3 Star Rating</SelectItem>
                    <SelectItem value={2}>★★☆☆☆ 2 Star Rating</SelectItem>
                    <SelectItem value={1}>★☆☆☆☆ 1 Star Rating</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-6">
              <Label htmlFor="ulasan" className="mb-3">
                Ulasan
              </Label>
              <Textarea
                id="ulasan"
                placeholder="Tuliskan Ulasanmu"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
              />
            </div>
            <div className="mt-8 flex items-center gap-3">
              <Button
                onClick={() => onSubmit?.({ rating, review, animal })}
                className="h-11 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 rounded-md"
              >
                KIRIM
              </Button>
              <Button
                onClick={onClose}
                className="cursor-pointer text-gray-500 hover:text-gray-700 text-sm bg-transparant hover:bg-transparant"
              >
                Batal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
