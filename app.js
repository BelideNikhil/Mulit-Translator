let translate_type=document.querySelector("#translate_type")
const select=document.querySelector("#select")
let chosen_type=document.querySelector("#chosen_type")

let input_text=document.querySelector("#textarea");
const translator=document.querySelector("#translator");
let output=document.querySelector("#output");
const box2=document.querySelector("#box2")

// ===========================storage========================
let storageURL=[
{k:"yoda",u:"https://api.funtranslations.com/translate/yoda.json"},
{k:"morse",u:"https://api.funtranslations.com/translate/morse.json"},
{k:"mandalorian",u:"https://api.funtranslations.com/translate/mandalorian.json"},
{k:"avatar",u:"https://api.funtranslations.com/translate/navi.json"}
]

let serverURL;
// =========================translator chooser=================
select.addEventListener('click', function () {
    let keys=translate_type.value;
    if(keys!=''){
        for(let i=0;i<storageURL.length;i++){
            let holder=storageURL[i].k;
            if(keys.toUpperCase()===holder.toUpperCase()){
                chosen_type.innerHTML=" translator enabled"
                serverURL=storageURL[i].u
                box2.style.display="grid";
                return serverURL
            }
            box2.style.display="none";
            output.innerHTML=''
            input_text.value=''
            chosen_type.innerHTML="We dont have this translator yet.";
        }   
    }else{
        return chosen_type.innerHTML="Please select a translator from below.";
    }
});
// ======================fina url creator==========================
function createURL(input){
    console.log(serverURL +"?"+"text=" +input)
   return serverURL +"?"+"text=" +input;
}

function errorHandler(error) {
    console.log("error occured", error);
    output.innerHTML=`Something is wrong with the server!Please try again later.`
}
translator.addEventListener("click", ()=>{
    if(input_text.value.length<1){
        output.innerHTML = "Please enter some data to translate it";
        setTimeout(()=>{
            output.innerHTML = '';
        },2000)
    }
    else{
        fetch(createURL(input_text.value))
        .then(response =>response.json())
        .then(json=>{
        output.innerText = json.contents.translated;
        })
        .catch(errorHandler)
    }
})


