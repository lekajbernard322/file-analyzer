import React from "react";
import { fireEvent } from "@testing-library/react";
import ReportListPage from "../report-list";
import {
  getDllStatistics,
  getFunctionStatistics,
  getReports,
  clearReportList,
} from "../report-list.reducer";
import {renderWithContext} from "../../../../utils/test.utils";

export const mockData = {
  report: {
    list: {
      data: [
        {
          _id: "1",
          name: "report1",
          created: "some date",
        },
        {
          _id: "2",
          name: "report1",
          created: "some date",
        },
      ],
      total: 3,
      functionStatistics: {
        averageNumberOfFunctions: 1,
        minNumberOfFunctions: 2,
        maxNumberOfFunctions: 3,
      },
      dllStatistics: {
        averageNumberOfDlls: 4,
        minNumberOfDlls: 5,
        maxNumberOfDlls: 6,
      },
      loading: false,
      error: false,
    },
  },
};

describe("Report", () => {
  const renderComponent = () => {
    return renderWithContext(mockData, <ReportListPage />);
  };

  it("should render correctly", () => {
    const {
      rendered: { container },
    } = renderComponent();

    expect(container).toMatchSnapshot();
  });

  it("should execute fetches for data", () => {
    const { store } = renderComponent();

    const [
      clearReportListAction,
      getReportsPendingAction,
      getFunctionStatisticsPendingAction,
      getDllStatisticsPendingAction,
    ] = store.getActions();

    expect(clearReportListAction).toMatchObject({ type: clearReportList.type });
    expect(getReportsPendingAction).toMatchObject({
      type: getReports.pending.type,
    });
    expect(getFunctionStatisticsPendingAction).toMatchObject({
      type: getFunctionStatistics.pending.type,
    });
    expect(getDllStatisticsPendingAction).toMatchObject({
      type: getDllStatistics.pending.type,
    });
  });

  it("should search if clicked on filter button", () => {
    const {
      rendered: { queryByPlaceholderText, queryByText },
      store,
    } = renderComponent();

    const searchInput = queryByPlaceholderText("Search");
    const filterButton = queryByText("Filter");

    expect(searchInput).toBeInTheDocument();
    expect(filterButton).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: "test" } });
    fireEvent.click(filterButton);

    const lastAction = store.getActions().slice(-1)[0];

    expect(lastAction).toMatchObject({
      meta: {
        arg: {
          limit: 2,
          offset: 0,
          search: "test",
        },
      },
      type: "reportList/get_reports/pending",
    });
  });

  it("should load more when clicked on load more button", () => {
    const {
      rendered: { queryByText },
      store,
    } = renderComponent();

    const loadMoreButton = queryByText("Load more");

    expect(loadMoreButton).toBeInTheDocument();

    fireEvent.click(loadMoreButton);

    const lastAction = store.getActions().slice(-1)[0];

    expect(lastAction).toMatchObject({
      meta: {
        arg: {
          limit: 2,
          offset: 2,
          search: "",
        },
      },
      type: "reportList/get_reports/pending",
    });
  });

  it("should navigate to report details when clicked on view button", () => {
    const {
      rendered: { queryAllByText },
      history,
    } = renderComponent();

    const [firstViewButton] = queryAllByText("View");

    expect(firstViewButton).toBeInTheDocument();

    fireEvent.click(firstViewButton);

    expect(history.location.pathname).toEqual("/details/1");
  });
});
