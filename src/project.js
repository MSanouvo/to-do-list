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
        console.log(this.array)
        for(let i=0; i<length; i++){
            console.log(this.array[i].name)
            console.log(this.array[i].priority)
        }
        
    }
}

export{Project}