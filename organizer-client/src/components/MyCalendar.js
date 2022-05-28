import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();

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
            messages={{
                next: t("Next"),
                previous: t("Previous"),
                today: t("Today"),
                month: t("Month"),
                week: t("Week"),
                day: t("Day"),
                agenda: t("Agenda"),
                date: t("Date"),
                time: t("Time"),
                event: t("Event"),
                allDay: t("AllDay"),
                work_week: t("WorkWeek"),
                yesterday: t("Yesterday"),
                tomorrow: t("Tomorrow"),
                noEventsInRange: t("NoEventsInRange")
            }}
            style={{ width: "100%", height: "100%" }}
        />
    );
};

export default MyCalendar;