let translate_type=document.querySelector("#translate_type")
const select=document.querySelector("#select")
let chosen_type=document.querySelector("#chosen_type")

var input_text=document.querySelector("#textarea");
const translator=document.querySelector("#translator");
var output=document.querySelector("#output");
const box2=document.querySelector("#box2")

// ===========================storage========================
let storageURL=[
{k:"minion",u:"https://api.funtranslations.com/translate/minion.json"},
{k:"yoda",u:"https://api.funtranslations.com/translate/yoda.json"},
{k:"morse",u:"https://api.funtranslations.com/translate/morse.json"},
{k:"wakandan",u:"https://api.funtranslations.com/translate/wakandan.json"},
{k:"avatar",u:"https://api.funtranslations.com/translate/navi.json"}
]

let serverURL;
// =========================translator chooser=================
select.addEventListener('click', function () {
    let keys=translate_type.value;
    if(keys!=''){
        box2.style.display="grid";
        for(let i=0;i<storageURL.length;i++){
            let holder=storageURL[i].k;
            if(keys.toUpperCase()===holder.toUpperCase()){
                chosen_type.innerHTML=" translator enabled"
                serverURL=storageURL[i].u
                return serverURL
            }
        }   box2.style.display="none";
            return chosen_type.innerHTML=" We dont have this translator yet";
    }else{
        return chosen_type.innerHTML="Please select a translator from below";
    }
});
// ======================fina url creator==========================
function createURL(){
   return serverURL +"?"+"text=" +input_text.value;
}

function errorHandler(error) {
    console.log("error occured", error);
    output.innerHTML="Something is wrong with the server!Please try again later."
}
translator.addEventListener("click", ()=>{
    if(input_text.value.length<1){
        output.innerHTML = 'Please enter some data to translate it';
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


