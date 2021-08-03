let chooser=document.querySelector("#choose")
const select=document.querySelector("#select")
let tester=document.querySelector("#tester")

var input_text=document.querySelector("#textarea");
const translate_btn=document.querySelector("#translator");
var output=document.querySelector("#output");
const hidden=document.querySelector("#box2")

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
    let keys=chooser.value;
    if(keys!=''){
        hidden.style.display="grid";
        for(let i=0;i<storageURL.length;i++){
            let holder=storageURL[i].k;
            if(keys.toUpperCase()===holder.toUpperCase()){
                tester.innerHTML=" translator enabled"
                console.log("pass")
                serverURL=storageURL[i].u
                return serverURL
            }
        }
            return tester.innerHTML=" We dont have this translator yet";
    }else{
        return tester.innerHTML="Please select a translator from below";
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
translate_btn.addEventListener("click", ()=>{
    translate_btn.innerHTML="Translate";
        fetch(createURL(input_text.value))
       .then(response =>response.json())
       .then(json=>{
        output.innerText = json.contents.translated;
        })
        .catch(errorHandler)
})


