import * as THREE from 'https://unpkg.com/three@0.144.0/build/three.module.js';
import {OrbitControls} from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";
import {GUI} from './build/dat.gui.module.js'

function init() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true


    scene.add(new THREE.AxesHelper(5))

    const light = new THREE.PointLight(0xffffff, 2)


    light.position.set(0, 10, 10)
    scene.add(light)

    const planeGeometry = new THREE.PlaneGeometry(3.6, 1.8)
    const material = new THREE.MeshPhongMaterial()

    let plane;
    let plane2;

// GET MAP-TYPE
    var mapURL = url


// GET COLOR FILE
    var colorURL = enteredURL

    const texture = new THREE.TextureLoader().load(`../views/${colorURL}`)
    material.map = texture

    if (mapURL.toLowerCase().includes("normal")) {
        // NORMAL MAP
        camera.position.z = 2;
        material.normalMap = new THREE.TextureLoader().load(
            `../views/${mapURL}`
        )
        material.normalScale.set(2, 2)
        material.side = THREE.DoubleSide;

        plane = new THREE.Mesh(planeGeometry, material)
        scene.add(plane)

        plane2 = new THREE.Mesh(planeGeometry, material);
        plane2.scale.x = -1;
        plane2.rotation.y = Math.PI;
        scene.add(plane2);

        const gui = new GUI()
        gui.add(material.normalScale, 'x', 0, 10, 0.01)
        gui.add(material.normalScale, 'y', 0, 10, 0.01)
        gui.add(light.position, 'x', -20, 20).name('Light Pos X')
        gui.add(light.position, 'y', -20, 20).name('Light Pos Y')
        gui.add(light.position, 'z', -20, 20).name('Light Pos Z')

// ================================================================================

    } else if (mapURL.toLowerCase().includes("displacement")) {
        // DISPLACEMENT MAP
        camera.position.z = 2;
        material.displacementMap = new THREE.TextureLoader().load(
            `../views/${mapURL}`
        )
        plane = new THREE.Mesh(planeGeometry, material)
        scene.add(plane)


        const options = {
            side: {
                FrontSide: THREE.FrontSide,
                BackSide: THREE.BackSide,
                DoubleSide: THREE.DoubleSide,
            },
        }


        const gui = new GUI()

        const materialFolder = gui.addFolder('THREE.Material')
        materialFolder.add(material, 'transparent').onChange(() => material.needsUpdate = true)
        materialFolder.add(material, 'opacity', 0, 1, 0.01)
        materialFolder.add(material, 'depthTest')
        materialFolder.add(material, 'depthWrite')
        materialFolder
            .add(material, 'alphaTest', 0, 1, 0.01)
            .onChange(() => updateMaterial())
        materialFolder.add(material, 'visible')
        materialFolder
            .add(material, 'side', options.side)
            .onChange(() => updateMaterial())

        const data = {
            color: material.color.getHex(),
            emissive: material.emissive.getHex(),
            specular: material.specular.getHex(),
        }

        const meshPhongMaterialFolder = gui.addFolder('THREE.meshPhongMaterialFolder')

        meshPhongMaterialFolder.addColor(data, 'color').onChange(() => {
            material.color.setHex(Number(data.color.toString().replace('#', '0x')))
        })
        meshPhongMaterialFolder.addColor(data, 'emissive').onChange(() => {
            material.emissive.setHex(
                Number(data.emissive.toString().replace('#', '0x'))
            )
        })
        meshPhongMaterialFolder.addColor(data, 'specular').onChange(() => {
            material.specular.setHex(
                Number(data.specular.toString().replace('#', '0x'))
            )
        })
        meshPhongMaterialFolder.add(material, 'shininess', 0, 1024)
        meshPhongMaterialFolder.add(material, 'wireframe')
        meshPhongMaterialFolder
            .add(material, 'flatShading')
            .onChange(() => updateMaterial())
        meshPhongMaterialFolder.add(material, 'reflectivity', 0, 1)
        meshPhongMaterialFolder.add(material, 'refractionRatio', 0, 1)
        meshPhongMaterialFolder.add(material, 'displacementScale', 0, 1, 0.01)
        meshPhongMaterialFolder.add(material, 'displacementBias', -1, 1, 0.01)
        meshPhongMaterialFolder.open()

        function updateMaterial() {
            material.side = Number(material.side)
            material.needsUpdate = true
        }

        const planeData = {
            width: 3.6,
            height: 1.8,
            widthSegments: 360,
            heightSegments: 180,
        }

        const planePropertiesFolder = gui.addFolder('PlaneGeometry')

        planePropertiesFolder
            .add(planeData, 'widthSegments', 1, 360)
            .onChange(regeneratePlaneGeometry)
        planePropertiesFolder
            .add(planeData, 'heightSegments', 1, 180)
            .onChange(regeneratePlaneGeometry)
        planePropertiesFolder.open()

        function regeneratePlaneGeometry() {
            const newGeometry = new THREE.PlaneGeometry(
                planeData.width,
                planeData.height,
                planeData.widthSegments,
                planeData.heightSegments
            )
            plane.geometry.dispose()
            plane.geometry = newGeometry
        }


// ===========================================================
    }


    function update() {
        plane.material.needsUpdate = true;
        plane.map.needsUpdate = true;
        plane.needsUpdate = true;

        plane2.material.needsUpdate = true;
        plane2.map.needsUpdate = true;
        plane2.needsUpdate = true;

    }


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

        render()
    }

    function render() {
        renderer.render(scene, camera)
    }

    animate();
}
init();