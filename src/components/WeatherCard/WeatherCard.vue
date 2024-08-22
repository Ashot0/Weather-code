<template>
	<div
		:class="
			isElementInLocalStorage !== true
				? 'weather-card'
				: 'weather-card weather-card__active'
		"
		v-if="cityResponse"
	>
		<img
			@click="sendData"
			class="weather-card__icon"
			v-if="isNight"
			:src="`https://openweathermap.org/img/wn/${cityResponse.weather[0].icon}@2x.png`"
			alt="Weather Icon"
		/>
		<img
			@click="sendData"
			class="weather-card__icon"
			v-else
			:src="`https://openweathermap.org/img/wn/${cityResponse.weather[0].icon.replace(
				/n$/,
				'd'
			)}@2x.png`"
			alt="Weather Icon"
		/>
		<div @click="sendData" class="weather-card__name">
			{{ cityResponse?.name }}
		</div>

		<div class="weather-card__desc">
			{{ cityResponse.weather[0]?.description }}
		</div>
		<p class="weather-card__temp" v-if="cityResponse.main?.temp">
			{{ $t('Temperature') }} {{ cityResponse.main?.temp }}
			<button
				class="weather-card__fav-btn"
				v-if="$props.favorites !== true"
				@click="addToFavorites(city)"
				type="button"
			>
				{{ $t('Add to favourites') }}
			</button>
		</p>
		<button
			v-if="$props.favorites !== true"
			class="weather-card__add-btn"
			@click="addClone"
			type="button"
		>
			+
		</button>
		<button
			v-if="$props.favorites !== true"
			class="weather-card__delete-btn"
			@click="showPopup"
			type="button"
		>
			X
		</button>
		<DeletePupup
			v-if="$props.favorites !== true"
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
		const isNight = computed(() => store.getters.isNight);
		const isMonth = computed(() => store.getters.isMonth);
		const isElementInLocalStorage = ref(true);
		const checkLocalStorage = (item) => {
			const storedValue = localStorage.getItem('Favorites');
			const favoritesArray = storedValue ? JSON.parse(storedValue) : [];
			isElementInLocalStorage.value = favoritesArray.includes(item);
			console.log(isElementInLocalStorage.value);
		};
		const fetchWeather = async () => {
			let url;
			if (typeof props.card === 'string') {
				url = `https://api.openweathermap.org/data/2.5/weather?q=${props.card}&appid=597035dd4f818cff0905e68e48f68b68&units=metric`;
			} else {
				url = `https://api.openweathermap.org/data/2.5/weather?q=${props.card.name}&exclude=hourly&appid=597035dd4f818cff0905e68e48f68b68&units=metric`;
			}

			if (url) {
				try {
					const response = await fetch(url);
					if (response.ok) {
						cityResponse.value = await response.json();
						checkLocalStorage(cityResponse.value.name);
					} else {
						console.error('Ошибка при получении данных:', response.status);
					}
				} catch (error) {
					console.error('Ошибка при получении данных:', error);
				} finally {
					isDataReady.value = false;
				}
			}
		};
		const showPopup = () => {
			isPopupVisible.value = true;
		};
		const removeFavoriteCity = () => {
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
			if (typeof props.card === 'string') {
				favorites.splice(props.card, 1);
			} else {
				favorites.splice(props.card.name, 1);
			}

			localStorage.setItem('Favorites', JSON.stringify(favorites));
		};
		const removeCity = () => {
			if (typeof props.card === 'string') {
				store.dispatch('deselectCity', props.card);
			} else {
				store.dispatch('deselectCity', props.card.name);
			}
			isPopupVisible.value = false;
		};
		const handleCancelDelete = () => {
			isPopupVisible.value = false;
		};
		const addToFavorites = () => {
			let favorites = JSON.parse(localStorage.getItem('Favorites'));
			if (!favorites) {
				favorites = [];
			}
			if (!Array.isArray(favorites)) {
				favorites = [];
			}
			if (favorites.length >= 5) {
				alert('для додавання видаліть місто, максимум 5"');
			}

			if (typeof props.card === 'string') {
				if (favorites.includes(props.card)) {
					removeFavoriteCity();
					checkLocalStorage(cityResponse.value.name);
					return;
				} else {
					favorites.push(props.card);
				}
			} else {
				if (favorites.includes(props.card.name)) {
					removeFavoriteCity();
					checkLocalStorage(cityResponse.value.name);
					return;
				} else {
					favorites.push(props.card.name);
				}
			}
			localStorage.setItem('Favorites', JSON.stringify(favorites));
			checkLocalStorage(cityResponse.value.name);
		};

		const addClone = () => {
			store.dispatch('selectCity', props.card);
		};

		const handleDataReady = () => {
			if (
				props.card &&
				(typeof props.card === 'string' || (props.card.lat && props.card.lon))
			) {
				fetchWeather();
			}
		};

		watch(() => props.card, handleDataReady, { immediate: true });

		const sendData = async () => {
			try {
				if (typeof props.card === 'string') {
					const urlisMonth = isMonth.value
						? `https://api.openweathermap.org/data/2.5/forecast?lat=${cityResponse.value.coord.lat}&lon=${cityResponse.value.coord.lon}&dt=1643803200&appid=597035dd4f818cff0905e68e48f68b68`
						: `https://api.openweathermap.org/data/3.0/onecall?lat=${cityResponse.value.coord.lat}&lon=${cityResponse.value.coord.lon}&exclude=current,minutely,daily,alerts&dt=1643803200&appid=597035dd4f818cff0905e68e48f68b68`;
					const response = await fetch(urlisMonth);
					const result = await response.json();
					if (result.list) {
						store.dispatch('updateHourlyData', result.list);
					} else {
						store.dispatch('updateHourlyData', result.hourly);
					}
				} else {
					const response = await fetch(
						`https://api.openweathermap.org/data/3.0/onecall?lat=${props.card.lat}&lon=${props.card.lon}&exclude=current,minutely,daily,alerts&dt=1643803200&appid=597035dd4f818cff0905e68e48f68b68`
					);
					const result = await response.json();
					store.dispatch('updateHourlyData', result.hourly);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		return {
			cityResponse,
			addClone,
			removeCity,
			handleCancelDelete,
			showPopup,
			isPopupVisible,
			addToFavorites,
			removeFavoriteCity,
			sendData,
			isNight,
			isElementInLocalStorage,
		};
	},
};
</script>

<style lang="scss" scoped src="./weather-card.scss" />
