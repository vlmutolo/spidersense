<svelte:head>
	<title>SpiderSense</title>
	<meta
		name="description"
		content="An interactive ZX calculus diagram explorer and rewrite tool."
	/>
</svelte:head>

<main>
	<h1>SpiderSense</h1>
	<p>ZX calculus explorer</p>
</main>

<style>
	:global(html) {
		font-family: system-ui, sans-serif;
		color-scheme: light dark;
	}

	:global(body) {
		margin: 0;
	}

	main {
		display: grid;
		min-height: 100vh;
		place-content: center;
		text-align: center;
	}

	h1,
	p {
		margin: 0;
	}

	p {
		margin-top: 0.5rem;
		opacity: 0.65;
	}
</style>
