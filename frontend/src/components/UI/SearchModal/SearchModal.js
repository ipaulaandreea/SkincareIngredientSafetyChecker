import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import SearchByText from "../../SearchByText/SearchByText";
import SearchByPhoto from "../../SearchByPhoto/SearchByPhoto";
import axios from "axios";
import {useState} from "react";
import Results from "../../Results/Results";
import './SearchModal.css';

const SearchModal = (props) => {
    const [ingredientsList, setIngredientsList] = useState("");
    const [photoAddress, setPhotoAddress] = useState("");
    const [resultsPresent, setResultsPresent] = useState(false);
    const [results, setResults] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formattedIngredientsList = ingredientsList
            .split(',')
            .map(ingredient => ingredient.trim())
            .filter(Boolean);

        console.log('Formatted ingredients list:', formattedIngredientsList);

        try {
            const response = await axios.get("http://localhost:5002/api/findIngredients", {
                params: {ingredientsList: formattedIngredientsList.join('.')},
            });
            setResults(response.data);
            setResultsPresent(true);
            console.log('response data:', response.data);
            console.log('results state:', results);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            className="modal-show">
            <Modal.Dialog className="modal-dialog"
                          style={{
                width: '600px',
                maxWidth: '90vw',
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                height: 'auto',
                maxHeight: '90vh',
            }}>

                <Modal.Body>
                    {props.modalOption === "text" && (
                        <SearchByText setIngredientsList={setIngredientsList}/>
                    )}
                    {props.modalOption === "photo" && (
                        <SearchByPhoto setPhotoAddress={setPhotoAddress}/>
                    )}
                    {resultsPresent && <Results results={results}/>}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" style = {{marginRight: '15px', outline: 'none', border: 'none'}} onClick={props.onClose}>Close</Button>

                    <Button type="submit" style = {{background: '#004c54', outline: 'none', border: 'none'}} onClick={handleSubmit} variant="primary">Scan List</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}

export default SearchModal;

