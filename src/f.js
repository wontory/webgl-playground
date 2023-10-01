import * as THREE from 'three';

const f = () => {
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
  camera.position.y = 1;
  camera.position.z = 1.8;
  camera.lookAt(new THREE.Vector3(0, 0, 0)); // 카메라가 바라보는 방향

  // Create a renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create meshes
  const geometry = new THREE.SphereGeometry(0.5, 32, 16);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.y = 0.2;
  cube.rotation.y = 0.5;
  scene.add(cube);

  // Create plane
  const planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1);
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.y = -0.2;
  scene.add(plane);

  // Create lights
  const ambientLight = new THREE.AmbientLight(0xffa500, 0.1); // 전역광
  // scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // 방향광
  directionalLight.position.set(-1, 1, 1);
  const dlHelper = new THREE.DirectionalLightHelper( // 빛의 위치와 방향을 보여주는 헬퍼
    directionalLight,
    0.2,
    0x0000f
  );
  // scene.add(directionalLight);
  // scene.add(dlHelper);

  const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 0.3); // 반구광
  // scene.add(hemisphereLight);

  const pointLight = new THREE.PointLight(0xffffff, 1); // 점광
  pointLight.position.set(-2, 0.5, 0.5);
  const plHelper = new THREE.PointLightHelper(pointLight, 0.1);
  // scene.add(pointLight);
  // scene.add(plHelper);

  const pointLight2 = new THREE.PointLight(0xffffff, 1);
  pointLight2.position.set(2, 2, 0.5);
  const plHelper2 = new THREE.PointLightHelper(pointLight2, 0.1);
  // scene.add(pointLight2);
  // scene.add(plHelper2);

  const rectLight = new THREE.RectAreaLight(0xffffff, 2, 1, 0.5); // 사각광
  rectLight.position.set(0.5, 0.5, 1);
  rectLight.lookAt(0, 0, 0);
  // scene.add(rectLight);

  const spotLight = new THREE.SpotLight(0xffffff, 0.5); // 원뿔광
  scene.add(spotLight);

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

export default f;
