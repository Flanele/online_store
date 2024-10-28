import { useToast } from '@chakra-ui/react';

const useToastNotification = () => {
    const toast = useToast();

    const showToast = (title, description, status = "info") => {
        toast({
            title: title,
            description: description,
            status: status,
            duration: 3000,
            isClosable: true,
            position: "top-right"
        });
    };

    return { showToast };
};

export default useToastNotification;
