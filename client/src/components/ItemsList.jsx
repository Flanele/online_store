import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../main';
import { Flex } from '@chakra-ui/react';
import Item from './Item';

const ItemsList = observer(() => {
    const {item} = useContext(Context);

    return (
        <Flex wrap="wrap"  mt={4} gap={4}>
            {item.items.map(item => 
                <Item key={item.id} item={item} />
            )}
        </Flex>
    )
});

export default ItemsList;