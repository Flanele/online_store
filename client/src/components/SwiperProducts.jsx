import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Context } from '../main';
import Item from './Item';
import { Heading } from '@chakra-ui/react';

import 'swiper/swiper-bundle.css';

const SwiperProducts = () => {
  const { item } = useContext(Context);

  console.log('Current items in context:', item.items);

  const randomItems = useMemo(() => {
    const getRandomItems = (items, count) => {
      const shuffled = [...items].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };
    return item.items.length > 0 ? getRandomItems(item.items, 8) : [];
  }, [item.items]);

  if (randomItems.length === 0) {
    return null; 
  }

  return (
    <>
      <Heading mb={7} textAlign="center" fontSize="28px">Our recommendations:</Heading>
      <Swiper
        modules={[Navigation]}
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        observer={true}
      >
        {randomItems.map((product) => (
          <SwiperSlide key={product.id}> 
            <Item item={product} /> 
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};


export default SwiperProducts;

