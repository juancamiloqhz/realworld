<script context="module">
	export function load({ session }) {
		const { user } = session;

		if (!user) {
			return {
				status: 302,
				redirect: '/login'
			};
		}

		return {
			props: { user }
		};
	}
</script>

<script>
	import { session } from '$app/stores';
	import ListErrors from '$lib/ListErrors.svelte';
	import { post } from '$lib/utils.js';

	export let user;

	let in_progress;
	let errors;

	async function logout() {
		await post(`auth/logout`);

		// this will trigger a redirect, because it
		// causes the `load` function to run again
		$session.user = null;
	}

	async function save() {
		in_progress = true;

		const response = await post(`auth/save`, user);

		errors = response.errors;
		if (response.user) $session.user = response.user;

		in_progress = false;
	}
</script>

<svelte:head>
	<title>Settings • Art Festivals</title>
</svelte:head>

<div class="settings-page">
	<div class="container mx-auto my-9 px-4">
		<div class="row">
			<div class="mx-auto max-w-md">
				<h1 class="text-center text-3xl mb-3">Your Settings</h1>

				<ListErrors {errors} />

				<form on:submit|preventDefault={save}>
					<fieldset>
						<fieldset class="form-group">
							<input
								class="form-control"
								type="text"
								placeholder="URL of profile picture"
								bind:value={user.image}
							/>
						</fieldset>

						<fieldset class="form-group">
							<input
								class="form-control form-control-lg"
								type="text"
								placeholder="Username"
								bind:value={user.username}
							/>
						</fieldset>

						<fieldset class="form-group">
							<textarea
								class="form-control form-control-lg"
								rows="8"
								placeholder="Short bio about you"
								bind:value={user.bio}
							/>
						</fieldset>

						<fieldset class="form-group">
							<input
								class="form-control form-control-lg"
								type="email"
								placeholder="Email"
								bind:value={user.email}
							/>
						</fieldset>

						<fieldset class="form-group">
							<input
								class="form-control form-control-lg"
								type="password"
								placeholder="New Password"
								bind:value={user.password}
							/>
						</fieldset>

						<button
							class="btn btn-lg btn-primary float-right"
							type="submit"
							disabled={in_progress}
						>
							Update Settings
						</button>
					</fieldset>
				</form>

				<hr class="my-4" />

				<button class="btn btn-outline-danger" on:click={logout}> Or click here to logout. </button>
			</div>
		</div>
	</div>
</div>
