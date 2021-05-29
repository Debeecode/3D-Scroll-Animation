import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas:document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff36c7, wireframe: true });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xb512eb);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

/*
const gridHelper = new THREE.GridHelper();
scene.add(lightHelper, gridHelper);
*/

const controls = new OrbitControls(camera, renderer.domElement);

function addStars() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xb512eb });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStars);

const spaceTexture = new THREE.TextureLoader().load('galaxy.jpg');
scene.background = spaceTexture;

const debeeTexture = new THREE.TextureLoader().load('MePuffCute.jpg');

const debee = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: debeeTexture })
);

scene.add(debee);

const moonTexture = new THREE.TextureLoader().load('Moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
);

moon.position.z = 30;
moon.position.setX(-10);

scene.add(moon);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x +=0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  debee.rotation.y += 0.01;
  debee.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}
document.body.onscroll = moveCamera;


function animate() {
  requestAnimationFrame(animate);

  //making the torus rotate along the x, y and z axis
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();
  renderer.render(scene, camera);
}

animate();