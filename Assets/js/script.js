//hover-over for all buttons
    //"New Event" should go from kind of invisible to "active" when hovering over the SECTION
    //the Delete/Edit buttons should be invisible unless hovering over the specific DIV
        //would like to change the words to SPAN images

//Additional CSS wishlist
    //blank time Sections should have a little gap under the header. the button for "new event", perhaps, would fit there better.


//==========================================initialize page START==========================================//
    //run API
    loadAPI();
    
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
        $('#schedule-area').append(`<section id="hour-${time}" class="card bg-muted mb-3"></section>`);

        //time header        
        if (time > 12) {            
            $(`#hour-${time}`).append(`<header id="time-head-${time}" class="card-header time-head">${time - 12} PM</header>`);
        } else {            
            $(`#hour-${time}`).append(`<header id="time-head-${time}" class="card-header time-head">${time} AM</header>`);
        }  

        //list, text area, and actin button
        $(`#hour-${time}`).append(`
                                <ul         id="time-list-${time}"  class="list-group"></ul>
                                <textarea   id="text-area-${time}"  class="form-control text-area"></textarea>
                                <button     id="button-${time}"     class="time-button btn btn-outline-muted">New Event</button>
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
                    $(`#time-list-${note.time}`).append(`<li class="list-group-item list-group-item-light event-item"><p>${note.events[i]}</p><button type="button" class="btn btn-primary edit-button">EDIT</button><button type="button" class="btn btn-danger delete-button">DELETE</button></li>`);   
                }        
            })
        //buttons for edit/delete
        addEditbuttons();
        };
    };

//==========================================initialize page END==========================================//


function addEditbuttons() {
    $(`.edit-button`).on("click", function() {
    
        $(this.parentNode).hide();
        
        let endString = this.parentNode.innerText.indexOf('EDIT');
        let listItemtext = this.parentNode.innerText.substr(0, endString);
        
        //console.log(this.parentNode.parentNode.childNodes);
        
        $(this.parentNode).after(`<section>                                
                                <textarea class="form-control text-area edit-area">${listItemtext}</textarea>
                                <button class="time-button btn btn-primary btn-sm save-edit-button">Save Changes</button>
                                </section>`);
        //console.log($(this));
        //console.log($(this.parentNode));
        $(this.parentNode).next().find('button').on('click', function(){

            let newEventtext = $(this.parentNode).find('textarea').val();

            $(this.parentNode).prev().find('p')[0].innerText = newEventtext;
            $(this.parentNode).prev().show();
            $(this.parentNode).remove();
            saveEventsLocal();
            
            //put new text into original li
            //console.log(newEventtext);
            //add text without removing edit buttons
            //console.log(' ' + $(this.parentNode).prev()[0].innerText);
            //$(this.parentNode).prev()[0].innerText = newEventtext;
            //kill edit section
        })
        // $(this.parentNode).hide();

        // $(this.parentNode.parentNode.childNodes[2]).on('click', function() {
                
        //         //replace li text with text-area text
        //         //kill save button
        //         //kill edit text area
                
        //         $(this).remove();
        //         $(this.parentNode).show();
        // });

        
        
        

    })
    $(`.delete-button`).on("click", function() {
        //add a check! "ARE YOU SURE?" YES:delete, NO:nothing
        $(this.parentNode).remove();
        saveEventsLocal();
    })
    
    //buttons hidden on load
    $(`.list-group-item`).children('button').hide()
    //button animations
    $(`.list-group-item`).hover(function(){
        $(this).children('button').show()
    }, function() {
        $(this).children('button').hide()

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
        $(`#button-${elId}`).text('Save New Event...');
        $(`#text-area-${elId}`).show();
    } else {
        var newText = $(`#text-area-${elId}`).val();
        if ($(`#text-area-${elId}`).val() != '') {
            $(`#time-list-${elId}`).append(`<li class="list-group-item event-item"><p>${newText}</p><button type="button"class="btn btn-primary edit-button">EDIT</button><button type="button" class="btn btn-danger delete-button">DELETE</button></li>`)            
        }
        //add on-clicks to new buttons for edit and delete
        addEditbuttons();
        saveEventsLocal();
        //revert to "new event" button settings, clear text-area
        $(`#text-area-${elId}`).val('');
        $(`#text-area-${elId}`).hide();
        $(`#button-${elId}`).text('New Event');
        $(`#button-${elId}`).attr('class', 'time-button btn btn-outline-muted'); 
        timeFormatting(); 
    };
};

//combs through entire schedule for events, stores all to local storage. When called after new events are created it will save the new event
function saveEventsLocal() {
    //any saved notes, load them by crawling through array of stored info. Dynamic.
    var newSavedNotes = [];

    dayTimes.forEach(function(time) {        
        var timeList = document.getElementById("time-list-" + time);
        var newObj = {
            time: 0,
            events: []
        };
        newObj.time = time;        
        for (let i = 0; i < timeList.childNodes.length; i++) {
            newObj.events.push(timeList.childNodes[i].childNodes[0].innerText);        
        }
        newSavedNotes.push(newObj);
    })    
    localStorage.setItem('savedEvents', JSON.stringify(newSavedNotes));
};

//API Stuff
function loadAPI() {
    
    var hour = 0;
    var queryURL = "http://worldclockapi.com/api/json/pst/now";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
            //header day, date inserted here        
            var date = response.dayOfTheWeek + ", " + response.currentDateTime.substr(5,5) + "-" +  response.currentDateTime.substr(0,4);
            $('#currentDay').append(date)
            // run through page formatting        
            hour = response.currentDateTime.substr(11,2);
            timeFormatting(hour);
        });
    
        //sets formatting based on ID compared to current time hour
        function timeFormatting () {
            //crawl through elements
            $('#schedule-area').children('section').each(function(id) {       
                //check if ID is in past or current hour
                if ((id+7) < hour) {
                    //header PAST
                    $(`#hour-${(id+7)}`).attr('class', 'card bg-secondary mb-3');
                    $(`#hour-${(id+7)} ul`).children().each(function(li) {
                        //list items PAST
                        $(this).attr('class', 'list-group-item list-group-item-dark event-item')
                    })
                } else if (parseInt(hour) === parseInt(id+7)) {
                    //header NOW
                    $(`#hour-${(id+7)}`).attr('class', 'card bg-success mb-3');
                    //list items NOW
                    $(`#hour-${(id+7)} ul`).children().each(function(li) {
                        $(this).attr('class', 'list-group-item list-group-item-success event-item')
                    })
                }
            });
        }
    
    };

//wish list
    //can we delete storage if the date != today's date, replace it
        //perhaps we can SAVE the "previous day" for quick reference