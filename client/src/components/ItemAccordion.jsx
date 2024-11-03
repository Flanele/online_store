import React from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Text } from "@chakra-ui/react";

const ItemAccordion = ({ info }) => {
    return (
        <>
            <Text mt={20} ml={4} fontSize={{ base: "16px", md: "18px" }}>Description:</Text>
            <Accordion mt={4} allowMultiple>
                {info.map((infoItem) => (
                    <AccordionItem key={infoItem.id}>
                        <h2>
                            <AccordionButton>
                                <Box as='span' flex='1' textAlign='left' fontSize={{ base: "16px", md: "18px" }}>
                                    {infoItem.title}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} maxH="150px" overflow="auto" fontSize={{ base: "14px", md: "16px" }}>
                            {infoItem.description}
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
       </>
    )
};

export default ItemAccordion;
