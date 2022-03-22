<script>
	import { session } from '$app/stores';
	import ArticlePreview from './ArticlePreview.svelte';

	export let articles;
</script>

{#if articles.length === 0}
	<div class="py-6 border-t border-gray-200">No articles are here... yet.</div>
{:else}
	<div>
		{#each articles as article (article.slug)}
			<ArticlePreview {article} user={$session.user} />
		{/each}
	</div>
{/if}
