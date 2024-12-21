import { renderWithProvider } from "../../testUtils";
import { fetchUsers } from "./fetchUsersThunk";

global.fetch = jest.fn();
describe("fetchUsersThunk", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("fetches users successfully and updates the state", async () => {
    const mockData = [
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
      },
      {
        id: 2,
        name: "MK",
        username: "DEV",
        email: "Dev@april.biz",
      },
    ];
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });
    const store = renderWithProvider();
    await store.dispatch(fetchUsers());
    expect(global.fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/users"
    );
    expect(store.getState().apiReducer.users).not.toStrictEqual([]);
    expect(store.getState().apiReducer.isLoading).toBeFalsy();
  });

  it("api throws error and updates the state", async () => {
    fetch.mockRejectedValueOnce(new Error("Network Error"));
    const store = renderWithProvider();
    await store.dispatch(fetchUsers());
    expect(global.fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/users"
    );
    expect(store.getState().apiReducer.users).toStrictEqual([]);
    expect(store.getState().apiReducer.isLoading).toBeFalsy();
    expect(store.getState().apiReducer.error).toBe("Network Error");
  });
});
