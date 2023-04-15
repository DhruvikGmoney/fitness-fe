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
import { BASEURL, deleteRecipe, getAllRecipe, changeStatus } from 'src/NetworkUtils/NetworkUtils';
import { RecipeListToolbar } from './recipe-list-toolbar';
import Label from '../lables';

export const RecipeListResults = ({ customers, ...rest }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    var [allRecipe, setallRecipe] = useState([]);
    var [saveallRecipe, setsaveallRecipe] = useState([]);

    function getSearch(search) {
        var search = search.target.value;
        if (search !== '') {
            var data = allRecipe.filter(recipe => recipe.TITLE.toLowerCase()
                .includes(search.toLowerCase()))
            setallRecipe(data)
        }
        else {
            setallRecipe(saveallRecipe)
        }
    }

    const handleLimitChange = (event) => {
        setRowsPerPage(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };
    function getallRecipe() {
        getAllRecipe().then((res) => {
            if (res.code === 200) {
                setallRecipe(res.Data);
                setsaveallRecipe(res.Data);
            }
        })
    }
    function onDeleteTap(id) {
        deleteRecipe(id).then((res) => {
            if (res.code == 200) {
                location.reload();
            }
        })
    }
    function changestatus(id) {
        changeStatus(id, 'Recipe').then((res) => {
            window.location.reload();
        })
    }
    useEffect(() => {

        getallRecipe()

    }, []);


    const RecipeTable = (props) => {
        return (
            <Box sx={{ mt: 3 }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                        <TableHead sx={{ backgroundColor: 'info.main', }}>
                            <TableRow>
                                <TableCell style={{ color: "white" }} align="center" >Id</TableCell>
                                <TableCell style={{ color: "white" }} align="center" >IMAGE</TableCell>
                                <TableCell style={{ color: "white" }} align="center">TITLE</TableCell>
                                <TableCell style={{ color: "white" }} align="center">CATEGORY</TableCell>
                                <TableCell style={{ color: "white" }} align="center">PRICE</TableCell>
                                <TableCell style={{ color: "white" }} align="center">SERVINGS</TableCell>
                                <TableCell style={{ color: "white" }} align="center">TOTAL_TIME</TableCell>
                                <TableCell style={{ color: "white" }} align="center">STATUS</TableCell>
                                <TableCell style={{ color: "white" }} align="center">ACTION</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.filteredallRecipe?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, i) => (
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
                                    <TableCell component="th" scope="row" align='center'>
                                        {data.CATEGORY}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align='center'>
                                        {data.PRICE}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align='center'>
                                        {data.SERVINGS}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align='center'>
                                        {data.TOTAL_TIME}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align='center'>
                                        <Label onClick={() => changestatus(data._id)} variant="ghost" color={(data.STATUS === 'Inactive' && 'error') || 'primary'}>
                                            {data.STATUS}
                                        </Label>
                                    </TableCell>
                                    <TableCell align="center">
                                        <NextLink href={'/recipe/' + data._id}>
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
                    count={allRecipe?.length}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </Box>
        )
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
                <RecipeListToolbar getsearch={getSearch} />
                <RecipeTable filteredallRecipe={allRecipe}></RecipeTable>
            </Container>
        </Box>
    );
};

