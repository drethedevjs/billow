export const getRandomId = () => {
  return Math.floor(Math.random() * 100);
};

export const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
