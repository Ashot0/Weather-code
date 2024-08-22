<template>
	<div class="favorites-list">
		<div class="favorites-list__header">
			<div class="favorites-list__days-btn"></div>
			<div class="favorites-list__weeks-btn"></div>
			<div class="favorites-list__wrapper">
				<WeatherCard
					:card="card"
					v-for="card in favorites"
					:favorites="true"
					:key="index"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import WeatherCard from '@/components/WeatherCard/WeatherCard';
import { onMounted, watch, ref, computed } from 'vue';
import { useStore } from 'vuex';
export default {
	components: {
		WeatherCard,
	},
	setup() {
		let favoritesString = localStorage.getItem('Favorites');
		let favorites = [];
		try {
			favorites = JSON.parse(favoritesString);
			if (!Array.isArray(favorites)) {
				favorites = [];
			}
		} catch (e) {
			favorites = [];
		}

		onMounted(() => {});
		return { favorites };
	},
};
</script>

<style lang="scss" scoped src="./favorites-list.scss" />
