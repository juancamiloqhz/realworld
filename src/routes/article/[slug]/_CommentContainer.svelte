<script>
	import CommentInput from './_CommentInput.svelte';
	import Comment from './_Comment.svelte';

	export let comments;
	export let slug;
	export let user;
</script>

<div class="w-full md:ml-[25%] xl:ml-[35%]">
	{#if user}
		<div>
			<CommentInput
				{slug}
				{user}
				on:commented={({ detail }) => (comments = [detail.comment, ...comments])}
			/>
		</div>
	{:else}
		<p class="mb-4">
			<a class="text-green-600 hover:underline" href="/login">Sign in</a>
			or
			<a class="text-green-600 hover:underline" href="/register">sign up</a>
			to add comments on this article.
		</p>
	{/if}

	{#each comments as comment, i (comment.id)}
		<Comment
			{comment}
			{slug}
			{user}
			on:deleted={() => (comments = [...comments.slice(0, i), ...comments.slice(i + 1)])}
		/>
	{/each}
</div>
