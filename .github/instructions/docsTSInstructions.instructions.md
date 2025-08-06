---
applyTo: '**/.ts,**/.tsx'
---
When generating documentation for JavaScript and TypeScript files, ensure that the comments are clear and concise. Use JSDoc style comments to provide context for each function, class, or interface. Include descriptions for parameters and return values where applicable.
Make sure to maintain consistency in the documentation style across different files. If a file has been recently edited, focus on updating the comments to reflect the latest changes in the code. Avoid suggesting code that has been deleted or is no longer relevant.
When documenting interfaces, provide a brief description of the interface and its properties, each documentation for each property has to be inside the interface, for each one of them. If a property is optional, indicate this clearly in the documentation.

if the interface is:
```typescript
export interface Example {
    exampleProperty: string;
    optionalProperty?: number;
}
```
The documentation should be structured as follows:
```typescript
export interface Example {
    /**
     * A required property of type string.
     */
    exampleProperty: string;

    /**
     * An optional property of type number.
     */
    optionalProperty?: number;
}
```

All the documentation always has to be in english, even if the code is in another language or the prompt is in another language.