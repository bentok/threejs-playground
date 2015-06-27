'use strict';

(function(){

  var camera, scene, renderer, spotLight;
  var geometry, geometry2, material, material2, mesh, mesh2, geometry3, material3, mesh3;
  var radiusSegments, heightSegments, openEnded;

  init();
  animate();

  function init() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 500;

    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();

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

    THREE.ImageUtils.loadTexture('label.jpg', undefined, function(texture){
      geometry = new THREE.CylinderGeometry(100, 100, 300, radiusSegments = 100, heightSegments = 1, openEnded = false);
      material = new THREE.MeshBasicMaterial({
        map: texture,
        overdraw: true
      });

      mesh = new THREE.Mesh (geometry, material);
      mesh.position.y = -100;
      scene.add(mesh);
    });

    geometry2 = new THREE.CylinderGeometry(30, 99, 200, radiusSegments = 100, heightSegments = 1, openEnded = false);
    material2 = new THREE.MeshPhongMaterial({
      color: 0x555c4f,
      wireframe: false,
      wireframeLinewidth: 0
    });
    mesh2 = new THREE.Mesh(geometry2, material2);
    mesh2.position.y = 150;
    scene.add(mesh2);

    geometry3 = new THREE.TorusGeometry(35, 10, 20, 20);
    material3 = new THREE.MeshPhongMaterial({
      color: 0x555c4f,
      wireframe: false,
      wireframeLinewidth: 0
    });
    mesh3 = new THREE.Mesh(geometry3, material3);
    mesh3.position.y = 260;
    mesh3.rotation.x = 90;
    scene.add(mesh3);

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
  }

  function animate(){
    requestAnimationFrame(animate);

    mesh.rotation.y = Date.now() * -0.001;

    renderer.render(scene, camera);
  }

})();
