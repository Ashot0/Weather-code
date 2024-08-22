export default {
	namespaced: true,
	state: {
		city: null,
		isCityFetched: false,
	},
	mutations: {
		SET_CITY(state, city) {
			state.city = city;
		},
		SET_CITY_FETCHED(state, status) {
			state.isCityFetched = status;
		},
		RESET_CITY(state) {
			state.city = null;
		},
	},
	actions: {
		async fetchCity({ state, commit }) {
			if (state.isCityFetched) {
				commit('RESET_CITY');
				return;
			}

			try {
				const ipResponse = await fetch('https://api.ipify.org?format=json');
				const ipData = await ipResponse.json();
				const ip = ipData.ip;

				const cityResponse = await fetch(`https://ipapi.co/${ip}/json/`);
				const cityData = await cityResponse.json();
				commit('SET_CITY', cityData.city);
				commit('SET_CITY_FETCHED', true);
			} catch (error) {
				console.error('Error fetching city:', error);
			}
		},
	},
	getters: {
		city: (state) => state.city,
	},
};
