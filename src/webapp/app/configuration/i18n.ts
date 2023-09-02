import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        },
        resources: {
            en: {
                translation: {
                    common: {
                        search: 'Search',
                        filter: 'Filter',
                        loading: 'Loading...',
                        error: 'Error occurred!',
                        idle: 'Idle',
                        loadMore: 'Load more'
                    },
                    reports: {
                        title: 'PE metadata reports',
                        subtitle: 'List of available reports. Click on a report to view more details about it.',
                        totalNumberOfReports: 'Total number of reports',
                        averageNumberOfDlls: 'Average number of DLLs per report',
                        averageNumberOfFunctions: 'Average number of functions per report',
                        occurrences: 'occurrences in other reports',
                        higherThanAverage: 'which is higher than the average',
                        lowerThanAverage: 'which is lower than the average',
                        sameAsAverage: 'which is the same as the average',
                        detailSubtitle: 'Details of PE metadata showing the list of used DLLs and their functions',
                        numberOfDlls: 'Number of DLLs',
                        numberOfFunctions: 'Number of functions',
                        nameColumnLabel: 'Name',
                        createdColumnLabel: 'Created',
                        actionsColumnLabel: 'Actions',
                        viewActionLabel: 'View',
                        noReportsFound: 'No reports found',
                    },
                    breadcrumb: {
                        reports: 'Reports',
                        details: 'Details'
                    },
                    footer: {
                        status: 'Status'
                    }
                }
            }
        }
    });

export default i18n;
