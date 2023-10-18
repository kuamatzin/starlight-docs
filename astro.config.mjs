import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://kuamatzin.github.io',
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
						{ label: 'Introduction', link: '/introduction' },
					],
				},
				{
					label: 'Framework',
					items: [
						{
							label: 'Installation',
							link: '/framework/installation',
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
