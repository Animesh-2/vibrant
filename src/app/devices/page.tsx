import DeviceCard from "@/components/DeviceCard";
import SearchBar from "@/components/SearchBar";
import { getDevices } from "@/lib/api";
import Link from "next/link";

type Props = {
  searchParams?: Record<string, string | string[] | undefined>;
};

const quickFilters = [
  { label: "Respiratory", params: { category: "Respiratory" } },
  { label: "Monitoring", params: { category: "Monitoring" } },
  { label: "Under ₹1k/day", params: { price: "budget" } },
  { label: "Same-day dispatch", params: { city: "Mumbai" } },
];

export default async function DevicesPage({ searchParams }: Props) {
  const filters = {
    city: getStringParam(searchParams, "city"),
    category: getStringParam(searchParams, "category"),
    query: getStringParam(searchParams, "query"),
    price: getStringParam(searchParams, "price") as "budget" | "premium" | undefined,
  };

  const devices = await getDevices(filters);
  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white">
            Devices
          </p>
          <h1 className="text-3xl font-semibold text-white">
            Medical devices & home ICU hardware
          </h1>
          <p className="mt-2 text-sm text-white">
            Filters pass directly into our logistics engine. Every device ships
            with AI-calibrated maintenance reports.
          </p>
        </div>
        <SearchBar />
      </header>

      <div className="flex flex-wrap gap-3">
        {quickFilters.map((filter) => (
          <Link
            key={filter.label}
            href={`/devices${toQuery(filter.params)}`}
            className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-gray-200 transition hover:border-pink-400 hover:text-white"
          >
            {filter.label}
          </Link>
        ))}
        {hasFilters && (
          <Link
            href="/devices"
            className="text-xs text-white underline decoration-dotted underline-offset-4"
          >
            Reset filters
          </Link>
        )}
      </div>

      <p className="text-sm text-white">
        Showing {devices.length} device{devices.length === 1 ? "" : "s"}
        {filters.city && ` | ${filters.city}`}
        {filters.category && ` | ${filters.category}`}
        {filters.price && ` | ${filters.price === "budget" ? "Budget" : "Premium"}`}
      </p>

      {devices.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/20 p-10 text-center text-white">
          No devices match the selected filters yet. Try changing the city or price
          preference.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {devices.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>
      )}
    </div>
  );
}

function getStringParam(
  searchParams: Props["searchParams"],
  key: string
): string | undefined {
  const value = searchParams?.[key];
  return typeof value === "string" ? value : undefined;
}

function toQuery(params: Record<string, string>) {
  const search = new URLSearchParams(params);
  return `?${search.toString()}`;
}
