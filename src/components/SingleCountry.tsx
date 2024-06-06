import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import Loading from "./Loading";
import { motion } from "framer-motion";

type SingleCountryProps = {
  country: string;
};

const SingleCountry: React.FC<SingleCountryProps> = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [country, setCountry] = useState<any>(null); // Use `any` for now, or create a proper type for the country data
  const { name } = useParams<{ name: string }>();

  useEffect(() => {
    const getSingleCountry = async () => {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        const data = await res.json();
        setCountry(data[0]); // Access the first element of the array
        console.log("data", data);
      } catch (error) {
        console.log("error", error);
      }
    };
    getSingleCountry();
  }, [name]);

  if (!country) {
    return (
      <div className="h-[calc(100vh-100px)] w-full flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <div className="overflow-x-hidden flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row items-center justify-center min-h-[90vh] text-xl gap-6">
        <Link
          to="/"
          className="top-5 left-5 relative lg:h-[calc(100vh-100px)] w-full lg:w-fit"
        >
          <button className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg flex justify-center items-center gap-5 text-white px-6 py-2 text-base hover:border-[#fff] cursor-pointer transition mb-6">
            <FaArrowLeftLong />
            Back
          </button>
        </Link>
        <img
          src={country.flags.svg}
          alt={`Flag of ${country.name.common}`}
          className="rounded-md shadow-md w-[90%] lg:w-[650px]"
        />
        <div className="flex flex-col justify-center  gap-1">
          <h1 className="text-3xl ">{country.name.official}</h1>
          <p>
            <strong>Common Name:</strong> {country.name.common}
          </p>
          <p>
            <strong>Capital:</strong>{" "}
            {country.capital && country.capital.join(", ")}
          </p>
          <p>
            <strong>Region:</strong> {country.region}
          </p>
          <p>
            <strong>Subregion:</strong> {country.subregion}
          </p>
          <p>
            <strong>Population:</strong> {country.population}
          </p>
          <p>
            <strong>Area:</strong> {country.area} km²
          </p>
          <p>
            <strong>Languages:</strong>{" "}
            {Object.values(country.languages).join(", ")}
          </p>
          <p>
            <strong>Timezones:</strong> {country.timezones.join(", ")}
          </p>
          <p>
            <strong>Bordering Countries:</strong>{" "}
            {country.borders && country.borders.join(", ")}
          </p>
          <p>
            <strong>Google Maps:</strong>{" "}
            <a
              href={country.maps.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Google Maps
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SingleCountry;
