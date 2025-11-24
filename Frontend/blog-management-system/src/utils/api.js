import axios from "axios";

const api = axios.create({
	baseURL: "https://blog-management-system-jet.vercel.app/"
});

// attach access token
api.interceptors.request.use((config) => {
	const accessToken = localStorage.getItem("accessToken");

	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}

	return config;
});

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		// if token is expired
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const refreshToken = localStorage.getItem("refreshToken");
				console.log("Using refresh token:", refreshToken);
				const res = await axios.post(
					"http://localhost:3000/api/auth/refresh/",
					{
						refreshToken
					}
				);

				// Store new access token
				localStorage.setItem("accessToken", res.data.accessToken);

				// Retry failed request
				originalRequest.headers[
					"Authorization"
				] = `Bearer ${res.data.accessToken}`;

				return api(originalRequest);
			} catch (err) {
				console.log("Refresh token expired!");
				localStorage.clear();
				window.location.href = "/login";
			}
		}

		return Promise.reject(error);
	}
);

export default api;
