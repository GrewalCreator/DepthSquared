import * as THREE from 'https://unpkg.com/three@0.144.0/build/three.module.js';
import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";
//import { GUI } from "https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.6/dat.gui.min.js";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true


scene.add(new THREE.AxesHelper(5))

const light = new THREE.PointLight(0xffffff, 2)
const light2 = new THREE.PointLight(0xffffff, 2)



light.position.set(0, 10, 10)
light2.position.set(0, 10, -10)
scene.add(light)
scene.add(light2)



const planeGeometry = new THREE.PlaneGeometry(3.6, 1.8)

const material = new THREE.MeshPhongMaterial()

const texture = new THREE.TextureLoader().load('../views/earthMapColor.jpg')
material.map = texture



const normalTexture = new THREE.TextureLoader().load(
    '../views/earthMapNormal.png'
)



material.normalMap = normalTexture
material.normalScale.set(2, 2)

const plane = new THREE.Mesh(planeGeometry, material)
scene.add(plane)

const plane2 = new THREE.Mesh(planeGeometry, material);
plane2.scale.x = -1;
plane2.rotation.y = Math.PI;
scene.add(plane2);


camera.position.z = 2;

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const gui = new GUI()
gui.add(material.normalScale, 'x', 0, 10, 0.01)
gui.add(material.normalScale, 'y', 0, 10, 0.01)
gui.add(light.position, 'x', -20, 20).name('Light Pos X')

function animate() {
    requestAnimationFrame(animate)

    controls.update()

    render()

}

function render() {
    renderer.render(scene, camera)
}
animate();

