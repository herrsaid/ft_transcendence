"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import Modal  from './Modal';

import SettingProfile from '../Setting/SettingProfile';

const ProfileInfoNav = () => {


    const [isModalOpen, setIsModalOpen] = useState(false);


    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };

    return (
        <div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                   
                    <SettingProfile/>
            </Modal>
            <div className="side_two_nav">
                        
                           
                                <button onClick={openModal}>
                                <span>Profile Setting</span>
                                </button>
                           
                        
                        </div>
        </div>
        
    );
};
export default ProfileInfoNav;