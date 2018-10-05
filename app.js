const result = document.querySelector('#result');
const MrMeeseeks = document.querySelector("#audioPlay");


var textboxAmt = 0;
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
            result.innerHTML = response
                .map(characterData => {
                    return `
                <div id="characterCont">
                  <div><img id="chrImg" src="${characterData.image}"></div>
                  <h1 id="name" >Name: ${characterData.name}</h1>
                  <div>Origin-Name: ${characterData.origin.name}</div>
                  <div>Status:${characterData.status}</div>
                </div>
                `;
                })
                .join('');
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