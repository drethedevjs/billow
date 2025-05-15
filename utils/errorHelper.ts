import axios from "axios";

export const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    // It's an Axios error — has response, config, etc.
    console.error("Axios error:", error.response?.data);
  } else {
    // Some other error (network, syntax, etc.)
    console.error("Unexpected error:", error);
  }
};
