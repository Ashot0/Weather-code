import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '@/views/HomeView/HomeView.vue';
import FavoritesView from '@/views/FavoritesView/FavoritesView.vue';
import SettingsView from '@/views/SettingsView/SettingsView';

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
	{
		path: '/favorites',
		name: 'favorites',
		component: FavoritesView,
	},
	{
		path: '/:catchAll(.*)',
		name: 'start',
		component: HomeView,
	},
	{
		path: '/settings',
		name: 'settings',
		component: SettingsView,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
