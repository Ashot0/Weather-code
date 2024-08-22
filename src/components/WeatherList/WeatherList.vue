<template>
	<div class="weather-list">
		<div class="weather-list__header">
			<div class="weather-list__days-btn"></div>
			<div class="weather-list__weeks-btn"></div>
			<div class="weather-list__wrapper">
				<WeatherCard :card="card" v-for="(card, index) in cards" :key="index" />
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
		const store = useStore();
		const city = computed(() => store.getters['city/city']);
		const cityLoaded = ref(false);

		const loadCity = async () => {
			if (city.value) {
				await store.dispatch('selectCity', city.value);
			}
		};

		watch(city, async (newCity) => {
			if (newCity) {
				cityLoaded.value = true;
				await loadCity();
			}
		});

		const cards = computed(() => store.getters.getSelectedCities);

		onMounted(() => {
			store.dispatch('city/fetchCity');
			loadCity();
		});

		return { cards, city };
	},
};
</script>

<style lang="scss" scoped src="./weather-list.scss" />
