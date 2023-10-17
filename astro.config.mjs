import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://kuamatzin.github.io',
  	base: '/my-repo',
	integrations: [
		starlight({
			title: 'ESubmission API',
			social: {
				github: 'https://github.com/kofile/esubmission-api',
			},
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Installation', link: '/installation' },
					],
				},
				{
					label: 'Framework',
					items: [
						{
							label: 'Introduction',
							link: '/framework/introduction',
						},
						{
							label: 'Folder Structure',
							link: '/framework/structure',
						},
						{
							label: 'Routing',
							link: '/framework/routing',
						},
						{
							label: 'Middlewares',
							link: '/framework/middlewares',
						},
						{
							label: 'Models',
							link: '/framework/models',
						},
						{
							label: 'Services',
							link: '/framework/services',
						},
					]
				},
			],
		}),
	],
});
