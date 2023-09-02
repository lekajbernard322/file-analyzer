import React from 'react';

const InformationHighlighter = ({message, highlightedInformation}: {message: string, highlightedInformation: string | number}) => (
    <div className={'information-highlighter'}>
        <div className={'information-highlighter-message'}>
            {message}
        </div>
        <div className={'information-highlighter-value'}>
            {highlightedInformation || '-'}
        </div>
    </div>
)

export default InformationHighlighter;
