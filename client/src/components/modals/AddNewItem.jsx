import React, { useContext } from 'react';
import {
    Box,
    Button,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Select,
    HStack,
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import useAddNewItem from '../../hooks/useAddNewItem';
import { Context } from '../../main';

const AddNewItem = observer(({ show, onClose }) => {
    const { item } = useContext(Context);

    const {
        name,
        setName,
        price,
        setPrice,
        file,
        selectFile,
        info,
        addInfo,
        removeInfo,
        changeInfo,
        selectedType,
        setSelectedType,
        selectedBrand,
        setSelectedBrand,
        addItem,
    } = useAddNewItem(onClose); 

    return (
        <Modal isOpen={show} onClose={onClose} size="xl" isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add New Item</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl mb={4}>
                        <FormLabel>Select Item Type</FormLabel>
                        <Select
                            placeholder="Select item type"
                            value={selectedType?.id || ""}
                            onChange={(e) => {
                                const typeId = Number(e.target.value);
                                const selectedType = item.types.find(type => type.id === typeId);
                                setSelectedType(selectedType); 
                            }}
                        >
                            {item.types.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Select Brand</FormLabel>
                        <Select
                            placeholder="Select brand"
                            value={selectedBrand?.id || ""}
                            onChange={(e) => {
                                const brandId = Number(e.target.value);
                                const selectedBrand = item.brands.find(brand => brand.id === brandId);
                                setSelectedBrand(selectedBrand); 
                            }}
                        >
                            {item.brands.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Enter Item Name</FormLabel>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Item name"
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Enter Price</FormLabel>
                        <Input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            placeholder="Item price"
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Upload Image</FormLabel>
                        <Input p={2} type="file" onChange={selectFile} />
                    </FormControl>

                    <Box mb={4}>
                        <Button variant="outline" onClick={addInfo}>
                            Add New Description
                        </Button>
                        {info.map((i) => (
                            <HStack key={i.number} mt={3}>
                                <Input
                                    placeholder="Characteristic Title"
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                />
                                <Input
                                    placeholder="Characteristic Description"
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                />
                                <Button
                                    p={6}
                                    variant="outline"
                                    colorScheme="red"
                                    onClick={() => removeInfo(i.number)}
                                >
                                    Remove
                                </Button>
                            </HStack>
                        ))}
                    </Box>
                </ModalBody>

                <ModalFooter>
                    <Button variant="solid" colorScheme="blue" onClick={addItem}>
                        Save
                    </Button>
                    <Button variant="outline" ml={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
});

export default AddNewItem;
