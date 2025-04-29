import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { federation } from "@module-federation/vite";

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		federation({
			name: "host",
			remotes: {
				remote: {
					type: "module",
					name: "remote",
					entry: "https://voiceofsoftware.com/modulefederation/remoteEntry.js",
					entryGlobalName: "remote",
					shareScope: "default",
				},
			},
			exposes: {},
			filename: "remoteEntry.js",
		})
	],
});
