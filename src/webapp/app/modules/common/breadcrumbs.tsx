import React, {FunctionComponent} from 'react';
import {Link} from "react-router-dom";

export interface IBreadcrumb {
    label: string;
    to: string;
}

export interface IBreadcrumbsProps {
    config: IBreadcrumb[]
}

const Breadcrumbs: FunctionComponent<IBreadcrumbsProps> = ({config}) => (
    <div className={'breadcrumb'}>
        {
            config?.map((breadcrumb, i) => (
                <Link to={breadcrumb.to} key={i}>
                    {breadcrumb.label}/
                </Link>
            ))
        }
    </div>
);

export default Breadcrumbs;
