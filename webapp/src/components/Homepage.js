import React, { useState } from "react";
import './Homepage.css'
import Button from '@mui/material/Button';
import { OneWeekBefore } from "./OneWeekBefore";
import { TwoWeekBefore } from "./TwoWeekBefore";
import { ThirtyDaysBefore } from "./ThirtyDaysBefore";

const Homepage = () => {
    //     const [open, setOpen] = useState(false)
    //     const openStarRepoComponent = () => {
    //         setOpen(true)
    //     }
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

    const openOneWeekComponent = () => {
        setOpen1(true);
        setOpen2(false)
        setOpen3(false)
    };
    const openTwoWeekComponent = () => {
        setOpen2(true);
        setOpen1(false)
        setOpen3(false)
    };
    const openThirtyDaysComponent = () => {
        setOpen3(true);
        setOpen1(false)
        setOpen2(false)
    };

    return (
        <div className="homepage-container">
            <h1>Most Starred Repository</h1>
            <div className="container">
                <div className="btn1-container">
                    <Button
                        className="btnn1"
                        variant="outlined"
                        onClick={openOneWeekComponent}
                        style={{border:'none'}}
                        >1 Week before
                    </Button>
                    <div className="display">
                        {open1 && <OneWeekBefore />}
                    </div>
                </div>
                <div className="btn2-container">
                    <Button
                        className="btnn2"
                        variant="outlined"
                        onClick={openTwoWeekComponent}
                        style={{border:'none'}}
                        >2 Week before
                    </Button>
                    <div className="display">
                        {open2 && <TwoWeekBefore />}

                    </div>
                </div>
                <div className="btn3-container">
                    <Button
                        className="btnn3"
                        variant="outlined"
                        onClick={openThirtyDaysComponent}
                        style={{border:'none'}}
                        >1 month before
                    </Button>
                    <div className="display">
                        {open3 && <ThirtyDaysBefore />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;