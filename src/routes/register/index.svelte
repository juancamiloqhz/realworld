<script context="module">
	export async function load({ session }) {
		if (session.user) {
			return { redirect: '/', status: 302 };
		}
		return {};
	}
</script>

<script>
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';
	import { post } from '$lib/utils.js';
	import ListErrors from '$lib/ListErrors.svelte';

	let username = '';
	let email = '';
	let password = '';
	let errors = null;

	async function submit(event) {
		const response = await post(`auth/register`, { username, email, password });

		// TODO handle network errors
		errors = response.errors;

		if (response.user) {
			$session.user = response.user;
			goto('/');
		}
	}
</script>

<svelte:head>
	<title>Sign up • Art Festivals</title>
</svelte:head>

<div class="auth-page">
	<div class="container mx-auto my-9 px-4">
		<div class="row">
			<div class="mx-auto max-w-md">
				<h1 class="text-center text-3xl mb-2">Sign up</h1>
				<p class="mb-4 text-center text-green-600 font-light hover:text-green-700 hover:underline">
					<a href="/login">Have an account?</a>
				</p>

				<ListErrors {errors}/>

				<form on:submit|preventDefault={submit}>
					<fieldset class="form-group">
						<input class="form-control form-control-lg" type="text" required placeholder="Your Name" bind:value={username}>
					</fieldset>
					<fieldset class="form-group">
						<input class="form-control form-control-lg" type="email" required placeholder="Email" bind:value={email}>
					</fieldset>
					<fieldset class="form-group">
						<input class="form-control form-control-lg" type="password" required placeholder="Password" bind:value={password}>
					</fieldset>
					<button class="btn btn-lg btn-primary float-right" type="submit">
						Sign up
					</button>
				</form>
			</div>
		</div>
	</div>
</div>