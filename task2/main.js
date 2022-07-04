/////////////////////////////////////////////////////////////////////
//////////////////// THREEJS SCENE PREP STARTS //////////////////////
/////////////////////////////////////////////////////////////////////

let camera, controls, scene, renderer;

const init = () => {
    // scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcccccc);

    // camera
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.set(400, 200, 0);

    // lights
    hlight = new THREE.AmbientLight(0x404040, 50)
    scene.add(hlight)

    let directionalLight = new THREE.DirectionalLight (0xffffff, 5)
    directionalLight.position.set(0,10,0)
    directionalLight.castShadow = true;
    scene.add(directionalLight)


    // renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    // loader
    let loader = new THREE.GLTFLoader();
    let obj
    loader.load('./glb/scene.gltf', (gltf) => {
        console.log(gltf);
        obj = gltf.scene.children[0];
        scene.add(gltf.scene);
        animate();
    })





    // Sphere
    const geometry = new THREE.BoxGeometry(50, 32, 32);
    const material = new THREE.MeshBasicMaterial({
        color: 0xffff00
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);



    // controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = true;
    controls.minDistance = 1;
    controls.maxDistance = 30000;
    controls.maxPolarAngle = Math.PI / 2;

    // window resize event
    window.addEventListener('resize', onWindowResize);
}

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    render();
}

const render = () => {
    renderer.render(scene, camera);
}

init();
render();
animate();



/////////////////////////////////////////////////////////////////////
//////////////////// THREEJS SCENE PREP ends ////////////////////////
/////////////////////////////////////////////////////////////////////

