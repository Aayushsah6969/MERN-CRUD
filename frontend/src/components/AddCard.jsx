import { useState } from 'react';
import axios from 'axios';

const AddCard = () => {

    const [formData, setFormData] = useState({
        text: '',
        author: '',
        imageLink: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/text/upload", {
                text: formData.text,  // Corrected to use formData.text
                author: formData.author,
                image: formData.imageLink,
            }, {
                withCredentials: true,
            });
            console.log(response.status);
            console.log(response.data);
            setFormData({ text: '', author: '', imageLink: '' });  // Reset form after submission
            alert(response.data.message);
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    };
    

    return (
        <div className="max-w-lg mx-auto my-10 p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-700">Create a Blog Post</h2>
            <form onSubmit={handleSubmit} className="p-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-md">
                {/* Text Field */}
                <div className="mb-4">
                    <label htmlFor="text" className="dark:text-white">
                        Blog Text:
                    </label>
                    <textarea
                        id="text"
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        placeholder="Write your blog text here"
                        className="w-full mt-1 p-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-white"
                        rows="5"
                        required
                    />
                </div>

                {/* Author Name */}
                <div className="mb-4">
                    <label htmlFor="author" className="dark:text-white">
                        Author Name:
                    </label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        placeholder="Enter the author's name"
                       className="w-full mt-1 p-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-white"
                        required
                    />
                </div>

                {/* Image Link */}
                <div className="mb-4">
                    <label htmlFor="imageLink" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">
                        Image Link:
                    </label>
                    <input
                        type="url"
                        id="imageLink"
                        name="imageLink"
                        value={formData.imageLink}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                       className="w-full mt-1 p-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCard;
