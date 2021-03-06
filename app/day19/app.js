'use strict';
/* global KeyboardControls */
(function(){
  var camera, scene, renderer;
  var controls, clock, projector;

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

    // Set up user click events
    projector = new THREE.Projector();
    renderer.domElement.addEventListener('mousedown', function(event){
      var vector = new THREE.Vector3(
        renderer.devicePixelRatio * (event.pageX - this.offsetLeft) / this.width * 2 - 1,
        -renderer.devicePixelRatio * (event.pageY - this.offsetTop) / this.height * 2 + 1,
        0
      );
      projector.unprojectVector(vector, camera);

      var raycaster = new THREE.Raycaster(
        camera.position,
        vector.sub(camera.position).normalize()
      );
      var intersects = raycaster.intersectObjects(scene.children);
      scene.remove(intersects[0].object);
    	// intersects[0].object.material.color.set( 0xff0000 );
    }, false);
  }

  function setupScene(){
    var light = new THREE.DirectionalLight(0xffffff, 1);
		light.position.set(1, 1, 1).normalize();
		scene.add(light);

    // Cube model
    var geometry = new THREE.IcosahedronGeometry(200, 2);

    for (var i = 0; i < 20; i++) {
      var cube = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial( { color:  0xff0000, wireframe: true, wireframeLinewidth: 3 } ));
      cube.position.x = Math.floor(Math.random() * 200 - 100) * 4;
      cube.position.y = Math.floor(Math.random() * 200 - 100) * 4;
      cube.position.z = Math.floor(Math.random() * 200 - 100) * 4;
      scene.add(cube);
    }
  }

})();
