import api from "@/lib/httpClient";
import { useState } from "react";

const useUploadImage = () => {
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const uploadImage = async (file: File) => {
        try {
            setLoading(true);
            setError(null);
            
            const formData = new FormData();
            formData.append('file', file);

            const response = await api.post('https://test.fandora.app/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data?.fileUrl) {
                setImage(response.data.fileUrl);
                return response.data;
            } else {
                throw new Error('Invalid response format');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to upload image';
            setError(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { image, uploadImage, loading, error };
}

export default useUploadImage;