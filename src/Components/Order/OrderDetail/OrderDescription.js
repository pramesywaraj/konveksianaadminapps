import React, { useEffect, useState } from 'react'
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import StatusBadge from '../../OtherComponent/StatusBadge';

const styles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    userInformationTable: {
        width: '100%',
        padding: "20px 0",
        '& .placeholder': {
            width: "40%"
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
    buttonWrapper: {
        position: 'relative'
    },
    buttonProgress: {
        color: "rgb(3,172,14)",
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

function PriceWeightChangerSection({loadingProccess, amount, onHandleChange, onProductPriceChange}) {
    const classes = styles();

    return (
        <div>
            <span>Ubah bila harga dan berat tidak sesuai:</span>
            <div className={classes.flexContainer}>
                <TextField
                    onChange={onHandleChange}
                    name="price"
                    className={classes.textField}
                    label="Harga"
                    margin="normal"
                    variant="outlined"
                    value={amount}
                    fullWidth
                    type="number"
                />
                <div className={classes.buttonWrapper}>
                    <Button 
                        onClick={onProductPriceChange} 
                        color="primary"
                        disabled={loadingProccess}
                    >
                        Perbarui
                    </Button>
                    {loadingProccess && 
                        <CircularProgress 
                            size={24} 
                            className={classes.buttonProgress} 
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default function OrderDescription({user, goods, status, otherAttribute, handleChangeProductPrice}) {
    const classes = styles();
    const { isPending, isReject, isPaidOff, isOnProcess, isDone } = status;
    const [loadingProcess, setLoadingProcess] = useState(false);
    const [price, setPrice] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        setPrice(e.target.value);
    }

    const productPriceChange = async () => {
        setLoadingProcess(true);
        await handleChangeProductPrice(price);
        setPrice('');
        setLoadingProcess(false);
    }

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
                    <tbody>
                        <tr>
                            <td className="placeholder">Nama :</td>
                            <td>{user.name}</td>
                        </tr>
                        <tr>
                            <td className="placeholder">Kota :</td>
                            <td>{user.city}</td>
                        </tr>
                        <tr>
                            <td className="placeholder">Alamat :</td>
                            <td>{user.address}</td>
                        </tr>
                        <tr>
                            <td className="placeholder">Kontak WA :</td>
                            <td>{user.phone}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <Typography
                    component="div"
                    align="left"
                >
                    Detil barang yang dipesan
                </Typography>
                <table className={classes.userInformationTable}>
                    <tbody>
                        <tr>
                            <td className="placeholder">Status Pesanan :</td>
                            <td>
                            {
                                (status.isDone) ? (<StatusBadge type="done">Pesanan Selesai</StatusBadge>) 
                                : (status.isOnProcess) ? (<StatusBadge type="ongoing">Pesanan dalam Proses</StatusBadge>) 
                                : (status.isPending) ? (<StatusBadge type="pending">Pending</StatusBadge>) 
                                : (status.isReject) ? (<StatusBadge type="reject">Pesanan Ditolak</StatusBadge>) 
                                : "" 
                            }
                            </td>
                        </tr>
                        <tr>
                            <td className="placeholder">Kode Pesanan :</td>
                            <td>{goods.baseId}</td>
                        </tr>
                        <tr>
                            <td className="placeholder">Kurir Dipilih :</td>
                            <td>{goods.courier}</td>
                        </tr>
                        <tr>
                            <td className="placeholder">Kategori :</td>
                            <td>{goods.category}</td>
                        </tr>
                        <tr>
                            <td className="placeholder">Produk :</td>
                            <td>{goods.product}</td>
                        </tr>
                        <tr>
                            <td className="placeholder">Material :</td>
                            <td>{goods.material}</td>
                        </tr>
                        <tr>
                            <td className="placeholder">Warna :</td>
                            <td>{goods.color}</td>
                        </tr>
                        <tr>
                            <td className="placeholder">Jumlah :</td>
                            <td>{goods.quantity} pcs</td>
                        </tr>
                        <tr>
                            <td className="placeholder">Berat Perkiraan :</td>
                            <td>{goods.weightPrediction} gram</td>
                        </tr>
                        <tr>
                            <td className="placeholder">Ongkos Kirim Perkiraan :</td>
                            <td>Rp. {goods.shippingPricePrediction}</td>
                        </tr>
                        <tr>
                            <td className="placeholder">Harga Perkiraan :</td>
                            <td>Rp. {goods.productPricePrediction}</td>
                        </tr>
                        <tr>
                            <td className="placeholder">Catatan :</td>
                            <td>{goods.description}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {(isOnProcess || isDone) && (
                <div>
                    <Typography
                        component="div"
                        align="left"
                    >
                        Harga yang telah disepakati dan Berat
                    </Typography>
                    <table className={classes.userInformationTable}>
                        <tbody>
                            <tr>
                                <td className="placeholder">Harga :</td>
                                <td>Rp. {otherAttribute.productPrice}</td>
                            </tr>
                            <tr>
                                <td className="placeholder">Berat :</td>
                                <td>{otherAttribute.weight} gram</td>
                            </tr>
                            <tr>
                                <td className="placeholder">Ongkos Kirim :</td>
                                <td>Rp. {otherAttribute.shippingPrice}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            {isOnProcess && (
                <PriceWeightChangerSection
                    amount={price}
                    loadingProccess={loadingProcess}
                    onHandleChange={handleChange} 
                    onProductPriceChange={productPriceChange}
                />
            )}
        </Paper>
    )
}
