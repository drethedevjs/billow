export const sleep = (seconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

export const BillowRequest = <T>(url: string, method: string, body: T) => {
  return new Request(url, {
    method,
    body: JSON.stringify(body)
  });
};
