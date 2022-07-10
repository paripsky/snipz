import { HamburgerIcon } from '@chakra-ui/icons';
import { Flex, IconButton, useColorMode } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import Head from '@/components/Head';
import Omnibar from '@/components/Omnibar';
import Sidebar from '@/components/Sidebar';
import { useLayout } from '@/context/layout';

function DefaultLayout() {
  const { colorMode } = useColorMode();
  const { toggleSidebar, isSidebarFloating } = useLayout();

  return (
    <Flex h="100vh" css={{ colorScheme: colorMode }}>
      <Head />
      <Omnibar />
      <Sidebar />
      <Flex flexDir="column" w="full" m="4">
        {isSidebarFloating && (
          <IconButton
            w="10"
            icon={<HamburgerIcon />}
            aria-label="toggle menu"
            onClick={toggleSidebar}>
            menu
          </IconButton>
        )}
        {/* <Flex justifyContent="center" height="full" overflow="auto"> */}
        <Outlet />
        {/* </Flex> */}
      </Flex>
    </Flex>
  );
}

export default DefaultLayout;
