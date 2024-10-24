import { observer } from 'mobx-react-lite';
import React, { useContext, useMemo } from 'react';
import { Context } from '../main';
import { Box, Button, ButtonGroup, IconButton } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

const Pagination = observer(() => {
    const { item } = useContext(Context);
    const pageCount = Math.ceil(item.totalCount / item.limit);

    const currentPage = item.page;
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === pageCount;

    const pages = useMemo(() => {
        const tempPages = [];
        for (let i = 1; i <= pageCount; i++) {
            tempPages.push(i);
        }
        return tempPages;
    }, [pageCount]);

    const onPageChange = (page) => {
        item.setPage(page);
    };

    return (
        <Box mt={4} display="flex" justifyContent="center">
            <ButtonGroup isAttached variant="outline">
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

