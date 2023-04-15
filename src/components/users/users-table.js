import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import React from 'react';
import { changeStatus } from 'src/NetworkUtils/NetworkUtils';
import InfoIcon from '@mui/icons-material/Info'
import NextLink from 'next/link';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableContainer,
    Paper,
    TableRow,
    Button,
    Typography,
    Container,
    Box
} from '@mui/material';
import { getAllUsers, deteleuser } from 'src/NetworkUtils/NetworkUtils';
import { UsersListToolbar } from './users-list-toolbar';

export const UsersListResults = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    var [allUsers, setallUsers] = useState([]);
    var [saveallUsers, setsaveallUsers] = useState([]);

    function getSearch(search) {
        var search = search.target.value;
        if (search !== '') {
            var data = allUsers.filter(user => user.Name.toLowerCase()
                .includes(search.toLowerCase()))
            setallUsers(data)
        }
        else {
            setallUsers(saveallUsers)
        }
    }

    const handleLimitChange = (event) => {
        setRowsPerPage(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };


    function getalluser() {
        getAllUsers().then((res) => {
            if (res.code === 200) {
                setallUsers(res.Data);
                setsaveallUsers(res.Data);
            }
        })
    }
    function onDeleteTap(id) {
        deteleuser(id).then((res) => {
            if (res.code == 200) {
                location.reload();
            }
        })
    }
    function changestatus(id) {
        changeStatus(id, 'User').then((res) => {
            window.location.reload();
        })
    }

    useEffect(() => {
        getalluser()
    }, []);

    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
        },
    }));

    function convertDateTime(date) {
        var dateUTC = new Date(date);
        var dateUTC = dateUTC.getTime()
        var dateIST = new Date(dateUTC);
        return dateIST.toLocaleDateString() + ' ' + dateIST.toLocaleTimeString();
    }

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Container maxWidth={false}>
                <UsersListToolbar getsearch={getSearch} />
                {newFunction(allUsers, page, rowsPerPage, convertDateTime, HtmlTooltip, onDeleteTap, changestatus, handlePageChange, handleLimitChange)}
            </Container>
        </Box>
    );
};

function newFunction(allUsers, page, rowsPerPage, convertDateTime, HtmlTooltip, onDeleteTap, changestatus, handlePageChange, handleLimitChange) {
    return <Box sx={{ mt: 3 }}>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: 'info.main' }}>
                    <TableRow>
                        <TableCell style={{ color: "white" }} align="center">Id</TableCell>
                        <TableCell style={{ color: "white" }} align="center">Name</TableCell>
                        <TableCell style={{ color: "white" }} align="center">Email</TableCell>
                        <TableCell style={{ color: "white" }} align="center">Mobile</TableCell>
                        <TableCell style={{ color: "white" }} align="center">Joining_Date</TableCell>
                        <TableCell style={{ color: "white" }} align="center">Info</TableCell>
                        <TableCell style={{ color: "white" }} align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, i) => (
                        <TableRow
                            key={data._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">{i + 1}</TableCell>
                            <TableCell component="th" scope="row" align='center'>
                                {data.Name}
                            </TableCell>
                            <TableCell component="th" scope="row" align='center'>
                                {data.Email}
                            </TableCell>
                            <TableCell component="th" scope="row" align='center'>
                                {data.Mobile}
                            </TableCell>
                            <TableCell component="th" scope="row" align='center'>
                                {convertDateTime(data.Joining_Date.toString()).toString()}
                            </TableCell>
                            <TableCell component="th" scope="row" align='center'>
                                <HtmlTooltip
                                    title={<React.Fragment>
                                        <Typography color="inherit">User info</Typography>
                                        <b>{"Gender:"}</b> {data.Gender}<br />
                                        <b>{"Age:"}</b> {data.Age}<br />
                                        <b>{"Goal:"}</b> {data.Goal}<br />
                                        <b>{"Category:"}</b> {data.Category}<br />
                                        <b>{"Height:"}</b> {data.Height}<br />
                                        <b>{"Weight:"}</b> {data.Weight}<br />
                                    </React.Fragment>}
                                >
                                    <InfoIcon />
                                </HtmlTooltip>
                            </TableCell>
                            <TableCell align="center">
                                <NextLink href={'/users/' + data._id}>
                                    <Button color='info' variant='contained' size="small" sx={{
                                        "&:hover": {
                                            backgroundColor: 'info.main',
                                            opacity: 0.5,
                                            boxShadow: '0 0.8em 0.5em -0.4em #b3b3b3'
                                        }
                                    }}>EDIT</Button>
                                </NextLink><br />
                                <Button style={{ marginTop: 10 }} color='error' size="small" onClick={() => onDeleteTap(data._id)}>DELETE</Button>
                                <Button style={{ marginTop: 10 }} color={data.Status === 'Active' ? 'info' : 'error'} size="small" onClick={() => changestatus(data._id)}>{data.Status}</Button>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            component="div"
            count={allUsers?.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]} />
    </Box>;
}

