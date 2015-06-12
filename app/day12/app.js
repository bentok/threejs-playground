'use strict';

(function(){

  var camera, scene, renderer;
  var controls, clock;

  setup();

  function setup(){
    setupCanvas();
    setupScene();

    requestAnimationFrame(function animate(){
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
      controls.update(clock.getDelta());
    });
  }

  function setupCanvas(){
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.y = 10;
    camera.position.z = 800;

    clock = new THREE.Clock();
    controls = new KeyboardControls(camera);
    controls.movementSpeed = 100;
    controls.lookSpeed = 0.1;
    scene = new THREE.Scene();

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
    spotLight.position.set( 500, 1000, 1000 );
    spotLight.castShadow = true;
    spotLight.shadowMapWidth = 3000;
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

    // Ball model
    var geometry = new THREE.CubeGeometry(100, 100, 100);
    var material = new THREE.MeshPhongMaterial({
      overdraw: true,
      color: 0xccffcc
    });

    for (var i = 0; i < 5; i++) {
      var ball = new THREE.Mesh(geometry.clone(), material);
      ball.position.x = (i * 300) - 550;
      ball.castShadow = true;
      scene.add(ball);
    }
  }

})();
