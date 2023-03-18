import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

scene.add(new THREE.AxesHelper(5))

const light = new THREE.PointLight(0xffffff, 2)
light.position.set(20, 10, 5)
scene.add(light)



const planeGeometry = new THREE.PlaneGeometry(3.6, 1.8)

const material = new THREE.MeshPhongMaterial()

const texture = new THREE.TextureLoader().load('../views/ChromaVisionColor.png')
material.map = texture



const normalTexture = new THREE.TextureLoader().load(
    '../views/ChromaVisionMap.png', (texture) =>{
        material.normalMap = normalTexture
        material.normalScale.set(2, 2)
        material.side = THREE.DoubleSide;
    }, undefined, (err) =>{
        console.error("Error Loading Image Texture");
    }
)


const plane = new THREE.Mesh(planeGeometry, material)
scene.add(plane)

const controls = new OrbitControls(camera, renderer.domElement)
/*controls.enableDamping = true*/

camera.position.z = 3;

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)
    controls.update()
    /*plane.rotation.x += 1;
    plane.rotation.y -=1;*/


    render()

}

function render() {
    renderer.render(scene, camera)
}
animate();