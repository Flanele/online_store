import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../main';
import { Flex } from '@chakra-ui/react';
import BrandFilterItem from './BrandFilterItem'; 

const BrandBar = observer(() => {
    const { item } = useContext(Context);

    return (
        <Flex overflowX="auto" flexWrap="wrap" p={3}>
            <BrandFilterItem
                brand={{ name: "View all" }} 
                isSelected={Object.keys(item.selectedBrand).length === 0}
                onClick={() => item.setSelectedBrand({})}
             />
            {item.brands.map(brand => (
                <BrandFilterItem
                    key={brand.id}
                    brand={brand}
                    isSelected={brand.id === item.selectedBrand.id}
                    onClick={() => {
                        item.setSelectedBrand(brand);
                        item.setPage(1);
                    }}
                />
            ))}
        </Flex>
    );
});

export default BrandBar;

