import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);

const DndCalendar = withDragAndDrop(Calendar);

const myEventsList = [
    { start: new Date(), end: new Date(), title: "special event" }
];

const MyCalendar = props => {
    return (
        <div>
            <DndCalendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "500px" }}
            />
        </div>
    );
};

export default MyCalendar;