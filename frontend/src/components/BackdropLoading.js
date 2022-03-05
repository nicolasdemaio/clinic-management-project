import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const BackDropLoading = () => {

    return (
        <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
                transitionDuration={{ enter: 500 }}
              >
                <CircularProgress color="inherit" />
        </Backdrop> 
    )
}

export default BackDropLoading