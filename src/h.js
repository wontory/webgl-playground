import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const h = () => {
  // Create a scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf5f5fa);

  // Create a camera
  const fov = 120;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  camera.position.x = 0;
  camera.position.y = 2;
  camera.position.z = 1.8;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // Create a renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  // Create controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 2; // 최소 줌인 거리
  controls.maxDistance = 4; // 최대 줌아웃 거리
  controls.maxPolarAngle = Math.PI / 2; // 위 아래로 볼 수 있는 최대 각도
  controls.update();

  // Create meshes
  const geometry = new THREE.IcosahedronGeometry(0.5, 0);
  const material = new THREE.MeshStandardMaterial({ color: 0x004fff });
  const obj = new THREE.Mesh(geometry, material);
  obj.rotation.y = 0.5;
  obj.position.set(0.5, 0.5, 0);
  obj.castShadow = true;
  obj.receiveShadow = true;
  scene.add(obj);

  const geometry2 = new THREE.IcosahedronGeometry(0.5, 0);
  const material2 = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const obj2 = new THREE.Mesh(geometry2, material2);
  obj2.position.set(-0.5, 1.2, 0.5);
  obj2.castShadow = true;
  scene.add(obj2);

  // Create plane
  const planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1);
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.y = -0.2;
  plane.receiveShadow = true;
  scene.add(plane);

  // Create lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(-1.5, 2, 1);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.radius = 8;
  const dlHelper = new THREE.DirectionalLightHelper(
    directionalLight,
    0.2,
    0x0000ff
  );
  scene.add(directionalLight);
  scene.add(dlHelper);

  const animate = () => {
    requestAnimationFrame(animate);

    obj.rotation.y += 0.03;
    obj2.rotation.x += 0.01;
    obj2.rotation.y += 0.01;

    controls.update();
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

export default h;
