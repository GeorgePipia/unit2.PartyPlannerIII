//I/m gonna need some reference to API - EVENTS_URL /cohor info / events
const EVENTS_URI = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-ACC-PT-WEB-PT-A/events"

const state = {
    events: [],  //when we get parties we need to update state
};

const partiesList = document.querySelector('#display-parties'); 




// get events
 const getParties = async () => {
    try{
        const response = await fetch(EVENTS_URI);
        const json = await response.json();
        const parties = json.data;

        if(json.error){
            throw new Error(json.error);
         }
        state.events = parties;
    }catch(error){
        console.error(error)
    }
    
 };



 /* const  = async() => {
    const parties = await getParties();
 console.log(parties);
 } 
 */ 


 // post EVENt
// init();
 //name,date, time, location, description
 const createParty = async (name, description, date, location ) => {
    try{
        date = "2024-02-02T03:26:00.000Z";
        const response = await fetch(EVENTS_URI, { //we need AWAIT keyword before the fetch 
            method:"POST", //we are posting the FODM data
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify ({name, description, date, location })
        
         });
         const json = await response.json(); //this is how you grab json
         //what happens if the post fails?  -cathc. so we have to put this in try catch

         if(json.error){
            throw new Error(json.error);
         }
    }catch(error) {
        console.error(error)
    }

 };






//delete events 

const deleteParty = async (id) =>  {     //(we gonna delete by Id)  
    try{
        const response = await fetch(EVENTS_URI+"/"+id, {method: "DELETE"});
        const json = response.json();
        const parties = json.data;
        if(json.error){
            throw new Error(json.error);
         }
        state.events = parties;
        init();
    }catch(error){
        console.error(error)
    }
};

function renderEvents() {
    console.log("inside renderEvents");
    console.log(state);
    if(!state.events || !state.events.length) {
        partiesElement = document.createElement('div')
       partiesElement.innerHTML = `<li> No Events found </li>`;

        return;
    }

    const partyItems = state.events.map((party) => {
        console.log(party);
        const partyItem = document.createElement("li");
        partyItem.classList.add("party");
        partyItem.innerHTML = 
        `
        <h2>${party.name}</h2>
        <p>${party.descritption}<p>
        <p>${party.date}</p>
        <p>${party.location}</p>
        <p>${party.id}</p>
        `;

        const deletButton = document.createElement("button");
        deletButton.textContent = "Delete Party";
        partyItem.append(deletButton);

        deletButton.addEventListener("click", () => deleteParty(party.id));
        return partyItem;
    } );

    partiesList.replaceChildren(...partyItems);
};

const init = async() => {
    await getParties(); 

    renderEvents();
 }

 init();



