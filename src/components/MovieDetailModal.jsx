import React, { useCallback, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { MdClose } from "react-icons/md";
import { useRecoilState } from "recoil";
import { movieDetailModalOpenState } from "../state/atoms";
import useOnClickOutside from "../utils/hooks/useOnClickOutside";
import useOnKeyDown from "../utils/hooks/useOnKeyDown";

const MovieDetailModal = (props) => {
  const { movieInModal } = props;

  const [isOpenModal, setIsOpenModal] = useRecoilState(
    movieDetailModalOpenState
  );
  const [isLoadedImage, setIsLoadedImage] = useState(false);
  const modalRef = useRef(null);

  const closeModal = useCallback(() => {
    setIsOpenModal(false);
  }, [setIsOpenModal]);

  const imageOnLoadHandler = () => {
    setIsLoadedImage(true);
  };

  useOnClickOutside(modalRef, closeModal);
  useOnKeyDown("Escape", () => {
    setIsOpenModal(false);
  });

  return (
    <Background isLoadedImage={isLoadedImage}>
      <ModalWrapper isOpenModal={isOpenModal} ref={modalRef}>
        <ModalImg
          src={movieInModal.large_cover_image}
          alt={movieInModal.title + "_image"}
          onLoad={imageOnLoadHandler}
        />
        <ModalContent>
          <h1>{movieInModal.title}</h1>
          <button>bookmark</button>
        </ModalContent>
        <CloseModalButton
          aria-label="Close modal"
          onClick={() => setIsOpenModal(false)}
        />
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
  visibility: hidden;
  ${(props) =>
    props.isLoadedImage &&
    css`
      visibility: visible;
    `}
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
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
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
