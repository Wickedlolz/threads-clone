import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

const usePreviewImage = () => {
    const [imageUrl, setImageUrl] = useState<string | ArrayBuffer | null>(null);

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

    return { handleImageChange, imageUrl };
};

export default usePreviewImage;
