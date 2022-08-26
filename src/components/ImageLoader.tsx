import React, { useState } from 'react';

import { loadDetails, fetchEpisode, loadNextDetails } from '../services';
import { ImgList, Episode, CharState } from '../types';
//component
import CustomizedDialogs from './Dialog';
//css compoenent
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import {
  CircularProgress,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
// store.
import { useSelector } from 'react-redux';

//**
/*
/* @returns {React.Fragment}
 */
const ImageLoader = () => {
  const pgNos = useSelector((state: CharState) => state.pgNumber);
  const [itemData, setItemData] = useState<ImgList[]>([]);
  const [open, setOpen] = useState(false);
  const [charDetail, setChardetail] = useState<React.ReactNode>();
  const [loading, setLoading] = useState(false);

  const _loadData = async () => {
    let resp = [];
    setLoading(true);
    if (pgNos > 1) {
      resp = await loadNextDetails(pgNos);
      setItemData(resp);
      setLoading(false);
    } else {
      resp = await loadDetails();
      setItemData(resp);

      setLoading(false);
    }
  };

  React.useEffect(() => {
    _loadData();
  }, []);

  React.useEffect(() => {
    _loadData();
  }, [pgNos]);

  //**
  /*
   * @param {ImageList } character Character details
   * @param episodes
   * @returns { JSX } Builds the content part inside the modal.
   */
  const buildCharDetail = (character: ImgList, episodes: Episode[]) => {
    setLoading(false);
    return (
      <>
        <Typography align="center" sx={{ boxShadow: 2 }}>
          <img
            src={`${character.image}?w=248&fit=crop&auto=format`}
            srcSet={`${character.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
            width={200}
            height={250}
            alt={character.name}
          />
        </Typography>
        <TableContainer sx={{ maxHeight: 300, border: 1 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Episode Code</TableCell>
                <TableCell>Air Date</TableCell>
                <TableCell>Episode Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {episodes.map((epi) => (
                <TableRow>
                  <TableCell>{epi.episode}</TableCell>
                  <TableCell>{epi.air_date}</TableCell>
                  <TableCell>{epi.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  const handleOpen = async (id: number) => {
    setLoading(true);
    const character = itemData.filter((item) => item.id === id);
    const episodeInfo = await fetchEpisode(character[0].episode);
    setChardetail(buildCharDetail(character[0], episodeInfo));
    setOpen(true);
  };

  return (
    <>
      {loading ? (
        <div>
          <CircularProgress variant="indeterminate" size={200} thickness={4} />
          <div>
            <b>One moment please...</b>
          </div>
        </div>
      ) : (
        <>
          <ImageList
            data-testid="img-list"
            cols={5}
            sx={{ margin: 'auto', width: '90%', height: '80%' }}
          >
            {itemData.map((item) => (
              <ImageListItem
                sx={{
                  bgcolor: 'background.paper',
                  boxShadow: 2,
                  borderRadius: 4,
                  p: 4,
                  minWidth: 200,
                  minHeight: 200,
                }}
                key={item.id}
              >
                <img
                  src={`${item.image}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.name}
                  onClick={() => handleOpen(item.id)}
                />
                <ImageListItemBar
                  title={item.name}
                  subtitle={
                    <div>
                      <span>
                        {item.species}
                        <b> ({item.status}) </b>
                      </span>
                      <br />
                      <Typography noWrap>
                        <b>Origin:</b>
                        <b> {item.origin.name} </b>
                      </Typography>
                      <br />
                      <span>
                        <b>Location:</b>
                        <b> {item.location.name} </b>
                      </span>
                    </div>
                  }
                  position="below"
                />
              </ImageListItem>
            ))}
          </ImageList>
          <CustomizedDialogs
            children={charDetail}
            clickOpen={open}
            handleClose={() => setOpen(false)}
          />
        </>
      )}
    </>
  );
};
export default ImageLoader;
