import { ACTIONS } from "./CalculatorCard"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

export default function OperationButton({ dispatch, operation }) {
  return (
    <Col xs={3}>
        <Button
            variant="light"
            className="w-100 rounded-pill shadow-sm"
            style={{ background: '#ef476f', color: 'white'}}
            onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })}
        >
        {operation}
        </Button>
    </Col>
  )
}