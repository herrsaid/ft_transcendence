"use client"

import React, { useState } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Switch,
  Input,

} from '@chakra-ui/react'

const ProfileInfoNav = () => {

  
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    return (
            <>
      <Button onClick={onOpen} colorScheme='blue'>Edit Account</Button>



      

      <Modal isOpen={isOpen} onClose={onClose}  >
      
        <ModalOverlay />
        <ModalContent bg='#18184a' >
        
          <ModalHeader>Edit Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody >
          <div className="setting_security">
                <h2>Security</h2>
                <h3>2FA <Switch size='lg'  m={8} />  </h3>


                
                
            </div>

            <div className="setting_security">



            <Input
    placeholder='type new username'
    _placeholder={{ opacity: 1, color: 'gray.500' }}
   
    className="focus:outline-none"
    variant='flushed'

  />
            </div>
            
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost'  mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='blue' mr={3}>Save</Button>
          </ModalFooter>
         
        </ModalContent>
        
      </Modal> 
     
            </>

        
    );
};
export default ProfileInfoNav;