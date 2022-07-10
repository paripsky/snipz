import { CheckIcon, CloseIcon, EditIcon, LinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Spinner,
} from '@chakra-ui/react';
import { Suspense, useEffect, useMemo, useState } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';

import { useSnips } from '@/context/snips';

const Snip = React.lazy(() => import('@/pages/SnipPage/components/Snip'));
const SnipEditor = React.lazy(() => import('@/pages/SnipPage/components/SnipEditor'));

function SnipPage() {
  const { snipId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { snips, snipsLoading, updateSnip } = useSnips();
  const snip = useMemo(() => snips.find((snip) => snip.id === snipId), [snips, snipId]);
  const [editedCode, setEditedCode] = useState(snip?.code || '');

  function onChange(code: string) {
    setEditedCode(code);
  }

  function onSave() {
    if (!snip || !updateSnip) return;

    updateSnip({
      ...snip,
      code: editedCode,
    });
  }

  function onCancel() {
    if (!snip) return;

    setEditedCode(snip?.code);
  }

  useEffect(() => {
    setEditMode(false);
  }, [snipId]);

  if (snipsLoading) return <Spinner />;

  if (!snip) return <>Not Found</>;

  return (
    <Box>
      <Flex mb="2">
        <Heading as="h5" size="sm">
          {snip.name}
        </Heading>
        <ButtonGroup justifyContent="end" size="sm" w="full" pr="2" pt="2">
          {!editMode ? (
            <>
              <Button
                size="sm"
                title="Edit"
                aria-label="Edit Snip"
                rightIcon={<EditIcon />}
                onClick={() => setEditMode(true)}>
                Edit
              </Button>
            </>
          ) : (
            <>
              <IconButton
                aria-label="Cancel"
                icon={<CloseIcon />}
                onClick={() => {
                  setEditMode(false);
                  onCancel();
                }}
              />
              <IconButton
                aria-label="Save"
                icon={<CheckIcon />}
                disabled={!!error}
                onClick={() => {
                  onSave();
                  setEditMode(false);
                }}
              />
            </>
          )}
          <IconButton
            size="sm"
            title="Share"
            aria-label="Share Snip"
            icon={<LinkIcon />}
          />
        </ButtonGroup>
      </Flex>
      <Suspense fallback={<Spinner />}>
        {!editMode ? (
          <Snip key={snipId} code={snip.code} error={error} setError={setError} />
        ) : (
          <SnipEditor
            code={snip.code}
            error={error}
            setError={setError}
            onChange={onChange}
          />
        )}
      </Suspense>
    </Box>
  );
}

export default SnipPage;
