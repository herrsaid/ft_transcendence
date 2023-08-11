import { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

  
  export default function Groups()
  {
    const [isOpen, setIsOpen] = useState(false);
    const openclose = () => {setIsOpen(!isOpen)};
    return (
        <div className="flex flex-col justify-between h-[100%]">
            <div>hhhhfhhfhf</div>
            
            <div className="self-center">
                <button className="bg-green-600 rounded-lg p-1" onClick={openclose}>New Group</button>
            </div >
            <Modal isOpen={isOpen} onClose={openclose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader bg='#18184a'>Create New Group</ModalHeader>
            <ModalCloseButton />
            <ModalBody bg='#18184a'>
                hello world
            </ModalBody>

            <ModalFooter bg='#18184a'>
            <button  onClick={openclose}>
              Create
            </button>
            </ModalFooter>
            </ModalContent>
            </Modal>
        </div>
    )
}