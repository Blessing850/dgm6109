"use strict"

/* IC: Declare global variables to store user-entered information and results here */
let item1, item2, zip;
let totalPrice = 0;
let discountApplied = false;


/* IC: We have set up the form buttons for you, as well as the code that will clear the output once the user has successfully filled out the form and the program has given them final output (instead of telling them they need to correct something). We have set things up so that the output area is cleared, but the form remains filled out. This is to make it easier to test your project with slightly different versions of information rather than having to fill out the whole form every time. */

document.getElementById("submit").addEventListener("click", processForm);

document.getElementById("reset").addEventListener("click", function () {
    clear();
    document.getElementById("submit").toggleAttribute("hidden");
    document.getElementById("reset").toggleAttribute("hidden");
});

function processForm()  {
item1 = document.getElementById("item1").value;
item2 = document.getElementById("item2").value;
zip = document.getElementById("zip").value;

    /* IC: Assign values from your form inputs here, remembering:
        1) Always work with the value property from the form input

        2) Form data always comes in as type String. You MAY want to convert some inputs to Numbers, but you ALSO may need to analyze some numeric inputs as text (for example, if you need to check how many digits were entered, or only look at certain digits)

        3) You can do additional pre-processing here, if needed, but everything related to validating form input or providing results should go into the other functions provided below OR by functions that those other functions call (which you may also write)
    */


    /* IC: This code looks for a true or false for whether the data is valid. It only continues to evaluate the answers if the data is valid. You DO NOT need to modify any code between here and the end of the function, nor should you, unless you have a good reason. All versions of this project can be completed WITHOUT modifying the code from this comment to the end of the function, so you should attempt to work with that restriction! */

    let evaluationCompleted = false;

    if (validateData()) {
        evaluationCompleted = evaluateAnswers();
    }

    if (evaluationCompleted) {
        document.getElementById("submit").toggleAttribute("hidden");
        document.getElementById("reset").toggleAttribute("hidden");
    } else {
        rule();
    }
}

/* IC: In this function, do any validation with validate the data was correctly entered in general, not for specific cases. Return false if you have told the user that they need to correct something. Return true if all data is valid. We have provided you with the basic constraints for the data, but you may improve the validation as a bonus (as long as you don't mess up our ability to test every option in your evaluateAnswers function!) */

function validateData() {

    if (item1 === "" || item2 === "") {
        output("Please select two items.");
        return false;
    }

    if (zip === "") {
        output("Please enter a ZIP code.");
        return false;
    }

    if (zip.length !== 5 || isNaN(zip)) {
        output("Please enter a valid 5-digit ZIP code.");
        return false;
    }

    return true;
}


/* IC: In this function, use conditional logic to figure out if the user's input meets all of the constraints that we have provided. Return false if you have told the user that they need to correct something. Return true if all data is valid. NOTE: Although the focuses of this project are conditional logic and function returns, you may need to create additional variables, do some calculations, and/or do some String manipulation in order to successfully complete your project! */

/*
    evaluateAnswers()
    Purpose: Calculates item prices, applies discounts if applicable,
             and displays the final order message to the user.
    Parameters: none
    Returns:
        true  - processing successful and output displayed
        false - processing failed (not used in this function)
*/
function evaluateAnswers() {
    let item1Price = 0;
    let item2Price = 0;
    discountApplied = false;

    // Determine prices
    if (item1 === "pizza") item1Price = 4;
    if (item1 === "salad") item1Price = 3;
    if (item1 === "burger") item1Price = 5;
    if (item1 === "fries") item1Price = 2;

    if (item2 === "pizza") item2Price = 4;
    if (item2 === "salad") item2Price = 3;
    if (item2 === "burger") item2Price = 5;
    if (item2 === "fries") item2Price = 2;

    // Calculate total
    totalPrice = item1Price + item2Price;

    // Apply discount if burger + fries (any order)
    if (
        (item1 === "burger" && item2 === "fries") ||
        (item1 === "fries" && item2 === "burger")
    ) {
        totalPrice *= 0.75;
        discountApplied = true;
    }

    // Build output message
    let message = "Your " + item1 + " & " + item2 +
        " combo will be delivered to your address on file in ZIP code " + zip + ". ";

    message += "The total price will be $" + totalPrice.toFixed(2) + ".";

    if (discountApplied) {
        message += " This includes a 25% discount for our current special combo.";
    }

    output(message);
    return true;
}


/* TIP: The above two functions are written using different techniques for communicating success or failure. In your project, we will be looking for consistency -- i.e., choose ONE of these methods (early returns, or tracking the success in a variable) and use it throughout your project! */