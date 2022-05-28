import React from "react";
import { HiExclamation, HiFire, HiInformationCircle } from "react-icons/hi";
import NoData from "../NoData";

const RecommendationList = ({ recommendations }) => {
    if (recommendations.length === 0)
        return <NoData/>;
    else
        return <ul className="flex flex-col divide-y dark:divide-gray-700 min-w-max">
            {recommendations.map(recommendation => <li
                className="flex items-center gap-4 w-full relative box-border p-4 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300">
                {recommendation.priority === "HIGH" ?
                    <HiFire className="text-red-500"/> : recommendation.priority === "MEDIUM" ?
                        <HiExclamation className="text-orange-500"/> :
                        <HiInformationCircle className="text-blue-600"/>}
                <span>{recommendation.title}</span>
            </li>)}
        </ul>;
};

export default RecommendationList;