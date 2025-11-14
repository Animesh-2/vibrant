import {
  aiVerificationQueue,
  deviceCatalog,
  nurseDirectory,
  nurseRequests,
  type Device,
  type Nurse,
} from "@/data/mockData";

export type DeviceFilters = {
  city?: string;
  category?: string;
  query?: string;
  price?: "budget" | "premium";
};

export async function getDevices(filters?: DeviceFilters): Promise<Device[]> {
  if (!filters) return deviceCatalog;

  return deviceCatalog.filter((device) => {
    const matchCity = filters.city
      ? device.city.toLowerCase() === filters.city.toLowerCase()
      : true;
    const matchCategory = filters.category
      ? device.category.toLowerCase() === filters.category.toLowerCase()
      : true;
    const matchQuery = filters.query
      ? device.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        device.tags.some((tag) =>
          tag.toLowerCase().includes(filters.query!.toLowerCase())
        )
      : true;
    const matchPrice = filters.price
      ? filters.price === "budget"
        ? device.pricePerDay <= 1000
        : device.pricePerDay > 1000
      : true;

    return matchCity && matchCategory && matchQuery && matchPrice;
  });
}

export async function getDeviceById(id: string): Promise<Device | null> {
  return deviceCatalog.find((device) => device.id === id) ?? null;
}

export type BookingPayload = {
  user_id: string;
  start: string;
  end: string;
};

export async function bookDevice(
  deviceId: string,
  payload: BookingPayload
): Promise<{
  bookingId: string;
  deviceId: string;
  status: "pending" | "confirmed";
  totalDays: number;
}> {
  const startDate = new Date(payload.start);
  const endDate = new Date(payload.end);
  const diff =
    Math.max(
      1,
      Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    ) + 1;

  return {
    bookingId: `BK-${Math.floor(Math.random() * 9000 + 1000)}`,
    deviceId,
    status: "pending",
    totalDays: diff,
  };
}

export type NurseFilters = {
  city?: string;
  specialty?: string;
  price?: "lt700" | "lt900" | "gt900";
  query?: string;
};

export async function getNurses(filters?: NurseFilters): Promise<Nurse[]> {
  if (!filters) return nurseDirectory;

  return nurseDirectory.filter((nurse) => {
    const matchCity = filters.city
      ? nurse.city.toLowerCase() === filters.city.toLowerCase()
      : true;
    const matchSpecialty = filters.specialty
      ? nurse.specialty.toLowerCase().includes(filters.specialty.toLowerCase())
      : true;
    const matchQuery = filters.query
      ? nurse.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        nurse.skills.some((skill) =>
          skill.toLowerCase().includes(filters.query!.toLowerCase())
        )
      : true;
    const matchPrice = filters.price
      ? filters.price === "lt700"
        ? nurse.hourlyRate < 700
        : filters.price === "lt900"
        ? nurse.hourlyRate <= 900
        : nurse.hourlyRate > 900
      : true;

    return matchCity && matchSpecialty && matchQuery && matchPrice;
  });
}

export async function getNurseById(id: string): Promise<Nurse | null> {
  return nurseDirectory.find((nurse) => nurse.id === id) ?? null;
}

export async function getNurseRequests() {
  return nurseRequests;
}

export async function getDashboardSnapshot() {
  return {
    totalHours: 184,
    openRequests: nurseRequests.filter((req) => req.status === "pending").length,
    aiApprovals: 42,
    fulfillment: 98,
  };
}

export async function getAiVerificationTasks() {
  return aiVerificationQueue;
}

export async function submitAiVerification({
  taskId,
  fileName,
}: {
  taskId: string;
  fileName: string;
}): Promise<{ status: "approved" | "flagged"; confidence: number; message: string }> {
  const approved = fileName.toLowerCase().includes("valid") || Math.random() > 0.3;
  return {
    status: approved ? "approved" : "flagged",
    confidence: approved ? 0.94 : 0.61,
    message: approved
      ? "AI cleared the evidence. You can proceed with the procedure."
      : "AI needs a clearer capture. Re-upload with label in focus.",
  };
}
