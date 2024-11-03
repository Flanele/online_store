import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles/SwiperBanner.css';

import { Pagination, Navigation, Autoplay } from 'swiper/modules';

import img1 from '../assets/banner_img-1.jpg';
import img2 from '../assets/banner_img-2.jpg';
import img3 from '../assets/banner_img-3.jpg';
import img4 from '../assets/banner_img-4.jpg';
import img5 from '../assets/banner_img-5.jpg';
import img6 from '../assets/banner_img-6.jpg';
import img7 from '../assets/banner_img-7.jpg';
import img8 from '../assets/banner_img-8.png';
import { Button, Text } from '@chakra-ui/react';

export default function SwiperBanner() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        autoplay={{
            delay: 4000
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
            <div className="banner__container main-slide">
                <img  src={img1} className="main-slide__img-main" alt="" />
                <div className="slide__container">
                    <Text pl={2} pr={2} className="main-slide__text">The New Collection</Text>
                    <Button 
                        className='main-slide__btn'
                        variant="outline" 
                        colorScheme="whiteAlpha" 
                        fontSize={{ base: "14px", sm: "16px", md: "18px", lg: "20px" }}
                        _hover={{
                            color: "white", 
                            borderColor: "white" 
                        }}
                        ml={2}
                        mr={2}
                        sx={{textTransform: 'uppercase'}}
                    >
                        EXPLORE NOW
                    </Button>
                </div>
                <img  src={img2} className="main-slide__img" alt="" />
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="banner__container second-slide">
                <img className="second-slide__img-main" src={img3} />
                <img className="second-slide__img" src={img4} />
                    <Button 
                        className='second-slide__btn'
                        variant="outline" 
                        colorScheme="whiteAlpha" 
                        fontSize={{ base: "14px", sm: "16px", md: "18px", lg: "20px" }}
                        padding={{ base: "6px 12px", sm: "8px 14px", md: "10px 16px", lg: "12px 20px" }}
                        _hover={{
                            color: "white", 
                            borderColor: "white" 
                        }}
                        
                    >
                        EXPLORE NOW
                    </Button>                   
            </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="banner__container">
            <img className="third-slide__img-main" src={img5} />
            <img className="third-slide__img" src={img6} />
        </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="banner__container fourth-slide">
                <img className="fourth-slide__img-main" src={img7} />
                <div className="fourth-slide__container">
                    <img src={img8} className="fourth-slide__img" />
                </div>
            </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
