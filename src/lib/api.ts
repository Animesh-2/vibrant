// lib/api.ts

export async function getDevices() {
  // TEMP HARD-CODED DATA (until backend connects)
  return [
    {
      id: "1",
      name: "ICU Ventilator",
      category: "Ventilation",
      city: "Mumbai",
      pricePerDay: 2500,
      image: "/ventilator.png",
    },
    {
      id: "2",
      name: "Patient Monitor",
      category: "Monitoring",
      city: "Delhi",
      pricePerDay: 900,
      image: "/monitor.png",
    },
    {
      id: "3",
      name: "Syringe Pump",
      category: "Infusion",
      city: "Ahmedabad",
      pricePerDay: 450,
      image: "/syringe.png",
    },
  ];
}
