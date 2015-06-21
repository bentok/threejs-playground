'use strict';

(function(){

  var sphere, sphereMaterial, sphereMesh;
  var cone, coneMaterial, coneMesh;
  var camera, scene, renderer;

  setupScene();

  function setupScene() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1 ,5000);
    camera.position.z = 500;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({
      antialias: true
    });

    var spotLight = new THREE.SpotLight( 0xffffff );
    renderer.shadowMapEnabled = true;
    spotLight.position.set( 1000, 1000, 1000 );
    spotLight.castShadow = true;
    spotLight.shadowMapWidth = 1024;
    spotLight.shadowMapHeight = 1024;
    spotLight.shadowCameraNear = 500;
    spotLight.shadowCameraFar = 4000;
    spotLight.shadowCameraFov = 30;
    scene.add(spotLight);

    // Floor
    var plane = new THREE.PlaneGeometry(2000, 2000, 1, 1);
    var mat = new THREE.MeshBasicMaterial({
      color: 0xefefef,
      overdraw: true
    });
    var floor = new THREE.Mesh(plane, mat);
    floor.rotation.x = -90 * Math.PI / 180;
    floor.position.y = -300;
    floor.receiveShadow = true;
    scene.add(floor);

    // Ball
    sphere = new THREE.SphereGeometry(100, 32, 32);
    sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      wireframe: true
    });
    sphereMesh = new THREE.Mesh(sphere, sphereMaterial);
    sphereMesh.position.y = 95;
    sphereMesh.castShadow = true;
    scene.add(sphereMesh, sphereMaterial);

    // Tee
    cone = new THREE.CylinderGeometry(40, 1, 310, 50, 1, true);
    coneMaterial = new THREE.MeshPhongMaterial({
      color: 0xf4a460,
      wireframe: true
    });
    coneMesh = new THREE.Mesh(cone, coneMaterial);
    coneMesh.position.y = -150;
    coneMesh.castShadow = true;
    scene.add(coneMesh, coneMaterial);

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.render(scene, camera);
  }


})();
