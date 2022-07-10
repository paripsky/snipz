import {
  Avatar,
  Box,
  chakra,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Spinner,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { MdAddCircleOutline, MdStorefront } from 'react-icons/md';
import { useLocation, useSearchParams } from 'react-router-dom';

import Link from '@/components/Link';
import LinkButton from '@/components/LinkButton';
import { useLayout } from '@/context/layout';
import { useSettings } from '@/context/settings';
import { useSnips } from '@/context/snips';
import getAvatarUrl from '@/utils/avatar';

const Sidebar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [searchText, setSearchText] = useState(searchParams.get('search') || '');
  const searchRef = useRef<HTMLInputElement>(null);
  const { snips, snipsLoading } = useSnips();
  const name = 'John Doe The Third III';
  const email = 'johnd@email.com';
  const user = true;
  const loadingUser = false;
  const { isSidebarOpen, toggleSidebar, isSidebarFloating } = useLayout();
  const { settings } = useSettings();

  useEffect(() => {
    if (!searchText) {
      setSearchParams({});
      return;
    }

    setSearchParams({ search: searchText });
  }, [searchText]);

  const floatingProps = useMemo(() => {
    if (!isSidebarFloating) return {};

    return {
      position: 'fixed',
      zIndex: 2,
      height: 'full',
      transition: 'transform 0.2s ease-in-out',
      transform: `translateX(${isSidebarOpen ? 0 : '-100%'})`,
    } as const;
  }, [isSidebarFloating, isSidebarOpen]);

  const sidebarBody = (
    <>
      <Link to="/">
        <Text
          fontSize="xl"
          display="inline"
          fontWeight="bold"
          mx="1"
          px="1"
          bg="purple.800"
          color="white">
          S
        </Text>
        <Text fontSize="lg" display="inline">
          snipz
        </Text>
        <Text fontSize="xs" display="inline">
          .dev
        </Text>
      </Link>
      <InputGroup my="2">
        {/* <InputRightElement>
          <Kbd>/</Kbd>
        </InputRightElement> */}
        <InputLeftElement>
          <Icon as={BsSearch} />
        </InputLeftElement>
        <Input
          placeholder="Search"
          ref={searchRef}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </InputGroup>
      <Box flex="1" maxH="full" overflow="auto" p="1">
        {/* Content */}
        {/* <Link to="/util/base64">base64</Link> */}
        {snipsLoading ? (
          <Spinner />
        ) : (
          snips.map(({ id, name, icon }) => (
            <LinkButton
              key={id}
              leftIcon={<>{icon}</>}
              w="full"
              justifyContent="flex-start"
              variant={location.pathname.includes(`/snip/${id}`) ? 'solid' : 'outline'}
              mb="2"
              to={`/snip/${id}`}>
              {name}
            </LinkButton>
          ))
        )}
      </Box>
      <LinkButton
        leftIcon={<Icon boxSize={5} as={MdAddCircleOutline} />}
        w="full"
        justifyContent="flex-start"
        variant="ghost"
        mt="2"
        to="/util/new">
        Create
      </LinkButton>
      <LinkButton
        leftIcon={<Icon boxSize={5} as={MdStorefront} />}
        w="full"
        justifyContent="flex-start"
        variant="ghost"
        my="2"
        to="/marketplace">
        Marketplace
      </LinkButton>
      <LinkButton
        leftIcon={<Icon boxSize={5} as={MdStorefront} />}
        w="full"
        justifyContent="flex-start"
        variant="ghost"
        my="2"
        to="/marketplace">
        Docs
      </LinkButton>
      <LinkButton
        leftIcon={<Icon boxSize={5} as={FiSettings} />}
        w="full"
        justifyContent="flex-start"
        variant="ghost"
        to="/settings">
        Settings
      </LinkButton>
      <Box borderTopWidth={1} mb="2" mt="4"></Box>
      <Skeleton isLoaded={!loadingUser}>
        {user ? (
          <Menu placement="top">
            <MenuButton aria-label="Options" as="div">
              <Box
                display="flex"
                alignItems="center"
                p="2"
                pointerEvents="all"
                cursor="pointer">
                <Avatar
                  name="John Doe"
                  size="sm"
                  src={getAvatarUrl(email, settings.avatarType)}
                  mr="2"
                />
                <Box overflow="hidden">
                  {/* <Link to="/login"> */}
                  <Text fontWeight="semibold" noOfLines={1} title={name}>
                    {name}
                  </Text>
                  <Text fontSize="sm" noOfLines={1} title={email}>
                    {email}
                  </Text>
                  {/* </Link> */}
                </Box>
              </Box>
            </MenuButton>
            <MenuList>
              <MenuItem>Log out</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <LinkButton to="/login" w="full">
            Log in
          </LinkButton>
        )}
      </Skeleton>
    </>
  );

  if (isSidebarFloating) {
    return (
      <Drawer isOpen={isSidebarOpen} placement="left" onClose={toggleSidebar} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          {/* <DrawerHeader>Create your account</DrawerHeader> */}

          <DrawerBody display="flex" flexDir="column" p="2">
            {sidebarBody}
          </DrawerBody>

          {/* <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <chakra.aside
      aria-hidden={!isSidebarOpen}
      role={isSidebarOpen ? 'dialog' : 'none'}
      tabIndex={isSidebarOpen ? 0 : -1}
      // bg={useColorModeValue('gray.50', 'gray.900')}
      display="flex"
      flexDir="column"
      w="3xs"
      p="2"
      borderRightWidth={1}
      {...floatingProps}>
      {sidebarBody}
    </chakra.aside>
  );
};

export default Sidebar;
