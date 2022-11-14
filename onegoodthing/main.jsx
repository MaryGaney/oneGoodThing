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

function countdown(startNumber, endNumber){
  let newArray = [];
  for(let count = startNumber; count <= endNumber; count++){
      let numberSend = count;
      //console.log(numberSend);
      //console.log(count);
      newArray.push(numberSend)
      //return numberSend;
  }
  return newArray;
}


function returnZero(wantNumber, repeats){
  let newArray = [];
  for(let count = 0; count <= repeats; count++){
    let numberSend = wantNumber;
    newArray.push(numberSend)
  }
  return newArray;
}


//() => THREE.MathUtils.randFloatSpread(100)
//.map(() => THREE.MathUtils.pingpong(0,-31))
//.map(() => THREE.MathUtils.lerp(1,10))
function addStar(){

  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff} );
  const star = new THREE.Mesh(geometry, material);


  const[x] = Array(1).fill().map(() => returnZero(0,31));
  console.log(x);
  const[y] = Array(1).fill().map(() => countdown(0,31));
  console.log(y);
  const[z] = Array(1).fill().map(() => returnZero(0,31));
  console.log(z);
  for(let count = 0; count <= 31; count++){
    star.position.set(x[count],y[count],z[count]);

    scene.add(star);
  }
}
Array(1).fill().forEach(addStar);



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