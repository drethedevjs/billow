import axios from "axios";

export const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    // Checking for 404 error specifically because the data object
    // in an axios 404 error has the whole source code in it.
    if (error.response?.status === 404) console.error("Bad Request");
    else console.error("Axios error:", error.response?.data);
  } else {
    // Some other error (network, syntax, etc.)
    console.error("Unexpected error:", error);
  }
};
