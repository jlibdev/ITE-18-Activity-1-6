import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight // Corrected here
};

const camera = new THREE.PerspectiveCamera(
    75, sizes.width / sizes.height
);
camera.position.z = 3;
scene.add(camera);

const geometry = new THREE.BoxGeometry(1, 3, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x33d44e });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});



renderer.setSize(sizes.width, sizes.height);

window.addEventListener('resize', ()=>{
    // Sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', ()=>{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if (!fullscreenElement){
        if (canvas.requestFullscreen){
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen){
            canvas.webkitRequestFullscreen()
        }
    }
    else{
        if(document.exitFullscreen){
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const tick = () =>{
    controls.update()
    renderer.render( scene , camera );
    window.requestAnimationFrame(tick)
}

tick()
