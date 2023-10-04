import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const i = () => {
  // Create a scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x555555);

  // Create a camera
  const camera = new THREE.PerspectiveCamera(
    80,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 2, 3);
  camera.lookAt(0, 0, 0);

  // Create a renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 3;
  controls.maxDistance = 6;
  controls.maxPolarAngle = Math.PI / 2 - 0.1;
  controls.enableDamping = true;
  controls.update();

  // Create meshes
  const geometry = new THREE.TorusGeometry(0.7, 0.3, 12, 80);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const obj = new THREE.Mesh(geometry, material);
  obj.rotation.y = 0.8;
  scene.add(obj);

  // Create plane
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1);
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.y = -0.5;
  scene.add(plane);

  // Create lights
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

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

export default i;
