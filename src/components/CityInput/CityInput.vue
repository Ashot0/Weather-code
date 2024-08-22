<template>
	<div class="city-input">
		<input
			class="city-input__input"
			type="text"
			v-model="query"
			@input="onInput"
			:placeholder="$t('Enter the city name')"
		/>
		<div
			class="city-input__autocomplete-results"
			id="autocomplete-results"
			v-if="results.length !== 0"
		>
			<div v-for="city in results" :key="city.id" @click="selectCity(city)">
				{{ city.name }}, {{ city.state ? city.state + ', ' : ''
				}}{{ city.country }}
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const API_KEY = '597035dd4f818cff0905e68e48f68b68';

const store = useStore();

const query = ref('');
const results = ref([]);

const onInput = () => {
	const searchQuery = query.value.trim();

	if (searchQuery.length >= 3) {
		fetchCities(searchQuery);
	} else {
		results.value = [];
	}
};

const fetchCities = async (query) => {
	const url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
		query
	)}&limit=5&appid=${API_KEY}`;

	try {
		const response = await fetch(url);
		const data = await response.json();
		results.value = data;
	} catch (error) {
		console.error('Error fetching cities:', error);
	}
};
const selectCity = (city) => {
	query.value = city.name;
	results.value = [];
	store.dispatch('selectCity', city);
};
</script>

<style lang="scss" scoped src="./city-input.scss" />
