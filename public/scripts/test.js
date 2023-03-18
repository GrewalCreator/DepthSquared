import * as THREE from 'https://unpkg.com/three@0.144.0/build/three.module.js';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );



scene.add(new THREE.AxesHelper(5))

const light = new THREE.PointLight(0xffffff, 2)


light.position.set(5, 5, 10)
scene.add(light)



const planeGeometry = new THREE.PlaneGeometry(3.6, 1.8)

const material = new THREE.MeshPhongMaterial()

const texture = new THREE.TextureLoader().load('../views/earthMapColor.jpg')
material.map = texture



const normalTexture = new THREE.TextureLoader().load(
    '../views/earthMapNormal.png'
)



material.normalMap = normalTexture
material.normalScale.set(2, 2)
material.side = THREE.DoubleSide;

const plane = new THREE.Mesh(planeGeometry, material)
scene.add(plane)

camera.position.z = 2;

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}


function animate() {
    requestAnimationFrame(animate)

    render()

}

function render() {
    renderer.render(scene, camera)
}
animate();
