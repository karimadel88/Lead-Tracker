let myLeads = [];
const inputEl = document.getElementById('input-el');
const btnEl = document.getElementById('btn-el');
const ulEl = document.getElementById('ul-el');
const delEl = document.getElementById('del-el');
const tabBtn = document.getElementById("tab-btn")
const leads = JSON.parse(localStorage.getItem('myLeads'));

const setItem = function(leads){
    localStorage.setItem("myLeads",JSON.stringify(leads));
    renderLeads(leads);
}

let renderLeads =function (leads){
    let listItems = ""
    for(let i=0;i<leads.length;i++){
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems;
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url);
        setItem(myLeads);
    })
})

if(leads){
    myLeads = leads;
    renderLeads(myLeads);
}

btnEl.addEventListener('click',function(){
    saveLead(myLeads);
 
});

delEl.addEventListener('click',function(){
    localStorage.clear();
    myLeads = [];
    renderLeads(myLeads);
})

let saveLead = function (myleads) {
    myLeads.push(inputEl.value);
    removeInput();
    setItem(myLeads);
}

let removeInput = function () {
    inputEl.value = "";
}
