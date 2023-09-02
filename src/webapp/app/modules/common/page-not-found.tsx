import React from 'react';
import {Link} from "react-router-dom";

const PageNotFound = () => (
    <div>
        Page not found <Link to={'/'}>Go back home?</Link>
    </div>
);

export default PageNotFound;
