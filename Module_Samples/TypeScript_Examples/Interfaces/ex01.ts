function displayCourse(course: { name: string }) {
    console.log(course.name);
}

let x = {id: 'cs701', name: "RIA Development"};
displayCourse(x);

let y = {id: 'cs701'};
// displayCourse(y);
