import  React, { EventHandler } from "react";
import styles from "./CalendarBox.module.scss";
import * as calendar from "./calendar";
import clsx from "clsx";
import Modal from "../Modal";
import  CalendarCanvas from "../CalendarCanvas";

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

    const [selectEvent, setSelectEvent] = React.useState([])
    let [monthData, setMonthData] = calendar.getMonthData(nowDate.getFullYear(), nowDate.getMonth())

    // React.useEffect(() => {
    //     const store = localStorage.getItem('calendar_selectedDate');
    //     if (store) {
    //         setSelectedDate(JSON.parse(store))
    //     }
    // }, [])
    // currentMonth: 

    // const monthData = );

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

    const handlerMouse = (e) => {
        let newEvent = []

        e.target.addEventListener("mousedown", (event) => {
            // console.log(calendar_block.current.clientWidth)
            // setSelectEvent(null)
            newEvent = []
            newEvent.push(parseInt(event.target.outerText))
        })
        e.target.addEventListener("mouseup", async (event) => {
            newEvent.push(parseInt(event.target.outerText))
            // setSelectEvent(newEvent)

            const newData = await monthData.map(week => {
                week.forEach(item => {
                    if (item.date && (item.date.getDate() >= newEvent[0] && item.date.getDate() <= newEvent[1])) {
                        if (item.date.getDate() == newEvent[0]) {

                            item.selected = {
                                selected: true,
                                position: 'first'
                            }
                        }
                        else if (item.date.getDate() == newEvent[1]) {

                            item.selected = {
                                selected: true,
                                position: 'last'
                            }
                        }
                        else if (newEvent.length < 2) {

                            item.selected = {
                                selected: true,
                                position: 'single'
                            }

                        }
                        else {
                            item.selected = {
                                selected: true,
                                position: 'center'
                            }
                        }
                    }
                })
                return week
            })
            // await setSelectEvent(newData);
            console.log(newData, '--', nowDate, '--', monthData);
            setMonthData(newData);
            // await setSelectEvent(newData)
        })
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

            {/*  */}
            <div className={styles.monthData} onMouseEnter={handlerMouse} >
                {/* { calendar_block.current &&  */}
                    {/* <CalendarCanvas width={594} height={324}/> */}
                {/* } */}
                {
                    monthData.map((week, index) => 
                        <div className={styles.week} key={index}>
                            {
                                week.map((day, i) =>
                                    <div 
                                        key={i} 
                                        // onClick={() => handleSelectDay(day)}
                                        className={
                                            clsx(styles.day, 
                                                calendar.areEqual(day.date, currentDate) && styles.today, 
                                                day.selected && day.selected.selected && styles[`selectedDay--${day.selected.position}`] )}>
                                        {day.date ? day.date.getDate() : null}
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