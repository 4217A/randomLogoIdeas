'use strict';
//2020-12-27 start

//global renderHook
const renderHook = document.getElementById('renderHook');
const afterCanvas = document.getElementById('afterCanvas');

//canvas
const myCanvas = document.getElementById('myCanvas');
const c = myCanvas.getContext('2d');
if (innerHeight > 1.5*innerWidth) {
    myCanvas.width = 4*(innerWidth/6);
    myCanvas.height = 4*(innerWidth/6);
} else {
    myCanvas.width = 4*(innerHeight/6);
    myCanvas.height = 4*(innerHeight/6);    
}
const w = myCanvas.width/4;
const h = myCanvas.height/4;
c.fillStyle = '#f9f9f9';
c.rect(0, 0, myCanvas.width, myCanvas.height);
c.fill();
c.fillStyle = '#333';

//render helper
class RenderHelper {

    render(element, classes, attributeType, attributeVal, content, renderHook) {
        //receives: 
        //element type 
        //classes - one string OR array for multiple OR blank array for none
        //attribute type - one string OR array for multiple OR blank array for none
        //attribute val - one string OR array for multiple OR blank array for none
        //  note attribute type and value index should be paired with each other
        //  [src, alt] [fileloc, alt title]
        //text content - "" for none
        //where to render

        //build
        let myEl = document.createElement(element);
        Array.isArray(classes) ? 
            classes.forEach(c => {
                myEl.classList.add(c);
                }) : //false - no array
                myEl.classList.add(classes);
        Array.isArray(attributeType) ? 
            attributeType.forEach((a, index) => {
                myEl.setAttribute(a, attributeVal[index]);
                }) : //false - no array
                myEl.setAttribute(attributeType, attributeVal);
        myEl.textContent = content;
        renderHook.append(myEl);
        myEl = null;
    }
}

//render canvas
class RandomLogoIdea{

    render(c, shape, num, w, h) {
        //receives:
        //canvas
        //shape - 0 triangle, 1 circle
        //number
        //w and h

        //clear
        c.fillStyle = '#f9f9f9';
        c.rect(0, 0, myCanvas.width, myCanvas.height);
        c.fill();
        //shape color
        c.fillStyle = '#333';     
        //draw
        for (let i=0; i < num; i++) {
            c.beginPath();
            c.moveTo(Math.random()*4*w,Math.random()*4*h);
            c.lineTo(Math.random()*4*w,Math.random()*4*h);
            c.lineTo(Math.random()*4*w,Math.random()*4*h);
            c.closePath();
            c.fill();    
        }
    }
}

//pages
class HomePage {
    
    render() {
        //erase prev html
        renderHook.textContent = '';
        afterCanvas.textContent = '';

        //title
        myRenderHelper.render("h1", [], [], [], "Random Logo Ideas", renderHook);

        //logo idea
        myRandomLogoIdea.render(c, 0, 3, w, h);

        //space
        myRenderHelper.render("br", [], [], [], "", afterCanvas);
        myRenderHelper.render("br", [], [], [], "", afterCanvas);
    
        //button
        myRenderHelper.render("button", [], [], [], "Go", afterCanvas);
        afterCanvas.lastElementChild.addEventListener('click', myHomePage.render);
    }
}

//******* */
//start
//******* */
const myHomePage = new HomePage();
const myRenderHelper = new RenderHelper();
const myRandomLogoIdea = new RandomLogoIdea();
myHomePage.render();