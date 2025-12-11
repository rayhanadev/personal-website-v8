import { defineAction } from "astro:actions";

export const location = {
	get: defineAction({
		handler: async () => {
			const { latitude, longitude, ...location } = await fetchLocation();
			const { current } = await fetchWeather(latitude, longitude);

			return {
				location,
				weather: { temperature: current.temperature_2m },
			};
		},
	}),
};

type LocationResponse = {
	latitude: number;
	longitude: number;
	city: string;
	state: string;
	country: string;
	timestamp: number;
};

type WeatherResponse = {
	current: {
		temperature_2m: number;
	};
};

async function fetchLocation(): Promise<LocationResponse> {
	const response = await fetch("https://find-my.rayhanadev.net/location");
	if (!response.ok) {
		throw new Error("Failed to fetch location");
	}

	return await response.json();
}

async function fetchWeather(
	latitude: number,
	longitude: number,
): Promise<WeatherResponse> {
	const response = await fetch(
		`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&timezone=America%2FChicago&temperature_unit=fahrenheit`,
	);
	if (!response.ok) {
		throw new Error("Failed to fetch weather");
	}

	return await response.json();
}
