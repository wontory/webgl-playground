import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const d = () => {
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
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Orbit controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.update();

  // Create lights
  const pointLight = new THREE.PointLight(0xeeeeee, 500);
  pointLight.position.set(0, 2, 12);
  scene.add(pointLight);

  // Add textures
  const textureLoader = new THREE.TextureLoader();
  const textureBaseColor = textureLoader.load(
    './img/Stone_Path_008_basecolor.jpg'
  );
  const textureNormalMap = textureLoader.load(
    './img/Stone_Path_008_normal.jpg'
  );
  const textureHeightMap = textureLoader.load(
    './img/Stone_Path_008_height.png'
  );
  const textureRoughnessMap = textureLoader.load(
    './img/Stone_Path_008_roughness.jpg'
  );

  // Create meshes
  const geometry = new THREE.SphereGeometry(0.3, 32, 32);
  const material01 = new THREE.MeshStandardMaterial({ map: textureBaseColor });
  const obj01 = new THREE.Mesh(geometry, material01);
  obj01.position.x = -1.5;
  scene.add(obj01);

  const material02 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormalMap,
  });
  const obj02 = new THREE.Mesh(geometry, material02);
  obj02.position.x = -0.5;
  scene.add(obj02);

  const material03 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormalMap,
    displacementMap: textureHeightMap,
    displacementScale: 0.03,
  });
  const obj03 = new THREE.Mesh(geometry, material03);
  obj03.position.x = 0.5;
  scene.add(obj03);

  const material04 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormalMap,
    displacementMap: textureHeightMap,
    displacementScale: 0.03,
    roughnessMap: textureRoughnessMap,
    roughness: 0.8,
  });
  const obj04 = new THREE.Mesh(geometry, material04);
  obj04.position.x = 1.5;
  scene.add(obj04);

  const render = (time) => {
    time *= 0.001;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);

  // Resize window
  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener('resize', onWindowResize);
};

export default d;
