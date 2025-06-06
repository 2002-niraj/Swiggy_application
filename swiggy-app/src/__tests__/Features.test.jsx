import { render,screen } from "@testing-library/react";
import Features from "../components/Features"

test("should loaded all buttons of features",()=>{

    render(<Features/>)
    const buttons = screen.getAllByRole("button");
    console.log(buttons.length)
    expect(buttons.length).toBe(8);
})


test("should load button name of features",()=>{
    render(<Features/>)
    const buttonText = screen.getByText("Sort By");
    expect(buttonText).toBeInTheDocument();
})
