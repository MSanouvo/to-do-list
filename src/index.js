import "./style.css"
import { Task, updateTask, sortTasks } from "./todos"
import { Project, projectList } from "./project"
import { addGroupToList } from "./navbar-list"
import { contentLoad } from "./content.js"

const list = projectList()
const december = new Project('December Projects')
list.addProjectToArray(december)
list.showProjects()
addGroupToList(december)

const sleep = new Task('sleep', '11pm', 'eepy')
const gym = new Task('gym', '7pm', 'gains')
december.addToArray(sleep)
december.addToArray(gym)
contentLoad(december)
// const content = document.querySelector('#content')
// const child = document.createElement('span')
// child.textContent = 'Hello'

// content.appendChild(child)


// const sleep = new Task('sleep', '9pm')
// console.log(sleep.name)
// console.log(sleep.dueDate)
// const newSleep = updateTask(sleep)
// newSleep.changeDescription('I wanna sleep early')
// console.log(sleep.description)
// sleep.checkCompletion()
// newSleep.isComplete()
// sleep.checkCompletion()
// newSleep.raisePriority()
// console.log(sleep.priority)

// newSleep.lowerPriority()
// newSleep.lowerPriority()
// newSleep.lowerPriority()
// newSleep.lowerPriority()
// console.log(sleep.priority)
// const eat = new Task('eat')
// const gym = new Task('gym')
// const shower = new Task('shower')
// const work = new Task('work')
// let eatPriority = updateTask(eat)
// eatPriority.raisePriority()
// eatPriority.raisePriority()
// let gymPriority = updateTask(gym)
// gymPriority.raisePriority()
// gymPriority.raisePriority()
// gymPriority.raisePriority()
// let showerPriority = updateTask(shower)
// showerPriority.raisePriority()
// let workPriority = updateTask(work)
// workPriority.isComplete()
// workPriority.raisePriority()
// workPriority.raisePriority()
// workPriority.raisePriority()
// workPriority.raisePriority()
// workPriority.raisePriority()
// workPriority.raisePriority()
// workPriority.raisePriority()
// console.log(gym.priority)
// console.log(shower.priority)
// console.log(work.priority)
// console.log(eat.priority)

// const testTasks = new Project('test')
// testTasks.addToArray(sleep)
// testTasks.addToArray(gym)
// testTasks.addToArray(eat)
// testTasks.addToArray(shower)
// testTasks.addToArray(work)

// testTasks.showArray()
// let sortTests = sortTasks(testTasks.array)
// sortTests.rankedPriority()
// sortTests.sortedName()
// sortTests.sortIncomplete()