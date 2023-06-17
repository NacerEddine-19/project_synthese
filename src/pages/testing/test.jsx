import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import ViewPostPage from '../postPage/postPage';

function SimpleDialog(props) {
    const { onClose, id, open } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>View post avec id : <i><b>{id}</b></i></DialogTitle>
            <ViewPostPage id={id} />
        </Dialog>
    );
}

export default function SimpleDialogDemo({ id, handleClose, open }) {
    return (
        <div>
            <SimpleDialog
                id={id}
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}