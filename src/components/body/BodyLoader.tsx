import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Loader from "react-loader-spinner";

const BodyLoader = () => {

    return (
      <div className="loaderBody">
        <Loader
          type="Puff"
          color="#EE171F"
          height={70}
          width={70}
        />
      </div>
    );
}

export default BodyLoader;