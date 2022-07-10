localStorage.setItem(
  'snips',
  JSON.stringify([
    {
      id: 'counter',
      name: 'Counter',
      code: `export default function Counter({ pluginContext }) {
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
`,
      icon: '🤖',
      createdAt: '2022-06-27T17:04:45.165Z',
      updatedAt: '2022-06-27T17:04:45.165Z',
    },
    {
      id: 'timer',
      name: 'Timer',
      code: `export default function Timer({ pluginContext }) {
  const { Button, Box } = pluginContext.components;
  const { useState, useRef, useEffect } = pluginContext.hooks;
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(null);
  const intervalRef = useRef();

useEffect(() => {
intervalRef.value = setInterval(() => setTime(new Date()), 1000);
  return () => clearInterval(intervalRef.value);
}, [])
  

  return (
    <Box>
      The time is {time.toLocaleString()}
    </Box>
  );
}
`,
      icon: '🐲',
      createdAt: '2022-06-25T17:04:45.165Z',
      updatedAt: '2022-06-25T17:04:45.165Z',
    },
  ]),
);
