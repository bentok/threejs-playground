'use strict';

(function(){

  var camera, scene, renderer;

  setup();

  function setup(){
    setupCanvas();
    setupScene();

    requestAnimationFrame(function animate(){
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    });
  }

  function setupCanvas(){
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.rotation.x = -35 * Math.PI / 180;
    camera.position.y = 500;
    camera.position.z = 800;

    renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  }

  function setupScene(){

    // Light
    var spotLight = new THREE.SpotLight( 0xffffff );

    renderer.shadowMapEnabled = true;
    spotLight.position.set( 0, 1000, 2000 );
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
    floor.position.y = -100;
    floor.receiveShadow = true;
    scene.add(floor);

    // Text
    var geometry = new THREE.TextGeometry('DOM', {
      antialias: true,
      size: 200,
      height: 20,
      font: 'helvetiker',
      weight: 'normal',
      style: 'normal',
      bevelEnabled: false
    });
    var material = new THREE.MeshPhongMaterial({
      overdraw: true,
      color: 0xdfdfdf
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = -300;
    mesh.position.z = 400;
    mesh.castShadow = true;
    scene.add(mesh);

  }

})();
