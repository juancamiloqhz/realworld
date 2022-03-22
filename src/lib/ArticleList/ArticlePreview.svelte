<script>
	import * as api from '$lib/api.js';

	export let article;
	export let user;

	async function toggle_favorite() {
		// optimistic UI
		if (article.favorited) {
			article.favoritesCount -= 1;
			article.favorited = false;
		} else {
			article.favoritesCount += 1;
			article.favorited = true;
		}

		({ article } = await (article.favorited
			? api.post(`articles/${article.slug}/favorite`, null, user && user.token)
			: api.del(`articles/${article.slug}/favorite`, user && user.token)));
	}
</script>

<div class="py-6 border-t border-gray-200">
	<div class="mb-4 leading-4">
		<a class="inline-block" href="/profile/@{article.author.username}">
			<img class="h-8 w-8 rounded-full" src={article.author.image} alt={article.author.username} />
		</a>

		<div class="mr-6 ml-1 inline-block">
			<a class="author block font-normal hover:underline text-green-600  hover:text-green-700" href="/profile/@{article.author.username}"> {article.author.username} </a>
			<span class="date text-sm text-gray-400 font-thin"> {new Date(article.createdAt).toDateString()} </span>
		</div>

		{#if user}
			<div class="inline-block float-right">
				<button
					class="inline-block px-2 py-1 border border-green-600 text-green-600 hover:text-white font-normal text-sm leading-tight rounded hover:bg-green-600 focus:outline-none focus:ring-0 transition duration-150 ease-in-out {article.favorited ? 'text-white bg-green-600' : ''}"
					on:click={toggle_favorite}
				>
					<i class="ion-heart" />
					{article.favoritesCount}
				</button>
			</div>
		{/if}
	</div>

	<a href="/article/{article.slug}" rel="prefetch" class="preview-link">
		<h1 class="font-medium text-gray-900 text-xl">{article.title}</h1>
		<p class="font-thin text-gray-400 mb-4 text-base leading-5">{article.description}</p>
		<span class="max-w-fit text-sm font-thin text-gray-400">Read more...</span>
		<ul class="tag-list float-right max-w-[50%]">
			{#each article.tagList as tag}
				<li class="tag inline-block font-thin text-sm border border-gray-400 rounded-full px-2 mr-1 last:mr-0 text-gray-400"><a href="/?tag={tag}">{tag}</a></li>
			{/each}
		</ul>
	</a>
</div>
