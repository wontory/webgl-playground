import * as THREE from 'three';

const a = () => {
  // Create a scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf5f5fa);

  // Create a camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 2;

  // Create a renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  // Create mesh
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material = new THREE.MeshStandardMaterial({ color: 0x999999 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const render = (time) => {
    time *= 0.001;

    cube.rotation.x = time;
    cube.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
};

export default a;
