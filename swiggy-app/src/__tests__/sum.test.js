import { expect } from "vitest";
import {sum} from "../components/sum.js"

test("addtion of 2 number",()=>{

    const result = sum(3,4);
    expect(result).toBe(7);
})