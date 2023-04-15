import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
    Box,
    Container
} from '@mui/material';
import { BASEURL, deleteExercise, getAllExercise } from 'src/NetworkUtils/NetworkUtils';
import { ExcerciseListToolbar } from './exercise-list-toolbar';

export const ExcerciseListResults = ({ customers, ...rest }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    var [Excercises, setallExcercises] = useState([]);
    var [saveExcercises, setsaveallExcercises] = useState([]);

    function getSearch(search) {
        var search = search.target.value;
        if (search !== '') {
            var data = Excercises.filter(recipe => recipe.TITLE.toLowerCase()
                .includes(search.toLowerCase()))
            setallExcercises(data)
        }
        else {
            setallExcercises(saveExcercises)
        }
    }

    const handleLimitChange = (event) => {
        setRowsPerPage(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };
    function getallExcercise() {
        getAllExercise().then((res) => {
            if (res.code === 200) {
                setallExcercises(res.Data);
                setsaveallExcercises(res.Data);
            }
        })
    }
    function onDeleteTap(id) {
        deleteExercise(id).then((res) => {
            if (res.code == 200) {
                location.reload();
            }
        })
    }
    useEffect(() => {
        getallExcercise()
    }, []);

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Container maxWidth={false}>
                <ExcerciseListToolbar getsearch={getSearch} />
                <Box sx={{ mt: 3 }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                            <TableHead sx={{ backgroundColor: 'info.main', }}>
                                <TableRow>
                                    <TableCell style={{ color: "white" }} align="center" >Id</TableCell>
                                    <TableCell style={{ color: "white" }} align="center" >IMAGE</TableCell>
                                    <TableCell style={{ color: "white" }} align="center">TITLE</TableCell>
                                    <TableCell style={{ color: "white" }} align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Excercises?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, i) => (
                                    <TableRow
                                        key={data._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center">{i + 1}</TableCell>
                                        <TableCell align="center">
                                            <Box>
                                                <img id='image' src={data.IMAGE.toString().replace('http://localhost:8000/', BASEURL)} height={80} />
                                            </Box>
                                        </TableCell>
                                        <TableCell component="th" scope="row" align='center'>
                                            {data.TITLE}
                                        </TableCell>
                                        <TableCell align="center">
                                            <NextLink href={'/exercise/' + data._id}>
                                                <Button color='info' variant='contained' size="small" sx={{
                                                    "&:hover": {
                                                        backgroundColor: 'info.main',
                                                        opacity: 0.5,
                                                        boxShadow: '0 0.8em 0.5em -0.4em #b3b3b3',
                                                    }
                                                }} >EDIT</Button>
                                            </NextLink><br />
                                            <Button style={{ marginTop: 10 }} color='error' size="small" onClick={() => onDeleteTap(data._id)} >DELETE</Button>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={Excercises?.length}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleLimitChange}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                    />
                </Box>
            </Container>
        </Box>
    );
};

