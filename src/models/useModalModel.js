import { useRecoilState } from "recoil";
import { useCallback } from "react";

const useModalModel = ( atomState ) => {
  const [isOpenModal, setIsOpenModal] = useRecoilState(
    atomState
  );

  const closeModal = useCallback(() => {
    setIsOpenModal(false);
  }, [setIsOpenModal]);

  const openModal = useCallback(() => {
    setIsOpenModal(true);
  }, [setIsOpenModal]);

  return {
    isOpenModal,
    openModal,
    closeModal,
  };
};

export default useModalModel;