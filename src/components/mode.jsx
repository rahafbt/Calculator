import { useTheme } from "../ThemeContext";

const Mode = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div onClick={toggleTheme} className="m-3 text-start">
      {theme === "light" ? (
        <img
        width="25"
        height="25"
        src="https://img.icons8.com/ios/50/sun--v1.png"
        alt="Light Mode"
      />
      ) : (
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/ios-filled/50/FFFFFF/moon-symbol.png"
          alt="Dark Mode"
        />
      )}
    </div>
  );
};

export default Mode;
