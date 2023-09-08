import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

interface Props {
  textButton: string;
  children: JSX.Element;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hiddeButton?: boolean;
}

export const ModalLetter = ({
  textButton,
  children,
  open,
  setOpen,
  hiddeButton = true,
}: Props) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {hiddeButton && (
        <Button
          variant='outlined'
          onClick={handleClickOpen}
          sx={{
            position: 'relative',
            marginTop: '2rem',
            marginBottom: '2rem',
            fontSize: '2.5rem',
            backgroundColor: '#fff',
            borderRadius: '1.5rem',
            color: '#487698',
            border: '0px',
            '&:hover': {
              backgroundColor: '#fff',
              borderRadius: '1.5rem',
              color: '#487698',
              border: '0px',
            },
          }}
        >
          {textButton}
        </Button>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        sx={{ '& .MuiDialog-paper': { maxWidth: '800px' } }}
      >
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
};
