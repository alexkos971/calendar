import React, { EventHandler } from "react";
import styles from "./Modal.module.scss"

interface ModalProps {
    task: Object,
    data: Object[],
    setAdd: Function
}

const Modal: React.FC<ModalProps> = ({ data = [], setAdd }) => {
    const [task, setTask] = React.useState({time: "", text: ""})

    const btnDisabled = (task.time.length && task.text.length)

    const handlerInput = (e: EventHandler) => {
        setTask({...task, [e.target.name]: e.target.value })
    }

    const submit = async () => {
        data.push(task)
        setAdd(false)
    }

    return (
        <div className={styles.modal}>
            <h2>Add new task:</h2>

            <div className={styles.time}>
                <p>Choise time for task</p>
                <input placeholder={"00:00"} name="time" onChange={(e) => handlerInput(e)}/>
            </div>
            
            <div className={styles.text}>
                <p>Enter text of task</p>
                <input placeholder={"Type something..."} name="text" onChange={(e) => handlerInput(e)}/>
            </div>

            <button disabled={!btnDisabled} onClick={submit}>Add</button>
        </div>
    )
}

export default Modal;