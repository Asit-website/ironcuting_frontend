import React, { useState } from 'react';
import { useMain } from '../hooks/useMain';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Common/Navbar';
import Sidebar from '../Common/Sidebar';
const CreateAnother = ({ notify }) => {
    const { createUser, setUser } = useMain();
    const navigate = useNavigate();
    const [value, setValue] = useState({
        name: '',
        email: '',
        password: ''
    });


    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const ans = await createUser({ ...value });
        console.log(ans);
        alert(ans.message);
    }
    return (
        <>


            <div className='dashWrap'>

                <Navbar />

                <div className="dashCont">

                    <Sidebar notify={notify} />

                    {/* right side */}
                    <div className="dashRight">
                        <div className='shj'>
                        <h1 className='text-center font-bold'>Create another Admin</h1>
                            <form  onSubmit={handleSubmit} className="max-w-sm mt-10 mx-auto">
                          
                                <div className="mb-5">
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Name
                                    </label>
                                    <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" name='name' id='name' onChange={handleChange} value={value.name} />
                                </div>
                                <div className="mb-5">
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                        name='email'
                                        onChange={handleChange}
                                        value={value.email}
                                    />
                                </div>
                                <div className="mb-5">
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                        name='password'
                                        onChange={handleChange}
                                        value={value.password}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Submit
                                </button>
                            </form>

                        </div>
                    </div>


                </div>


            </div>
        </>
    )
}

export default CreateAnother
