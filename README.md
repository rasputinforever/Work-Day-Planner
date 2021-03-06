# Work-Day-Planner

## Introduction

* URL: [Work Day Planner](https://rasputinforever.github.io/Work-Day-Planner/)

This application is a day-planner for a typical workday. You can add events to each hour which will be saved to your browser and will be loaded the next time you visit! The planner visually indicates the time of day with formatting so as the hours go by your planner will grey out. Each event can be edited or deleted at your discression. Alternatively, you can clear the whole day's events!

## How it Works and Tools Used

### Server Side API: [AbstractApi.com TimeZone API](https://www.abstractapi.com/time-date-timezone-api)
A Web API is used to *GET* the current time at page-load! The API is queried and the *current date* and *current time* are used and applied to the page. Current Date is pasted in the header of the Planner, the Current Time is used to apply formatting to each time block in the planner itself.
* Grey: Past Hour
* Green: Current Hour
* White: Upcoming Hour
API queries occur asynchronously which means that the page loads all it can per normal while the API is queried. As soon as the query returns its response the page runs the formatting script. This means on a slower connection a user may experience a visual delay while the page waits for a response.

### Local Storage: Web API
*Local Storage* is used to store the events set by the user. On page-load, Local Storage is retrieved and, if it exists at all, the information is parsed out and applied to the appropriate time-blocks. When a new event is created, edited, or deleted (or if Clear All is used) the page runs a Save to Local Storage script which looks at the entire page, element-by-element, and assigns any found events (displayed as li elements) and puts them into an array within a time-block specific object (as there may be multiple events for a single time block). Those time-block objects are stored as a single array. That array of objects is stringified using *JSON*.

### JQuery: Simplied Element Generation, element traceability, and Animation
JQuery is used in this project. JQuery, compared to vanilla JavaScript, can generate Elements and Refer to them in less steps than JS. Further, JQuery has simple animations that can be applied with few lines as well, such as FadeIn/Out and Hide/Show. JQuery can even generate elements en masse, a single line can seemingly generate endless elements to the page, entire blocks of HTML can be appended. Finally, the *parentnode*, *Children()*, *Next()*, and *Prev()* functions all made the on-click events interact with their relative neighbors (in conjunction with *this*) making it possible to quickly trace-back to a desired element relative to the user-clicked-element

### [Bootstrap:](https://getbootstrap.com/docs/5.0/getting-started/introduction/) Page Styling
Bootstrap was used in this project to provide simple, yet elegant element styling. The list (ul/li) elements in particular fit the visual theme of a planner, versus a bullet list or anything possible with vanilla CSS.

### CSS Style Sheet: Positioning and minor tweaks
A stylesheet is also included that further improved the visual style of the planner, moving things around to a desired location.

## Image Gallery

* Header: the current date is displayed in the header. The body of the page has a time block per hour of the day. Also featured: the "clear all" button!

![Header](Assets/images/header.PNG)


* Dynamic Formatting

![Dynamic Formatting](Assets/images/dynamic_formatting.PNG)

* New Event Button HoverOver

![New Event Button Appears](Assets/images/new_event.PNG)

* Creating a new Event

![Open Event Editor](Assets/images/new_event_save.PNG)

* Saved Event

![Saved Event](Assets/images/new_event_saved.PNG)

* Event Editors

![Event Edit Buttons](Assets/images/event_editbuttons.PNG)

* Known Bug: when creating New Events, an extra event listener populates the "Edit" button. This creates DUPLICATE events. Loaded events, from local storage, do not exhibit this issue.
UPDATE: 12-11-20, 8:00 PM, Bug removed! Issue was on "addEditbuttons" where it wasn't checking if a button already had an event. Solution was to remove all events then re-add them.

![Bug 1](Assets/images/bug_1.PNG)

## Functions Pathways & Events

![Event Pathways](Assets/images/function_pathway.PNG)

## Desired Features 

* Save multiple days so that a user can scroll through recent days
* An "Are you Sure?" confirmation interaction with user for deleting events/all events.

## Credits

Erik Portillo, University of Oregon Coding Bootcamp, 12-11-2020