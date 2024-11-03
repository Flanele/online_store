import React from 'react';
import { Flex } from '@chakra-ui/react';
import Item from './Item'; 
import { observer } from 'mobx-react-lite';

const ItemsList = observer(({ items }) => {
    return (
        <Flex wrap="wrap" mt={4} gap={6}>
            {items.map(item => 
                <Item key={item.id} item={item} />
            )}
        </Flex>
    );
});

export default ItemsList;
