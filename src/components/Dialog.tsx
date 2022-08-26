import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    height: 'inherit',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
export interface DialogBox {
  clickOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const CustomizedDialogs = ({ handleClose, clickOpen, children }: DialogBox) => {
  const [open, setOpen] = React.useState(clickOpen);
  React.useEffect(() => {
    setOpen(clickOpen);
  }, [clickOpen]);

  return (
    <div>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Character Details
        </BootstrapDialogTitle>
        <DialogContent
          dividers
          sx={{ color: 'text.secondary', display: 'inline', fontSize: 14, width: 500, height: 300 }}
        >
          {children}
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};
export default CustomizedDialogs;
