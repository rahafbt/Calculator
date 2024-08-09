import { React} from "react";
import { useTheme } from "../ThemeContext";


const FullScreen = ({ children }) => {
    const { theme } = useTheme();

    return (
        <div 
        style={{ width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            background: (theme === "light" ? "white" : "#353839") }}>
        {children}
        </div>
    );
};

export default FullScreen;
