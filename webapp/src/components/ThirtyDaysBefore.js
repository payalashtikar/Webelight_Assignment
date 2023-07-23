import { useEffect, useState } from 'react'
import * as React from "react";
import './OneWeek.css'
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material';

import Button from '@mui/material/Button';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const ThirtyDaysBefore = () => {
    const [timePeriod, setTimePeriod] = useState("ThirtyDaysBefore")
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [commitDetails, setCommitDetails] = useState('')

    const perPage = 100;

    useEffect(() => {
        const getData = async () => {
            const todaysDate = new Date();
            console.log(" todaysDate:", todaysDate)

            todaysDate.setDate(todaysDate.getDate() - 30);
            console.log("::", todaysDate)

            let getStartDate;
            if (timePeriod === "ThirtyDaysBefore") {
                getStartDate = new Date();
                getStartDate.setDate(getStartDate.getDate() - 30);
            }
            const startingDateString = getStartDate.toISOString().split("T")[0];
            console.log("startingDateString:", startingDateString)

            const endingDateString = new Date().toISOString().split("T")[0];
            console.log("endingDateString:", endingDateString)

            try {
                const url =
                    // `https://api.github.com/search/repositories?q=created:${startingDateString}..${endingDateString}&sort=stars&order=desc`

                    // `https://api.github.com/search/repositories?q=created:${startingDateString}..${endingDateString}&sort=stars&order=desc`

                    // `https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc`
                    `https://api.github.com/search/repositories?q=created:${startingDateString}..${endingDateString}&sort=stars&order=desc&page=${page}&per_page=${perPage}`

                const response = await fetch(url);
                const data = await response.json();
                console.log(data)
                setData(data.items);
            }
            catch (error) {
                console.log("error ::", error)
            }

        }
        getData()
    }, [timePeriod, page])

    const nextPage = () => setPage(page + 1)

    const previousPage = () => setPage(page - 1)


    const handleChange = (event) => {
        setCommitDetails(event.target.value);
        setPage(1); // Reset page to 1 when the period changes
    };

    return (
        <div className="table-container">
            {data && data.map((val) => {
                return (
                    <div className='data-container' key={val.id} >
                        <div className='avtar'>
                            <Avatar sx={{ width: '100px', margin: '2px', padding: '20px' }} variant="square">
                                <img src={val.owner.avtar_url} alt='loading...' />
                            </Avatar>
                        </div>
                        <div className='details-container'>
                            <Typography className='' variant='h5' style={{ padding: '7px' ,fontWeight:'bold' }}>{val.name}</Typography>
                            <Typography className='body1' variant='body1' component='div' style={{ padding: '7px' ,paddingTop:0}} >{val.description}</Typography>
                            <Typography className='' variant='body1' component='div' style={{ padding: '7px',display:'flex' ,fontWeight:0}}>
                                <Typography style={{paddingRight:"30px",border:'1px soild'}}>Count : {val.stargazers_count}</Typography>
                                <Typography style={{paddingRight:"30px"}}>Issues : {val.open_issues}</Typography>
                                <Typography style={{}}>Last pushed {val.pushed_at} by {val.owner.login}</Typography>
                            </Typography>
                        </div>
                        <div className=''>
                            <div>
                                <FormControl sx={{ m: 1, minWidth: 10 }}>
                                    <InputLabel variant='standard' id="demo-simple-select-autowidth-label" style={{border:'none'}}></InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        value={commitDetails}
                                        onChange={handleChange}
                                        autoWidth
                                        label=""
                                    >
                                        {/* <MenuItem value={commitDetails}>{val.commits_url}</MenuItem> */}
                                        <MenuItem value='Commits'>Commits</MenuItem>
                                        <MenuItem value='Additions'>Additions</MenuItem>
                                        <MenuItem value='Deletions'>Deletions</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                )

            })}
            <div className='pag-btn'>
                {/* <button onClick={previousPage}>Previous</button> */}
                {/* <button onClick={nextPage}>Next</button> */}
                <Button
                        className="btn"
                        variant="outlined"
                        onClick={previousPage}
                        style={{border:'none'}}

                       >Previous
                    </Button>
                    <Button
                        className="btn1"
                        variant="outlined"
                        onClick={nextPage}
                        style={{border:'none'}}

                       >Next
                    </Button>
            </div>
        </div>
    )
}