import React, { useRef, useEffect, useCallback } from 'react'
import styled from "styled-components";
import { MdClose } from "react-icons/md";

const MovieDetailModal = (props) => {
  //movies 데이터와 연결하는 기능 구현 필요
  const { movies, isOpenModal, setIsOpenModal } = props;
  const modalRef = useRef();
  

  const closeModal = (event) => {
    if (modalRef.current === event.target) {
      setIsOpenModal(false);
    }
  };

  const keyPress = useCallback(
    (event) => {
      if (event.key === "Escape" && isOpenModal) {
        setIsOpenModal(false);
      }
    },
    [setIsOpenModal, isOpenModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {isOpenModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <ModalWrapper isOpenModal={isOpenModal}>
            <ModalImg
              src="https://yts.mx/assets/images/movies/moana_2016/large-cover.jpg"
              alt="Moana"
            />
            <ModalContent>
              <h1>Moana</h1>
              <p>
                Moana Waialiki is a sea voyaging enthusiast and the only
                daughter of a chief in a long line of navigators.
              </p>
              <button>bookmark</button>
            </ModalContent>
            <CloseModalButton
              aria-label="Close modal"
              onClick={() => setIsOpenModal((show) => !show)}
            />
          </ModalWrapper>
        </Background>
      ) : null}
    </>
  )
}

export default MovieDetailModal

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top:0;
  display: flex;
  justify-content: center;
  align-items: center;
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