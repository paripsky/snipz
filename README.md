Snipz
===
Create and share runnable snippets of code, components & more.

## [Installation](#installation)
```
npm i
npm run dev
```

## [Your first snip](#your-first-snip)
React component:
```tsx
export default function Counter({ pluginContext }) {
  const { Button, Box } = pluginContext.components;
  const { useState } = pluginContext.hooks;
  const [count, setCount] = useState(0);

  return (
    <Box>
      <Button onClick={() => setCount(count + 1)}>+1</Button>
      <Button mx="2" onClick={() => setCount(count - 1)}>-1</Button>
      {count}
    </Box>
  );
}
```

Converter:
```
export default function convertToBase64(from: string) {
    return btoa(from);
}
```
