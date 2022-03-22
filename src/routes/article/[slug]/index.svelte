<script context="module">
	export async function load({ params, fetch }) {
		const { slug } = params;
		const [article, comments] = await Promise.all([
			fetch(`/article/${slug}.json`).then((r) => r.json()),
			fetch(`/article/${slug}/comments.json`).then((r) => r.json())
		]);

		return {
			props: { article, comments, slug }
		};
	}
</script>

<script>
	import { session } from '$app/stores';
	import { marked } from 'marked';

	import ArticleMeta from './_ArticleMeta.svelte';
	import CommentContainer from './_CommentContainer.svelte';

	export let article;
	export let comments;
	export let slug;

	$: markup = marked(article.body);
</script>

<svelte:head>
	<title>{article.title}</title>
</svelte:head>

<div class="article-page">
	<div class="banner py-8 bg-gray-800 mb-8">
		<div class="container mx-auto max-w-screen-xl px-4">
			<h1 class="text-white text-4xl font-semibold drop-shadow-lg">{article.title}</h1>
			<ArticleMeta {article} user={$session.user} />
		</div>
	</div>

	<div class="container mx-auto my-9 px-4 max-w-screen-xl">
		<div class="row article-content">
			<div class="w-full">
				<div class="mb-4">
					{@html markup}
				</div>

				<ul class="tag-list mb-4">
					{#each article.tagList as tag}
						<li class="tag border border-gray-400 text-gray-400 rounded-full w-fit text-xs px-2 inline-block mr-1 last:mr-0">{tag}</li>
					{/each}
				</ul>
			</div>
		</div>

		<hr />

		<div class="article-actions text-center mt-6 mb-12" />

		<div class="flex flex-wrap">
			<CommentContainer {slug} {comments} user={$session.user} errors={[]} />
		</div>
	</div>
</div>
