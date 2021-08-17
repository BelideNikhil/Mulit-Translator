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
{k:"mando'a",u:"https://api.funtranslations.com/translate/mandalorian.json"},
{k:"avatar",u:"https://api.funtranslations.com/translate/navi.json"}
]

let serverURL;
// =========================translator chooser=================
select.addEventListener("click", function () {
    output.innerHTML=''
    let keys=translate_type.value;
    box2.style.display="none";
    if(keys!=''){
        for(let i=0;i<storageURL.length;i++){
            console.log(storageURL[i])
            let holder=storageURL[i].k;
            if(keys.toUpperCase()===holder.toUpperCase()){
                chosen_type.innerHTML=`${keys} translator enabled.`
                output.innerHTML=''
                serverURL=storageURL[i].u
                box2.style.display="grid";
                return serverURL
            }
            chosen_type.innerHTML="We do not have this translator yet.";
        }   
    }else{
        return chosen_type.innerHTML="Please select a translator from below.";
    }
});
// ======================fina url creator==========================
function createURL(input){
   return serverURL +"?"+"text=" +input;
}

function errorHandler(error) {
    input_text.value=''
    console.log("error occured", error);
    output.innerHTML=`Something is wrong with the server ! Please try again later.`
}
translator.addEventListener("click", ()=>{
    if(input_text.value.length<1){
        output.innerHTML = "Please enter some data to translate it.";
        setTimeout(()=>{
            output.innerHTML = '';
        },2000)
    }
    else{
        translator.value="Translating..."
        setTimeout(()=>{
            translator.value = "Translate";
        },1500)
        fetch(createURL(input_text.value))
        .then(response =>response.json())
        .then(json=>{
        output.innerText = json.contents.translated;
        })
        .catch(errorHandler)
    }
})



