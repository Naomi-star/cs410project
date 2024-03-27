$(document).ready(function() {
    // This function is executed when the document (HTML) has finished loading

    $(document).on('keydown', function() {
        // This attaches an event listener to the document for the 'keydown' event
        // When any key is pressed and then released, the specified callback function is executed

        $('.login-link').css({ top: '10px', right: '10px' });
        // This selects all elements with the class 'login-link' and applies CSS styles to them
        // It sets the 'top' property to '10px' (moves the element 10 pixels from the top)
        // It sets the 'right' property to '10px' (moves the element 10 pixels from the right)
        // This effectively positions the elements in the top right corner of the viewport
    });
});

//In this setup, the login link is initially positioned in the right top corner using CSS.
// When you start typing (any keydown event occurs), the JavaScript code adjusts the position of the 
//login link to maintain its position in the right top corner while you type. Adjust the top and right values as needed to fine-tune the positioning.