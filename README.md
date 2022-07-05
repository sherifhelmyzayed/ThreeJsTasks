########################################################################
########################################################################
########################################################################

## General info 
    This project consist of 2 tasks for testing threeJs 

## Technologies
    Technologies used are HTML, CSS, VanillaJS,
    gsap, and lastly threeJS

## setup
    to run each task, clone this project and run each html file 
    seperately

##### Task 1 #####
## Description
    This task is to enable the user to add glb file and match JPG/PNG
    pictures. each picture should have its own camera attributes.

    This task was done using Orbit controls and perspective camera.
## 
    POV pair contain unique mediaID, and pov attributes

    Upon page load. an object created from a class which contains of 
    1 private variable and 3 methods. private variable only accessed 
    from each one of 3 methods.  

    setpair method is for creating a new POV if mediaID is not in the 
    parent object or modifying existing POV if mediaID exists.

    getPair method for getting POV for certain mediaID

    getMedia method for getting the nearest pov, upon using this method,
    calculations for the distance between the existing camera location, 
    and all pov pairs and it returns the closest mediaID.

    upon clicking on the Hemberger icon, media container appears as well
    as trigger buttons.

    user can upload using click button or drag and drop more than 1 image.
    new promise is triggered for each image to achieve multiple image 
    upload at once. Upon uploading and image, a unique mediaID is created,
    and saved in the parent object. thumbnail images created by using
    local url's only. Uploading to the server feature can be added further on.
    upon clicking on each new image of the uploaded images. a tracing image
    appears on top of the model and navigation works smoothly.

    User have 2 options for each image: 
        1: set new POV pair if an image is selected
        2: view POV if there are data stored under this image

    using gsap to only animate camera position as the target is only fixed
    on point (0,0,0) because of the orbitControl. Although camera rotation
    is stored with position in each pov pairs

##### Task 2 #####
## Description

    This task is to enable the user choose between 2 modes of controlling
    minimum and maximum camera distance from the center.

    This task was done using Orbit controls and perspective camera.

##
    Case 1:
        Upon loading a model, a custom bounding box is created using existing
        model dimensions. This box is created to calculate distance from camera
        using raytracing. 

        bounding box can be cylinder and capsule and Box, and user can choose
        which one suits best the model. creation of each element can be automated
        but I dont believe this was the scope of this task. 

        The concept of this procedure is:
        Distance from point (0,0,0) to the bounding box towards the camera =
        distance from camera to point (0,0,0) - distance from camera to bounding box

        This dimension is updated every frame to calculate the minimum distance, and
        by adding offset, maximum distance is calculated.

        offset is entered through a slider by the user.

    Case 2: 
        user can select minimum and maximum distances for the orbit controls through
        2 sliders on top left of the page.

    to toggle between case one and case two, user should toggle checkbox.
    In order to achieve animated camera movement, setting any value is done over 
    10 values for each frame to achieve smooth transition. 
    (ie: speed slider can be added in the future)

    Each implementation is parametric, and previous values are stored in separate 
    variables, so by toggling on and off case checkbox, you can notice the difference

########################################################################
########################################################################
########################################################################

