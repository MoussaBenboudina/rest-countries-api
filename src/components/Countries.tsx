import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Loading from "./Loading";
import Article from "./Article";

type Country = {
  name: { common: string };
  region: string;
};

type Region = {
  name: string;
  value: string;
};

export default function Countries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  const region: Region[] = [
    { name: "All", value: "All" },
    { name: "Africa", value: "Africa" },
    { name: "Americas", value: "Americas" },
    { name: "Asia", value: "Asia" },
    { name: "Europe", value: "Europe" },
    { name: "Oceania", value: "Oceania" },
  ];

  const filteredCountries = countries.filter((country) => {
    if (filter == "All") return true;
    return country.region === filter;
  });

  const searchCountries = filteredCountries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const getCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setCountries(data.filter((e: any) => e.name.common !== "Israel"));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getCountries();
  }, []);

  return (
    <div className="">
      {loading ? (
        <div className="w-screen h-[90vh] flex justify-center items-center ">
          <Loading />
        </div>
      ) : (
        <div className="">
          <div className="flex justify-center  gap-2 flex-col sm:flex-col md:flex-col lg:flex-row lg:justify-between xl:flex-row xl:justify-between items-center w-full h-[160px] px-[12%]">
            <form className="form relative ">
              <button className="absolute left-2 -translate-y-1/2 top-1/2 p-1">
                <svg
                  width="17"
                  height="16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-labelledby="search"
                  className="w-5 h-5 text-gray-700 dark:text-gray-300"
                >
                  <path
                    d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                    stroke="currentColor"
                    strokeWidth="1.333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              <input
                className="input rounded-md px-8 py-3 border-2 border-transparent bg-white dark:text-white dark:bg-gray-700 focus:outline-none focus:border-blue-500 dark:placeholder-gray-300 placeholder-gray-900 transition-all duration-300 shadow-md"
                placeholder="Search..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="reset"
                className="absolute right-3 -translate-y-1/2 top-1/2 p-1"
                onClick={() => setSearch("")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-700 dark:text-gray-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </form>

            <form className="flex">
              <select
                value={filter}
                onChange={handleFilterChange}
                className="p-2 rounded-md dark:bg-gray-700 dark:text-gray-100 bg-white text-gray-900"
              >
                {region.map((rgn: Region, index: number) => (
                  <option key={index} value={rgn.value}>
                    {rgn.name}
                  </option>
                ))}
              </select>
            </form>
          </div>
          <ul className="flex flex-wrap gap-8 justify-center items-center">
            {searchCountries.map((country: Country, index: number) => (
              <motion.div
                key={country.name.common}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Article {...country} />
              </motion.div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
