'use strict';

(function(){

  var geometry, triangle, material, mesh;
  var camera, scene, renderer;

  buildScene();
  animate();

  function buildScene() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 500;

    scene = new THREE.Scene();

    triangle = new THREE.Shape([
      new THREE.Vector2 (0, 300),
      new THREE.Vector2 (300, 300),
      new THREE.Vector2 (300, 0)
    ]);

    geometry = new THREE.ExtrudeGeometry(triangle, {
      bevelEnabled: false,
      amount: 30
    });

    material = new THREE.MeshNormalMaterial({
      color: 0x000000
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


  }

  function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x = Date.now() * 0.00004;
  	mesh.rotation.y = Date.now() * 0.0001;
    renderer.render(scene, camera);
  }

})();
