/////////////////////////////////////////////////////////////////////
//////////////////// THREEJS SCENE PREP STARTS //////////////////////
/////////////////////////////////////////////////////////////////////

let camera, controls, scene, renderer, boundingObject, raycaster, obj;
let newMax, newMin, newOffset, newDistance;

// case 1 variables

let newMin1, newMax1, newOffset1 = 300, case1Condition = false;

let clickMouse = new THREE.Vector2();  // create once

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

    const directionalLight = new THREE.DirectionalLight(0xffffff, 5)
    directionalLight.position.set(0, 10, 0)
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
    const loader = new THREE.GLTFLoader();
    loader.load('./glb/scene.gltf', (gltf) => {

        // updates actual dimensions after object scaling 
        gltf.scene.updateMatrixWorld(true)

        // traverse to get object dimensions
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                const box = new THREE.Box3().setFromObject(child);
                const boxSize = box.getSize(new THREE.Vector3());

                // creating boundingObject
                const geometry = new THREE.BoxGeometry(boxSize.x, boxSize.y, boxSize.z);
                const material = new THREE.MeshBasicMaterial({
                    wireframe: true,
                    color: 0xffff00,
                });
                // material.transparent = true
                boundingObject = new THREE.Mesh(geometry, material);
                scene.add(boundingObject);
            }
        })
        const obj = gltf.scene.children[0];
        obj.position.set(22, 0, 0)
        scene.add(gltf.scene);
        animate();
    })


    // controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = true;
    controls.minDistance = 50;
    controls.maxDistance = 500;
    controls.maxPolarAngle = Math.PI / 2;

    newMax = 500
    newMin = 50

    // window resize event
    window.addEventListener('resize', onWindowResize);

    // raycaster
    raycaster = new THREE.Raycaster()
}

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

const animate = () => {
    requestAnimationFrame(animate);
    (case1Condition)
        ? extendedMinMax()
        : boundingMinMax()
    controls.update();
    render();
}

const render = () => {
    renderer.render(scene, camera);
}




// raycaster
const boundingMinMax = () => {
    raycaster.setFromCamera({ x: 0, y: 0 }, camera);
    newMin1 = camera.position.distanceTo(controls.target) - raycaster.intersectObjects(scene.children)[0].distance + 50;
    newMax1 = newOffset1 + newMin1;
    const minMaxArr = [newMin1, newMax1];
    (controls.maxDistance > minMaxArr[1])
        ? controls.maxDistance -= 10
        : controls.maxDistance < minMaxArr[1]
            ? controls.maxDistance = parseInt(minMaxArr[1])
            : '';

    (controls.minDistance < minMaxArr[0])
        ? controls.minDistance += 10
        : controls.minDistance > minMaxArr[0]
            ? controls.minDistance = parseInt(minMaxArr[0])
            : '';
}

const extendedMinMax = () => {
    console.log("Extended Min Max working");

    (controls.maxDistance > newMax)
        ? controls.maxDistance -= 10
        : controls.maxDistance < newMax
            ? controls.maxDistance = parseInt(newMax)
            : '';


    (controls.minDistance < newMin)
        ? controls.minDistance += 10
        : controls.minDistance > newMin
            ? controls.minDistance = parseInt(newMin)
            : '';
}

init();
render();



/////////////////////////////////////////////////////////////////////
//////////////////// THREEJS SCENE PREP ends ////////////////////////
/////////////////////////////////////////////////////////////////////











/////////////////////////////////////////////////////////////////////
//////////////////// SLIDER CONTROLLER START ////////////////////////
/////////////////////////////////////////////////////////////////////


const maxDistanceChange = () => {
    document.getElementById('maxDistanceLabel').innerText = `maximum distance: ${event.target.value}`;
    newMax = event.target.value

}

const minDistanceChange = () => {
    document.getElementById('minDistanceLabel').innerText = `minimum distance: ${event.target.value}`;
    newMin = event.target.value
    // 
    //
}

const offsetChange = () => {
    document.getElementById('offsetLabel').innerText = `offset: ${event.target.value}`;
    newOffset1 = parseInt(event.target.value)
}


const changeCondition = () => {
    case1Condition = event.target.checked
    if (case1Condition) {
        document.getElementById('offset').setAttribute('disabled', '')
        document.getElementById('maxDistance').removeAttribute('disabled')
        document.getElementById('minDistance').removeAttribute('disabled')
    } else {
        document.getElementById('offset').removeAttribute('disabled')
        document.getElementById('maxDistance').setAttribute('disabled', '')
        document.getElementById('minDistance').setAttribute('disabled', '')
    }
}


/////////////////////////////////////////////////////////////////////
//////////////////// SLIDER CONTROLLER ENDS  ////////////////////////
/////////////////////////////////////////////////////////////////////


var convexHull = new THREE.ConvexHull();
console.log(convexHull);