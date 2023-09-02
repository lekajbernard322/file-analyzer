import {Link} from "react-router-dom";
import React from "react";
import {Trans} from "react-i18next";

const ReportTable = ({reports, disabled, onLoadMore}) => (
    <div>
        <table>
            <thead>
            <tr>
                <th><Trans i18nKey={'reports.nameColumnLabel'}/></th>
                <th><Trans i18nKey={'reports.createdColumnLabel'}/></th>
                <th><Trans i18nKey={'reports.actionsColumnLabel'}/></th>
            </tr>
            </thead>
            <tbody>
            {
                reports?.map(report => (
                    <tr key={report._id}>
                        <td>{report.name}</td>
                        <td>{report.created}</td>
                        <td className={'actions'}>
                            <Link to={`/details/${report._id}`}>
                                <Trans i18nKey={'reports.viewActionLabel'}/>
                            </Link>
                        </td>
                    </tr>
                ))
            }
            {
                !reports?.length && <tr>
                    <td colSpan={3}>
                        <Trans i18nKey={'reports.noReportsFound'}/>
                    </td>
                </tr>
            }

            </tbody>
        </table>
        <button onClick={onLoadMore} disabled={disabled}>
            <Trans i18nKey={'common.loadMore'}/>
        </button>
    </div>
)

export default ReportTable;
