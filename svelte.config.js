import netlify from '@sveltejs/adapter-netlify';
import vercel from '@sveltejs/adapter-vercel';
// console.log(process.env.VERCEL)
export default {
	kit: {
		// adapter: process.env.VERCEL ? vercel() : netlify()
		adapter: vercel() 
	}
};
