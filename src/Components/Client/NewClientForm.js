import React, { forwardRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    
    formField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "100%"
    },

    button: {
        margin: theme.spacing(1),
    },

    input: {
        display: 'none',
        float: 'right'
    },

    submitButton: {
        margin: theme.spacing(1),
        float: 'right',
    },

    fileUploadField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(2),
        width: "50%"
    },

    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '15px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(5, 10),
        width: '50%'
    },
}));
  
const NewClientForm = forwardRef((props, ref) => {
    const classes = useStyles();
    const [fileName, setName] = useState('');

    function setFileName(name) {
        setName(name);
    }
    
    return (
        <React.Fragment>
            <h2>Tambahkan Client baru</h2>
            <form autoComplete="off" >
                <TextField
                    label="Nama"
                    id="name"
                    className={classes.formField}
                    value={props.newClientProps.name}
                    margin="normal"
                    variant="outlined"
                    onChange={props.onFormFieldChange('name')}
                />
                <TextField
                    label="URL Web"
                    id="urlWeb"
                    className={classes.formField}
                    value={props.newClientProps.urlWeb}
                    margin="normal"
                    variant="outlined"
                    onChange={props.onFormFieldChange('urlWeb')}
                />
                <div className={classes.fileUploadField}>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="clientImage"
                        type="file"
                        placeholder="Gambar harus memiliki ekstensi JPEG"
                        onInput={props.onFormFieldChange('clientImage')}
                        onChange={(e) => 
                            setFileName(e.target.files[0].name)
                        }
                    />
                    <label htmlFor="clientImage">
                        {fileName === '' ? 'Tambah Foto' : fileName}
                        <Button variant="outlined" component="span" className={classes.button}>
                            Upload
                        </Button>
                    </label>
                </div>

                <Button 
                    variant="contained" 
                    size="medium" 
                    color="primary" 
                    className={classes.submitButton}
                    onClick={props.onSubmitNewClient}
                >
                    Simpan Client Baru
                </Button>
            </form>
        </React.Fragment>
    )
});

export default NewClientForm;