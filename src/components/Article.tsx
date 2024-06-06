import React from "react";
import { Link } from "react-router-dom";

type ArticleProps = {
  flags: {
    svg: string;
  };
  name: {
    common: string;
  };
  population: string;
  region: string;
  subregion: string;
};

const Article: React.FC<ArticleProps> = ({ flags, name, region }) => {
  return (
    <div className="min-w-[350px] h-[240px] shadow-lg rounded-lg flex flex-col justify-center items-center  bg-white dark:bg-gray-800 py-2">
      <img
        src={flags.svg}
        alt={`Flag of ${name.common}`}
        className="w-[140px] h-[80px] rounded-full"
      />
      <h2 className="text-xl">{name.common}</h2>
      <ul className="flex flex-col">
        {/* <li>population : {population}</li> */}
        <li>region : {region}</li>
        {/* <li>subregion :{subregion}</li> */}
      </ul>
      <Link to={`/${name.common}`}>
        <button className="flex mt-5 items-center bg-blue-500  gap-1 px-4 py-2 cursor-pointer text-gray-100 font-semibold tracking-widest rounded-md hover:bg-blue-700 duration-300 hover:gap-2 hover:translate-x-3">
          See more
          <svg
            className="w-5 h-5"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              stroke-linejoin="round"
              stroke-linecap="round"
            ></path>
          </svg>
        </button>
      </Link>
    </div>
  );
};
export default Article;
