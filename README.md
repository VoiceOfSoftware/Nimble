## Developing

Getting started:

```bash
git clone https://github.com/VoiceOfSoftware/Nimble.git
cd Nimble
echo 'PUBLIC_CEREBRAS_API_KEY=dummy' > .env
pnpm install
pnpm run dev
```

## Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `pnpm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
