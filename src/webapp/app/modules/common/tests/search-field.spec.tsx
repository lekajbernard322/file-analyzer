import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SearchField from "../search-field";

const onChangeSearchTerm = jest.fn();
const onPressEnter = jest.fn();

describe("SearchField", () => {

  beforeAll(() => {
    onChangeSearchTerm.mockClear();
    onPressEnter.mockClear();
  })

  it("should render correctly", () => {
    const { container } = render(
      <SearchField searchTerm={"test"} onChangeSearchTerm={onChangeSearchTerm} />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <input
          placeholder="Search"
          value="test"
        />
      </div>
    `);
  });

  it('should trigger onChange when its input changes', () => {
    const { queryByPlaceholderText } = render(
        <SearchField searchTerm={"test"} onChangeSearchTerm={onChangeSearchTerm} />
    );

    const input = queryByPlaceholderText('Search');

    fireEvent.change(input, {target: {value: 'another test'}});

    expect(onChangeSearchTerm).toHaveBeenCalledWith('another test');
  })

  it('should trigger onChange when Enter key is pressed', () => {
    const { queryByPlaceholderText } = render(
        <SearchField searchTerm={"test"} onChangeSearchTerm={onChangeSearchTerm} onPressEnter={onPressEnter} />
    );

    const input = queryByPlaceholderText('Search');

    fireEvent.keyUp(input, {key: 'Enter'});

    expect(onPressEnter).toHaveBeenCalled();
  })


});
