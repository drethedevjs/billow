export const serviceTypes = [
  "Water",
  "Sewage",
  "Gas",
  "Recycling",
  "Miscellaneous"
] as const;

export type ServiceType = (typeof serviceTypes)[number];
