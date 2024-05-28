import {Row} from "react-bootstrap";

function Loader() {
    return (
        <Row>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </Row>
    );
}

export default Loader;