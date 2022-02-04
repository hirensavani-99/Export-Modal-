import React, { useState, useRef } from 'react';
import axios from 'axios'

import classes from './Form.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Form() {

    const [schedule, setSchedule] = useState("No Repeat")
    const [formate, setFormate] = useState("Excel")

    const reportName = useRef("")
    const emailTo = useRef("")
    const date = useRef("")
    const time = useRef("")
    const day = useRef("")


    const radioHandler = (scheduleType) => {
        setSchedule(scheduleType)
    }

    const formateRadio = (scheduleType) => {
        setFormate(schedule)
    }

    const handleFormSubmition = async (e) => {
        e.preventDefault();

        const enteredReportName = reportName.current.value;
        const enteredEmailTo = emailTo.current.value;
        const enteredSchedule = day.current.value + time.current.value + date.current.value + schedule

        if (enteredReportName.trim() !== '' && enteredEmailTo.trim() !== '' && enteredSchedule.trim() !== '') {
            const data = {
                reportName: enteredReportName,
                emailTo: enteredEmailTo,
                schedule: enteredSchedule,
                format: formate
            }

            try {
                let response = await axios.post('http://localhost:8000/modal', data)

                console.log(response);

                if (response.status === 200) {
                    toast.success("get you data buddy")
                }

            } catch (e) {
                toast.success("something went wrong")
            }
        }

    }

    return (
        <div className={classes.root}>
            <ToastContainer />
            <div className={classes.head}>
                <h4 className={classes.Label1}>Export report</h4>
            </div>
            <form className={classes.container} >
                <div className={classes.divComponent}>
                    <label className={classes.Label}>
                        Report name
                    </label>
                    <input className={classes.input} type="text" name="name" ref={reportName} />
                </div>

                <div className={classes.divComponent}>
                    <label className={classes.Label}>
                        Format:
                    </label>
                    <div className={classes.radios1}>
                        <label className={classes.labalRadio}>Excel
                            <input type="radio" name="radio1" onClick={() => formateRadio("Excel")} />
                            <span className="checkmark"></span>
                        </label>
                        <label className={classes.labalRadio}>CSV
                            <input type="radio" name="radio1" onClick={() => formateRadio("CSV")} />
                            <span className="checkmark"></span>
                        </label>
                    </div >

                </div>

                <div className={classes.divComponent}>
                    <label className={classes.Label}>
                        Email to
                    </label>
                    <input className={classes.input} type="email" name="email" ref={emailTo} />
                </div>
                <div className={classes.divComponent}>
                    <label className={classes.Label}>
                        Schedule
                    </label>

                    <div className={classes.radios}>
                        <label className={classes.labalRadio}>No Repeat
                            <input type="radio" name="radio" onClick={() => radioHandler("No Repeat")} />
                            <span className="checkmark"></span>
                        </label>
                        <label className={classes.labalRadio}>Specific Date
                            <input type="radio" name="radio" onClick={() => radioHandler("Specific Date")} />
                            <span className="checkmark"></span>
                        </label>
                        <label className={classes.labalRadio}>Daily
                            <input type="radio" name="radio" onClick={() => radioHandler("Daily")} />
                            <span className="checkmark"></span>
                        </label>
                        <label className={classes.labalRadio}>Weekly
                            <input type="radio" name="radio" onClick={() => radioHandler("Weekly")} />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>

                {schedule === "Specific Date" && <div className={classes.divComponent}>
                    <label className={classes.Label}>
                        Date
                    </label>
                    <input className={classes.input1} type="Date" ref={date} />
                    <p>at</p>
                    <input className={classes.input1} type="time" ref={time} />
                </div>}

                {schedule === "Daily" && <div className={classes.divComponent}>
                    <label className={classes.Label}>
                        Everyday at
                    </label>

                    <input className={classes.input1} type="time" ref={time} />
                </div>}

                {schedule === "Weekly" && <div className={classes.divComponent}>
                    <label className={classes.Label}>
                        Every
                    </label>
                    <select className={classes.input1} ref={day}>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Wednessday">Wednessday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                    <p>at</p>
                    <input className={classes.input1} type="time" ref={time} />
                </div>}


                <div className={classes.border}></div>
                <div className={classes.btnContainer}>
                    <input className={classes.button} value="cancle" type="submit" />

                    <button className={classes.button} type="button" onClick={(e) => handleFormSubmition(e)} >ok</button >
                </div>



            </form>
        </div>

    );
}
