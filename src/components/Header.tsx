import React, { useEffect, useState } from "react";
import "../style/header.css";

type HeaderProps = {
  //
};

const Header: React.FC<HeaderProps> = () => {
  const [theme, setTheme] = useState<string>("light");
  useEffect(() => {
    if (theme == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="w-full h-[60px] xl:h-[70px]  bg-white dark:bg-[#2b3945] flex justify-between items-center text-2xl xl:px-24 lg:px-16 md:px-12 px-6  shadow-xl">
      <div className="">Where in the world?</div>
      <div>
        {/* <button className="" onClick={handleThemeSwitch}>
          {theme == "light" ? "dark" : "light"}
        </button> */}
        <label className="ui-switch">
          <input type="checkbox" onClick={handleThemeSwitch} />
          <div className="slider">
            <div className="circle"></div>
          </div>
        </label>
      </div>
    </div>
  );
};
export default Header;
