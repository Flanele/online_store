import { Box, Container, Heading } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/consts";

const Footer = () => {
    return (
        <Box mt={20} bg="gray.200" p={14}>
            <Container maxW="1200px">
                <Heading size="lg" p={1}>
                    <NavLink to={SHOP_ROUTE} style={{ color: 'black', textDecoration: 'none' }}>GlowShop</NavLink>
                </Heading>
            </Container>
        </Box>
    )
}

export default Footer;