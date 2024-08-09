import { ACTIONS } from "./CalculatorCard"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { useTheme } from "../ThemeContext";

export default function ActionButton({ dispatch, type }) {
    const { theme } = useTheme();

    if (type === "AC") {
        return (
        <Col xs={4}>
            <Button 
                variant={theme === "light" ? "light" : "dark"}
                className="w-100 rounded-pill shadow-sm"
                style={{ color: '#ef476f' }}
                onClick={() => dispatch({ type: ACTIONS.CLEAR })}
            >AC</Button>
        </Col>
        )
    }

    if (type === "DEL") {
        return (
        <Col xs={5}>
            <Button 
                variant={theme === "light" ? "light" : "dark"}
                className="w-100 rounded-pill shadow-sm"
                style={{ color: '#ef476f' }}
                onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
            >DEL</Button>
        </Col>
        )
    }

    else return("")
}