<template>
	<div class="settings">
		<button class="settings__btn" @click="toggleNight" type="button">
			{{ $t('Day / Night') }}
		</button>
		<button class="settings__btn" @click="toggleMonth" type="button">
			{{ $t('Day / 5 Days') }}
		</button>
	</div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
	setup() {
		const store = useStore();

		const isNight = computed(() => store.getters.isNight);
		const isMonth = computed(() => store.getters.isMonth);

		const toggleNight = () => {
			store.dispatch('toggleNight');
		};

		const toggleMonth = () => {
			store.dispatch('toggleMonth');
		};

		return {
			isNight,
			isMonth,
			toggleNight,
			toggleMonth,
		};
	},
};
</script>

<style lang="scss" scoped src="./settings-view.scss" />
