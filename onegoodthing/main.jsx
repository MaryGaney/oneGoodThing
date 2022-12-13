import './style.css'

import * as THREE from 'three';

import { MapControls, OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Fog } from 'three';

//THINGS NEEDED TO BE DONE BEFORE THE FINAL
//1. get the number of days yellow
//2. get the number of days green
//3. get the daily good thing
//4. fix ALL buttons
//5. encorportate colors into the functions
//6. fix the count day by day functions
//7. fix the deletion of items
//8. 


//how to pull from local storage, eventually, we'll use user info ??
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

//create the scene (background that holds everything)
const scene = new THREE.Scene();

//create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight);

//create the renderer
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),

});

THREE.DefaultLoadingManager.onLoad = function ( ) {

	console.log( 'Loading Complete!');

};




//renderer automatically adjusts to device window
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

//camera.lookAt(-1.2,0,-1);

//add the background that holds everything and the camera
renderer.render( scene, camera );


//create lighting
const pointLight = new THREE.PointLight(0xffffff, 2);
const ambientLight = new THREE.AmbientLight(0xffffff);
//pointLight.position.set(2.5,4,-1);
//pointLight.castShadow = true;

//add the lights to the scene
scene.add(pointLight, ambientLight);

//adds a box to show where the camera is
const helper = new THREE.CameraHelper( camera );
scene.add( helper );

//adds a box to show where the light is and adds the grid
//instead of commenting these out, I think it's helpful to use them
//at this stage in development
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper, gridHelper);

//allows for movement in the scene
const controls = new OrbitControls(camera, renderer.domElement);

//font stuff, ignore this
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


//this removes objects from the scene
function removeObject3D(object3D) {
  if (!(object3D instanceof THREE.Object3D)) return false;

  // for better memory management and performance
  if (object3D.geometry) object3D.geometry.dispose();
  console.log("it's gone");

  if (object3D.material) {
      if (object3D.material instanceof Array) {
          // for better memory management and performance
          object3D.material.forEach(material => material.dispose());
          object3D.material.forEach(object3D.length = 0)
      } else {
          // for better memory management and performance
          object3D.material.dispose();

      }
  }
  object3D.removeFromParent(); // the parent might be the scene or another Object3D, but it is sure to be removed this way
  return true;
}

//takes in a start number and counts from the starting number to the ending number
//adding all of the numbers from the start number to the end number in the array
function countdown(startNumber, endNumber){
  let newArray = [];
  for(let count = startNumber; count <= endNumber; count++){
      let numberSend = count;
      newArray.push(numberSend)
  }
  return newArray;
}

//returns an array full of however many amount of the wanted number (repeats)
//this is to help with calendar view so that the x and z will stay the same but
//the y will change
function returnZero(wantNumber, repeats){
  let newArray = [];
  for(let count = 0; count <= repeats; count++){
    let numberSend = wantNumber;
    newArray.push(numberSend)
  }
  return newArray;
}


//count is the number of times this function has gone through
let count = 0;
//currently working on making this function simpler and will eventually use Date()
//simply just displaying these in full calendar order
function addStarOrdered(){

  //const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const geometry = new THREE.SphereGeometry(0.25,27,27);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff} );
  //this is the start of making the function simpler
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
  */

  const[zeros] = Array(1).fill().map(() => returnZero(0,31));
  const[toThirty] = Array(1).fill().map(() => countdown( -4,26));
  const[toTwentyNine] = Array(1).fill().map(() => countdown( -4,24));
  const[toThirtyOne] = Array(1).fill().map(() => countdown(-4,27));
  //createMonthStar(monthStarArrayOriginal);
  //createArrays(starNumberArrayOriginal);


  /*
    for(let combineAll = 0; combineAll < 13; combineAll++){
      monthStarArrayOriginal[combineAll].position.set(starNumberArrayOriginal[combineAll], toThirtyOne[combineAll], starNumberArrayOriginal[combineAll]);
    }
  */
  const starJan = new THREE.Mesh(geometry, material);
  const starFeb = new THREE.Mesh(geometry,material);
  const starMar = new THREE.Mesh(geometry,material);
  const starApr = new THREE.Mesh(geometry,material);
  const starMay = new THREE.Mesh(geometry,material);
  const starJun = new THREE.Mesh(geometry,material);
  const starJul = new THREE.Mesh(geometry,material);
  const starAug = new THREE.Mesh(geometry,material);
  const starSept = new THREE.Mesh(geometry,material);
  const starOct = new THREE.Mesh(geometry,material);
  const starNov = new THREE.Mesh(geometry,material);
  const starDec = new THREE.Mesh(geometry,material);

  starJan.position.set(zeros[count],toThirtyOne[count],zeros[count]);
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

  scene.add(starJan);
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
  count++;
}


//this is the number of days in each month - 1 (to account for 0)
//eventually I'll just the date and time automatically, but I wanted to wait and see if the actual function
//worked first
const Months = [[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
];

//this adds the dimensions and color for each star
const geometry = new THREE.SphereGeometry(0.25,27,27);
const material = new THREE.MeshStandardMaterial( { color: 0xffffff} );

//this is the array of stars that need to be added to the scene
let monthStarArrayOriginal = [];
console.log(monthStarArrayOriginal.length)

function createMonthStar(monthStarArray){
  while(monthStarArray < 364){
    for(let monthName = 0; monthName < Months.length; monthName++){
      //console.log("does this even repeat??");
      for(let monthDayNumber = 0; monthDayNumber < Months[monthName].length; monthDayNumber++){
        Months[monthName[monthDayNumber]] = new THREE.Mesh(geometry, material);

        monthStarArray.push(Months[monthName[monthDayNumber]]);
        //console.log("see if this works");
      }
      console.log(monthStarArray);

    }
  }
  return monthStarArray;
}

createMonthStar(monthStarArrayOriginal);

//starGalaxyCount counts the number of times the galaxy display is used 
let starGalaxyCount = 0;
function addStarGalaxy(arrayOfMonths){
  //console.log("we got through");
  
  const[x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  arrayOfMonths[starGalaxyCount].position.set(x,y,z);
    //console.log("this part is working");
  scene.add(arrayOfMonths[starGalaxyCount]);
  starGalaxyCount++;
}

function addStarGalaxyDay(){

}

function populateStarsOrderedD(){
  
}
//this function moves the camera and adds the stars to the scene in an array of 12 for the 12 months
//this handles the galaxy order
function populateStarsGalaxy(){
  document.getElementById('goodThing').style.visibility = "hidden";
  document.getElementById('yellowNumber').style.visibility = "hidden";
  document.getElementById('greenNumber').style.visibility = "hidden";
  camera.position.setZ(-40);
  camera.position.setY(20);
  camera.position.setX(3);
  camera.lookAt(-2,1,1);
  console.log("it's working");
  createMonthStar(monthStarArrayOriginal);
  for(let x = 0; x < monthStarArrayOriginal.length; x++){
    Array(12).fill(addStarGalaxy(monthStarArrayOriginal));
  }
}

//this function moves the camera and adds the stars to the scene in an array of 12 for the 12 months
//this handles the calendar order
function  populateStarsOrdered(){
  //monthStarArrayOriginal.length = 0;
  createMonthStar(monthStarArrayOriginal);
  camera.position.setZ(-40);
  camera.position.setY(20);
  camera.position.setX(3);
  camera.lookAt(-2,1,1);
  console.log("it's working");
  Array(12).fill().forEach(addStarOrdered);
}

const goodThing = [];
const yellowNumbers = [];
const greenNumbers = [];

function getTheInfo(){
  const goals = document.getElementById('goals');
  goals.style.visibility = "visible";
  goals.style.marginBottom = "15%";
  goals.style.marginLeft = "25%";
  goals.style.marginTop = "30%";
  goals.style.height = "15%";
  goals.style.width = "35%";
  document.getElementById('goodThing').style.visibility = "visible";
  document.getElementById('yellowNumber').style.visibility = "visible";
  document.getElementById('greenNumber').style.visibility = "visible";

  //goodThing
  //yellowNumber
  //greenNumber

  const goodThingText = document.getElementById('goodThing');

  const yellowNumber = document.getElementById('yellowNumber');

  const greenNumber = document.getElementById('greenNumber');


}

//this function moves the camera, moves the light, and adds a new loader which will add the notebook

function loadNotebook(){
  
  for (let i=0; i< monthStarArrayOriginal.length; i++){
    removeObject3D(monthStarArrayOriginal[i]);
  }
  
  //createMonthStar(monthStarArrayOriginal);
  const loader = new GLTFLoader();
  pointLight.position.set(2.5,4,-1);
  pointLight.castShadow = true;
  camera.position.setZ(2.5);
  camera.position.setY(4);
  camera.position.setX(-1);
  camera.lookAt(0,0,0);

  
  const goals = document.getElementById('goals');


  const mainDiv = document.getElementById('main');
  mainDiv.visibility = "visible";
  mainDiv.style.height = "auto";

  getTheInfo()
  /*
    loader.load( 'book.glb', function ( bookLayout) {
      scene.add( bookLayout.scene );
    

    
    }, undefined, function(error){
      console.log("error: ",error);
    }); 
  */
}
//these are the two variables for the "display my stars" and "display my notebook" button

const notebookButton = document.getElementById("displayNotebook");
const starButtonGalaxy = document.getElementById("displayStarsGalaxy");
const settingsButton = document.getElementById("settingsButton");
const starCalendarButton = document.getElementById("displayStarsCalendar");
const starCalendarDButton = document.getElementById("displayStarsCalendarDay");
const starButtonGalaxyD = document.getElementById("displayStarsGalaxyDay");

//when the buttons are clicked they run their specific functions that load in the stars or notebook

notebookButton.addEventListener('click', loadNotebook);
starButtonGalaxy.addEventListener('click', populateStarsGalaxy);
starCalendarButton.addEventListener('click', populateStarsOrdered);
starCalendarDButton.addEventListener('click', populateStarsOrderedD);
//starButtonGalaxyD.addEventListener('click', populateStarsGalaxyD);



//this function resets the scene to it's original before the starting intro

function resetEverything(){
  controls.enableRotate = true;
  controls.enableZoom = true;
  controls.enablePan = true;
  controls.autoRotate = false;
  
  const title = document.getElementById("title");
  title.style.visibility = "hidden";
  title.style.marginTop = "100%";
  title.style.textAlign = "none"
  title.style.fontSize = "0";
  title.style.zIndex = -3;
  title.style.margin = 0;

  const startButton = document.getElementById('startButton');
  startButton.style.visibility = "hidden";

  const mainDiv = document.getElementById('main');
  mainDiv.visibility = "visible";
  mainDiv.style.height = "20%";
  mainDiv.style.margin = 0;
  notebookButton.style.visibility = "visible";
  notebookButton.scrollIntoView();
  starButtonGalaxy.style.visibility = "visible";
  settingsButton.style.visibility = "visible";

  for (let i=0; i< 364; i++){
    removeObject3D(monthStarArrayOriginal[i]);
  }
  
  //createMonthStar(monthStarArrayOriginal);
  const fogColor = 0x000000;
  const fogDensity = 0.00;
  scene.fog = new THREE.FogExp2(fogColor,fogDensity); 
}

//this is the starting sequence
function starting(){
  const fogColor = 0x000000;
  const fogDensity = 0.05;
  scene.fog = new THREE.FogExp2(fogColor,fogDensity); 

  /*

    let cloudColors = [
      "0xedb211",
      "0x206ff7",
      "0xc11cfc",
      "0xdb4e16"
    ]
    let colorRand = Math.random(0, cloudColors.length -1);
    let chosenColor = cloudColors[colorRand];
    const materialCloud = new THREE.MeshBasicMaterial( { color: 0x206ff7} );
    materialCloud.transparent = true;
    materialCloud.opacity = 0.3;
    materialCloud.toneMapped = true;
    let radRand = Math.random(10,25);
    let firstRand = Math.random(4,6);
    let secondRand = Math.random(4,6)
    let thirdRand = Math.random(4,6);
    const cloudGeometry = new THREE.SphereGeometry(radRand, 31, 14, firstRand, secondRand, 0, thirdRand );

    const cloud = new THREE.Mesh( cloudGeometry, materialCloud );
    cloud.position.set(1,2,3);
    scene.add(cloud);
  */
  
  const title = document.getElementById("title");
  title.style.visibility = "visible";
  camera.position.set(10, 10, 0);
  notebookButton.style.visibility = "hidden";
  starButtonGalaxy.style.visibility = "hidden";
  settingsButton.style.visibility = "hidden";

  controls.enableRotate = false;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.5;

  
  const startButton = document.getElementById('startButton');
  startButton.addEventListener('click', resetEverything);

  const goals = document.getElementById('goals');
  goals.style.padding = 0;
  goals.style.margin = 0;
  goals.style.height = 0;
  goals.style.width = 0;


  populateStarsGalaxy();
  
}

starting();



//this function runs the scene
function animate() {
  requestAnimationFrame( animate );

  //spaceTexture.rotation.x += 0.01;
  //spaceTexture.rotation +=0.005;
 
  controls.update();

  renderer.render( scene, camera);


}

animate();