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
import { BASEURL, deleteWorkout, getAllWorkouts, changeWorkoutStatus, changeStatus } from 'src/NetworkUtils/NetworkUtils';
import { WorkoutListToolbar } from './allworkouts-list-toolbar';
import Label from '../lables';

export const WorkoutListResults = ({ customers, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  var [allworkouts, setallworkouts] = useState([]);
  var [saveallworkouts, setsaveallworkouts] = useState([]);

  function getSearch(search) {
    var search = search.target.value;
    if (search !== '') {
      var data = allworkouts.filter(recipe => recipe.TITLE.toLowerCase()
        .includes(search.toLowerCase()))
      setallworkouts(data)
    }
    else {
      setallworkouts(saveallworkouts)
    }
  }

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  function getallworkouts() {
    getAllWorkouts().then((res) => {
      if (res.code === 200) {
        setallworkouts(res.Data);
        setsaveallworkouts(res.Data);
      }
    })
  }
  function onDeleteTap(id) {
    deleteWorkout(id).then((res) => {
      if (res.code == 200) {
        location.reload();
      }
    })
  }

  function changestatus(id) {
    changeStatus(id, 'Workout').then((res) => {
      console.log(res);
      window.location.reload();
    })
  }

  useEffect(() => {
    getallworkouts()
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
        <WorkoutListToolbar getsearch={getSearch} />
        {newFunction(allworkouts, limit, changestatus, onDeleteTap, handlePageChange, handleLimitChange, page)}
      </Container>
    </Box>
  );
};

function newFunction(allworkouts, limit, changestatus, onDeleteTap, handlePageChange, handleLimitChange, page) {
  return <Box sx={{ mt: 3 }}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: 'info.main' }}>
          <TableRow>
            <TableCell style={{ color: "white" }} align="center">Id</TableCell>
            <TableCell style={{ color: "white" }} align="center">IMAGE</TableCell>
            <TableCell style={{ color: "white" }} align="center">TITLE</TableCell>
            <TableCell style={{ color: "white" }} align="center">DESCRIPTION</TableCell>
            <TableCell style={{ color: "white" }} align="center">GOAL</TableCell>
            <TableCell style={{ color: "white" }} align="center">LEVEL</TableCell>
            <TableCell style={{ color: "white" }} align="center">DURATION</TableCell>
            <TableCell style={{ color: "white" }} align="center">STATUS</TableCell>
            <TableCell style={{ color: "white" }} align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allworkouts?.slice(0, limit).map((data, i) => (
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
              <TableCell component="th" scope="row">
                {data.TITLE}
              </TableCell>
              <TableCell align="center">{data.DESCRIPTION.substring(0, 20) + '...'}</TableCell>
              <TableCell align="center">{data.GOAL}</TableCell>
              <TableCell align="center">{data.LEVEL}</TableCell>
              <TableCell align="center">{data.DURATION}</TableCell>
              <TableCell align="center">

                <Label onClick={() => changestatus(data._id)} variant="ghost" color={(data.STATUS === 'Inactive' && 'error') || 'primary'}>
                  {data.STATUS}
                </Label>

              </TableCell>
              <TableCell align="center">
                <NextLink href={'/allworkouts/' + data._id}>
                  <Button color='info' variant='contained' size="small" sx={{
                    "&:hover": {
                      backgroundColor: 'info.main',
                      opacity: 0.5,
                      boxShadow: '0 0.8em 0.5em -0.4em #b3b3b3'
                    }
                  }}>EDIT</Button>
                </NextLink>
                <Button style={{ marginTop: 10 }} color='error' size="small" onClick={() => onDeleteTap(data._id)}>DELETE</Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      component="div"
      count={allworkouts?.length}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleLimitChange}
      page={page}
      rowsPerPage={limit}
      rowsPerPageOptions={[5, 10, 25]} />
  </Box>;
}

