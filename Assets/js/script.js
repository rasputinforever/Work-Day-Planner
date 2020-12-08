//get current date-time, put date in header, use time for formatting time-block elements
//create page elements - block per time-period (7AM-7PM)
    // each element is formatted nicely for AM and PM
        //an additional class for if time is passed

//add formatting class if < current time

//hover-over to reveal "new note" button
//replace stuff with jquery

//API Stuff
var queryURL = "http://worldclockapi.com/api/json/pst/now";
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
                    
        //console.log(response);



        //put stick the DATE in the header here        
        var date = response.dayOfTheWeek + ", " + response.currentDateTime.substr(5,5) + "-" +  response.currentDateTime.substr(0,4);
        $('#currentDay').append(date)

        // run formatting function
        
        var hour = response.currentDateTime.substr(11,2);
        timeFormatting(hour);
    });

//sets formatting based on ID compared to current time hour
function timeFormatting (hour) {
    //list-group items



    
    $('#schedule-area').children('section').each(function(id) {

        

        
        
        //headers
        if ((id+7) < hour) {
            $(`#hour-${(id+7)}`).attr('class', 'card bg-secondary mb-3');

            $(`#hour-${(id+7)} ul`).children().each(function(li) {

                $(this).attr('class', 'list-group-item list-group-item-dark')
            })




        } else if (parseInt(hour) === parseInt(id+7)) {
            $(`#hour-${(id+7)}`).attr('class', 'card bg-success mb-3');
            $(`#hour-${(id+7)} ul`).children().each(function(li) {

                $(this).attr('class', 'list-group-item list-group-item-success')
            })
        }

    });

}

//==========================================initialize page START==========================================//

    //demonstration object for loading saved events, replace this with "load from local storage"
    var savedEvents = JSON.parse(localStorage.getItem('savedEvents'));

    //array defines what times are used in this app
    const dayTimes = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

    var elId = 0;

    //main area
    $('body').append(`<main id="schedule-area" class="schedule-area"></main>`);

    //each time section
    dayTimes.forEach(function(time) {

        //main time area
        $('#schedule-area').append(`<section id="hour-${time}" class="card bg-light mb-3"></section>`);

        //time header        
        if (time > 12) {            
            $(`#hour-${time}`).append(`<header id="time-head-${time}" class="card-header">${time - 12} PM</header>`);
        } else {            
            $(`#hour-${time}`).append(`<header id="time-head-${time}" class="card-header">${time} AM</header>`);
        }  

        //list, text area, and actin button
        $(`#hour-${time}`).append(`
                                <ul         id="time-list-${time}"  class="list-group"></ul>
                                <textarea   id="text-area-${time}"  class="form-control text-area"></textarea>
                                <button     id="button-${time}"     class="time-button btn btn-secondary btn-sm">New Event</button>
                                `);

        //element settings
        $(`#text-area-${time}`).hide();
        $(`#button-${time}`).on("click", saveNote);  
                      
    });
    
    //loads saved events, stored in savedEvents array
    loadSavedevents();

    function loadSavedevents() {
        //any saved notes, load them by crawling through array of stored info. Dynamic.        
        if (savedEvents != null) {
            savedEvents.forEach(function(note){
                //loop through each saved event, stick it into ID-specific time-block
                for (let i = 0; i < note.events.length; i++) {
                    $(`#time-list-${note.time}`).append(`<li                    class="list-group-item list-group-item-light">${note.events[i]}
                                                        <button type="button"   class="btn btn-primary edit-button">EDIT</button>
                                                        <button type="button"   class="btn btn-danger delete-button">DELETE</button>
                                                        </li>`);                    
                }        
            })
        //buttons for edit/delete
        addEditbuttons();
        };
    };
//==========================================initialize page END==========================================//


function addEditbuttons() {
    $(`.edit-button`).on("click", function() {
        console.log("edit!");
    })
    $(`.delete-button`).on("click", function() {
        console.log("delete!");
    })
}

//todos
    // make text-area go to 0 height when inactive, instead of "hidden". 200px when active.
    // might need to figure out how to increase area of entire time-block as notes are added.
function saveNote() {

    //get elements based on clicked button's ID for reference
    elId = parseInt(this.id.substr(7,10)); 

    if ($(`#button-${elId}`).text() === 'New Event') {
        $(`#button-${elId}`).attr('class', 'time-button btn btn-primary btn-sm');
        $(`#button-${elId}`).text('Save New Note...');
        $(`#text-area-${elId}`).show();
    } else {
        var newText = $(`#text-area-${elId}`).val();
        if ($(`#text-area-${elId}`).val() != '') {
            $(`#time-list-${elId}`).append(`<li                      class="list-group-item">${newText}
                                            <button type="button"   class="btn btn-primary edit-button">EDIT</button>
                                            <button type="button"   class="btn btn-danger delete-button">DELETE</button>
                                            </li>`)            
        }
        //add on-clicks to new buttons for edit and delete
        addEditbuttons();
        saveEventsLocal();
        //revert to "new event" button settings, clear text-area
        $(`#text-area-${elId}`).val('');
        $(`#text-area-${elId}`).hide();
        $(`#button-${elId}`).text('New Event');
        $(`#button-${elId}`).attr('class', 'time-button btn btn-secondary btn-sm');  
    };
};

//combs through entire schedule for events, stores all to local storage. When called after new events are created it will save the new event
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
            var endString = timeList.childNodes[i].innerHTML.indexOf('<');
            newObj.events.push(timeList.childNodes[i].innerHTML.substr(0, endString));        
        }
        newSavedNotes.push(newObj);
        j++;
    })    
    localStorage.setItem('savedEvents', JSON.stringify(newSavedNotes));
};


//editnote function / delete note
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