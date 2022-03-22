<script context="module">
	export async function load({ params, fetch }) {
		const res = await fetch(`/profile/@${params.user}.json`);

		return {
			props: {
				profile: await res.json()
			}
		};
	}
</script>

<script>
	import { page, session } from '$app/stores';

	export let profile;

	// TODO would be nice to have a more idiomatic solution to this —
	// https://github.com/sveltejs/kit/issues/269
	$: segments = $page.url.pathname.split('/');
	$: is_favorites = segments.length === 4 && segments[3] === 'favorites';
	$: is_user = $session.user && profile.username === $session.user.username;

	let current_token;
	async function toggle_following() {
		const token = (current_token = {});

		const { following, username } = profile;

		// optimistic UI
		profile.following = !profile.following;

		const res = await fetch(`/profile/@${username}/follow`, {
			method: following ? 'delete' : 'post'
		});

		const result = await res.json();

		// synchronise with the server, in case it disagrees
		// with our optimistic UI for some reason — but only
		// if the button wasn't re-toggled in the meantime
		if (token === current_token) {
			profile = result.profile;
		}
	}
</script>

<svelte:head>
	<title>{profile.username} • Art Festivals</title>
</svelte:head>

<div class="profile-page">
	<div class="user-info text-center bg-gray-100 pt-8 pb-4 px-4">
		<div class="mx-auto max-w-3xl">
			<div class="row flex flex-wrap justify-center">
				<div class="w-full">
					<img src={profile.image} class="user-img mx-auto w-24 h-24 rounded-full mb-4" alt={profile.username} />
					<h4 class="font-semibold text-xl">{profile.username}</h4>
					<p class="font-light text-sm text-gray-500 max-w-md mx-auto mb-1">{profile.bio}</p>

					{#if is_user}
						<a href="/settings" class="btn btn-sm btn-outline-secondary action-btn">
							<i class="ion-gear-a" />
							Edit Profile Settings
						</a>
					{:else if $session.user}
						<button
							class="btn btn-sm action-btn {profile.following ? 'btn-secondary' : 'btn-outline-secondary'}"
							on:click={toggle_following}
						>
							<i class="ion-plus-round" />
							{profile.following ? 'Unfollow' : 'Follow'}
							{profile.username}
						</button>
					{:else}<a href="/login" class="btn btn-sm btn-outline-secondary action-btn">Sign in to follow</a>{/if}
				</div>
			</div>
		</div>
	</div>

	<div class="container mx-auto px-4 mt-6">
		<div class="row">
			<div class="max-w-3xl mx-auto">
				<div class="articles-toggle">
					<ul class="flex">
						<li class="py-2 px-4 border-b-2 border-transparent text-gray-400 {!is_favorites && 'border-green-600 text-green-600'}">
							<a
								href="/profile/@{profile.username}"
								class="nav-link"
								rel="prefetch"
							>Articles</a>
						</li>

						<li class="py-2 px-4 border-b-2 border-transparent text-gray-400 {is_favorites && 'border-green-600 text-green-600'}">
							<a
								href="/profile/@{profile.username}/favorites"
								class="nav-link"
								rel="prefetch"
							>Favorites</a>
						</li>
					</ul>
				</div>

				<slot />
			</div>
		</div>
	</div>
</div>
