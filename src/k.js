import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

import { gsap } from 'gsap';

const k = () => {
  // Create a scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeeeee);

  // Create a camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 20;
  camera.lookAt(0, 0, 0);

  // Create a renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.update();

  // Create lights
  const rectLight = new THREE.RectAreaLight(0xffffff, 2, 1, 1);
  rectLight.position.set(0.5, 0.5, 1);
  rectLight.lookAt(0, 0, 0);
  scene.add(rectLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight2.position.set(0.5, 2, 1);
  scene.add(directionalLight2);

  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  // Create meshes
  const ObjLoader = new OBJLoader();
  const MtlLoader = new MTLLoader();
  const ObjGroup = new THREE.Group();
  MtlLoader.load('./object/escandalosos.mtl', (mtl) => {
    mtl.preload();
    ObjLoader.setMaterials(mtl);

    ObjLoader.load(
      './object/escandalosos.obj',
      (object) => {
        ObjGroup.add(object);
        ObjGroup.position.set(0, -5, -1);
        ObjGroup.rotation.y = -2.2;
        scene.add(ObjGroup);
      },
      (xhr) => {
        const progress = (xhr.loaded / xhr.total) * 100 + '%';
        console.log(progress);
      },
      (error) => {
        console.log('An error happened: ' + error);
      }
    );
  });

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

export default k;
