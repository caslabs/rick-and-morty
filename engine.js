var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create engine
var engine = Engine.create(),
    world = engine.world;

// create renderer
var render = Render.create({
    element: document.getElementById('result'),
    engine: engine,
    options: {
        height: 900,
        width: 1500,
        wireframes: false,
        background: '#ffffff',
    }
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

/*
        - image
    - name
    - species
    - origin name
    - status
    */
var characters = 0x0001; //collidinfg
var wall = 0x0002;

var addSquare = function (img, name, species, oN, status) {
    return Bodies.rectangle(750, 0, 110, 110, {
        collisionFilter: {
            category: characters
        },
        render: {
            id: 'characters',
            strokeStyle: '#ffffff',
            sprite: {
                texture: img,
                xScale: 0.4,
                yScale: 0.4
            },
        },
        image: img,
        name: name,
        species: species,
        oN: oN,
        status: status
    });
};


World.add(world, [
    // walls
    Bodies.rectangle(400, 810, 2500, 50, {
        isStatic: true
    })
]);

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        }

    );

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// fit the render viewport to the scene

// context for MatterTools.Demo


var DNAbox;
const canvasElement = document.querySelector('canvas');
canvasElement.onmousedown = function (event) {
    if (document.querySelector('#DNAbox') === null) {
        document.querySelector('#cont').innerHTML += `<div id="DNAbox"></div>`
        DNAbox  = document.querySelector('#DNAbox');
     }  else {

    let mouse = Matter.Vector.create(event.offsetX, event.offsetY);
    console.log(mouse);
    let bodies = Matter.Composite.allBodies(engine.world);
    console.log(bodies);
    let picked = Matter.Query.point(bodies, mouse);
    DNAbox.innerHTML = `
        <div class="example-three">
            <img style="width:100px; height:100px" src="${picked[0].image}">
            <img style="width:110px; height:110px" src="${picked[0].image}">
        </div>
        <div id="infoCont">
        <p class="glitch" data-text="name : ${picked[0].name}">name : ${picked[0].name}</p>
        <p class="glitch" data-text="specie : ${picked[0].species}">specie : ${picked[0].species}</p>
        <p class="glitch" data-text="origin :${picked[0].oN}">origin : ${picked[0].oN}</p>
        <p class="glitch" data-text="status :${picked[0].status}">status : ${picked[0].status}</p>
        </div>
        `

}
}