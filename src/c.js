import * as THREE from 'three';

const c = () => {
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
  camera.position.z = 3;

  // Create a renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create lights
  const pointLight = new THREE.PointLight(0xffffff, 500);
  pointLight.position.set(0, 2, 12);
  scene.add(pointLight);

  // Create meshes
  const geometry = new THREE.TorusGeometry(0.3, 0.15, 16, 40);
  const material01 = new THREE.MeshBasicMaterial({ color: 0xff7f00 });
  const obj01 = new THREE.Mesh(geometry, material01);
  obj01.position.x = -2;
  scene.add(obj01);

  const material02 = new THREE.MeshStandardMaterial({
    color: 0xff7f00,
    metalness: 0.6,
    roughness: 0.4,
    // wireframe: true,
    // transparent: true,
    // opacity: 0.5,
  });
  const obj02 = new THREE.Mesh(geometry, material02);
  obj02.position.x = -1;
  scene.add(obj02);

  const material03 = new THREE.MeshPhysicalMaterial({
    color: 0xff7f00,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  });
  const obj03 = new THREE.Mesh(geometry, material03);
  obj03.position.x = 0;
  scene.add(obj03);

  const material04 = new THREE.MeshLambertMaterial({ color: 0xff7f00 });
  const obj04 = new THREE.Mesh(geometry, material04);
  obj04.position.x = 1;
  scene.add(obj04);

  const material05 = new THREE.MeshPhongMaterial({
    color: 0xff7f00,
    shininess: 60,
    specular: 0x004fff,
  });
  const obj05 = new THREE.Mesh(geometry, material05);
  obj05.position.x = 2;
  scene.add(obj05);

  const render = (time) => {
    time *= 0.001;

    obj01.rotation.y += 0.01;
    obj02.rotation.y += 0.01;
    obj03.rotation.y += 0.01;
    obj04.rotation.y += 0.01;
    obj05.rotation.y += 0.01;

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

export default c;
