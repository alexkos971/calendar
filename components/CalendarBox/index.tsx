import  React from "react";
import styles from "./CalendarBox.module.scss";
import * as calendar from "./calendar";
import clsx from "clsx";

interface CalendarBoxProps {
    date: Date,
    years: number[],
    monthNames: string[],
    weekDayNames: string[],
    onChange: Function
}


const CalendarBox: React.FC<CalendarBoxProps> = ({
        date = new Date(),
        years = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
        monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Noveber', 'December'],
        weekDayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
        onChange = Function.prototype
    }) => {

    const [nowDate, setNowDate ] = React.useState(date);
    const [currentDate, setCurrentDate ] = React.useState(new Date());
    const [ selectedDate, setSelectedDate ] = React.useState();

    // React.useEffect(() => {
    //     const store = localStorage.getItem('calendar_selectedDate');
    //     if (store) {
    //         setSelectedDate(JSON.parse(store))
    //     }
    // }, [])
    // currentMonth: 

    const monthData = calendar.getMonthData(nowDate.getFullYear(), nowDate.getMonth());

    const handleNextMont = (): void => {
        setNowDate(new Date(nowDate.getFullYear(), nowDate.getMonth() + 1))
    }
    
    const handlePrevMont = (): void => {
        setNowDate(new Date(nowDate.getFullYear(), nowDate.getMonth() - 1))
    }

    const handleSelectDay = (argDate): void => {
        setSelectedDate(argDate)
        // localStorage.setItem('calendar_selectedDate', selectedDate)
        onChange(argDate)
    }

    return (
        <div className={styles.calendar_box}>
            <div className={styles.header}>
                <img src="/static/left-arrow.svg" alt="Left arrow" onClick={handlePrevMont}/>
                <h1>{monthNames[nowDate.getMonth()]} {nowDate.getFullYear()}</h1>
                <img src="/static/right-arrow.svg" alt="Right arrow" onClick={handleNextMont}/>
            </div>

            <div className={styles.weekDays}>
                <ul>
                    {
                        weekDayNames.map(item => 
                            <li key={item}>{item}</li>    
                        )
                    }
                </ul>
            </div>

            <div className={styles.monthData}>
                {
                    monthData.map((week, index) => 
                        <div className={styles.week} key={index}>
                            {
                                week.map((day, i) =>
                                    <div 
                                        key={i} 
                                        onClick={() => handleSelectDay(day)}
                                        className={clsx(styles.day, calendar.areEqual(day, currentDate) && styles.today, calendar.areEqual(day, selectedDate) && styles.selectedDay)}>
                                        {day ? day.getDate() : null}
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default CalendarBox;