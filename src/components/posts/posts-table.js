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
import { BASEURL, deletePost, getAllPost, changeStatus } from 'src/NetworkUtils/NetworkUtils';
import { PostsListToolbar } from './posts-list-toolbar';
import Label from '../lables';

export const PostsListResults = ({ customers, ...rest }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    var [allPost, setallPosts] = useState([]);
    var [saveallPost, setsaveallPosts] = useState([]);

    function getSearch(search) {
        var search = search.target.value;
        if (search !== '') {
            var data = allPost.filter(recipe => recipe.TITLE.toLowerCase()
                .includes(search.toLowerCase()))
            setallPosts(data)
        }
        else {
            setallPosts(saveallPost)
        }

    }

    const handleLimitChange = (event) => {
        setRowsPerPage(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    function getallPosts() {
        getAllPost().then((res) => {
            if (res.code === 200) {
                setallPosts(res.Data);
                setsaveallPosts(res.Data);
            }
        })
    }
    function onDeleteTap(id) {
        deletePost(id).then((res) => {
            if (res.code == 200) {
                location.reload();
            }
        })
    }
    useEffect(() => {
        getallPosts()
    }, []);

    function changestatus(id) {
        changeStatus(id, 'Post').then((res) => {
            window.location.reload();
        })
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
                <PostsListToolbar getsearch={getSearch} />
                {newFunction(allPost, changestatus, onDeleteTap, handlePageChange, handleLimitChange, page, rowsPerPage)}
            </Container>
        </Box>
    );
};



function newFunction(allPost, changestatus, onDeleteTap, handlePageChange, handleLimitChange, page, rowsPerPage) {
    return <Box sx={{ mt: 3 }}>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: 'info.main' }}>
                    <TableRow>
                        <TableCell style={{ color: "white" }} align="center">Id</TableCell>
                        <TableCell style={{ color: "white" }} align="center">IMAGE</TableCell>
                        <TableCell style={{ color: "white" }} align="center">TITLE</TableCell>
                        <TableCell style={{ color: "white" }} align="center">TAG</TableCell>
                        <TableCell style={{ color: "white" }} align="center">STATUS</TableCell>
                        <TableCell style={{ color: "white" }} align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allPost?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, i) => (
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
                                {data.TAG}
                            </TableCell>

                            <TableCell component="th" scope="row" align='center'>
                                <Label onClick={() => changestatus(data._id)} variant="ghost" color={(data.STATUS === 'Inactive' && 'error') || 'primary'}>
                                    {data.STATUS}
                                </Label>
                            </TableCell>
                            <TableCell align="center">
                                <NextLink href={'/posts/' + data._id}>
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
            count={allPost?.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]} />
    </Box>;
}

