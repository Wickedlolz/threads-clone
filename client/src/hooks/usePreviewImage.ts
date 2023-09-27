import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

const usePreviewImage = () => {
    const [imageUrl, setImageUrl] = useState<string | ArrayBuffer | null>(null);

    /**
     * Handles the change event when selecting an image file.
     * This function reads the selected file and sets the image URL for previewing the image.
     * If the file is not an image, it displays an error message using toast.
     *
     * @param {ChangeEvent<HTMLInputElement>} event - The change event triggered by selecting a file.
     * @returns {void}
     */
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];

        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = () => {
                setImageUrl(reader.result);
            };

            reader.readAsDataURL(file);
        } else {
            toast.error('Invalid file type. Please select an image file');
            setImageUrl(null);
        }
    };

    return { handleImageChange, imageUrl, setImageUrl };
};

export default usePreviewImage;
