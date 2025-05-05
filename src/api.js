import axios from "axios";

const API_URL = 'https://santosnr6.github.io/Data/events.json';

export const fetchEvents = async () => {
	try {
	  const response = await axios.get(API_URL);
  
	  if (!response.data || !response.data.events) {
		throw new Error("No events data found.");
	  }
  
	  return response.data.events;
	} catch (error) {
	  if (axios.isAxiosError(error)) {
		console.error("Axios error fetching events:", error.response?.data || error.message);
	  } else {
		console.error("Unknown error fetching events:", error);
	  }
	  throw new Error("Failed to fetch events. Please try again later.");
	}
  };