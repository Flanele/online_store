import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../main';
import { List } from "@chakra-ui/react";
import TypeFilterItem from './TypeFilterItem'; 

const TypeBar = observer(() => {
    const { item } = useContext(Context);

    return (
        <List spacing={3}>
            <TypeFilterItem
                type={{ name: "View all" }} 
                isSelected={Object.keys(item.selectedType).length === 0}
                onClick={() => item.setSelectedType({})}
            />
            {item.types.map(type => (
                <TypeFilterItem
                    key={type.id}
                    type={type}
                    isSelected={type.id === item.selectedType.id}
                    onClick={() => {
                        item.setSelectedType(type);
                        item.setPage(1);
                    }}
                />
            ))}
        </List>
    );
});

export default TypeBar;
