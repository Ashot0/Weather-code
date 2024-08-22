export default {
	state() {
		return {
			isNight: false,
			isMonth: false,
		};
	},
	mutations: {
		toggleNight(state) {
			state.isNight = !state.isNight;
		},
		toggleMonth(state) {
			state.isMonth = !state.isMonth;
		},
		setNight(state, value) {
			state.isNight = value;
		},
		setMonth(state, value) {
			state.isMonth = value;
		},
	},
	actions: {
		toggleNight({ commit }) {
			commit('toggleNight');
		},
		toggleMonth({ commit }) {
			commit('toggleMonth');
		},
		setNight({ commit }, value) {
			commit('setNight', value);
		},
		setMonth({ commit }, value) {
			commit('setMonth', value);
		},
	},
	getters: {
		isNight: (state) => state.isNight,
		isMonth: (state) => state.isMonth,
	},
};
