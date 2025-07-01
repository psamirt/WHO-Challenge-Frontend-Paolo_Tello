import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ThemeMode from "@/components/ThemeMode";

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("ThemeMode", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue("light");
    document.documentElement.setAttribute("data-theme", "light");
  });

  it("debe renderizar el componente correctamente", () => {
    render(<ThemeMode />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByTestId("MdLightMode")).toBeInTheDocument();
  });

  it("debe mostrar el modo claro por defecto", () => {
    render(<ThemeMode />);
    const toggle = screen.getByRole("checkbox");
    expect(toggle).not.toBeChecked();
    expect(screen.getByTestId("MdLightMode")).toBeInTheDocument();
    expect(screen.queryByTestId("MdDarkMode")).not.toBeInTheDocument();
  });

  it("debe cambiar a modo oscuro al hacer click", async () => {
    const user = userEvent.setup();
    render(<ThemeMode />);

    const toggle = screen.getByRole("checkbox");
    await user.click(toggle);

    expect(toggle).toBeChecked();
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(localStorageMock.setItem).toHaveBeenCalledWith("theme", "dark");
    expect(screen.getByTestId("MdDarkMode")).toBeInTheDocument();
    expect(screen.queryByTestId("MdLightMode")).not.toBeInTheDocument();
  });

  it("debe cambiar de modo oscuro a claro al hacer click", async () => {
    const user = userEvent.setup();
    localStorageMock.getItem.mockReturnValue("dark");
    document.documentElement.setAttribute("data-theme", "dark");

    render(<ThemeMode />);

    const toggle = screen.getByRole("checkbox");
    expect(toggle).toBeChecked();
    expect(screen.getByTestId("MdDarkMode")).toBeInTheDocument();

    await user.click(toggle);

    expect(toggle).not.toBeChecked();
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(localStorageMock.setItem).toHaveBeenCalledWith("theme", "light");
    expect(screen.getByTestId("MdLightMode")).toBeInTheDocument();
    expect(screen.queryByTestId("MdDarkMode")).not.toBeInTheDocument();
  });

  it("debe mantener el estado correcto después de múltiples clicks", async () => {
    const user = userEvent.setup();
    render(<ThemeMode />);

    const toggle = screen.getByRole("checkbox");

    await user.click(toggle);
    expect(toggle).toBeChecked();
    expect(screen.getByTestId("MdDarkMode")).toBeInTheDocument();

    await user.click(toggle);
    expect(toggle).not.toBeChecked();
    expect(screen.getByTestId("MdLightMode")).toBeInTheDocument();

    await user.click(toggle);
    expect(toggle).toBeChecked();
    expect(screen.getByTestId("MdDarkMode")).toBeInTheDocument();
  });
});
