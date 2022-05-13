import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);

const DndCalendar = withDragAndDrop(Calendar);

const MyCalendar = ({
                        events,
                        onEventDrop,
                        onEventResize,
                        eventPropGetter,
                        onDropFromOutside,
                        onDragOver,
                        dragFromOutsideItem
                    }) => {
    return (
        <DndCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            draggableAccessor="isDraggable"
            onEventDrop={onEventDrop}
            onEventResize={onEventResize}
            eventPropGetter={eventPropGetter}
            onDropFromOutside={onDropFromOutside}
            onDragOver={onDragOver} dragFromOutsideItem={dragFromOutsideItem}
            style={{ width: "100%", height: "100%" }}
        />
    );
};

export default MyCalendar;