<template>
	<div :class="weatherCardClasses" v-if="cityResponse">
		<img
			@click="sendData"
			class="weather-card__icon"
			:src="weatherIconSrc"
			alt="Weather Icon"
		/>
		<div @click="sendData" class="weather-card__name">
			{{ cityResponse?.name }}
		</div>
		<div class="weather-card__desc">
			{{ cityResponse.weather[0]?.description }}
		</div>
		<p class="weather-card__temp" v-if="cityResponse.main?.temp">
			{{ $t('Temperature') }} {{ cityResponse.main?.temp }} °C
			<button
				v-if="!$props.favorites"
				class="weather-card__fav-btn"
				@click="addToFavorites(city)"
				type="button"
			>
				{{ $t('Add to favourites') }}
			</button>
		</p>
		<button
			v-if="!$props.favorites"
			class="weather-card__add-btn"
			@click="addClone"
			type="button"
		>
			+
		</button>
		<button
			v-if="!$props.favorites"
			class="weather-card__delete-btn"
			@click="showPopup"
			type="button"
		>
			X
		</button>
		<DeletePupup
			v-if="!$props.favorites"
			:isVisible="isPopupVisible"
			@confirm="removeCity"
			@cancel="handleCancelDelete"
		/>
	</div>
	<div class="weather-card__loader" v-else>
		<p>{{ $t('Loading data...') }}</p>
	</div>
</template>

<script>
import { ref, watch, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import DeletePupup from '@/components/DeletePupup/DeletePupup';

export default {
	props: {
		card: Object,
		favorites: Boolean,
	},
	components: { DeletePupup },
	setup(props) {
		const store = useStore();
		const cityResponse = ref(null);
		const isDataReady = ref(false);
		const isPopupVisible = ref(false);
		const isElementInLocalStorage = ref(true);

		const isNight = computed(() => store.getters.isNight);
		const isMonth = computed(() => store.getters.isMonth);

		const weatherCardClasses = computed(() =>
			isElementInLocalStorage.value
				? 'weather-card weather-card__active'
				: 'weather-card'
		);

		const weatherIconSrc = computed(() => {
			const icon = cityResponse.value?.weather[0].icon;
			return `https://openweathermap.org/img/wn/${
				isNight.value ? icon : icon.replace(/n$/, 'd')
			}@2x.png`;
		});

		const checkLocalStorage = (item) => {
			const favoritesArray =
				JSON.parse(localStorage.getItem('Favorites')) || [];
			isElementInLocalStorage.value = favoritesArray.includes(item);
		};

		const fetchWeather = async () => {
			const city =
				typeof props.card === 'string' ? props.card : props.card.name;
			const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=597035dd4f818cff0905e68e48f68b68&units=metric`;

			try {
				const response = await fetch(url);
				if (response.ok) {
					cityResponse.value = await response.json();
					checkLocalStorage(cityResponse.value.name);
				} else {
					console.error('Error fetching weather data:', response.status);
				}
			} catch (error) {
				console.error('Error fetching weather data:', error);
			} finally {
				isDataReady.value = false;
			}
		};

		const showPopup = () => {
			isPopupVisible.value = true;
		};

		const removeFavoriteCity = () => {
			let favorites = JSON.parse(localStorage.getItem('Favorites')) || [];
			const city =
				typeof props.card === 'string' ? props.card : props.card.name;
			favorites = favorites.filter((fav) => fav !== city);
			localStorage.setItem('Favorites', JSON.stringify(favorites));
		};

		const removeCity = () => {
			const city =
				typeof props.card === 'string' ? props.card : props.card.name;
			store.dispatch('deselectCity', city);
			isPopupVisible.value = false;
		};

		const handleCancelDelete = () => {
			isPopupVisible.value = false;
		};

		const addToFavorites = () => {
			let favorites = JSON.parse(localStorage.getItem('Favorites')) || [];
			const city =
				typeof props.card === 'string' ? props.card : props.card.name;

			if (favorites.includes(city)) {
				removeFavoriteCity();
			} else if (favorites.length < 5) {
				favorites.push(city);
				localStorage.setItem('Favorites', JSON.stringify(favorites));
			} else {
				alert('Remove a city to add a new one, maximum 5');
			}
			checkLocalStorage(cityResponse.value.name);
		};

		const addClone = () => {
			store.dispatch('selectCity', props.card);
		};

		const sendData = async () => {
			try {
				const { lat, lon } = cityResponse.value?.coord || {};
				const url = isMonth.value
					? `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=597035dd4f818cff0905e68e48f68b68`
					: `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=597035dd4f818cff0905e68e48f68b68`;

				const response = await fetch(url);
				const result = await response.json();
				const data = result.list || result.hourly;
				store.dispatch('updateHourlyData', data);
			} catch (error) {
				console.error('Error fetching additional data:', error);
			}
		};

		const handleDataReady = () => {
			if (props.card) fetchWeather();
		};

		watch(() => props.card, handleDataReady, { immediate: true });

		return {
			cityResponse,
			addClone,
			removeCity,
			handleCancelDelete,
			showPopup,
			isPopupVisible,
			addToFavorites,
			sendData,
			isNight,
			isElementInLocalStorage,
			weatherCardClasses,
			weatherIconSrc,
		};
	},
};
</script>

<style lang="scss" scoped src="./weather-card.scss" />
