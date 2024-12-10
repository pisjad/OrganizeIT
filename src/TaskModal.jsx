import { useState } from "react";
import PropTypes from "prop-types";

const TaskModal = ({
    isOpen,
    closeModal,
    addTask,
    categories,
    activeCategory,
}) => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState(categories[0]);

    const handleSave = () => {
        if (title) {
            if (activeCategory === "All") {
                addTask(title, category);
                closeModal();
                setTitle("");
            } else {
                addTask(title, activeCategory);
                closeModal();
                setTitle("");
            }
        } else {
            alert("Task title is required!");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Add Task</h2>
                <input
                    type="text"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <select
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    hidden={activeCategory === "All" ? false : true}
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                <div className="flex justify-between">
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-pink text-white px-4 py-2 rounded hover:bg-pink2 duration-200"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

TaskModal.propTypes = {
    isOpen: PropTypes.bool.isRequired, // Expecting a boolean for isOpen
    closeModal: PropTypes.func.isRequired, // Expecting a function for closeModal
    addTask: PropTypes.func.isRequired, // Expecting a function for addTask
    categories: PropTypes.arrayOf(PropTypes.string).isRequired, // Expecting an array of strings for categories
    activeCategory: PropTypes.string.isRequired,
};

export default TaskModal;
