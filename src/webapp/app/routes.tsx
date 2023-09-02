import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ReportListPage from './modules/report/list/report-list';
import ReportDetailsPage from './modules/report/details/report-details';
import PageNotFound from './modules/common/page-not-found';

const Routes = () => {
  return (
    <div className={'app-routes'}>
      <Switch>
        <Route exact path={'/'} component={ReportListPage} />
        <Route exact path={'/details/:reportId'} component={ReportDetailsPage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default Routes;
