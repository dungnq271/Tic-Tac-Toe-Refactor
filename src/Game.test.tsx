import React from "react";
import { render, screen } from "@testing-library/react";
import { Player } from "./Game";
import { Turn } from "./Turn";

test("renders learn react link", () => {
  const player: Player = {
    id: 1,
    name: "Player 1",
    colorClass: "blue",
    iconClass: "fa-x",
  };
  render(<Turn player={player} />);
  const linkElement = screen.getByText(/Player/i);
  expect(linkElement).toBeInTheDocument();
});
