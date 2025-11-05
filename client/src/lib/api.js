import apiClient from "./apiClient";

export async function fetchWeather(city) {
  const trimmedCity = city?.trim();

  if (!trimmedCity) {
    throw new Error("Please provide a city to search");
  }

  const { data } = await apiClient.get("/weather", {
    params: { city: trimmedCity },
  });

  if (!data?.success) {
    throw new Error(data?.error || "Unable to fetch weather data");
  }

  return data;
}

export async function fetchCurrency(amount) {
  const { data } = await apiClient.get("/currency", {
    params: { amount },
  });

  if (!data?.success) {
    throw new Error(data?.error || "Unable to fetch currency data");
  }

  return data;
}

export async function fetchQuote() {
  const { data } = await apiClient.get("/quote");

  if (!data?.success) {
    throw new Error(data?.error || "Unable to fetch quote");
  }

  return data;
}
