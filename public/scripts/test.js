import * as THREE from 'https://unpkg.com/three/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);

    normalMap.rotation.x += 0.01;
    normalMap.rotation.y += 0.01;

    renderer.render(scene, camera);
}
