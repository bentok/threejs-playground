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
    camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000);
    camera.position.y = 10;
    camera.position.z = 800;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

  }

  function setupScene(){

    // Cube model
    var geometry = new THREE.TextGeometry('*', {
      antialias: true,
      size: 20,
      height: 5,
      font: 'helvetiker',
      weight: 'normal',
      style: 'normal',
      bevelEnabled: false
    });
    var iteration = 1;
    setInterval(function(){

      var colors = [0x9043ca, 0xef6176, 0xf56d44, 0xf6d751, 0x35a8c0, 0x99c953, 0x5684e3];
      var thisColor = Math.floor((Math.random() * 6) + 1);

      var particle = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial( { color:  colors[thisColor], wireframe: true, wireframeLinewidth: 3 } ));
      particle.position.x = Math.floor(Math.random() * 200 - 100) * 4;
      particle.position.y = Math.floor(Math.random() * 200 - 100) * 4;
      particle.position.z = Math.floor(Math.random() * 200 - 100) * 4;
      particle.name = 'thing' + iteration;
      scene.add(particle);
      iteration++;
    }, 10);

    setTimeout(function(){
      setInterval(function(){
        for (var i = 0; i < scene.children.length; i++) {
          if (scene.children[i].name === 'thing' + (iteration - 500)) {
            scene.remove(scene.children[i]);
            console.log('removed');
          }
        }
      }, 20);
    }, 2000);


  }


})();
