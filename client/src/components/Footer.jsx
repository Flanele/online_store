import { Box, Container, Heading } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/consts";

const Footer = () => {
    return (
        <Box 
            mt={20} 
            bg="gray.200" 
            p={{ base: 8, md: 12, lg: 14 }} 
            textAlign={{ base: "center", md: "left" }}
        >
            <Container maxW={{ base: "90%", md: "768px", lg: "1200px" }}>
                <Heading 
                    size={{ base: "md", md: "lg" }} 
                    p={1}
                >
                    <NavLink to={SHOP_ROUTE} style={{ color: "black", textDecoration: "none" }}>
                        GlowShop
                    </NavLink>
                </Heading>
            </Container>
        </Box>
    )
}

export default Footer;
