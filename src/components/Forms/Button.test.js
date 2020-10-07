import { jest } from "@jest/globals";
import { render, fireEvent } from "@testing-library/svelte";
import "@testing-library/jest-dom";

import html from "svelte-htm";

import Button from "./Button.svelte";

test("events should work", () => {
  const mock = jest.fn();
  const { getByText } = render(
    html`<${Button} color="green" on:click=${mock}>Button<//>`
  );
  const button = getByText("Button");
  fireEvent.click(button);
  expect(mock).toHaveBeenCalled();
});

test("events should only fire once", () => {
  const mock = jest.fn();
  const { getByText } = render(
    html`<${Button} color="green" on:click=${mock}>Button<//>`
  );
  const button = getByText("Button");
  fireEvent.click(button);
  expect(mock).toHaveBeenCalledTimes(1);
});

test("should show loading state", () => {
  const mock = jest.fn();
  const { getByText } = render(
    html`<${Button} color="green" loading="true" on:click=${mock}>Button<//>`
  );
  const button = getByText("Button");
  expect(button).toHaveClass("loading");
});

test("should be disabled", () => {
  const mock = jest.fn();
  const { getByText } = render(
    html`<${Button} color="green" disabled on:click=${mock}>Button<//>`
  );
  const button = getByText("Button");
  expect(button).toBeDisabled();
});
