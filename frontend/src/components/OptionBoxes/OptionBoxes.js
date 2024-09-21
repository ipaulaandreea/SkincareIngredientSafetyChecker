import Button from 'react-bootstrap/Button';
import {useState} from "react";
import SearchModal from "../UI/SearchModal/SearchModal";



const OptionBoxes = () => {
    const [displayModal, setDisplayModal] = useState(false)
    const [modalOption, setModalOption] = useState("")

    const displayTextModalHandler = () => {
        setDisplayModal(true)
        setModalOption("text");

    }
    const displayPhotoModalHandler = () => {
        setDisplayModal(true)
        setModalOption("photo");
    }

    const hideModalHandler = () => {
        setDisplayModal(false)
    }


    return (
        <div>
            <Button variant="light" style = {{marginRight: '15px'}} onClick = {displayTextModalHandler}>
                Search by ingredient list
            </Button>
            <Button variant="light" onClick = {displayPhotoModalHandler}>
                Search by photo
            </Button>
            {displayModal && (
                <SearchModal
                    onClose={hideModalHandler}
                    modalOption={modalOption}
                />
                )}
        </div>
    )

}

export default OptionBoxes;