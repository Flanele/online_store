import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    useDisclosure,
    FormLabel
} from '@chakra-ui/react';
import { createBrand } from '../../http/itemAPI';

const AddNewBrand = ({ show, onClose }) => {
    const [value, setValue] = useState('');

    const addBrand = () => {
        createBrand({ name: value }).then(data => {
            setValue('');
            onClose();       
        });
    };

    return (
        <Modal isOpen={show} onClose={onClose} size="lg" isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add new brand</ModalHeader>
                <ModalBody>
                    <Input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Write the name of the product brand"
                    />
                </ModalBody>
                <ModalFooter>
                    <Button mr={4} variant="outline" colorScheme="black" onClick={addBrand}>
                        Save
                    </Button>
                    <Button variant="outline" colorScheme="gray" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddNewBrand;