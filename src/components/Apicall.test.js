import { renderWithProvider } from "../testUtils";
import Apicall from "./Apicall";

describe("Counter Component", () => {
  const initialState = {
    counterReducer: { count: 0 },
    apiReducer: {
      users: [],
      isLoading: false,
      error: "",
    },
  };

  test("renders correctly and Match the Snapshot", () => {
    const { asFragment } = renderWithProvider(<Apicall />, initialState);
    expect(asFragment(<Apicall />)).toMatchSnapshot();
  });
});
