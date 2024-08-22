<template>
	<div v-if="isVisible" @click="cancel" class="popup__backdrop">
		<div class="popup">
			<p>{{ $t('Are you sure you want to delete this item?') }}</p>
			<button class="popup__btn" @click="confirmDelete">
				{{ $t('Confirm') }}
			</button>
			<button class="popup__btn" @click="cancel">
				{{ $t('Cancel') }}
			</button>
		</div>
	</div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
	isVisible: {
		type: Boolean,
		required: true,
	},
});

const emit = defineEmits(['confirm', 'cancel']);

const confirmDelete = () => {
	emit('confirm');
};

const cancel = () => {
	emit('cancel');
};
</script>

<style lang="scss" scoped src="./delete-popup.scss" />
<!-- DeletePupup -->
