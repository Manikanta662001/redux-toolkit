import { screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProvider } from "../testUtils";
import Counter from "./Counter";

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
    const { asFragment } = renderWithProvider(<Counter />, initialState);
    expect(asFragment(<Counter />)).toMatchSnapshot();
    expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent("0");
  });
  afterEach(cleanup);

  test("dispatches increment action when we click + button", async () => {
    const { store } = renderWithProvider(<Counter />, initialState);
    const incButton = screen.getByRole("button", { name: "+" });
    await userEvent.click(incButton);
    expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent("1");
    //to test the store value
    console.log("STATE::::", store.getState());
    expect(store.getState().counterReducer.count).toBe(1);
  });
  test("dispatches decrement action when we click - button", async () => {
    const { store } = renderWithProvider(<Counter />, initialState);
    const decButton = screen.getByRole("button", { name: "-" });
    await userEvent.click(decButton);
    expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent("-1");
    //to test the store value
    expect(store.getState().counterReducer.count).toBe(-1);
  });
  test("dispatches reset action when we click RESET button", async () => {
    const { store } = renderWithProvider(<Counter />, initialState);
    const resetButton = screen.getByRole("button", { name: "reset" });
    await userEvent.click(resetButton);
    expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent("0");
    //to test the store value
    expect(store.getState().counterReducer.count).toBe(0);
  });
  test("increments by some delay", async () => {
    const { store } = renderWithProvider(<Counter />, initialState);
    const delayButton = screen.getByRole("button", { name: "+ async" });
    await userEvent.click(delayButton);
    await waitFor(
      () => {
        expect(store.getState().counterReducer.count).toBe(1);
        expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent(
          "1"
        );
      },
      { timeout: 2000 }
    );
  });

  test("If we reload also count should not reset", () => {
    const { store } = renderWithProvider(<Counter />, {
      counterReducer: { count: 10 },
    });
    expect(store.getState().counterReducer.count).toBe(10);
    const reloadBtn = screen.getByRole("button", { name: "Reload" });
    userEvent.click(reloadBtn);
    expect(store.getState().counterReducer.count).toBe(10);
  });
  test("RESET action resets the store state", () => {
    const { store } = renderWithProvider(<Counter />, initialState);
    expect(store.getState().counterReducer.count).toBe(0);
    expect(store.getState().apiReducer.users).toStrictEqual([]);
    const emptyBtn = screen.getByRole("button", { name: "Empty Store" });
    userEvent.click(emptyBtn);
    expect(store.getState().counterReducer).toBeUndefined();
    expect(store.getState().apiReducer).toBeUndefined();
  });
});
