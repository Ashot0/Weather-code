<template>
	<div class="favorites">
		<FavoritesList />
		<WeatherSchedule />
	</div>
</template>

<script>
import FavoritesList from '../../components/FavoritesList/FavoritesList';
import WeatherSchedule from '@/components/WeatherSchedule/WeatherSchedule';
export default {
	components: { FavoritesList, WeatherSchedule },
	setup() {
		return {};
	},
};
</script>

<style lang="scss" scoped></style>
