import React, { useContext, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Context } from '../main';
import Item from './Item';
import { Heading, Box } from '@chakra-ui/react';

import 'swiper/swiper-bundle.css';

const SwiperProducts = () => {
  const { item } = useContext(Context);

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
    <Box>
      <Heading mb={7} textAlign="center" fontSize={{ base: "24px", md: "28px" }}>
        Our recommendations:
      </Heading>
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        navigation
        breakpoints={{
          590: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          900: {
            slidesPerView: 3,
          },
          1250: {
            slidesPerView: 4,
          },
        }}
      >
        {randomItems.map((product) => (
          <SwiperSlide key={product.id} style={{ display: 'flex', justifyContent: 'center' }}> 
            <Item item={product} /> 
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default SwiperProducts;
