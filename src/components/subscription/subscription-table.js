import { useEffect, useState } from 'react';
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
import { BASEURL, changeStatus, deleteSubscription, getAllSubscription } from 'src/NetworkUtils/NetworkUtils';
import { SubscriptionListToolbar } from './subscription-list-toolbar';
import Label from '../lables';

export const SubscriptionListResults = ({ customers, ...rest }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    var [Subscriptions, setallSubscriptions] = useState([]);
    var [saveSubscriptions, setallsaveSubscriptions] = useState([]);

    function getSearch(search) {
        var search = search.target.value;
        if (search !== '') {
            var data = Subscriptions.filter(recipe => recipe.NAME.toLowerCase()
                .includes(search.toLowerCase()))
            setallSubscriptions(data)
        }
        else {
            setallSubscriptions(saveSubscriptions)
        }
    }

    const handleLimitChange = (event) => {
        setRowsPerPage(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    function getallSubscription() {
        getAllSubscription().then((res) => {
            if (res.code === 200) {
                setallSubscriptions(res.Data);
                setallsaveSubscriptions(res.Data);
            }
        })
    }
    function onDeleteTap(id) {
        deleteSubscription(id).then((res) => {
            if (res.code == 200) {
                location.reload();
            }
        })
    }

    function changestatus(id) {
        changeStatus(id, 'Subscription').then((res) => {
            window.location.reload();
        })
    }
    useEffect(() => {
        getallSubscription()
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
                <SubscriptionListToolbar getsearch={getSearch} />
                {newFunction(Subscriptions, page, rowsPerPage, changestatus, onDeleteTap, handlePageChange, handleLimitChange)}
            </Container>
        </Box>
    );
};

function newFunction(Subscriptions, page, rowsPerPage, changestatus, onDeleteTap, handlePageChange, handleLimitChange) {
    return <Box sx={{ mt: 3 }}>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: 'info.main' }}>
                    <TableRow>
                        <TableCell style={{ color: "white" }} align="center">Id</TableCell>
                        <TableCell style={{ color: "white" }} align="center">IMAGE</TableCell>
                        <TableCell style={{ color: "white" }} align="center">NAME</TableCell>
                        <TableCell style={{ color: "white" }} align="center">DESCRIPTION</TableCell>
                        <TableCell style={{ color: "white" }} align="center">PRICE</TableCell>
                        <TableCell style={{ color: "white" }} align="center">STATUS</TableCell>
                        <TableCell style={{ color: "white" }} align="center">ACTION</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Subscriptions?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, i) => (
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
                                {data.NAME}
                            </TableCell>
                            <TableCell component="th" scope="row" align='center'>
                                {data.DESCRIPTION}
                            </TableCell>
                            <TableCell component="th" scope="row" align='center'>
                                {data.PRICE}
                            </TableCell>
                            <TableCell component="th" scope="row" align='center'>
                                <Label onClick={() => changestatus(data._id)} variant="ghost" color={(data.STATUS === 'INACTIVE' && 'error') || 'primary'}>
                                    {data.STATUS}
                                </Label>
                            </TableCell>
                            <TableCell align="center">
                                <NextLink href={'/subscription/' + data._id}>
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
            count={Subscriptions?.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]} />
    </Box>;
}

