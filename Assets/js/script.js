//get current date-time, put date in header, use time for formatting time-block elements
//create page elements - block per time-period (7AM-7PM)
    //each time-block needs to have a label for time
    //" a field for user to add a note
    //" a button to save that note to local storage
    // each element is formatted nicely for AM and PM
        //an additional class for if time is passed


//create main element
//in main, add 1 section per hour from 7AM to 7PM, ID = hour, class = AM/PM
//in each section add text area and save-button
//each button an onClick that appends child to section with note and an "edit" button
//add formatting class if < current time


//==========================================initialize page START==========================================//

    //demonstration object for loading saved events, replace this with "load from local storage"
    var savedEvents = [
        {
            time: 7,
            events: ['Eat a sandwich', 'brush teeth', 'comb hair']
        },
        {
            time: 17,
            events: ['Pet the Cat', 'Wash Hands', 'Touch Eyes']
        }
    ];

    //array defines what times are used in this app
    var dayTimes = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

    //main area
    var scheduleArea = document.createElement("main");    
    scheduleArea.id = "schedule-area";
    scheduleArea.className = "schedule-area";
    document.body.appendChild(scheduleArea);

    //each time section
    dayTimes.forEach(function(time) {

        //main time area
        var timeEl = document.createElement("section");
        scheduleArea.appendChild(timeEl);
        timeEl.className = "card bg-light mb-3";
        timeEl.id = "hour-" + time;

        //time header
        var timeHead = document.createElement("header");
        timeHead.id = "time-head-" + time;
        timeHead.className = "card-header";
        timeEl.appendChild(timeHead);
        if (time > 12)
            timeHead.innerHTML = (time - 12) + " PM";
        else {
            timeHead.innerHTML = time + " AM";
        }
        
        //blank list for new/loaded entries
        var timeList = document.createElement("ul");
        timeList.id = "time-list-" + time;
        timeList.className = "list-group";
        timeEl.appendChild(timeList);

        //input text area
        var userText = document.createElement("textarea")
        timeEl.appendChild(userText);
        userText.className = "form-control text-area";
        userText.id = "text-area-" + time;

        //save button
        var timeButton = document.createElement("button");
        timeEl.appendChild(timeButton);
        timeButton.innerText = "New Event";
        timeButton.id = "button-" + time;
        timeButton.className = "time-button btn btn-secondary btn-sm";
        timeButton.addEventListener("click", saveNote);
        
    });

    //loads saved events, stored in savedEvents array
    loadSavedevents();

    function loadSavedevents() {
        //any saved notes, load them by crawling through array of stored info. Dynamic.
        savedEvents.forEach(function(note){

            //grab DOM element for specific time's list
            var timeList = document.getElementById("time-list-" + note.time);
            
            //loop through each event for specific time block
            for (let i = 0; i < note.events.length; i++) {
                var savedNoteEl = document.createElement("li");
                savedNoteEl.innerText = note.events[i];
                savedNoteEl.className = "list-group-item";
                timeList.appendChild(savedNoteEl);            
            }        
        })
    };
    
//==========================================initialize page END==========================================//


//todos
    // make text-area go to 0 height when inactive, instead of "hidden". 200px when active.
    // might need to figure out how to increase area of entire time-block as notes are added.
function saveNote() {
    //get elements based on clicked button's ID
    elId = parseInt(this.id.substr(7,10));
    timeEl = document.getElementById("hour-" +  elId);
    userText = document.getElementById("text-area-" + elId);    
    timeList = document.getElementById("time-list-" + elId);
    timeButton = document.getElementById(this.id);    
    timeButton.className = "time-button btn btn-primary btn-sm";

    //reveal new note 
    timeButton.innerText = "Save New Note..."
    userText.style.visibility = "visible";

    //get rid of saveNote event listener
    timeButton.removeEventListener("click", saveNote);

    //save note
    timeButton.addEventListener("click", function(){
        elId = parseInt(this.id.substr(7,10));
        timeEl = document.getElementById("hour-" +  elId);
        userText = document.getElementById("text-area-" + elId); 
        timeList = document.getElementById("time-list-" + elId);
        timeButton = document.getElementById(this.id); 
        if (userText.value != '') {
            var savedNoteEl = document.createElement("li");
            savedNoteEl.innerText = userText.value;
            savedNoteEl.className = "list-group-item";
            timeList.appendChild(savedNoteEl);
        }


        //save notes to local

        saveEventsLocal();

        //revert
        userText.value = '';
        userText.style.visibility = "hidden";
        timeButton.innerText = "New Event";
        timeButton.addEventListener("click", saveNote);        
        timeButton.className = "time-button btn btn-secondary btn-sm";
    });
};


function saveEventsLocal() {
    //any saved notes, load them by crawling through array of stored info. Dynamic.
    var newSavedNotes = [];
    var j = 0;

    dayTimes.forEach(function(time) {        
        var timeList = document.getElementById("time-list-" + time);
        var newObj = {
            time: 0,
            events: []
        };
        newObj.time = time;        
        for (let i = 0; i < timeList.childNodes.length; i++) {
            newObj.events.push(timeList.childNodes[i].innerText);
        }
        newSavedNotes.push(newObj);
        j++;
    })    
    console.log(newSavedNotes)
};

//editnote function
// when a new note is created it needs to append an "edit" button. 
    //edit  button, ideally, is hidden. Should have a "hover-over"
        //as an aside, the "new note" button should be a hover-over as well
//the edit button creates a new textarea element within the note element
    //text area same properties and size as the standard
//the textarea is filled wtih the p-tag text
//the p-tag text is cleared
//the edit button is converted to save button
//save button saves the text in textarea into p-tag
//text-area is killed
//button reverted

//save notes to local storage
//everytime user clicks Save, local storage is created with every note
// should be an array of objects (to JSON)

//load notes from local storage
    //if localstorage = null, do nothing
//parse into array of objects, one per time-block. Notes are stored as an array within object.
//an array of arrays. 
//each p-tag (stored note) needs to have the hover-over/button/etc added to it. Might re-use the "save note" functionality...

//formatting
//past-times need to be grey-ed out. current time-block needs to be highlighted. Future time needs to be "open looking"
    //Get today's date == need to look at 3rd party APIs for that.
    //today's date is reference for on-load formatting


//bonus -- what would be... amazing would be the ability to go back to previous days, or forward a day... might be a bigger project