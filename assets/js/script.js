// add today's date to header
$("#currentDay").text(moment().format("dddd, MMMM D, YYYY"));

// loop through business hours and add to page
for (var hour = 9; hour <= 17; hour++) {
    // create column for time
    var timeColEl = $("<div>")
        .addClass("col-time col-1 hour")
        .text(moment().hour(hour).format("hA"));
    //create column for text
    var textColEl = $("<textarea>")
        .addClass("col-text col-10");
    // create column for save button
    var saveColEl = $("<button>")
        .addClass("col-save col-1 btn saveBtn");
    //create row and add all columns to it
    var rowEl = $("<div>")
        .addClass("row time-block")
        .append(timeColEl)
        .append(textColEl)
        .append(saveColEl);
    // add row to page
    $(".container").append(rowEl);
}