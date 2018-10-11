const result = document.querySelector('#result');
const MrMeeseeks = document.querySelector("#audioPlay");
const MrMeeseeksOUT = document.querySelector('#audioPlayOUT')
const PortalSound = document.querySelector('#PortalSound')
var textboxAmt = 0;
var books = [ ];

const portal = Bodies.rectangle(750, 0, 0.01, 0.01, { 
    collisionFilter: {
        mask: wall
    },
    id:400,
    isStatic: true,
    render: {
        id:'portal',
        strokeStyle: '#ffffff',
        sprite: {
            texture: './img/portal.png',
            xScale: 0.8,
            yScale: 0.4
        }
    }
 })

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

document.querySelector("#btnComp").addEventListener("click", () => {
    
    MrMeeseeks.play(); //plays introduction
    textboxAmt++;
    document.querySelector("#chatBoxArea").innerHTML +=

        `
    <div style="top:${getRandomInt(61)}%;left:${getRandomInt(61)}%" class="mydiv">
    <!-- Include a header DIV with the same name as the draggable DIV, followed by "header" -->
    <div id="MrM_HEADER"><img id="head" src="./img/MSB-assets/onlineStatus.png" alt="online">Mr Meeseeks</div>
    <div id="textContainer">
        <div class="container">
            <img src="./img/MSB-assets/ProfileMSB.jpg" alt="Avatar">
            <p>I'm Mr Meeseeks look at me!</p>
        </div>
    </div>
    <div id="form">
        <input id="val" type="text" id="myText" value="rick">
        <button id="sendBtn" type="button">Send</button>
    </div>
</div>
    `

    $(".mydiv").draggable(); //draggable div. using jquery libraries

    const textContainer = document.querySelector('#textContainer');
    document.getElementById("sendBtn").addEventListener("click", () => {
        textContainer.innerHTML += youSaid(document.getElementById("val").value);
        var userSaid = decryptUserSTR(document.getElementById("val").value);
        axios
            .get(userSaid)
            .then(response => {
                textContainer.innerHTML += MrMeeseeksSays("Will DoOOoo");
                textContainer.innerHTML += MrMeeseeksSays(`printing out ${response.data.results.length} ${document.getElementById("val").value}s`);
                updateScroll();
                World.add(engine.world, portal)
                htmlTemplateBuilder(response.data.results); 
                setTimeout(function(){ document.querySelector("#chatBoxArea").innerHTML = ""; MrMeeseeksOUT.play(); }, 500);
                PortalSound.play();
                setTimeout(function(){ Matter.Composite.remove(world, portal)}, 1000);
            })
            .catch(error => {
                textContainer.innerHTML += MrMeeseeksSays("uh oh");
                textContainer.innerHTML += MrMeeseeksSays(`
                I only listen to commands: search /name/
                `)
            });

        const htmlTemplateBuilder = response => {
           response
            .map(characterData => {
                return World.add(engine.world, [
                    addSquare(characterData.image, characterData.name, characterData.species, characterData.origin.name, characterData.status),
                ]);
                
            })  
        };
    });

    function updateScroll() {
        var element = document.getElementById("textContainer");
        element.scrollTop = element.scrollHeight;
    }

    function youSaid(value) {
        return `
        <div class="container darker">
        <img src="./img/MSB-assets/userProfilePic.jpg" alt="Avatar" class="right">
        <p>${value}</p>
        </div>
        `
    }

    function MrMeeseeksSays(value) {
        return `
            <div class="container">
                <img src="./img/MSB-assets/ProfileMSB.jpg" alt="Avatar">
                <p>${value}</p>
            </div>
        `
    }
});

  
$("#boxComponent").draggable(); //draggable div. using jquery libraries


function decryptUserSTR(str) {
    var userSTR = str.split(" ");

    //rick
    if (userSTR[0] === "alive" || userSTR[0] === "dead" || userSTR[0] === "uknown") {
        return `https://rickandmortyapi.com/api/character/?name=${userSTR[1]}&status=${userSTR[0]}`
    } else {
        return `https://rickandmortyapi.com/api/character/?name=${userSTR[0]}`
    }
}