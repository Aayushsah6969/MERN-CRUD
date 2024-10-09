import { useEffect, useState } from "react";
import axios from 'axios';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const Cards = () => {
    const [Text, setText] = useState([]);
    const [isEditModalOpen, setEditModalOpen] = useState(false); // State for modal
    const [currentText, setCurrentText] = useState(null); // State for the current text being edited

    useEffect(() => {
        const fetchText = async () => {
            try {
                const response = await axios.get('https://mern-crud-rvt2.onrender.com/text/getText');
                console.log(response.data.text);
                setText(response.data.text);
                console.log(response.data.message);
            } catch (error) {
                console.log(error);
                alert(error.message);
            }
        }

        fetchText();
    }, []);

    const HandleDelete = async (id) => {
        try {
            const response = await axios.delete(`https://mern-crud-rvt2.onrender.com/text/delete/${id}`, {
                withCredentials: true,
            });
            console.log(response.data.message);
            setText(Text.filter(t => t._id !== id)); // Update UI after deletion
            alert(response.data.message);
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    const HandleEdit = (text) => {
        setCurrentText(text); // Set the current text being edited
        setEditModalOpen(true); // Open the modal
    }

    const handleModalClose = () => {
        setEditModalOpen(false);
        setCurrentText(null);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://mern-crud-rvt2.onrender.com/text/update/${currentText._id}`, currentText);
            console.log(response.data.message);
            setText(Text.map(t => t._id === currentText._id ? response.data.text : t)); // Update the state with the new data
            setEditModalOpen(false); // Close the modal
            alert(response.data.message);
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentText(prev => ({ ...prev, [name]: value })); // Update the current text
    }

    return (
        <section className="text-gray-600 body-font flex flex-wrap">
            {
                Text.map((text, index) => (
                    <div className="p-4 md:w-1/3" key={text._id || index}>
                        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                            <img
                                className="lg:h-48 md:h-36 w-full object-cover object-center"
                                src={text.image}
                                alt="blog"
                            />
                            <div className="p-6">
                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{text.author}</h2>
                                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{text.text}</h1>
                                <div className="action-buttons flex justify-center content-center my-2 m-2">
                                    <FiEdit onClick={() => HandleEdit(text)} className="text-lg font-medium mx-3 cursor-pointer dark:text-white" />
                                    <MdDelete onClick={() => HandleDelete(text._id)} className="text-lg font-medium mx-3 cursor-pointer dark:text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }

            {/* Modal for Editing */}
            {isEditModalOpen && currentText && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 ">
                    <div className="bg-white p-8 rounded-lg shadow-lg bg-white dark:bg-gray-800">
                        <h2 className="text-xl font-semibold mb-4">Edit Text</h2>
                        <form onSubmit={handleUpdate}>
                            <div className="mb-4">
                                <label htmlFor="author" className="block text-gray-700 dark:text-white">Author</label>
                                <input
                                    type="text"
                                    id="author"
                                    name="author"
                                    value={currentText.author}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="text" className="block text-gray-700 dark:text-white">Text</label>
                                <textarea
                                    id="text"
                                    name="text"
                                    value={currentText.text}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="image" className="block text-gray-700 dark:text-white">Image URL</label>
                                <input
                                    type="text"
                                    id="image"
                                    name="image"
                                    value={currentText.image}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button type="button" onClick={handleModalClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded mr-2">
                                    Cancel
                                </button>
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Cards;
