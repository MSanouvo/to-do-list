# to-do-list

A to-do list app created using HTML, CSS, and JS with JSON features. (Project courtesy of The Odin Project)

While first opening the app, the program should create a 'General' task group to populate the localstorage. This group serves as our default to hold generic tasks that may not be specified to any specific goal or project. By clicking 'add task' or 'add project', a popup form will ask users for inputs to create their task or project (a name is required at minimum to add any new task or project). Clicking a project on the navbar will change the main content to display tasks associated to that specified group. Users are allowed to edit or delete tasks or projects with the corresponding buttons attacked to a task/project display.

This project served as a good way to demonstrate my knowledge of HTML, CSS, and JavaScript up until now. I decided to take my time with this work on adding new features bit by bit over the course of a couple weeks.

Going into this, I tried to keep the basic ideas of single responsibility and other OOP in mind, but as the app got larger in scope and I was creating multiple funtions that interacted with each other and while having their own specific outputs, I feel that I may have lost some of those applications in practice, which is okay for where I am at still. This is probably one of the larger coding projects I have done so far. 

Towards the end of this project, once the core functionality was implemented, I began thinking about how I should try to familiarize myself with modern CSS stylings. While this inspired some of the elements of the final result, I realize I should try to keep up with learning modern UI design.

Possible Improvements/Features for the future:
- Redesign how task cards and project content are generated when loading changes to the content (new task, edits, etc.)
- Fix the current logic behind deleting projects/tasks as they could result in some unwanted deletions in specific edge cases
- Make the description act as a dropdown element that displays/disappears when clicking on the task card
- Change how the priority function works so there is more visual clarity for users (higher priority should give a bigger sense of urgency)
- add more sorting options and improve their functionality