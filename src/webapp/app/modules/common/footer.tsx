import React from 'react';
import {useAppSelector} from "../../configuration/store";
import {Trans, useTranslation} from "react-i18next";

const Footer = () => {
    const loading = useAppSelector(store => store.report.list.loading || store.report.details.loading);
    const error = useAppSelector(store => store.report.list.error || store.report.details.error);
    const {t} = useTranslation();

    return (
        <div className={'footer'}>
            <div><Trans
                i18nKey={'footer.status'}/>: {loading ? t('common.loading') : error ? t('common.error') : t('common.idle')}
            </div>
            <div>{new Date().toLocaleDateString()}</div>
        </div>
    );
};

export default Footer;
