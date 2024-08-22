export default {
	state: {
		selectedCities: [],
	},
	mutations: {
		addCity(state, city) {
			if (state.selectedCities.length < 5) {
				state.selectedCities.push(city);
			} else {
				console.warn('Cannot add more than 5 cities');
			}
		},
		removeCity(state, cityName) {
			const index = state.selectedCities.findIndex((city) => {
				if (typeof city === 'object' && city.name) {
					return city.name === cityName;
				}
				if (typeof city === 'string') {
					return city === cityName;
				}
				return false;
			});

			if (index !== -1) {
				state.selectedCities.splice(index, 1);
			}
		},
	},
	actions: {
		selectCity({ commit }, city) {
			commit('addCity', city);
		},
		deselectCity({ commit }, cityName) {
			commit('removeCity', cityName);
		},
	},
	getters: {
		getSelectedCities: (state) => {
			return state.selectedCities;
		},

		getFavoriteCities: (state) => state.favoriteCities,
	},
};
