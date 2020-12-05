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
document.body.appendChild(scheduleArea);

//each time section
dayTimes.forEach(function(time) {
    //main time area
    var timeEl = document.createElement("section");
    scheduleArea.appendChild(timeEl);
    timeEl.id = "hour-" + time;

    //time label
    var timeHead = document.createElement("p");
    scheduleArea.appendChild(timeHead);
    if (time > 12)
        timeHead.innerHTML = (time - 12) + " PM";
    else {
        timeHead.innerHTML = time + " AM";
    }

    //input text area
    var userText = document.createElement("textarea")
    scheduleArea.appendChild(userText);
    userText.class = "text-area";

    //save button
    var timeButton = document.createElement("button");
    scheduleArea.appendChild(timeButton);
    timeButton.innerText = "Save";
    timeButton.id = "button-" + time;
    timeButton.addEventListener("click", saveNote);

    //any saved notes, load them here


});

function saveNote() {
    //find parent of this.button and look down to child textarea
    console.log("I'm a note! My ID is " + this.id)
}
