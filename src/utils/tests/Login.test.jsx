import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { it, expect, describe, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Login from "../../components/Login";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../constant/theme";
import { Provider } from "react-redux";
import { store } from "../../store";
import React from "react";
import { AuthContext } from "../../components/Auth/AuthProvider";




const mockNavigate = vi.fn();

vi.mock(import("react-router-dom"), async (importOriginal) => {
    const actual = await importOriginal()
    return {
      ...actual,
      useNavigate: () => mockNavigate,
    }
  })


describe("Login Component", () => {
    const mockLogin = vi.fn();
    beforeEach(() => {
        mockNavigate.mockClear();
      });

    const ProvidersWrapper = ({ children }) => (
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <MemoryRouter>
              <AuthContext.Provider value={{ login: mockLogin }}>{children}</AuthContext.Provider>
            </MemoryRouter>
          </ThemeProvider>
        </Provider>
      );

  it("When the component is rendered, the visual elements appear correctly.", () => {
    render(
      <ProvidersWrapper>
        <Login />
      </ProvidersWrapper>
    );

    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  it("The username and password fields can be updated.", () => {
    render(
      <ProvidersWrapper>
        <Login />
      </ProvidersWrapper>
    );

    const usernameInput = screen.getByPlaceholderText(/Username/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpass" } });

    expect(usernameInput.value).toBe("testuser");
    expect(passwordInput.value).toBe("testpass");
  });
  it("The show/hide password button is working.", () => {
    render(
      <ProvidersWrapper>
        <Login />
      </ProvidersWrapper>
    );

    const togglePasswordButton = screen.getByRole("button", {
      name: /display the password/i,
    });
    const passwordInput = screen.getByPlaceholderText(/Password/i);

    expect(passwordInput.type).toBe("password");
    fireEvent.click(togglePasswordButton);
    expect(passwordInput.type).toBe("text");

    fireEvent.click(togglePasswordButton);
    expect(passwordInput.type).toBe("password");
  });

  it("When the form is submitted, the login function is triggered.", async() => {

      vi.spyOn(React, "useContext").mockReturnValue({
        login: mockLogin,
        user: null,
        isAuthenticated: false,
      });

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AuthContext.Provider value={{ login: mockLogin }}>
            <Login />
          </AuthContext.Provider>
        </ThemeProvider>
      </Provider>
    );

    const usernameInput = screen.getByPlaceholderText(/Username/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const submitButton = screen.getByRole("button", { name: /Login/i });
    
    fireEvent.change(usernameInput, { target: { value: "user" } });
    fireEvent.change(passwordInput, { target: { value: "user123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledTimes(1);
        expect(mockLogin).toHaveBeenCalledWith("user", "user123");
      });
  
      // navigate işlevinin çağrıldığından emin oluyoruz

    //   await waitFor(() => {
    //     expect(mockNavigate).toHaveBeenCalledTimes(1);
    //     expect(mockNavigate).toHaveBeenCalledWith("/products");
    //   });
  });
});
