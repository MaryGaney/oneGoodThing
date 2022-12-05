import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//how to pull from local storage, eventually, we'll use user info
//let daysOpened = JSON.parse(localStorage.getItem('daysClicked'));
//reset the calendar, use this for resetting the notebook
/*function resetCalendar(){
  //only reset if they say yes to a prompt
  const answer = confirm('Are you sure you want to reset your calendar? This action cannot be undone.');
  if (answer){
    //this will clear all items in local storage
    localStorage.clear();
    //reload the page
    document.location.reload();
  }
}//end of reset calendar*/

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),

});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

//camera.lookAt(-1.2,0,-1);

renderer.render( scene, camera );

const pointLight = new THREE.PointLight(0xffffff, 2);
//pointLight.position.set(2.5,4,-1);
//pointLight.castShadow = true;


const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

/*
const loader = new FontLoader();

const helvetiker = loader.load(
	// resource URL
	'fonts/helvetiker_bold.typeface.json',

	// onLoad callback
	function ( helvetiker ) {
		// do something with the font
		console.log( helvetiker );
	},

	// onProgress callback
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function ( err ) {
		console.log( 'An error happened' );
	}
);

loader.load( 'fonts/helvetiker_regular.typeface.json', function ( helvetiker ) {

	const firstText = new TextGeometry( 'Hello three.js!', {
		font: helvetiker,
		size: 80,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 5
	} );
} );
*/

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


//JUST FYI THIS FUNCTION IS NOT DONE DO. NOT. CALL. IT.

let count = 0;

function addStar(){

  const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const geometry = new THREE.SphereGeometry(0.25,27,27);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff} );
  /*
  let monthStarArrayOriginal = [];
  function createMonthStar(monthStarArray){
    for(let monthName = 0; monthName < Months.length; monthName++){
      Months[monthName] = new THREE.Mesh(geometry, material);
      monthStarArray.push(Months[monthName]);
    }
    console.log(monthStarArray);
    return monthStarArray;
  }

  const Numbers = ["zeros", "ones", "twos", "threes", "fours", "fives", "sixes", "sevens", "eights", "nines", "tens", "elevens"];
  let starNumberArrayOriginal = [];
function createArrays(starNumberArray){

  for(let countUp = 0; countUp < 44;){
    for(let goThrough = 0; goThrough < Numbers.length; goThrough++){


        Numbers[goThrough] = Array(1).fill().map(() => returnZero(countUp,31));
        starNumberArray.push(Numbers[goThrough]);
        countUp +=4;
    }
      console.log(starNumberArray);
  }
  return starNumberArray;
}

    

  const[toThirty] = Array(1).fill().map(() => countdown( -4,26));
  const[toTwentyNine] = Array(1).fill().map(() => countdown( -4,24));
  

  createMonthStar(monthStarArrayOriginal);
  createArrays(starNumberArrayOriginal);

  for(let combineAll = 0; combineAll < 13; combineAll++){
    monthStarArrayOriginal[combineAll].position.set(starNumberArrayOriginal[combineAll], toThirtyOne[combineAll], starNumberArrayOriginal[combineAll]);
  }

*/


  const starJan = new THREE.Mesh(geometry, material);



  const[zeros] = Array(1).fill().map(() => returnZero(0,31));
  

  const[toThirtyOne] = Array(1).fill().map(() => countdown(-4,27));

  starJan.position.set(zeros[count],toThirtyOne[count],zeros[count]);
  /*
  starFeb.position.set(ones[count], toTwentyNine[count], zeros[count]);
  starMar.position.set(twos[count], toThirtyOne[count], zeros[count]);
  starApr.position.set(threes[count], toThirty[count], zeros[count]);
  starMay.position.set(fours[count], toThirtyOne[count], zeros[count]);
  starJun.position.set(fives[count], toThirty[count], zeros[count]);
  starJul.position.set(sixes[count], toThirtyOne[count], zeros[count]);
  starAug.position.set(sevens[count], toThirtyOne[count], zeros[count]);
  starSept.position.set(eights[count], toThirty[count], zeros[count]);
  starOct.position.set(nines[count], toThirtyOne[count], zeros[count]);
  starNov.position.set(tens[count], toThirty[count], zeros[count]);
  starDec.position.set(elevens[count], toThirtyOne[count], zeros[count]);
  */
  scene.add(starJan);
  /*
  scene.add(starFeb);
  scene.add(starMar);
  scene.add(starApr);
  scene.add(starMay);
  scene.add(starJun);
  scene.add(starJul);
  scene.add(starAug);
  scene.add(starSept);
  scene.add(starOct);
  scene.add(starNov);
  scene.add(starDec);
  */
 count++;
}

function clearTheStage(){
  location.reload();
}

function populateStars(){
  camera.position.setZ(-40);
  camera.position.setY(20);
  camera.position.setX(3);
  camera.lookAt(-2,1,1);
  console.log("it's working");
  let allTheStars = Array(31).fill().forEach(addStar);
}

function loadNotebook(){

  allTheStars.dispose();

  const loader = new GLTFLoader();
  pointLight.position.set(2.5,4,-1);
  pointLight.castShadow = true;
  camera.position.setZ(2.5);
  camera.position.setY(4);
  camera.position.setX(-1);
  camera.lookAt(0,0,0);

  loader.load( 'book.glb', function ( bookLayout) {
  
    scene.add( bookLayout.scene );
  

  
  }, undefined, function(error){
    console.log("error: ",error);
  }); 
}

const starButton = document.getElementById("displayStars");
const notebookButton = document.getElementById("displayNotebook");


starButton.addEventListener('click', populateStars);
notebookButton.addEventListener('click', loadNotebook);







//const spaceTexture = new THREE.TextureLoader().load('space.jpg');
//scene.background = spaceTexture;


function animate() {
  requestAnimationFrame( animate );
 
  controls.update();

  renderer.render( scene, camera);

}

animate();