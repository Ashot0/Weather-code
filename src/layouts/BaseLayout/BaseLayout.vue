<template>
	<div class="layout__wrapper">
		<div class="layout">
			<img class="layout__logo-icon" src="@/assets/logo.png" alt="" />
			<nav class="layout__links">
				<router-link class="layout__link" to="/">{{
					$t('homepage')
				}}</router-link>
				<router-link class="layout__link" to="/favorites">{{
					$t('favorites')
				}}</router-link>
				<router-link class="layout__link" to="/settings">{{
					$t('settings')
				}}</router-link>
			</nav>
			<div class="layout__page">
				<main>
					<slot />
				</main>
			</div>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped src="./base-layout.scss" />
