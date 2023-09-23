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

  // Create a renderer
  const canvas = document.querySelector('#a');
  const renderer = new THREE.WebGLRenderer({ canvas });

  /**
   * const renderer = new THREE.WebGLRenderer();
   * renderer.setSize(window.innerWidth, window.innerHeight);
   *
   * document.body.appendChild(renderer.domElement);
   *
   * renderer.render(scene, camera);
   */

  const render = (time) => {
    time *= 0.001;

    // cube.rotation.x = time;
    // cube.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
};

export default a;
