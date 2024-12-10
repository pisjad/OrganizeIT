import { useEffect, useState } from "react";
import TaskManager from "./TaskManager";
import TaskModal from "./TaskModal";
import CategoryModal from "./CategoryModal";
import "./App.css";
import Logo from "./assets/LOGO.png";

function App() {
    const [categories, setCategories] = useState(["Urgent", "Work", "Study"]);
    // const [tasks, setTasks] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [filteredTasks, setFilteredTasks] = useState([]);

    const taskManager = TaskManager.getInstance();

    // Handle adding a task
    const addTask = (title, category) => {
        taskManager.createTask(title, category);
        setActiveCategory(activeCategory); // Update to trigger re-render
        setFilteredTasks(taskManager.filterTasksByCategory(activeCategory));
    };

    // Handle moving task to "Done"
    const moveToDone = (taskId) => {
        taskManager.moveTaskToDone(taskId); // Memindahkan task ke Done
        setActiveCategory(activeCategory); // Memaksa re-render setelah task dipindahkan
        setFilteredTasks(taskManager.filterTasksByCategory(activeCategory));
    };

    const moveToUnDone = (taskId) => {
        taskManager.moveTaskToUnDone(taskId);
        setActiveCategory(activeCategory); // Memaksa re-render setelah task dipindahkan
        setFilteredTasks(taskManager.filterTasksByCategory(activeCategory));
    };

    // Handle filtering tasks by category
    const filterTasks = (category) => {
        setActiveCategory(category);
    };

    // Handle adding a category
    const addCategory = (name) => {
        if (name && !categories.includes(name)) {
            setCategories([...categories, name]);
        } else {
            alert(
                name ? "Category already exists!" : "Category name is required!"
            );
        }
    };

    useEffect(() => {
        setFilteredTasks(taskManager.filterTasksByCategory(activeCategory));
    }, [activeCategory]);

    return (
        <>
            <div className="flex">
                {/* Sidebar */}
                <div className="bg-gray-200 w-60 p-4 h-screen">
                    <div className="flex justify-items-center items-center mb-6 gap-2">
                        <img src={Logo} className="size-10" />
                        <h2 className="text-xl font-bold">OrganizeIT</h2>
                    </div>

                    <ul id="categories" className="space-y-4">
                        <li
                            className={`category-item ${
                                activeCategory === "All"
                                    ? "text-white font-extrabold bg-pink px-4 py-2 rounded hover:text-white"
                                    : "px-4 py-2"
                            } cursor-pointer hover:px-4 py-2 rounded hover:font-bold hover:duration-200  hover:text-pink`}
                            onClick={() => filterTasks("All")}
                        >
                            All Tasks
                        </li>
                        {categories.map((category) => (
                            <li
                                key={category}
                                className={`category-item ${
                                    activeCategory === category
                                        ? "text-white font-extrabold bg-pink px-4 py-2 rounded hover:text-white"
                                        : "px-4 py-2"
                                } cursor-pointer hover:px-4 py-2 rounded hover:font-bold hover:text-pink hover:duration-200`}
                                onClick={() => filterTasks(category)}
                            >
                                {category}
                            </li>
                        ))}
                        <li>
                            <button
                                className="border-[3px] border-black text-black px-4 py-2 rounded-lg hover:bg-pink hover:text-white hover:border-pink duration-200"
                                onClick={() => setIsCategoryModalOpen(true)}
                            >
                                <strong className="text-xl pr-2 ">+</strong>
                                <strong className="">Add Category</strong>
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6">
                    <h1 className="text-2xl font-semibold mb-4">Tasks</h1>
                    <div className="flex space-x-4">
                        {/* To Do */}
                        <div className="w-1/2 bg-gray-100 p-4 rounded-lg">
                            <div className="flex w-full justify-between">
                                {" "}
                                <h2 className="text-xl mb-4">To Do</h2>
                                <button
                                    className="bg-pink text-white px-4 py-2 rounded mb-4 hover:bg-pink2 duration-200"
                                    onClick={() => setIsTaskModalOpen(true)}
                                >
                                    Add Task
                                </button>
                            </div>

                            {filteredTasks
                                .filter((task) => task.status === "ToDo") // Filter task yang statusnya "ToDo"
                                .map((task) => (
                                    <div
                                        key={task.id}
                                        className="flex justify-between items-center p-3 bg-white mb-3 rounded-lg shadow-md"
                                    >
                                        <div>
                                            <strong>{task.title}</strong> (
                                            {task.category})
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {task.date}
                                        </div>
                                        <button
                                            className="bg-green-500 text-white px-3 py-1 rounded"
                                            onClick={() => moveToDone(task.id)} // Memindahkan task ke Done
                                        >
                                            Done
                                        </button>
                                    </div>
                                ))}
                        </div>

                        {/* Done */}
                        <div className="w-1/2 bg-gray-100 p-4 rounded-lg">
                            <h2 className="text-xl mb-4">Done</h2>
                            {filteredTasks
                                .filter((task) => task.status === "Done") // Filter task yang statusnya "Done"
                                .map((task) => (
                                    <div
                                        key={task.id}
                                        className="flex justify-between items-center p-3 bg-white mb-3 rounded-lg shadow-md"
                                    >
                                        <div>
                                            <strong>{task.title}</strong> (
                                            {task.category})
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {task.date}
                                        </div>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                            onClick={() =>
                                                moveToUnDone(task.id)
                                            } // Memindahkan task ke Done
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Task Modal */}
                <TaskModal
                    isOpen={isTaskModalOpen}
                    closeModal={() => setIsTaskModalOpen(false)}
                    addTask={addTask}
                    categories={categories}
                    activeCategory={activeCategory}
                />

                {/* Category Modal */}
                <CategoryModal
                    isOpen={isCategoryModalOpen}
                    closeModal={() => setIsCategoryModalOpen(false)}
                    addCategory={addCategory}
                />
            </div>
        </>
    );
}

export default App;
