import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {addDays, isSameDay} from "date-fns";
import axios from "axios";
import {Modal} from "@mui/material";

const ModalData = (props) => {
    const {lat, lon, modalOpen, setModalOpen, name} = props;
    const urlModal = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=6f75916276917b8d5e9528c491151b75`
    const [modalData, setModalData] = useState({});

    useEffect(() => {
        if(lat !== '' || lon !== ''){
            axios.get(urlModal).then((response) => {
                setModalData(response.data)
                console.log(response.data)
            })
            setTimeout(() => {
                document.getElementsByClassName('css-1l0kbh6')[0].style.width = 'auto';
            }, 400)
        }
    }, [])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#1976d2',
        borderRadius: '12px',
        color: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        display: 'flex',
        alignItems: 'center',
        p: 4,
    };

    const handleClose = () => {
        setModalOpen(false)
    }

    const todayWeather = () => {
        let todayData = [];
        if(Object.keys(modalData).length !== 0) {
            let currentDay = new Date(modalData.list[0].dt_txt.split(" ")[0]);
            console.log("current: ", currentDay);
            let singleDay = modalData.list.filter(item =>
                isSameDay(new Date(item.dt_txt.split(" ")[0]), currentDay)
            );
            console.log(singleDay)
            todayData.push(singleDay);
            currentDay = addDays(new Date(currentDay), 1);
        }
        return todayData;
    };
    return (
        <>
        {Object.keys(modalData).length !== 0 ?
        <Modal open={modalOpen} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box className="modal-size" sx={style} >
                {todayWeather().map((d, idx) => (
                    <>
                        <div key={idx}>
                            <h3>Location {name}</h3>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Time</TableCell>
                                            <TableCell align="right">Icon</TableCell>
                                            <TableCell align="right">Description</TableCell>
                                            <TableCell align="right">Main Desc</TableCell>
                                            <TableCell align="right">Humidity</TableCell>
                                            <TableCell align="right">Pressure</TableCell>
                                            <TableCell align="right">Temperature</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {d.map((f) => (
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {f.dt_txt}
                                                </TableCell>
                                                <TableCell align="right"><img src={`http://openweathermap.org/img/w/${f.weather[0].icon}.png`}/></TableCell>
                                                <TableCell align="right">{f.weather[0].description}</TableCell>
                                                <TableCell align="right">{f.weather[0].main}</TableCell>
                                                <TableCell align="right">{f.main.humidity}%</TableCell>
                                                <TableCell align="right">{f.main.pressure}</TableCell>
                                                <TableCell align="right">{f.main.temp}°</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </>
                ))}
            </Box>
        </Modal> : null}
        </>
    )
}

export default ModalData;