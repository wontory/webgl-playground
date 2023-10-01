import * as THREE from 'three';

const e = () => {
  // Create a scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf5f5fa);

  // Create a camera
  const fov = 80; // 시야각
  const aspect = window.innerWidth / window.innerHeight; // 종횡비
  const near = 0.1; // 카메라의 앞 영역
  const far = 1000; // 카메라의 뒷 영역
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // const camera = new THREE.PerspectiveCamera(
  //   75,
  //   window.innerWidth / window.innerHeight,
  //   0.1,
  //   1000
  // );
  // camera.position.set(0, 0, 1);
  camera.position.x = 2;
  camera.position.y = 2;
  camera.position.z = 1;
  camera.lookAt(new THREE.Vector3(0, 0, 0)); // 카메라가 바라보는 방향

  // Create a renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create meshes
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material = new THREE.MeshStandardMaterial({ color: 0xff7f00 });
  const cube = new THREE.Mesh(geometry, material);
  cube.rotation.y = 0.5;
  scene.add(cube);

  // Create plane
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1);
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xeeeeee });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.y = -0.5;
  scene.add(plane);

  // Create lights
  const pointLight = new THREE.PointLight(0xffffbb, 500);
  pointLight.position.set(0, 2, 12);
  scene.add(pointLight);

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

export default e;
