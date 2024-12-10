class TaskManager {
    static instance = null;
    tasks = [];

    static getInstance() {
        if (!TaskManager.instance) {
            TaskManager.instance = new TaskManager();
        }
        return TaskManager.instance;
    }

    createTask(title, category) {
        const task = this.createNewTask(title, category);
        this.tasks.push(task);
        return task;
    }
    
    createNewTask(title, category) {
        return new Task(title, category); 
    }
    

    getTask() {
        return [...this.tasks]; 
    }

    moveTaskToDone(taskId) {
        const task = this.tasks.find((t) => t.id === taskId);
        if (task) {
            task.updateStatus("Done");
            task.updatedAt = new Date();
        }

        return this.tasks;
    }

    moveTaskToUnDone(taskId) {
        const task = this.tasks.find((t) => t.id === taskId);
        if (task) {
            task.updateStatus("ToDo");
            task.updatedAt = new Date();
        }

        return this.tasks;
    }

    filterTasksByCategory(category) {
        return this.tasks
            .filter((task) => category === "All" || task.category === category)
            .sort((a, b) => b.updatedAt - a.updatedAt); 
    }
}

class Task {
    constructor(title, category) {
        this.id = Math.random().toString(36).substr(2, 9);
        this.title = title;
        this.category = category;
        this.status = "ToDo"; // default status is "ToDo"
        this.date = new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }

    updateStatus(status) {
        this.status = status;
    }
}

export default TaskManager;
