"use strict";

/*
    output()
    Purpose: Displays a message to the output area on the page.
    Parameters:
        message (String) - text to display to the user
    Returns: nothing
*/
function output(message) {
    document.getElementById("output").innerHTML = message;
}

/*
    clear()
    Purpose: Clears the output area.
    Parameters: none
    Returns: nothing
*/
function clear() {
    document.getElementById("output").innerHTML = "";
}
