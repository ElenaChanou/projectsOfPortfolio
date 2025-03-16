import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement )

//Sun
const geometryOfSun = new THREE.SphereGeometry( 50, 32, 16);
const materialOfSun = new THREE.MeshBasicMaterial( { color: "orange" } );
const sun = new THREE.Mesh( geometryOfSun, materialOfSun );
scene.add( sun )

//Earth
const geometryOfEarth = new THREE.SphereGeometry( 20, 32, 16);
const materialOfEarth = new THREE.MeshBasicMaterial( { color: "blue" } );
const earth = new THREE.Mesh( geometryOfEarth, materialOfEarth );
earth.position.x = 250;
scene.add( earth );

//Mars
const geometryOfMars = new THREE.SphereGeometry( 10, 32, 16);
const materialOfMars = new THREE.MeshBasicMaterial( { color: "red" } );
const mars = new THREE.Mesh( geometryOfMars, materialOfMars);
mars.position.x = 150;
scene.add ( mars );

camera.position.z = 400;


function animate() {
  requestAnimationFrame( animate );

  sun.rotation.x += 0.01;
  sun.rotation.y += 0.01;

  earth.rotation.x += 0.01;
  earth.rotation.y += 0.01;

  mars.rotation.x += 0.01;
  mars.rotation.y += 0.01;

  earth.position.x = 150 * Math.cos(Date.now() * 0.001) //upologizei thn orizontia kinhsh ths ghs 
  earth.position.z = 150 * Math.sin(Date.now() * 0.001) //kai upologizei to sin thn katheth

  mars.position.x = 250 * Math.cos(Date.now() * 0.0005)
  mars.position.z = 250 * Math.cos(Date.now() * 0.0005)


  renderer.render( scene, camera );
}


animate();