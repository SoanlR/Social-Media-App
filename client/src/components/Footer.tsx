import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-4">
          <div className="flex items-center space-x-2">
            <span>&copy; 2022 Ezequiel Castellanos</span>
            <a
              href="https://twitter.com/Ezequiel_Caste"
              rel="noopener noreferrer"
              target="_blank"
              className="text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon size="lg" icon={faTwitterSquare} />
            </a>
            <a
              href="https://www.linkedin.com/in/ezequiel-castellanos"
              rel="noopener noreferrer"
              target="_blank"
              className="text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon size="lg" icon={faLinkedin} />
            </a>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Footer;
