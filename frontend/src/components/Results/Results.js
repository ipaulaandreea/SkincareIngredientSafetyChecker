import Table from 'react-bootstrap/Table';


const Results = (props) => {

    return (
        <div style={{
            maxHeight: '60vh',
            overflowY: 'auto',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            marginBottom: '20px'
        }}>
            {props.results.length === 0 ? (
                <h3>No potentially harmful ingredients found :)</h3>
            ) : (
                <>
                <h3>{props.results.length} potentially harmful ingredient(s) were found </h3>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Ingredient Name</th>
                    <th>Adverse Effect</th>
                    <th>Recommendation</th>
                </tr>
                </thead>
                <tbody>
                {props.results.map((result) => (
                    <tr>
                        <td>{props.results.indexOf(result) + 1}</td>
                        <td>{result.ingredient_name}</td>
                        <td>{result.hazard_type}</td>
                        <td>{result.hazard_type === 'comedogenic' && 'avoid if you have acne-prone skin'}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
                </>
)}

        </div>
    );
}

export default Results