import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'Bem vindo de volta'
	}
});

export default app;