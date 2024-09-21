import Form from 'react-bootstrap/Form';

function SearchByText({ setIngredientsList }) {

    const handleChange = (event)=>{
        setIngredientsList(event.target.value);
    }
    return (
        <div>
            <Form method="POST">
                <Form.Group className="mb-3">
                    <Form.Label>Paste ingredient list below</Form.Label>
                    <Form.Control
                        as="textarea"
                        id = "ingredientsList"
                        name = "ingredientsList"
                        rows={3}
                        onChange={handleChange}/>
                </Form.Group>
            </Form>
        </div>
    );
}

export default SearchByText;