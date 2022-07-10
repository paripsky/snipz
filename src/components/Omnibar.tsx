import {
  Box,
  Flex,
  Input,
  Slide,
  useColorModeValue,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';

const Omnibar: React.FC = () => {
  const bg = useColorModeValue('gray.300', 'gray.900');
  const { isOpen, onClose, onOpen } = useDisclosure();
  const ref = useRef(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useOutsideClick({
    ref,
    handler: onClose,
  });

  useEffect(() => {
    const onKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.code === 'KeyP') {
        onOpen();
      }

      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyPress);

    return () => window.removeEventListener('keydown', onKeyPress);
  }, [onOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <Slide direction="top" in={isOpen} style={{ zIndex: 10 }}>
      <Flex justifyContent="center">
        <Box ref={ref} w="2xl" p="4" bg={bg}>
          <Input placeholder="Search..." ref={inputRef} />
        </Box>
      </Flex>
    </Slide>
  );
};

export default Omnibar;
