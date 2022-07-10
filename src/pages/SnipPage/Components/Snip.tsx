import { useColorMode } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import generateID from '@/utils/id';

export type SnipProps = {
  code: string;
  error: string | null;
  setError: (error: string | null) => void;
};

function Snip({ code, error, setError }: SnipProps) {
  const { colorMode } = useColorMode();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [showIframe, setShowIframe] = useState(false);
  // const [code, setCode] = useState(codeProp);
  const [iframeKey, setIframeKey] = useState(0);
  const [iframeID] = useState(() => generateID());

  const url = `/embed?colorMode=${colorMode}&iframeID=${iframeID}`;

  const sendCodeToIframe = useCallback(
    (newCode = code) => {
      // FIXME, TODO: change target origin
      iframeRef.current?.contentWindow?.postMessage({ name: 'code', code: newCode }, '*');
    },
    [code],
  );

  // const codeChanged = (newCode = codeProp) => {
  //   setCode(newCode);
  //   sendCodeToIframe(newCode);
  // };

  // const reloadIframe = () => {
  //   setShowIframe(false);
  //   setIframeKey(iframeKey + 1);
  // };

  // const onReset = () => {
  //   setCode(codeProp);
  //   setError(null);
  // };

  useEffect(() => {
    sendCodeToIframe();
  }, [sendCodeToIframe]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (!iframeRef.current || event.data.from !== iframeID) return;

      switch (event.data.name) {
        case 'ready':
          sendCodeToIframe();
          break;
        case 'resize':
          iframeRef.current.style.height = event.data.height + 'px';
          break;
        case 'error':
          setError(event.data.error);
          break;
      }
    };
    window.addEventListener('message', onMessage);

    return () => window.removeEventListener('message', onMessage);
  }, [sendCodeToIframe, iframeID]);

  const iframe = (
    <Box
      position="relative"
      key={iframeKey}
      as="iframe"
      src={url}
      w="full"
      h="full"
      ref={iframeRef}
      display={showIframe ? 'inherit' : 'none'}
      sandbox="allow-scripts"
      onLoad={() => setShowIframe(true)}
    />
  );

  return (
    // <Editable
    //   onReset={onReset}
    //   editMode={editMode}
    //   setEditMode={setEditMode}
    //   editForm={
    //     <>
    //       <FormControl maxW="5xl" mt="2">
    //         <FormLabel htmlFor="name">Code</FormLabel>
    //         <FormHelperText>Write your widget&apos;s code here</FormHelperText>
    //         <Box height="lg" mt="2">
    //           <Editor
    //             height="100%"
    //             defaultLanguage="javascript"
    //             theme={monacoTheme}
    //             defaultValue={code}
    //             onChange={codeChanged}
    //           />
    //         </Box>
    //       </FormControl>
    //     </>
    //   }
    //   //   onSave={() => {
    //   //     onChange([
    //   //       { name: 'src', value: src },
    //   //       { name: 'alt', value: alt },
    //   //     ]);
    //   //   }}
    // >
    iframe
    // </Editable>
  );

  // if (!editMode) {
  //   return (
  //     <Flex alignItems="center">
  //       {iframe}
  //       <IconButton
  //         ml="4"
  //         size="sm"
  //         aria-label="Edit Widget"
  //         icon={<EditIcon />}
  //         onClick={() => setEditMode(true)}
  //       />
  //     </Flex>
  //   );
  // }

  // return (
  //   <Box p="4">
  //     <chakra.form onSubmit={(e) => e.preventDefault()}>
  //       <Flex>
  //         <FormControl maxW="5xl" mt="2">
  //           <FormLabel htmlFor="name">Code</FormLabel>
  //           <FormHelperText>Write your widget&apos;s code here</FormHelperText>
  //           <Box height="lg" mt="2">
  //             <Editor
  //               height="100%"
  //               defaultLanguage="javascript"
  //               theme={monacoTheme}
  //               defaultValue={code}
  //               onChange={codeChanged}
  //             />
  //           </Box>
  //         </FormControl>
  //         <FormControl maxW="5xl" mt="2">
  //           <FormLabel htmlFor="name">
  //             Preview
  //             <IconButton
  //               aria-label="Refresh Preview"
  //               variant="ghost"
  //               size="xs"
  //               fontSize="md"
  //               ml="2"
  //               onClick={reloadIframe}
  //               icon={<MdRefresh />}
  //             />
  //             <IconButton
  //               aria-label="Save"
  //               variant="ghost"
  //               size="xs"
  //               fontSize="md"
  //               ml="2"
  //               disabled={!!error}
  //               onClick={() => setEditMode(false)}
  //               icon={<MdSave />}
  //             />
  //           </FormLabel>
  //           <FormHelperText>Test your widget before adding it</FormHelperText>
  //           <Box m="4">{iframe}</Box>
  //         </FormControl>
  //       </Flex>
  //     </chakra.form>
  //   </Box>
  // );
}

export default Snip;
