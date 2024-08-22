import { createStore } from 'vuex';
import timeTemp from './modules/timeTemp';
import city from './modules/city';
import cities from './modules/cities';
import settings from './modules/settings';

export default createStore({
	modules: {
		timeTemp,
		city,
		cities,
		settings,
	},
});
