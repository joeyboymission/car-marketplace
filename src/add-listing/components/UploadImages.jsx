import { useState } from "react";
import { X, Loader2 } from 'lucide-react';
import { storage } from "./../../../configs/firebaseConfig"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button } from "@/components/ui/button";

function UploadImages() {
    const [selectedFileList, setSelectedFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    // Add the image to the selected file list
    const onFileSelected = (e) => {
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            setSelectedFileList((prev) => [...prev, file]);
        }
    };  

    // Remove the image from the selected file list
    const onImageRemove = (image) => {
        const result = selectedFileList.filter((item) => item !== image);
        setSelectedFileList(result);
    };

    // Upload the images to the firebase storage
    const uploadImages = async () => {
        setUploading(true);
        setError(null);
        const uploadPromises = selectedFileList.map(async (file) => {
            try {
                const fileExt = file.name.split('.').pop() || 'jpeg';
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
                const storageRef = ref(storage, `car-marketplace/${fileName}`);
                const metadata = {
                    contentType: file.type || 'image/jpeg'
                };

                const snapshot = await uploadBytes(storageRef, file, metadata);
                const url = await getDownloadURL(snapshot.ref);
                return url;
            } catch (err) {
                console.error(`Error uploading ${file.name}:`, err);
                throw err;
            }
        });

        // Wait for all the images to be uploaded
        try {
            const urls = await Promise.all(uploadPromises);
            console.log('Uploaded files:', urls);
            setSelectedFileList([]);
        } catch (err) {
            setError('Failed to upload some images. Please try again.');
            console.error('Upload error:', err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <h2 className="font-medium text-xl my-3">Upload Images</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {/* Iterate all the image selected from the local */}
                {selectedFileList && selectedFileList.map((image, index) => (
                    <div key={index}>
                        <X onClick={() => onImageRemove(image, index)} width={20} className="absolute m-2 text-white hover:text-red-500 hover:shadow-sm"/>
                        <img src={URL.createObjectURL(image)} alt="Car" className="w-full h-40 object-cover border border-gray-500 rounded-xl"/>
                    </div>
                ))}

                <label htmlFor="upload-images">
                    <div className="border rounded-xl border-dotted border-primary bg-blue-100 p-8 hover:cursor-pointer hover:shadow-md h-40 flex justify-center items-center">
                        <h2 className="text-lg text-center text-primary">+</h2>
                    </div>
                </label>
                <input type="file" multiple={true} id="upload-images" className="opacity-0" onChange={onFileSelected}/>
            </div>
            <Button 
                onClick={uploadImages} 
                disabled={uploading || selectedFileList.length === 0}
                className="mt-4"
            >
                {uploading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                    </>
                ) : 'Upload Images'}
            </Button>
        </div>
    );
}

export default UploadImages;
