const result = document.querySelector('#result');
const MrMeeseeks = document.querySelector("#audioPlay");
var textboxAmt = 0;
var books = [ ];


document.querySelector("#btnComp").addEventListener("click", () => {
    
    MrMeeseeks.play(); //plays introduction
    textboxAmt++;
    document.querySelector("#chatBoxArea").innerHTML +=
        `
    <div class="mydiv">
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
        setInterval(updateScroll,300);
        textContainer.innerHTML += youSaid(document.getElementById("val").value);
        axios
            .get(`https://rickandmortyapi.com/api/character/?name=${document.getElementById("val").value}`)
            .then(response => {
                textContainer.innerHTML += MrMeeseeksSays("Will DoOOoo");
                textContainer.innerHTML += MrMeeseeksSays(`printing out ${response.data.results.length} ${document.getElementById("val").value}s`);
                setInterval(updateScroll,300);
                htmlTemplateBuilder(response.data.results); 
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
                books.push(addSquare(characterData.image, characterData.name));
                return World.add(engine.world, addSquare(characterData.image, characterData.name));
            })  
        };
        setInterval(updateScroll,300); //this auto scrolls textbox to bottom
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
    $("canvas").on("mousedown", function(e){
        mouseX1 = e.pageX;
        mouseY1 = e.pageY;
    });

    $("canvas").click(function(e){
        var parentOffset = $(this).parent().offset(); 
        //or $(this).offset(); if you really just want the current element's offset
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;
        console.log(relX);
        console.log(relY);
     });

    console.log(Matter.Query.point(books, {x:13, y:13}));
    $("canvas").on("mouseup", function(e){
        mouseX2 = e.pageX;
        mouseY2 = e.pageY;
        if((mouseX1 == mouseX2) && (mouseY1 == mouseY2)){
            console.log(books);
            console.log(mouseX2)
            console.log(mouseY2)
            console.log(Matter.Query.point(books,{x:mouseX2, y:mouseY2}));
            if (Matter.Query.point(books,{x:mouseX2, y:mouseY2}).length > 0) {
                var bodyToClick = Matter.Query.point(books,{x:mouseX2, y:mouseY2})[0];
                alert(bodyToClick.title2);
        }
    }
    })