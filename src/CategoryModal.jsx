import { useState } from "react";
import PropTypes from "prop-types";

const CategoryModal = ({ isOpen, closeModal, addCategory }) => {
    const [categoryName, setCategoryName] = useState("");

    const handleSave = () => {
        if (categoryName) {
            addCategory(categoryName);
            closeModal();
            setCategoryName("");
        } else {
            alert("Category name is required!");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Add Category</h2>
                <input
                    type="text"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    placeholder="Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
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

CategoryModal.propTypes = {
    isOpen: PropTypes.bool.isRequired, // Expecting a boolean for isOpen
    closeModal: PropTypes.func.isRequired, // Expecting a function for closeModal
    addCategory: PropTypes.func.isRequired, // Expecting a function for addCategory
};

export default CategoryModal;
