'use client';

import type { Device } from "@/data/mockData";
import { ArrowUpRight, Star } from "lucide-react";
import Link from "next/link";

type Props = {
  device: Device;
};

export default function DeviceCard({ device }: Props) {
  return (
    <Link
      href={`/devices/${device.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition hover:-translate-y-1 hover:border-pink-400/70 hover:bg-white/10"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={device.image}
          alt={device.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/70" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs text-white">
          <span className="rounded-full bg-black/50 px-2 py-0.5">
            {device.availability}
          </span>
          <span className="flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5">
            <Star size={12} className="text-yellow-300" />
            {device.rating.toFixed(1)} | {device.reviews}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-pink-300/80">
            {device.category}
          </p>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">{device.name}</h3>
            <ArrowUpRight
              size={16}
              className="text-white transition group-hover:text-white"
            />
          </div>
          <p className="text-sm text-white">{device.description}</p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-white">
          {device.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-3 py-1 text-[11px]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-xs text-white">{device.city}</p>
            <p className="text-xl font-semibold text-white">
              ₹{device.pricePerDay}
              <span className="text-sm text-white"> / day</span>
            </p>
          </div>
          <span className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-3 py-1 text-xs font-semibold text-white">
            Reserve
          </span>
        </div>
      </div>
    </Link>
  );
}
