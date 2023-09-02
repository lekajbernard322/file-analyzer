import React from 'react';

export const Headline = ({message}: {message: string}) => (
    <h1 className={'headline'}>
        {message}
    </h1>
);

export const Subheading = ({message}: {message: string}) => (
    <h3 className={'subheading'}>
        {message}
    </h3>
);
