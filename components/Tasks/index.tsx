import clsx from "clsx";
import React, { MouseEvent, ReactEventHandler } from "react";
import styles from "./Tasks.module.scss";
import Modal from "../Modal";

interface TasksProps {
    data: Array<Object<string>>,
    setData: Function
}

const Tasks: React.FC<TasksProps> = ({ data = [], setData }) => {
    const li = React.useRef(null)
    const [ add, setAdd ] = React.useState(false)

    const deleteItem = async (item, index) => {
        if (window.confirm(`Are you realy want to delete ${item.text.substr(0, 4)}...`)) {
            let newData = await data.filter((el, i) => i !== index);
            setData(newData)
        }
    }

    const editItem = async (item, index) => {
        const newItem = window.prompt(`Edit this task - ${item.text.substr(0, 4)}...`, item.text);
        let newData = await data.map((elem, i) => {
            if (i === index) {
                elem.text = newItem;
            }
            return elem
        })
        setData(newData);
    }

    // const handleMove = (e) => {
    //     if (e.nativeEvent.wheelDelta < 0) {
    
    //         console.log('d')
    //     } 
    // }
        
    // console.log(li.current && li.current.getBoundingClientRect())

    return (
        <div className={styles.tasks}>
            { add && <Modal data = {data} setAdd={setAdd}/> }
            <h4>You tasks today:</h4>


            <div className={styles.container}>
                <ul>
                    {
                        data.map((item, index) => 
                            <li key={index} ref={li}>
                                <div>
                                    <span className={styles.tasks_time}>{item["time"]}</span>
                                    <span className={styles.tasks_text}>{item["text"]}</span>
                                </div>

                                <div className={styles.hidden}>
                                    <img src={'/static/edit.png'} onClick={() => editItem(item, index)}/>
                                    <img src={'/static/delete.png'} onClick={() => deleteItem(item, index)}/>
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>
            
            <div className={clsx(styles.tasks_add, add ? styles.active: "")} onClick={() => setAdd(!add)}>
                <img src='/static/plus.svg'/>
            </div>
        </div>
    )
}

export default Tasks;