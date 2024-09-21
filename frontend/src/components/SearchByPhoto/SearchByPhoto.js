import Form from 'react-bootstrap/Form';

function SearchByPhoto() {
    return (
        <>
            <Form.Group className="mb-3">
                <Form.Label>Upload a photo of your product's ingredient list</Form.Label>
                <Form.Control type="file" />
            </Form.Group>
        </>
    );
}

export default SearchByPhoto;