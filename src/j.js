import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const j = () => {
  // Create a scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeeeee);

  // Create a axesHelper
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

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

  // Create meshes
  const skyMaterialArray = [];
  const texture_ft = new THREE.TextureLoader().load('./img/bay_ft.jpg');
  const texture_bk = new THREE.TextureLoader().load('./img/bay_bk.jpg');
  const texture_up = new THREE.TextureLoader().load('./img/bay_up.jpg');
  const texture_dn = new THREE.TextureLoader().load('./img/bay_dn.jpg');
  const texture_rt = new THREE.TextureLoader().load('./img/bay_rt.jpg');
  const texture_lf = new THREE.TextureLoader().load('./img/bay_lf.jpg');
  skyMaterialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
  skyMaterialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
  skyMaterialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
  skyMaterialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
  skyMaterialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
  skyMaterialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));
  for (let i = 0; i < 6; i++) {
    skyMaterialArray[i].side = THREE.BackSide;
  }

  const skyGeometry = new THREE.BoxGeometry(2400, 2400, 2400);
  // const skyMaterial = new THREE.MeshBasicMaterial({
  //   // color: 0x333333,
  //   map: skyMaterialArray,
  // });
  // skyMaterial.side = THREE.BackSide; // 큐브의 안쪽 면에 렌더링되도록 설정
  const sky = new THREE.Mesh(skyGeometry, skyMaterialArray);
  scene.add(sky);

  // Create lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
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
