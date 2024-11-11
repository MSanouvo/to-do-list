class Task{
    constructor(name, dueDate){
        this.name = name
        this.dueDate = dueDate
        this.description = ''
        this.completed = false
        this.priority = 0
    }

    changeDescription(description){
        this.description = description
    }

    checkCompletion(){
        if(this.completed === true){
            console.log('Completed!')
        }else{
            console.log('Incomplete')
        }
        
    }
}

class Project{
    constructor(arrayName){
        this.name = arrayName
        this.array = []
    }

    addToArray(task){
        this.array.push(task)
    }
    //mostly used for testing
    showArray(){
        let length = this.array.length
        for(let i=0; i<length; i++){
            console.log(this.array[i].name)
            console.log(this.array[i].priority)
        }
        
    }
}

function isComplete(task){
    return task.completed = true
}

function changePriority(task){
    const raisePriority = () => task.priority +=1
    const lowerPriority = () => task.priority -=1

    return {raisePriority, lowerPriority}
}

function rankTasks(array){
    //sort in descending order (greatest -> least prio)
    let rankedPriority = array.sort((a, b) => b.priority - a.priority)
    console.log(rankedPriority)
}

export {Project, Task, isComplete, changePriority, rankTasks}