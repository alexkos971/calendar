import React from "react";
import styles from "./Calendar.module.scss";
import Sidebar from "../Sidebar";
import CalendarBox from "../CalendarBox";

const Calendar: React.FC = () => {
    return (
        <div className={styles.calendar}>
            <Sidebar/>
            <CalendarBox/>
        </div>
    )
}

export default Calendar;