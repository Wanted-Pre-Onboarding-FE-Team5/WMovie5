import React, { useRef, useState } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { useSetRecoilState } from "recoil";
import { movieDetailModalOpenState } from "../state/atoms";
import useOnClickOutside from "../utils/hooks/useOnClickOutside";
import useOnKeyDown from "../utils/hooks/useOnKeyDown";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useMovieModel } from "../models/useMovieModel";
import { movieState } from "../state/atoms";
import useOnLoadImage from "../utils/hooks/useOnLoadImage";
import useModalModel from "../models/useModalModel";

const MovieDetailModal = (props) => {
  const { movieInModal } = props;
  const setMovies = useSetRecoilState(movieState);
  const [like, setLike] = useState(movieInModal.like);

  const modalRef = useRef(null);

  const { isOpenModal, closeModal } = useModalModel(movieDetailModalOpenState);
  const { toggleFavoriteById, getMovies } = useMovieModel();
  const { isLoadedImage, imageOnLoadHandler } = useOnLoadImage();
  useOnClickOutside(modalRef, closeModal);
  useOnKeyDown("Escape", () => {
    closeModal();
  });

  const bookMarkOnClickHandler = async (id, data) => {
    await toggleFavoriteById(id, data);
    await getMovies().then((response) => {
      setMovies(response);
      setLike((like) => !like);
    });
  };

  return (
    <Background isLoadedImage={isLoadedImage}>
      <ModalWrapper isOpenModal={isOpenModal} ref={modalRef}>
        <ModalImg
          src={movieInModal.large_cover_image}
          alt={movieInModal.title + "_image"}
          onLoad={imageOnLoadHandler}
          onError={(event) => {
            imageOnLoadHandler();
            event.target.src =
              "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8ZXJyb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60";
          }}
        />
        <ModalContent>
          <Header>
            <Title>{movieInModal.title}</Title>
            <Year>{movieInModal.year}</Year>
            <Rating>{movieInModal.rating}</Rating>
            <RunTime>{movieInModal.runTime}</RunTime>
          </Header>

          <Summary>{movieInModal.summary}</Summary>

          <ToggleFavButton
            onClick={() => {
              bookMarkOnClickHandler(movieInModal.id, {
                like: !like,
              });
            }}
          >
            Add to favorites
            {like ? <FavoriteOnIcon /> : <FavoriteOffIcon />}
          </ToggleFavButton>
        </ModalContent>
        <CloseModalButton aria-label="Close modal" onClick={closeModal} />
      </ModalWrapper>
    </Background>
  );
};

export default MovieDetailModal;

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${(props) => (props.isLoadedImage ? "visible" : "hidden")};
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 500px;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  line-height: 1.4;
  color: #141414;
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
  
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1``;

const Summary = styled.h1`
  height: 300px;
  line-height: 16px;
  overflow-y: auto;
`;
const Year = styled.div``;
const Rating = styled.div``;
const RunTime = styled.div``;
const ToggleFavButton = styled.button`
  display: flex;
  padding: 10px 24px;
  background: #141414;
  color: #fff;
  border: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: gray;
  }
`;

const FavoriteOffIcon = styled(MdFavoriteBorder)`
  font-size: 24px;
  margin-left: 12px;
`;

const FavoriteOnIcon = styled(MdFavorite)`
  font-size: 24px;
  margin-left: 12px;
  color: red;
`;
