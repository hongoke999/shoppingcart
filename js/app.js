/*              SHOPPING CART PROJECT SCOPE

    User can add courses into the shopping cart.

    User can remove courses from the shopping cart.

    Shopping cart content is going to saved into Local Storage.

    Shopping cart is going to display the contents from the Local Storage on page load.

    When a course is removed from the shopping cart, should be removed also from Local Storage.
*/

// Variables
const courses = document.querySelector('#courses-list');


// Listeners

loadEventListeners();

function loadEventListeners() {
    // When a new course is added
    courses.addEventListener('click', buyCourse);
}



// Functions
function buyCourse(e) {
    e.preventDefault();

    // Use delegation to find a course that was added
    if(e.target.classList.contains('add-to-cart')) {
        // Read the course values
        const course = e.target.parentElement.parentElement;

        // Read the values
        getCourseInfo(course);
    }

}

// Reads the HTML information of the selected course
function getCourseInfo(course) {
    console.log(course);
}