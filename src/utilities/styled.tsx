import {
    CreateMUIStyled,
    styled as muiStyled,
    Theme,
} from "@mui/material/styles";
import { JSX } from "react";

type MuiStyledType = typeof muiStyled;


/**
 * Default options for styled components to control which props are forwarded to the DOM.
 *
 * - `rootShouldForwardProp`, `slotShouldForwardProp`, and `shouldForwardProp` are functions that determine
 *   whether a prop should be forwarded based on its name.
 * - Props starting with the `$` character (char code 36) are filtered out and not forwarded.
 * - This is useful for filtering out style-related or internal props from being passed to DOM elements.
 *
 * @property rootShouldForwardProp - Function to filter props for the root component.
 * @property slotShouldForwardProp - Function to filter props for slot components.
 * @property shouldForwardProp - General function to filter props.
 */
export const defaultStyledOptions = {
    rootShouldForwardProp: (prop: PropertyKey) =>
        typeof prop === "string" && prop.charCodeAt(0) !== 36, // Filtra props que começam com '$'
    slotShouldForwardProp: (prop: PropertyKey) =>
        typeof prop === "string" && prop.charCodeAt(0) !== 36,
    shouldForwardProp: (prop: PropertyKey) =>
        typeof prop === "string" && prop.charCodeAt(0) !== 36,
};

const styled: CreateMUIStyled<Theme> = Object.keys(muiStyled).reduce(
    (acc, tag) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (acc as any)[tag] = muiStyled(
            tag as keyof JSX.IntrinsicElements,
            defaultStyledOptions
        );
        return acc;
    },
    (component: React.ElementType, options?: object) => {
        /* @ts-expect-error : Generic */
        return muiStyled(component, {
            ...defaultStyledOptions,
            ...options,
        });
    }
);

export default styled as MuiStyledType;
