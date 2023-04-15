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
    Container
} from '@mui/material';
import { deleteTags, getAllTags } from 'src/NetworkUtils/NetworkUtils';
import { TagsListToolbar } from './tags-list-toolbar';
import { Box } from '@mui/system';

export const TagsListResults = ({ customers, ...rest }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    var [allTags, setallTags] = useState([]);
    var [saveallTags, setsaveallTags] = useState([]);

    function getSearch(search) {
        var search = search.target.value;
        if (search !== '') {
            var data = allTags.filter(recipe => recipe.TITLE.toLowerCase()
                .includes(search.toLowerCase()))
            setallTags(data)
        }
        else {
            setallTags(saveallTags)
        }
    }

    const handleLimitChange = (event) => {
        setRowsPerPage(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };
    function getallTags() {
        getAllTags().then((res) => {
            if (res.code === 200) {
                setallTags(res.Data);
                setsaveallTags(res.Data);
            }
        })
    }
    function onDeleteTap(id) {
        deleteTags(id).then((res) => {
            if (res.code == 200) {
                location.reload();
            }
        })
    }
    useEffect(() => {
        getallTags()
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
                <TagsListToolbar getsearch={getSearch} />
                {newFunction(allTags, onDeleteTap, handlePageChange, handleLimitChange, page, rowsPerPage)}
            </Container>
        </Box>
    );
};


function newFunction(allTags, onDeleteTap, handlePageChange, handleLimitChange, page, rowsPerPage) {
    return <Box sx={{ mt: 3 }}>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: 'info.main' }}>
                    <TableRow>
                        <TableCell style={{ color: "white" }} align="center">Id</TableCell>
                        <TableCell style={{ color: "white" }} align="center">TITLE</TableCell>
                        <TableCell style={{ color: "white" }} align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allTags?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, i) => (
                        <TableRow
                            key={data._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">{i + 1}</TableCell>
                            <TableCell component="th" scope="row" align='center'>
                                {data.TITLE}
                            </TableCell>
                            <TableCell align="center">
                                <NextLink href={'/tags/' + data._id}>
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
            count={allTags?.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
        />
    </Box>;
}

