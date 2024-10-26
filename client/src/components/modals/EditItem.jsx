import React from 'react';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter,
    Button, Input, HStack, FormControl, FormLabel
} from '@chakra-ui/react';

import useEditItem from '../../hooks/useEditItem';

const EditItem = ({ isOpen, onClose, itemData, onSave }) => {
    const {
        name,
        price,
        file,
        descriptions,
        handleFileChange,
        addDescription,
        updateDescription,
        deleteDescription,
        getUpdatedItem,
    } = useEditItem(itemData);
    
    const handleSave = () => {
        const updatedItem = getUpdatedItem();
        onSave(updatedItem);
        onClose();
    };
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Item</ModalHeader>
                <ModalBody>
                    <FormControl mb={4}>
                        <FormLabel>Name</FormLabel>
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Price</FormLabel>
                        <Input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Image</FormLabel>
                        <Input p={2} type="file" onChange={handleFileChange} />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Descriptions</FormLabel>
                        {descriptions.map((desc) => (
                            <HStack key={desc.number} mt={3}>
                                <Input
                                    placeholder="Title"
                                    value={desc.title}
                                    onChange={(e) => updateDescription('title', e.target.value, desc.number)}
                                />
                                <Input
                                    placeholder="Description"
                                    value={desc.description}
                                    onChange={(e) => updateDescription('description', e.target.value, desc.number)}
                                />
                                <Button p={5} colorScheme="red" onClick={() => deleteDescription(desc.number)}>
                                    Delete
                                </Button>
                            </HStack>
                        ))}
                        <Button mt={4} variant="outline" onClick={addDescription}>
                            Add New Description
                        </Button>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={handleSave}>
                        Save
                    </Button>
                    <Button variant="outline" ml={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditItem;