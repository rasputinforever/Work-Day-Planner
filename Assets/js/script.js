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


//object of all time areas
var dayTimes = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

//load previous info from local storage

//main area
var scheduleArea = document.createElement("main");
scheduleArea.className = "schedule-area card";
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

    //any saved notes, load them here


});

function saveNote() {
    //get elements based on clicked button's ID
    elId = parseInt(this.id.substr(7,10));
    timeEl = document.getElementById("hour-" +  elId);
    userText = document.getElementById("text-area-" + elId);
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
        timeButton = document.getElementById(this.id); 
        if (userText.value != '') {
            var savedNoteEl = document.createElement("p");
            savedNoteEl.innerText = userText.value;
            savedNoteEl.className = "blockquote mb-0";
            timeEl.insertBefore(savedNoteEl, userText);
        }

        //revert
        userText.value = '';
        userText.style.visibility = "hidden";
        timeButton.innerText = "New Event";
        timeButton.addEventListener("click", saveNote);        
        timeButton.className = "time-button btn btn-secondary btn-sm";
    });
};

