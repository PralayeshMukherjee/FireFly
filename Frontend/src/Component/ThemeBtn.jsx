import { useTheme } from "../Context/Theme";
import { Sun, Moon } from "lucide-react";

function ThemeBtn() {
  const { themeMode, lightTheme, darkTheme } = useTheme();

  return (
    <button
      onClick={themeMode === "light" ? darkTheme : lightTheme}
      className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md transition-all duration-300 hover:bg-gray-700"
    >
      {themeMode === "light" ? (
        <>
          <Moon className="w-5 h-5" />
        </>
      ) : (
        <>
          <Sun className="w-5 h-5 text-yellow-400" />
        </>
      )}
    </button>
  );
}

export default ThemeBtn;
