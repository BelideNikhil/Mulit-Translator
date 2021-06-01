console.log("hello")
var input_text=document.querySelector("#textarea");
var translate_btn=document.querySelector("#translator");
var output_catch=document.querySelector("#output");
var chooser=document.querySelector("#choose")
var tester=document.querySelector("#tester")
var keys="";

// ===========================storage========================
var storageURL=[{k:"minion",u:"https://api.funtranslations.com/translate/minion.json"},
{k:"yoda",u:"https://api.funtranslations.com/translate/yoda.json"},
{k:"morse",u:"https://api.funtranslations.com/translate/morse.json"},
{k:"wakandan",u:"https://api.funtranslations.com/translate/wakandan.json"}
]

var serverURL;
// =========================translator chooser=================
chooser.addEventListener('keypress', function (e) {
    
    if (e.key === 'Enter') {
        keys=chooser.value;
        for(var i=0;i<storageURL.length;i++){
            var holder=storageURL[i].k;
            if(keys.toUpperCase()===holder.toUpperCase()){
                tester.innerHTML=holder + " translator enabled"
                console.log("pass")
                serverURL=storageURL[i].u
                console.log( serverURL)
            }  
        }
    }
});
// ======================fina url creator==========================
function createURL(){
   return serverURL +"?"+"text=" +input_text.value
}

function errorHandler(error) {
    console.log("error occured", error);
    alert("something wrong with server! try again after some time")
}
translate_btn.addEventListener("click", ()=>{
    
    translate_btn.innerHTML="Your data is being translated..."
    setTimeout(()=>{
        translate_btn.innerHTML="Translate"},1500);
        fetch(createURL(input_text.value))
       .then(response =>response.json())
       .then(json=>{
           output_catch.innerText = json.contents.translated;
        })
        .catch(errorHandler)
})


