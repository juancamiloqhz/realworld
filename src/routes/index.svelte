<script context="module">
	export async function load({ url, fetch }) {
		const [{ articles, pages }, { tags }] = await Promise.all([
			fetch(`/articles.json${url.search}`, { credentials: 'include' }).then((r) => r.json()),
			fetch('/tags.json').then((r) => r.json())
		]);

		return {
			props: {
				articles,
				pages,
				tags
			}
		};
	}
</script>

<script>
	import { page, session } from '$app/stores';
	import ArticleList from '$lib/ArticleList/index.svelte';
	import Pagination from '$lib/Pagination.svelte';

	export let articles;
	export let pages;
	export let tags;

	$: p = +$page.url.searchParams.get('p') || 1;
	$: tag = $page.url.searchParams.get('tag');
	$: tab = $page.url.searchParams.get('tab') || 'all';
	$: page_link_base = tag ? `tag=${tag}` : `tab=${tab}`;
</script>

<svelte:head>
	<title>Art Festivals</title>
</svelte:head>

<div class="home-page">
	{#if !$session.user}
		<div class="banner bg-green-600 shadow-inner text-white p-8">
			<div class="container mx-auto px-4 text-center">
				<h1 class="logo-font text-4xl font-bold drop-shadow-lg pb-2">Art Festivals</h1>
				<p class="text-2xl font-thin">A place to share your knowledge.</p>
			</div>
		</div>
	{/if}

	<div class="container mx-auto my-9 max-w-screen-xl">
		<div class="grid grid-cols-[1fr] md:grid-cols-[75%_25%]">
			<div class="px-4">
				<div>
					<ul class="flex">
						<li class="py-2 px-4 border-b-2 border-transparent text-gray-400  {tab === 'all' && !tag && 'border-green-600 text-green-600'}">
							<a
								href="/?tab=all"
								rel="prefetch"
								class="nav-link"
							>
								Global Feed
							</a>
						</li>

						{#if $session.user}
							<li class="py-2 px-4 border-b-2 border-transparent text-gray-400  {tab === 'feed' && 'border-green-600 text-green-600'}">
								<a href="/?tab=feed" rel="prefetch" class="nav-link">
									Your Feed
								</a>
							</li>
						{:else}
							<li class="py-2 px-4 border-b-2 border-transparent text-gray-400">
								<a href="/login" rel="prefetch" class="nav-link">Sign in to see your Feed </a>
							</li>
						{/if}

						{#if tag}
							<li class="py-2 px-4 border-b-2 border-transparent border-green-600 text-green-600">
								<a href="/?tag={tag}" rel="prefetch" class="nav-link active">
									<i class="ion-pound" />
									{tag}
								</a>
							</li>
						{/if}
					</ul>
				</div>

				<ArticleList {articles} />
				<Pagination {pages} {p} href={(p) => `/?${page_link_base}&page=${p}`} />
			</div>

			<div class="px-4">
				<div class="sidebar px-3 bg-gray-100 pt-2 pb-3 rounded">
					<p class="mb-1">Popular Tags</p>
					<div class="tag-list">
						{#each tags as tag}
							<a href="/?tag={tag}" rel="prefetch" class="tag transition-all duration-100 ease-in text-white text-sm py-[0.1rem] whitespace-nowrap mr-1 mb-1 inline-block bg-gray-400 hover:bg-gray-500 px-2 rounded-xl"> {tag} </a>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
