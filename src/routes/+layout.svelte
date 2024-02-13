<script>
	import Nav from '$lib/components/Nav.svelte';
	import './app.scss';
</script>

<svelte:head>
	<title>Svorm</title>
</svelte:head>

<Nav></Nav>

<main>
	<slot />
</main>

<style>
	main {
		padding: 1rem;
		max-width: 38rem;
		margin: 0 auto;
	}
</style>
