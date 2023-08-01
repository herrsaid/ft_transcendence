"use client"

import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useToast } from '@chakra-ui/react'

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
import { useRouter } from 'next/navigation';


const ProfileInfoNav = () => {

    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [username_updated, setusername_updated] = useState("");
    const router = useRouter();
    // const btnRef = React.useRef()




    const onUpdate_Username = async (event:React.FormEvent) =>
    {
        event.preventDefault();
       
        if (username_updated.trim() == "" || username_updated.trim().length < 2 || username_updated.includes(' '))
        {
          toast({
            title: 'Username invalid.',
            description: "Please enter valid username",
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
          return ;
        }
        const  res = await fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/user/edit/me/username`, {
          method: 'PUT',
          headers: {
          Authorization: `Bearer ${Cookies.get('access_token')}`,
          'Content-Type': 'application/json'
              },
          body: JSON.stringify({ username: username_updated })
      });
      if (!res.ok)
      {
        toast({
          title: 'Username already use.',
          description: "this username already use.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
        // throw new Error("failed to fetch users");
      }
      else
      {
        setusername_updated("")
        toast({
          title: 'Username Updated.',
          description: "We've updated your account username.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        router.replace("/profile");
      }

        
    };

   






    return (
            <>
      <Button onClick={onOpen} colorScheme='blue'>Edit Account</Button>



      

      <Modal isOpen={isOpen} onClose={onClose}  >
      
        <ModalOverlay />
        <ModalContent bg='#18184a' >
        
            <form onSubmit={onUpdate_Username}>
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
    id="username"
    onChange={(event) => setusername_updated(event.target.value)}
    value={username_updated}
    
    />
            </div>
            
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost'  mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='blue' mr={3} onClick={onUpdate_Username}>Save</Button>
          </ModalFooter>
    </form>
         
        </ModalContent>
        
      </Modal> 
     
            </>

        
    );
};
export default ProfileInfoNav;