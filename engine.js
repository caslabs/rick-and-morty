var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
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
            wireframes: false
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    var addSquare = function (img, name) {
        return Bodies.rectangle(15, 15, 64, 64, {
            render: {
                id:'characters',
                strokeStyle: '#ffffff',
                sprite: {
                    texture: img,
                    xScale: 0.2,
                    yScale: 0.2
                },
            },
            title2 : name
        });
       };
    

    World.add(world, [
        // walls
        Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
        Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
        Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
        Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
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

    var book1 = addSquare('oofy', 'oofybane');
    var book2 = addSquare('oofy', 'oofybane1');
    var book3 = addSquare('oofy', 'oofybane2');