import React, {FunctionComponent} from 'react';
import {createOnPressEnter} from "../../utils/callback.utils";
import {useTranslation} from "react-i18next";

interface ISearchFieldProps {
    searchTerm: string,
    onChangeSearchTerm: (string) => void,
    onPressEnter?: () => void
}

const SearchField: FunctionComponent<ISearchFieldProps> = ({searchTerm, onChangeSearchTerm, onPressEnter}) => {
    const {t} = useTranslation();

    return (
        <input placeholder={t('common.search')} value={searchTerm}
               onChange={({target: {value}}) => onChangeSearchTerm(value)}
               onKeyUp={createOnPressEnter(onPressEnter)}/>
    );
};

export default SearchField;
