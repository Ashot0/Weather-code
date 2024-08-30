<template>
	<div class="settings">
		<button class="settings__btn" @click="toggleNight" type="button">
			{{ isNight ? $t('Night') : $t('Day') }}
		</button>
		<button class="settings__btn" @click="toggleMonth" type="button">
			{{ isMonth ? $t('5 Days') : $t('1 Day') }}
		</button>
		<button class="settings__btn" @click="changeLanguage('en')" type="button">
			English
		</button>
		<button class="settings__btn" @click="changeLanguage('uk')" type="button">
			Українська
		</button>
	</div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

export default {
	setup() {
		const store = useStore();
		const { locale } = useI18n();

		const isNight = computed(() => store.getters.isNight);
		const isMonth = computed(() => store.getters.isMonth);

		const toggleNight = () => {
			store.dispatch('toggleNight');
		};

		const toggleMonth = () => {
			store.dispatch('toggleMonth');
		};

		const changeLanguage = (language) => {
			locale.value = language;
		};

		return {
			isNight,
			isMonth,
			toggleNight,
			toggleMonth,
			changeLanguage,
		};
	},
};
</script>

<style lang="scss" scoped src="./settings-view.scss" />
