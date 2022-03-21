<script>
	import { page, session } from '$app/stores';
</script>

<nav class="relative w-full flex flex-wrap items-center justify-between py-3 bg-white shadow-sm">
	<div class="container flex flex-wrap items-center justify-between mx-auto px-4">
		<a rel="prefetch" class="text-green-600 font-bold text-2xl mr-4" href="/">Art Festivals</a>
		<ul class="navbar-nav flex gap-4 pl-0 list-style-none">
			<li class="nav-item py-2">
				<a rel="prefetch" class="nav-link text-gray-400 hover:text-gray-600 focus:text-gray-700 {$page.url.pathname === '/' ? 'text-gray-600' : ''}" href="/">Home</a>
			</li>

			{#if $session.user}
				<li class="nav-item p-2">
					<a rel="prefetch" href="/editor" class="nav-link text-gray-400 hover:text-gray-600 focus:text-gray-600 {$page.url.pathname === '/editor' ? 'text-gray-600' : ''}">
						<i class="ion-compose" />&nbsp;New Post
					</a>
				</li>

				<li class="nav-item p-2">
					<a
						rel="prefetch"
						href="/settings"
						class="nav-link text-gray-400 hover:text-gray-600 focus:text-gray-600 {$page.url.pathname === '/settings' ? 'text-gray-600' : ''}">
						<i class="ion-gear-a" />&nbsp;Settings
					</a>
				</li>

				<li class="nav-item p-2">
					<a rel="prefetch" href="/profile/@{$session.user.username}" class="nav-link text-gray-400 hover:text-gray-600 focus:text-gray-700">
						<!-- <img src={$user.image} class="user-pic" alt={$user.username}> -->
						{$session.user.username}
					</a>
				</li>
			{:else}
				<li class="nav-item p-2">
					<a rel="prefetch" href="/login" class="nav-link text-gray-400 hover:text-gray-600 focus:text-gray-700 {$page.url.pathname === '/login' ? 'text-gray-600' : ''}">
						Sign in
					</a>
				</li>

				<li class="nav-item p-2">
					<a
						rel="prefetch"
						href="/register"
						class="nav-link text-gray-400 hover:text-gray-600 focus:text-gray-700 {$page.url.pathname === '/register' ? 'text-gray-600' : ''}">
						Sign up
					</a>
				</li>
			{/if}
		</ul>
	</div>
</nav>
