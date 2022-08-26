import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import './App.css';
import ImageLoader from './components/ImageLoader';
import { useDispatch, useSelector } from 'react-redux';
import { CharState } from './types';

const App = () => {
  const dispatch = useDispatch();
  const pgNos = useSelector((state: CharState) => state.pgNumber);

  const LoadNext = () => {
    dispatch({ type: 'GET_NEXT_RES', payload: pgNos });
  };

  return (
    <>
      <AppBar position="static" color="secondary" sx={{ minHeight: 50 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RICK & MORTY
          </Typography>
          <Button color="inherit" onClick={LoadNext}>
            <b>Next</b>
          </Button>
        </Toolbar>
      </AppBar>
      <section style={{ background: '#E6E6FA' }}>
        <ImageLoader />
      </section>
    </>
  );
};
export default App;
