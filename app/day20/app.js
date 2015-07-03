'use strict';

(function(){
  var camera, scene, renderer;
  var controls, clock, projector, raycaster;

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
      addObject();
    	// intersects[0].object.material.color.set( 0xff0000 );
    }, false);
  }

  function setupScene(){
    addObject();
    // Cube model
  }

  function addObject(){
    var geometry = new THREE.CubeGeometry(200, 200, 200);

    for (var i = 0; i < 2; i++) {
      var cube = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial( { wireframe: true, wireframeLinewidth: 3 } ));
      cube.position.x = Math.floor(Math.random() * 200 - 100) * 4;
      cube.position.y = Math.floor(Math.random() * 200 - 100) * 4;
      cube.position.z = Math.floor(Math.random() * 200 - 100) * 4;
      scene.add(cube);
    }
  }

})();
