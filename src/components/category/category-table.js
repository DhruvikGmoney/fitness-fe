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
import { BASEURL, deleteCategory, getAllCategory } from 'src/NetworkUtils/NetworkUtils';
import { CategoryListToolbar } from './category-list-toolbar';

export const CategoryListResults = ({ customers, ...rest }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    var [allCategories, setallCategories] = useState([]);
    var [saveallCategories, setsaveallCategories] = useState();

    function getSearch(search) {
        var search = search.target.value;
        if (search !== '') {
            var data = allCategories.filter(recipe => recipe.TITLE.toLowerCase()
                .includes(search.toLowerCase()))
            setallCategories(data)
        }
        else {
            setallCategories(saveallCategories)
        }
    }

    const handleLimitChange = (event) => {
        setRowsPerPage(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };
    function getallCategory() {
        getAllCategory().then((res) => {
            if (res.code === 200) {
                setallCategories(res.Data);
                setsaveallCategories(res.Data);
            }
        })
    }
    function onDeleteTap(id) {
        deleteCategory(id).then((res) => {
            if (res.code == 200) {
                location.reload();
            }
        })
    }
    useEffect(() => {
        getallCategory()
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
                <CategoryListToolbar getsearch={getSearch} />
                {newFunction(allCategories, onDeleteTap, handlePageChange, handleLimitChange, page, rowsPerPage)}
            </Container>
        </Box>
    );
};



function newFunction(allCategories, onDeleteTap, handlePageChange, handleLimitChange, page, rowsPerPage) {
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
                    {allCategories?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, i) => (
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
                                <NextLink href={'/categories/' + data._id}>
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
            count={allCategories?.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]} />
    </Box>;
}

