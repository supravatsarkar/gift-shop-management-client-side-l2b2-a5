"use client";
import { ReactElement, ReactNode, useState } from "react";
import { Gift, Info } from "phosphor-react";
import { Button, Checkbox, Label, Modal, Typography } from "keep-react";

export const ModalComponent = ({
  // buttonText,
  isModalOpen,
  setIsModalOpen,
  children,
  visibleElement,
}: {
  // buttonText: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  visibleElement: ReactElement;
}) => {
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {visibleElement}

      <Modal isOpen={isModalOpen} onClose={closeModal} className="">
        <Modal.Body className="space-y-3 w-6/12">
          {/* <Modal.Icon>
            <Info size={28} weight="fill" />
          </Modal.Icon> */}
          <Modal.Content>{children}</Modal.Content>
          {/* <Modal.Footer>
            <Button
              onClick={closeModal}
              size="sm"
              variant="outline"
              color="secondary"
            >
              Cancel
            </Button>
            <Button onClick={closeModal} size="sm" color="primary">
              Submit
            </Button>
          </Modal.Footer> */}
        </Modal.Body>
      </Modal>
    </>
  );
};
