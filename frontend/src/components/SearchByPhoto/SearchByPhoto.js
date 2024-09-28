import Form from 'react-bootstrap/Form';

import DocumentIntelligence from "@azure-rest/ai-document-intelligence";


function SearchByPhoto({ setPhotoAddress }) {

    function handleChange(event) {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            fetch('http://localhost:5002/upload', {
                method: 'PUT',
                body: formData,
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('File uploaded successfully:', data);
                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                });
        }
    }

    // async function readImg(imageUrl) {
    //     console.log('Reading image:', imageUrl);
    //
    //     // Initialize the Document Intelligence client
    //     const client = DocumentIntelligence(process.env.DOCUMENT_INTELLIGENCE_ENDPOINT, {
    //         key: process.env.DOCUMENT_INTELLIGENCE_API_KEY,
    //     });
    //     try {
    //         const initialResponse = await client
    //             .path("/documentModels/{modelId}:analyze", "prebuilt-layout") // Replace `{modelId}` with your actual model ID
    //             .post({
    //                 contentType: "application/json",
    //                 body: {
    //                     urlSource: imageUrl,
    //                 },
    //                 queryParameters: { locale: "en-IN" },
    //             });
    //         console.log('Analysis Response:', initialResponse);
    //
    //     } catch (error) {
    //         console.error('Error during analysis:', error);
    //     }
    // }

    return (
        <>
            <Form.Group className="mb-3">
                <Form.Label>Upload a photo of your product's ingredient list</Form.Label>
                <Form.Control type="file" onChange={handleChange}/>
            </Form.Group>
        </>
    );
}

export default SearchByPhoto;