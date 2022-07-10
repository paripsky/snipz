import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  useColorMode,
} from '@chakra-ui/react';
import Editor from '@monaco-editor/react';
import React, { useEffect, useState } from 'react';

import Snip from '@/pages/SnipPage/Components/Snip';

export type SnipEditorProps = {
  children?: React.ReactNode;
  code: string;
  error: string | null;
  setError: (error: string | null) => void;
  onChange: (code: string) => void;
};

function SnipEditor({ code: codeProp, error, setError, onChange }: SnipEditorProps) {
  const { colorMode } = useColorMode();
  const [monacoTheme, setMonacoTheme] = useState('vs-dark');
  const [code, setCode] = useState(codeProp);

  const codeChanged = (newCode = codeProp) => {
    setCode(newCode);
    onChange(newCode);
  };

  useEffect(() => {
    setMonacoTheme(colorMode === 'light' ? 'vs-light' : 'vs-dark');
  }, [colorMode]);

  return (
    <FormControl>
      <FormLabel htmlFor="name">Code</FormLabel>
      <FormHelperText>Write your widget&apos;s code here</FormHelperText>
      <Flex w="full">
        <Box height="lg" mt="2" w="5xl">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            theme={monacoTheme}
            defaultValue={code}
            onChange={codeChanged}
          />
        </Box>
        <Box>
          <Snip code={code} error={error} setError={setError} />
        </Box>
      </Flex>
    </FormControl>
  );
}

export default SnipEditor;
