'use strict';

(function(){

  var sphere, sphereMaterial, sphereGeometry;
  var cube, cubeMaterial, cubeGeometry;
  var camera, scene, renderer;

  setupScene();

  function setupScene() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1 ,1000);
    camera.position.z = 500;

    scene = new THREE.Scene();

    sphereGeometry = new THREE.SphereGeometry(50, 32, 32);
    sphereMaterial = new THREE.MeshNormalMaterial({
      color: 0x33cccc
    });
    // sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );

    for (var i = 0; i < 85; i++) {
      sphere = new THREE.Mesh(sphereGeometry.clone(), sphereMaterial);
      sphere.position.x = Math.floor(Math.random() * 200 - 100) * 4;
      sphere.position.z = Math.floor(Math.random() * 200 - 100) * 4;
      sphere.position.y = Math.floor(Math.random() * 200 - 100) * 4;
      scene.add(sphere);
    }

    cubeGeometry = new THREE.CubeGeometry(100, 100, 100);
    cubeMaterial = new THREE.MeshLambertMaterial({
      color: 0xcccccc,
      transparency: true,
      opacity: 0.5
    });

    for (var j = 0; j < 50; j++) {
      cube = new THREE.Mesh(cubeGeometry.clone(), cubeMaterial);
      cube.position.x = Math.floor(Math.random() * 200 - 100) * 4;
      cube.position.z = Math.floor(Math.random() * 200 - 100) * 4;
      cube.position.y = Math.floor(Math.random() * 200 - 100) * 4;
      scene.add(cube);
    }


    renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.render(scene, camera);
  }


})();
