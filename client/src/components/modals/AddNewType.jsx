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
import { createType } from '../../http/itemAPI';

const AddNewType = ({ show, onClose }) => {
    const [value, setValue] = useState('');

    const addType = () => {
        createType({ name: value }).then(data => {
            setValue('');
            onClose();       
        });
    };

    return (
        <Modal isOpen={show} onClose={onClose} size="lg" isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add new type</ModalHeader>
                <ModalBody>
                    <Input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Write the name of the product type"
                    />
                </ModalBody>
                <ModalFooter>
                    <Button mr={4} variant="outline" colorScheme="black" onClick={addType}>
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

export default AddNewType;
