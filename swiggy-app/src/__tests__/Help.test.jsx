import { render,screen } from "@testing-library/react";
import Help from "../components/Help"

test("Should load help component", () => {
  render(<Help />);
  const heading = screen.getAllByRole("heading");  // return array 
   expect(heading.length).toBe(2);
  expect(heading[0]).toBeInTheDocument();
  expect(heading[0]).toHaveTextContent("Help & Support");
  expect(heading[1]).toBeInTheDocument();   // loaded or not 
  expect(heading[1]).toHaveTextContent("Let's take a step ahead and help you better.");
  
});







