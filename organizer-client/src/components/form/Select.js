import React from "react";

const Select = ({ label, name, register, required, isError, options, className, placeholder }) => {
    return (<div className={className}>
        <label
            className={`${isError ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500" : "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"}`}>{label} {required && <span className="text-red-500">*</span>}</label>
        <select {...register(name, { required })}
                placeholder={placeholder}
                className={`${isError ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"}`}>
            {options.map((option, index) => <option key={index} value={option.value}>{option.text}</option>)}
        </select>
    </div>);
};

export default Select;