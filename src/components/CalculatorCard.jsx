import { React, useReducer } from "react";
import DigitButton from "./DigitButton"
import OperationButton from "./OperationButton"
import ActionButton from "./ActionButton";
import EqualsButton from "./EqualsButton";
import { useTheme } from "../ThemeContext";
import Mode from "./mode";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

export const ACTIONS = {
    ADD_DIGIT: "add-digit",
    CHOOSE_OPERATION: "choose-operation",
    CLEAR: "clear",
    DELETE_DIGIT: "delete-digit",
    EVALUATE: "evaluate",
}

function reducer(state, { type, payload }) {
    switch (type) {
      case ACTIONS.ADD_DIGIT:
        if (state.overwrite) {
          return {
            ...state,
            currentOperand: payload.digit,
            overwrite: false,
          }
        }
        if (payload.digit === "0" && state.currentOperand === "0") {
          return state
        }
        if (payload.digit === "." && state.currentOperand.includes(".")) {
          return state
        }
  
        return {
          ...state,
          currentOperand: `${state.currentOperand || ""}${payload.digit}`,
        }
      case ACTIONS.CHOOSE_OPERATION:
        if (state.currentOperand == null && state.previousOperand == null) {
          return state
        }
  
        if (state.currentOperand == null) {
          return {
            ...state,
            operation: payload.operation,
          }
        }
  
        if (state.previousOperand == null) {
          return {
            ...state,
            operation: payload.operation,
            previousOperand: state.currentOperand,
            currentOperand: null,
          }
        }
  
        return {
          ...state,
          previousOperand: evaluate(state),
          operation: payload.operation,
          currentOperand: null,
        }
      case ACTIONS.CLEAR:
        return {}
      case ACTIONS.DELETE_DIGIT:
        if (state.overwrite) {
          return {
            ...state,
            overwrite: false,
            currentOperand: null,
          }
        }
        if (state.currentOperand == null) return state
        if (state.currentOperand.length === 1) {
          return { ...state, currentOperand: null }
        }
  
        return {
          ...state,
          currentOperand: state.currentOperand.slice(0, -1),
        }
      case ACTIONS.EVALUATE:
        if (
          state.operation == null ||
          state.currentOperand == null ||
          state.previousOperand == null
        ) {
          return state
        }
  
        return {
          ...state,
          overwrite: true,
          previousOperand: null,
          operation: null,
          currentOperand: evaluate(state),
        }
    }
  }
  
  function evaluate({ currentOperand, previousOperand, operation }) {
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    if (isNaN(prev) || isNaN(current)) return ""
    let computation = ""
    switch (operation) {
      case "+":
        computation = prev + current
        break
      case "-":
        computation = prev - current
        break
      case "×":
        computation = prev * current
        break
      case "÷":
        computation = prev / current
        break
    }
  
    return computation.toString()
  }
  
  const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
  })

  function formatOperand(operand) {
    if (operand == null) return
    const [integer, decimal] = operand.split(".")
    if (decimal == null) return INTEGER_FORMATTER.format(integer)
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
  }


const CalculatorCard = ({ children }) => {
    const { theme } = useTheme();
    const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
        reducer,
        {}
    )

    return (
        <Card className="shadow-lg rounded" style={{ background: (theme === "light" ? "white" : "#353839") }}>
        <Card.Body className="p-0">
            <Mode/>
            <Container>
                <Stack gap={2} className="mb-3" style={{ color: (theme === "light" ? "black" : "white"), height: "5rem" }}>
                    <Col className="perviousValue text-end">{formatOperand(previousOperand)} {operation}</Col>
                    <Col className="currentValue text-end fs-3">{formatOperand(currentOperand)}</Col>
                </Stack>
                
                <Row className="mb-3">
                    <ActionButton dispatch={dispatch} type={"AC"} />
                    <ActionButton dispatch={dispatch} type={"DEL"} />
                    <OperationButton operation="÷" dispatch={dispatch} />
                </Row>

                <Row className="mb-3">
                    <DigitButton digit="7" dispatch={dispatch} />
                    <DigitButton digit="8" dispatch={dispatch} />
                    <DigitButton digit="9" dispatch={dispatch} />
                    <OperationButton operation="+" dispatch={dispatch} />
                </Row>

                <Row className="mb-3">
                    <DigitButton digit="4" dispatch={dispatch} />
                    <DigitButton digit="5" dispatch={dispatch} />
                    <DigitButton digit="6" dispatch={dispatch} />
                    <OperationButton operation="-" dispatch={dispatch} />
                </Row>

                <Row className="mb-3">
                    <DigitButton digit="1" dispatch={dispatch} />
                    <DigitButton digit="2" dispatch={dispatch} />
                    <DigitButton digit="3" dispatch={dispatch} />
                    <OperationButton operation="×" dispatch={dispatch} />
                </Row>

                <Row className="mb-3">
                    <DigitButton digit="0" dispatch={dispatch} />
                    <DigitButton digit="." dispatch={dispatch} />
                    <EqualsButton dispatch={dispatch} />
                </Row>
            </Container>
        </Card.Body>
        </Card>
    );
};

export default CalculatorCard;
