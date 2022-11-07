import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';



const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),

});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(-0.5);
//camera.position.setY(6);
//camera.position.setX(-2);
//camera.lookAt(-1.2,0,-1);

renderer.render( scene, camera );
/*
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );
const torus = new THREE.Mesh( geometry, material );

scene.add(torus);
*/
const pointLight = new THREE.PointLight(0xffffff, 2);
//pointLight.position.set(2.5,4,-1);
//pointLight.castShadow = true;


const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);


//() => THREE.MathUtils.randFloatSpread(100)
function addStar(){

  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff} );
  const star = new THREE.Mesh(geometry, material);
  for(count = 0; count >= -31; count--){
    const[x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    //const x = 0;
    //let y = count;
    //const z = 0;

    star.position.set(x,y,z);

      scene.add(star);
      
  }
}
Array(30).fill().forEach(addStar);



/*moon
const moonTexture = new THREE.TextureLoader().load('moonTexture.jpg');
const moonNormalTexture = new THREE.TextureLoader().load('moonNormal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: moonTexture,
    normalMap: moonNormalTexture
  } )

);
scene.add(moon);*/

/*const loader = new GLTFLoader();

loader.load( 'book.glb', function ( bookLayout) {

	scene.add( bookLayout.scene );



}, undefined, function(error){
  console.log("error: ",error);
}); */




//const spaceTexture = new THREE.TextureLoader().load('space.jpg');
//scene.background = spaceTexture;


function animate() {
  requestAnimationFrame( animate );
  /*
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;  
  */
  controls.update();

  renderer.render( scene, camera);

}

animate();