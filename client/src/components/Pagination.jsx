import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import { Box, Button, ButtonGroup, IconButton } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

const Pagination = observer(({ currentPage, pageCount, onPageChange }) => {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === pageCount;

    const pages = useMemo(() => {
        const tempPages = [];
        for (let i = 1; i <= pageCount; i++) {
            tempPages.push(i);
        }
        return tempPages;
    }, [pageCount]);

    return (
        <Box mt={4} display="flex" justifyContent="center">
            <ButtonGroup isAttached variant="outline" spacing={{ base: 1, md: 2 }}>
                <IconButton
                    icon={<ArrowLeftIcon />}
                    isDisabled={isFirstPage}
                    onClick={() => onPageChange(currentPage - 1)}
                />
                {pages.map(page => (
                    <Button
                        key={page}
                        onClick={() => onPageChange(page)}
                        colorScheme={page === currentPage ? "black" : "gray"}
                        size={{ base: "sm", md: "md" }} 
                    >
                        {page}
                    </Button>
                ))}
                <IconButton
                    icon={<ArrowRightIcon />}
                    isDisabled={isLastPage}
                    onClick={() => onPageChange(currentPage + 1)}
                />
            </ButtonGroup>
        </Box>
    );
});

export default Pagination;

