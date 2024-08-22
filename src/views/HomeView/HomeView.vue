<template>
	<div class="home">
		<div class="home__header">
			<CityInput />
			<router-link to="/settings"
				><img src="@/assets/setting.png" alt=""
			/></router-link>
		</div>
		<WeatherList />
		<WeatherSchedule />
	</div>
</template>

<script>
import WeatherList from '@/components/WeatherList/WeatherList';
import WeatherSchedule from '@/components/WeatherSchedule/WeatherSchedule';
import CityInput from '@/components/CityInput/CityInput';
import { ref } from 'vue';
export default {
	name: 'HomeView',
	components: {
		CityInput,
		WeatherList,
		WeatherSchedule,
	},
	setup() {
		return {};
	},
};
</script>
<style lang="scss" scoped src="./home-view.scss" />
