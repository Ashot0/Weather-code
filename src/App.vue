<template>
	<Layout>
		<router-view />
	</Layout>
</template>

<script>
import Layout from './layouts/BaseLayout/BaseLayout.vue';

export default {
	components: {
		Layout,
	},
};
</script>

<style lang="scss" src="./style/app.scss" />
