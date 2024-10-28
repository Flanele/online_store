import { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateItem } from '../http/itemAPI';
import { Context } from '../main';
import { LOGIN_ROUTE } from '../utils/consts';

const apiUrl = import.meta.env.VITE_APP_API_URL;

const useEditModal = (item, setItem, setImageSrc) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const isAuth = user.isAuth;

    const openModal = useCallback(() => setModalOpen(true), []);
    const closeModal = useCallback(() => setModalOpen(false), []);

    const handleEditClick = useCallback(() => {
        if (!isAuth) {
            navigate(LOGIN_ROUTE);
        } else {
            openModal();
        }
    }, [isAuth, navigate, openModal]);

    const handleSave = async (updatedItem) => {
        const formData = new FormData();
        Object.entries(updatedItem).forEach(([key, value]) => {
            formData.append(key, key === 'info' ? JSON.stringify(value) : value);
        });

        try {
            await updateItem(item.id, formData);
            setImageSrc(updatedItem.img ? `${apiUrl}/${updatedItem.img}` : item.img);
            setItem((prev) => ({ ...prev, ...updatedItem }));
            closeModal();
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    return {
        isModalOpen,
        openModal,
        closeModal,
        handleEditClick,
        handleSave,
    };
};

export default useEditModal;
