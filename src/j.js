import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const j = () => {
  // Create a scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeeeee);

  // Create a camera
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    4000
  );
  camera.position.set(0, 20, 100);
  camera.lookAt(0, 0, 0);

  // Create a renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.minDistance = 20;
  controls.maxDistance = 800;
  controls.update();

  const texture = new THREE.TextureLoader().load('./img/bay_rt.jpg');

  // Create meshes
  const skyGeometry = new THREE.BoxGeometry(24, 24, 24);
  const skyMaterial = new THREE.MeshBasicMaterial({
    color: 0x333333,
  });
  const sky = new THREE.Mesh(skyGeometry, skyMaterial);
  scene.add(sky);

  // Create lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };
  animate();

  // Resize window
  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener('resize', onWindowResize);
};

export default j;
