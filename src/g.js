import * as THREE from 'three';

const g = () => {
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
  renderer.shadowMap.enabled = true; // 그림자 출력을 위한 설정
  document.body.appendChild(renderer.domElement);

  // Create meshes
  // const geometry = new THREE.SphereGeometry(0.5, 32, 16);
  const geometry = new THREE.IcosahedronGeometry(0.5, 0);
  // const geometry = new THREE.ConeGeometry(0.4, 0.7, 6);
  const material = new THREE.MeshStandardMaterial({ color: 0x004fff });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.y = 0.5;
  cube.rotation.y = 0.5;
  cube.castShadow = true; // 그림자 cast
  cube.receiveShadow = true; // 그림자 receive
  scene.add(cube);

  const geometry2 = new THREE.IcosahedronGeometry(0.5, 0);
  const material2 = new THREE.MeshStandardMaterial({ color: 0x004fff });
  const cube2 = new THREE.Mesh(geometry2, material2);
  cube2.position.set(-0.8, 1.2, 0.5);
  cube2.castShadow = true; // 그림자 cast
  scene.add(cube2);

  // Create plane
  const planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1);
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.y = -0.2;
  plane.receiveShadow = true; // 그림자 receive
  scene.add(plane);

  // Create lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 전역광
  // ambientLight.castShadow = true; // 그림자 X <- 전역광은 그림자가 없다.
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // 방향광
  directionalLight.position.set(-1.5, 2, 1);
  directionalLight.castShadow = true; // 그림자 O
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.radius = 8; // 그림자 흐림 정도
  const dlHelper = new THREE.DirectionalLightHelper(
    directionalLight,
    0.2,
    0x0000ff
  );
  scene.add(directionalLight);
  scene.add(dlHelper);

  const pointLight = new THREE.PointLight(0xffffff, 0.5); // 점광
  pointLight.position.set(1, 1, 0.5);
  // pointLight.castShadow = true; // 그림자 O
  const plHelper = new THREE.PointLightHelper(pointLight, 0.1);
  // scene.add(pointLight);
  // scene.add(plHelper);

  const rectLight = new THREE.RectAreaLight(0xffffff, 2, 1, 1); // 사각광
  rectLight.position.set(1, 0.5, 0.5);
  rectLight.lookAt(0, 0, 0);
  // rectLight.castShadow = true; // 그림자 X
  // scene.add(rectLight);

  const spotLight = new THREE.SpotLight(0xffffff, 0.5); // 원뿔광
  // spotLight.castShadow = true; // 그림자 O
  // scene.add(spotLight);

  const render = (time) => {
    renderer.render(scene, camera);
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

export default g;
