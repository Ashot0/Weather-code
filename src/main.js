import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import router from './router';
import store from './store';
import en from './locales/en.json';
import uk from './locales/uk.json';

const i18n = createI18n({
	locale: 'en',
	fallbackLocale: 'en',
	messages: {
		en,
		uk,
	},
});

const app = createApp(App);

app.use(i18n);
app.use(store);
app.use(router);
app.mount('#app');
