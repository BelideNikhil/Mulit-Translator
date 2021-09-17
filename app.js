const convertThis=document.querySelector("#convertThis");
let userInput=document.querySelector("#userInput");
let output=document.querySelector("#output");

let contentBox=document.querySelector(".container")
contentBox.style.display="none"
let serverURL;

let storageURL={
    yoda:"https://api.funtranslations.com/translate/yoda.json",
    morse:"https://api.funtranslations.com/translate/morse.json",
    "MANDO'A":"https://api.funtranslations.com/translate/mandalorian.json",
    avatar:"https://api.funtranslations.com/translate/navi.json"
}

let translators=document.querySelector("#translators")
translators.addEventListener("change",(e)=>{
    let chosenTranslator=e.target.value;
    output.innerHTML=''
    for(let eachKey in storageURL){
        if(chosenTranslator.toUpperCase()===eachKey.toUpperCase()){
            serverURL=storageURL[eachKey];
            contentBox.style.display="flex"
        }
    }
})


function createURL(input){
   return serverURL +"?"+"text=" +input;
}

function errorHandler(error) {
    console.log("error occured", error);
    output.innerHTML=`Something is wrong with the server ! Please try again later.`
}


convertThis.addEventListener("click", ()=>{
    if(userInput.value.length<1){
        output.innerHTML = "Please enter some data to translate it.";
        setTimeout(()=>{
            output.innerHTML = '';
        },2000)
    }
    else{
        fetch(createURL(userInput.value))
        .then(response =>response.json())
        .then(json=>output.innerText = json.contents.translated)
        .catch(errorHandler)
    }
})
