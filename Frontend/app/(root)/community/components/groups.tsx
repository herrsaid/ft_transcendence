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
import Group from "./group";
import Cookies from 'js-cookie';
import {useForm, SubmitHandler, FormProvider} from 'react-hook-form'
  
  export default function Groups()
  {
    const [isOpen, setIsOpen] = useState(false);
    const openclose = () => {setIsOpen(!isOpen)};

    const hrf = useForm()
    const onSubmit = hrf.handleSubmit(data =>{
      fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/create`,{
        method: 'POST', headers:{
            Authorization: `Bearer ${Cookies.get('access_token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name:data.name})
    })
    })
    return (
        <div className="flex flex-col justify-between h-[100%]">

            <div className="self-center fixed bottom-4">
                <button className="bg-green-600 rounded-lg p-1" onClick={openclose}>New Group</button>
            </div >
            <Modal isOpen={isOpen} onClose={openclose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader bg='#18184a'>Create New Group</ModalHeader>
            <ModalCloseButton />
            <ModalBody bg='#18184a'>
            <FormProvider {...hrf}>
                <form onSubmit={e => e.preventDefault()}>
                  <input  {...hrf.register('name')} className="bg-sky-900 rounded-lg p-1 m-1" type="text" placeholder="name" />
                  <input {...hrf.register('password')} className="bg-sky-900 rounded-lg p-1 m-1" type="password" placeholder="Password" />
                  <button type="submit" onClick={onSubmit}>Create</button>
                </form>
            </FormProvider>
            </ModalBody>

            <ModalFooter bg='#18184a'>
            <button type="submit" onClick={openclose}>
              Close
            </button>
            </ModalFooter>
            </ModalContent>
            </Modal>
        </div>
    )
}