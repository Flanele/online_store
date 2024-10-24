import React, { useContext } from 'react';
import { Flex } from '@chakra-ui/react';
import Item from './Item'; 
import { observer } from 'mobx-react-lite';
import { Context } from '../main';

const ItemsList = observer(({ items }) => {
    return (
        <Flex wrap="wrap" mt={4} gap={4}>
            {items.map(item => 
                <Item key={item.id} item={item} />
            )}
        </Flex>
    );
});

export default ItemsList;
