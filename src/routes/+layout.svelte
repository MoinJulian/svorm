<script>
	import Nav from '$lib/components/Nav.svelte';
	import './app.scss';
</script>

<svelte:head>
	<title>Svorm</title>
</svelte:head>

<Nav></Nav>

<main aria-live="polite">
	<slot></slot>
</main>

<style lang="scss">
	main {
		padding: 1rem;
		max-width: 38rem;
		margin: 0 auto;
	}
</style>
