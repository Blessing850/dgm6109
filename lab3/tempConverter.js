"use strict";

document.getElementById("submit")
  .addEventListener("click", function () {

    let fahrenheit = document.getElementById("inputF").value;
    let conversionType = document.getElementById("conversionChoice").value;

    // Convert input to a number
    fahrenheit = Number(fahrenheit);

    // CHALLENGE #1 
    if (isNaN(fahrenheit)) {
      output("Invalid input: please enter a valid number.");
      return;
    }
    

    // Always calculate both
    let celsius = (fahrenheit - 32) * (5 / 9);
    let kelvin = celsius + 273.15;

    // Always show original temperature
    output("Fahrenheit (user input): " + fahrenheit);

    /*
    // TWO-IF VERSION (commented out)
    if (conversionType === "c") {
      output("Celsius: " + celsius);
    }

    if (conversionType === "k") {
      output("Kelvin: " + kelvin);
    }
    */

    // IF / ELSE VERSION (active)
    if (conversionType === "c") {
      output("Celsius (converted): " + celsius);
    } else {
      output("Kelvin (converted): " + kelvin);
    }

    /*
      I prefer the if/else version because only one condition
      needs to be tested. Since the user can only choose one
      option from the select menu, this makes the logic clearer
      and avoids unnecessary checks.
    */
});
