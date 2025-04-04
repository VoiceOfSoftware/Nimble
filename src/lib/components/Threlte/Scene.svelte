<script>
	import { T, useTask } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
	import { Spring } from 'svelte/motion';
	import { useGltf } from '@threlte/extras';
	import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
	import { XR, Controller, Hand } from '@threlte/xr';

	export let gltfURL,
		scale = 30;

	interactivity();

	const springScale = new Spring(1);

	let rotation = 0;
	useTask((delta) => {
		// rotation += delta;
	});
</script>

<XR>
	<Controller left />
	<Controller right />
	<Hand left />
	<Hand right />
</XR>

<T.PerspectiveCamera
	makeDefault
	position={[10, 10, 10]}
	oncreate={(ref) => {
		ref.lookAt(0, 1, 0);
	}}
/>

<T.DirectionalLight position={[0, 10, 10]} castShadow />

<T.Mesh
	rotation.y={rotation}
	position.y={1}
	springScale={springScale.current}
	onpointerenter={() => {
		springScale.target = 1.5;
	}}
	onpointerleave={() => {
		springScale.target = 1;
	}}
	castShadow
>
	{#await useGltf(gltfURL) then gltf}
		<T {scale} is={gltf.scene} />
	{/await}
</T.Mesh>

<T.Mesh rotation.x={-Math.PI / 2} receiveShadow>
	<T.CircleGeometry args={[4, 40]} />
	<T.MeshStandardMaterial color="white" />
</T.Mesh>
