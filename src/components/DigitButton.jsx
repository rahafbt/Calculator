import { ACTIONS } from "./CalculatorCard"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { useTheme } from "../ThemeContext";

export default function DigitButton({ dispatch, digit }) {
    const { theme } = useTheme();
    return (
        <Col xs={digit === "0" ? "6" : "3"}>
            <Button
                variant={theme === "light" ? "light" : "dark"}
                className="w-100 rounded-pill shadow-sm"
                onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
            >
            {digit}
            </Button>
        </Col>
    )
}