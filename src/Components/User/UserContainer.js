import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import StatusBadge from '../OtherComponent/StatusBadge';
import Moment from 'react-moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { history } from '../../Helpers/history';
import config from '../../Services/config';
import axios from 'axios';

const styles = makeStyles(
    (theme) => ({
        root: {
            width: '100%',
            marginTop: theme.spacing(1),
            overflowX: 'auto',
            padding: 20,
            maxHeight: 600
        },
        table: {
            minWidth: 650,
        },
        table_row_clickable: {
            cursor: 'pointer'
        },
        progress: {
            position: "absolute",
            top: "50%",
            left: "50%",
        },
        noUser: {
            padding: theme.spacing(3, 2),
            width: '100%',
            textAlign: 'center'
        },

        tableWrapper: {
            textAlign: 'center',
            height: 500,
            maxHeight: 500,
            position: "relative"
        },
        orderDone: {
            display: "inline-block",
            minWidth: "1em",
            padding: ".3em",
            borderRadius: "4px",
            textAlign: "center",
            background: "rgb(3,172,14)",
            color: "white"
        },

        orderRejected: {
            display: "inline-block",
            minWidth: "1em",
            padding: ".3em",
            borderRadius: "4px",
            textAlign: "center",
            background: "rgb(226,0,0)",
            color: "white"
        }
    })
)

function UserListTable({users}) {
    const classes = styles();
    
    return (
        <Table stickyheader="true" className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Nama</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>No. Handphone</TableCell>
                    <TableCell align="right">Status Verifikasi</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {(users.map(user => (
                    <TableRow 
                        hover
                        key={user._id} 
                    >
                        <TableCell component="th" scope="row">
                            {user.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {user.email}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {(user.phoneNumber ? user.phoneNumber : "---")}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {
                                (user.verified) ? (<StatusBadge type="done">Terverifikasi</StatusBadge>) 
                                : (<StatusBadge type="reject">Belum terverifikasi</StatusBadge>) 
                                
                            }
                        </TableCell>
                    </TableRow>
                )))
                }
            </TableBody>
        </Table>
    )
}


export default function UserContainer() {
    const classes = styles();
    const [users, setUserList] = useState([]);
    const [loading, setLoading] = useState(false);

    const userFetch = async () => {
        setLoading(true);

        try {
            let auth = {Authorization: "Bearer " + localStorage.getItem("token")};

            const { data } = await axios.get(`${config.baseUrl}user/getAll`, {headers: auth});
            await setUserList(data.data);

            setLoading(false);

        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        
        userFetch();

        
    }, [])

    return(
        <Paper className={classes.root}>
            <Typography 
                variant="h4" 
                component="div" 
                align="left"
            >
                Daftar Pengguna Konveksiana
            </Typography>
            <div className={classes.tableWrapper}>
                {
                    loading ? <CircularProgress className={classes.progress} /> 
                        : users.length > 0 ? 
                        (
                            <UserListTable
                                users={users}
                            />
                        )
                        :
                        (
                            <Typography 
                                    align='center'
                                    className={classes.marginTop20}
                                >
                                    Tidak ada pengguna untuk ditampilkan.
                            </Typography> 
                        ) 
                }
            </div>
        </Paper>
    )
}