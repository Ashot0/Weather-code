export default {
	state() {
		return {
			hourlyData: [],
		};
	},
	mutations: {
		setHourlyData(state, data) {
			state.hourlyData = data;
		},
	},
	actions: {
		updateHourlyData({ commit }, data) {
			commit('setHourlyData', data);
		},
	},
	getters: {
		hourlyData: (state) => state.hourlyData,
	},
};
