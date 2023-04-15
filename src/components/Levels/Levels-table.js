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
import { BASEURL, deleteLevel, getAllLevel } from 'src/NetworkUtils/NetworkUtils';
import { LevelListToolbar } from './Levels-list-toolbar';

export const LevelListResults = ({ customers, ...rest }) => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);


    var [allLevel, setallLevel] = useState([]);
    var [saveallLevel, setsaveallLevel] = useState([]);
    function getSearch(search) {
        var search = search.target.value;
        if (search !== '') {
            var data = allLevel.filter(recipe => recipe.TITLE.toLowerCase()
                .includes(search.toLowerCase()))
            setallLevel(data)
        }
        else {
            setallLevel(saveallLevel)
        }
    }

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };
    function getallLevel() {
        getAllLevel().then((res) => {
            if (res.code === 200) {
                setallLevel(res.Data);
                setsaveallLevel(res.Data);
            }
        })
    }
    function onDeleteTap(id) {
        deleteLevel(id).then((res) => {
            if (res.code == 200) {
                location.reload();
            }
        })
    }
    useEffect(() => {
        getallLevel()
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
                <LevelListToolbar getsearch={getSearch} />
                {newFunction(allLevel, limit, onDeleteTap, handlePageChange, handleLimitChange, page)}
            </Container>
        </Box>
    );
};

function newFunction(allLevel, limit, onDeleteTap, handlePageChange, handleLimitChange, page) {
    return <Box sx={{ mt: 3 }}>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: 'info.main' }}>
                    <TableRow>
                        <TableCell style={{ color: "white" }} align="center">Id</TableCell>
                        <TableCell style={{ color: "white" }} align="center">IMAGE</TableCell>
                        <TableCell style={{ color: "white" }} align="center">TITLE</TableCell>
                        <TableCell style={{ color: "white" }} align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allLevel?.slice(0, limit).map((data, i) => (
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
                                <NextLink href={'/levels/' + data._id}>
                                    <Button color='info' variant='contained' size="small" sx={{
                                        "&:hover": {
                                            backgroundColor: 'info.main',
                                            opacity: 0.5,
                                            boxShadow: '0 0.8em 0.5em -0.4em #b3b3b3'
                                        }
                                    }}>EDIT</Button>
                                </NextLink><br />
                                <Button style={{ marginTop: 10 }} color='error' size="small" onClick={() => onDeleteTap(data._id)}>DELETE</Button>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            component="div"
            count={allLevel?.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]} />
    </Box>;
}

