/*              SHOPPING CART PROJECT SCOPE

    User can add courses into the shopping cart.

    User can remove courses from the shopping cart.

    Shopping cart content is going to saved into Local Storage.

    Shopping cart is going to display the contents from the Local Storage on page load.

    When a course is removed from the shopping cart, should be removed also from Local Storage.
*/

// Variables
const courses = document.querySelector('#courses-list'),
      shoppingCartContent = document.querySelector('#cart-content tbody'),
      clearCartBtn = document.querySelector('#clear-cart');


// Listeners

loadEventListeners();

function loadEventListeners() {
    // When a new course is added
    courses.addEventListener('click', buyCourse);

    // When the remove button is clicked
    shoppingCartContent.addEventListener('click', removeCourse);

    // Clear Cart button
    clearCartBtn.addEventListener('click', clearCart);

    // Document Ready
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);
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
    // Create an Object with Course Data
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    };
    
    // Insert into the shopping cart
    addIntoCart(courseInfo);
}

// Display the selected course into the shopping cart
function addIntoCart(course) {
    // Create a <tr>
    const row = document.createElement('tr');

    // Build the template
    row.innerHTML = `
        <tr>
            <td>
                <img src="${course.image}" width=100>
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
    `;

    // Add into the shopping cart
    shoppingCartContent.appendChild(row);

    // Add course into the storage
    saveIntoStorage(course);
}

// Add the courses into the local storage
function saveIntoStorage(course) {
    let courses = getCoursesFromTheStorage();

    // add the course into the array
    courses.push(course);

    // since storage only saves strings, we need to convert JSON into string
    localStorage.setItem('courses', JSON.stringify(courses));
}

// Get the contents from the storage
function getCoursesFromTheStorage() {

    let courses;

    if(localStorage.getItem('courses') === null) {
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem('courses'));
    }
    return courses;
}

// Remove course from the DOM
function removeCourse(e) {
    let course, courseId;

    // Remove from the DOM
    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
    }
    console.log(courseId);
    // Remove from the Local Storage
    removeCourseLocalStorage(courseId);
}

// Remove from Local Storage
function removeCourseLocalStorage(id) {
    // Get the Local Storage data
    let coursesLS = getCoursesFromTheStorage();

    // Loop through the array and find the index to remove
    coursesLS.forEach(function(courseLS, index) {
        if(courseLS.id === id) {
            coursesLS.splice(index, 1);
        }
    });

    // Add the rest of the array
    localStorage.setItem('courses', JSON.stringify(coursesLS));
}

// Clears the shopping cart
function clearCart() {
    // shoppingCartContent.innerHTML = '';

    // Recommended way of removing courses from the shopping cart
    while(shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }

    // Clear from Local Storage
    clearLocalStorage();
}

// Clear the Local Storage
function clearLocalStorage() {
    localStorage.clear();
}

// Loads when document is ready and print courses into shopping cart

function getFromLocalStorage() {
    let coursesLS = getCoursesFromTheStorage();

    // LOOP through the courses and print into the cart
    coursesLS.forEach(function(course){
        // create the <tr>
        const row = document.createElement('tr');

        // print the content
        row.innerHTML = `
            <tr>
                <td>
                    <img src="${course.image}" width=100>
                </td>
                <td>${course.title}</td>
                <td>${course.price}</td>
                <td>
                    <a href="#" class="remove" data-id="${course.id}">X</a>
                </td>
            </tr>
        `;
        shoppingCartContent.appendChild(row);
    });
}