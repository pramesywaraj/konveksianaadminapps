import React from 'react'
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },

    userInformationTable: {
        width: '100%',
        padding: "20px 0",
        '& .placeholder': {
            width: "25%"
        }
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'baseline',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));

function PriceChangerSection() {
    const classes = styles();

    return (
        <div>
            <span>Ubah bila harga tidak sesuai:</span>
            <div className={classes.flexContainer}>
                <TextField
                    name="price"
                    className={classes.textField}
                    label="Harga"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    type="number"
                />
                <Button color="primary">
                    Perbarui
                </Button>
            </div>
        </div>
    )
}

export default function OrderDescription({}) {
    const classes = styles();

    return (
        <Paper className={classes.paper}>
            <Typography
                variant="h6"
                component="div"
                align="center"
            >
                Detil Pesanan
            </Typography>
            <div>
                <table className={classes.userInformationTable}>
                    <tr>
                        <td class="placeholder">Nama :</td>
                        <td>Mamat Abdurahman</td>
                    </tr>
                    <tr>
                        <td class="placeholder">Alamat :</td>
                        <td>Jalan Jendral Sudirman No. 80, RT 10 RW 12, Kabupaten Bogor, Jawa Barat</td>
                    </tr>
                    <tr>
                        <td class="placeholder">Kontak WA :</td>
                        <td>08123209320</td>
                    </tr>
                </table>
            </div>
            <div>
                <Typography
                    component="div"
                    align="Left"
                >
                    Detil barang yang dipesan
                </Typography>
                <table className={classes.userInformationTable}>
                    <tr>
                        <td class="placeholder">Kategori :</td>
                        <td>Jaket</td>
                    </tr>
                    <tr>
                        <td class="placeholder">Produk :</td>
                        <td>Parka</td>
                    </tr>
                    <tr>
                        <td class="placeholder">Material :</td>
                        <td>Taslan</td>
                    </tr>
                    <tr>
                        <td class="placeholder">Jumlah :</td>
                        <td>20 pcs</td>
                    </tr>
                    <tr>
                        <td class="placeholder">Catatan :</td>
                        <td>Ada gambar hello kitty nya sekitar dada</td>
                    </tr>
                </table>
            </div>
            <PriceChangerSection />
        </Paper>
    )
}