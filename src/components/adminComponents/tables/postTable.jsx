import { useState, useMemo } from 'react';
import { memo } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import './table.css'
import { Button, ButtonGroup } from '@mui/material';
import { Visibility } from '@material-ui/icons';
import SimpleDialogDemo from '../../../pages/testing/test';


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'nom',
        numeric: false,
        disablePadding: false,
        label: 'Utilisateur',
    },
    {
        id: 'role',
        numeric: false,
        disablePadding: false,
        label: 'Role',
    },
    {
        id: 'created_at',
        numeric: false,
        disablePadding: false,
        label: 'Date de creation du post',
    },
    {
        id: 'post_desc',
        numeric: false,
        disablePadding: false,
        label: 'Description du post',
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Status (reporter ou non)',
    },
    {
        id: 'likes',
        numeric: false,
        disablePadding: false,
        label: 'Likes',
    },
    {
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: 'Action',
    },
];
const EnhancedTableHead = memo((props) => {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
                <TableCell align={`center`} style={{ fontWeight: 900 }} padding="checkbox">
                    Profile
                </TableCell>
                {headCells.map((headCell) => (

                    <TableCell
                        key={headCell.id}
                        align={`center`}
                        padding={`normal`}
                        sortDirection={orderBy === headCell.id ? order : false}
                        style={{ fontWeight: 900 }}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
});

const EnhancedTableToolbar = memo(() => {
    return (
        <Toolbar className="table-head" sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
            <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                TABLE DES POSTS
            </Typography>
        </Toolbar>
    );
});


export default function PostsTable({ deletePost, data }) {
    const [open, setOpen] = useState(false);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id_post');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [id, setId] = useState();
    const handleClickOpen = (id) => {
        setOpen(true);
        setId(id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    // Avoid a layout jump when reaching the last page with empty data.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const visibleRows = useMemo(
        () =>
            stableSort(data, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, data],
    );
    return (
        <Box className={'table-wraper'} sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar />
                <TableContainer>
                    <Table
                        className={'user-table'}
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'large'}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={row.id_post}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="normal">
                                            <Avatar alt="Profile Picture" src={row.user.pdp} />
                                        </TableCell>

                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="normal"
                                            style={{ fontSize: 16, fontWeight: 500 }}
                                        >
                                            {`${row.user.nom} ${row.user.prenom}`}
                                        </TableCell>
                                        <TableCell align="center">{row.user.role === 'super_admin' ? 'super admin' : row.user.role}</TableCell>
                                        <TableCell align="center">{row.created_at.slice(0, 10)}</TableCell>
                                        <TableCell align="center">{row.post_desc}</TableCell>
                                        <TableCell align="center" style={{ color: row.is_reported ? 'red' : '' }}>{row.is_reported ? 'reported' : 'not reported'}</TableCell>
                                        <TableCell align="center">{row.likes}</TableCell>
                                        <TableCell align="center">
                                            <ButtonGroup>
                                                <Button variant="outlined" onClick={() => deletePost(row.id_post)} color="error" startIcon={<DeleteIcon />}>
                                                    Delete
                                                </Button>
                                                <Button variant="outlined" onClick={() => handleClickOpen(row.id_post)} color="success" startIcon={<Visibility />}>
                                                    View
                                                </Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <SimpleDialogDemo id={id} handleClose={handleClose} open={open} />
        </Box>
    );
}
