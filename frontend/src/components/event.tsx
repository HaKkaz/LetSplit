import React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import ItemCard from './itemCard.tsx';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import { useState } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';

import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

// You can put this to any file that's included in your tsconfig
import type { PaletteRange } from '@mui/joy/styles';

declare module '@mui/joy/styles' {
  interface ColorPalettePropOverrides {
    // apply to all Joy UI components that support `color` prop
    secondary: true;
  }

  interface Palette {
    // this will make the node `secondary` configurable in `extendTheme`
    // and add `secondary` to the theme's palette.
    secondary: PaletteRange;
  }
}

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        secondary: {
          // Credit:
          // https://github.com/tailwindlabs/tailwindcss/blob/master/src/public/colors.js
          50: '#7CBBAE',
          100: '#7CBBAE',
          200: '#7CBBAE',
          300: '#7CBBAE',
          400: '#7CBBAE',
          500: '#7CBBAE',
          600: '#7CBBAE',
          700: '#7CBBAE',
          800: '#7CBBAE',
          900: '#7CBBAE',
          // Adjust the global variant tokens as you'd like.
          // The tokens should be the same for all color schemes.
          solidBg: 'var(--joy-palette-secondary-400)',
          solidActiveBg: 'var(--joy-palette-secondary-500)',
          outlinedBorder: 'var(--joy-palette-secondary-500)',
          outlinedColor: 'var(--joy-palette-secondary-700)',
          outlinedActiveBg: 'var(--joy-palette-secondary-100)',
          softColor: 'var(--joy-palette-secondary-800)',
          softBg: 'var(--joy-palette-secondary-200)',
          softActiveBg: 'var(--joy-palette-secondary-300)',
          plainColor: 'var(--joy-palette-secondary-700)',
          plainActiveBg: 'var(--joy-palette-secondary-100)',
        },
      },
    },
    dark: {
      palette: {
        secondary: {
          // Credit:
          // https://github.com/tailwindlabs/tailwindcss/blob/master/src/public/colors.js
          50: '#7CBBAE',
          100: '#7CBBAE',
          200: '#7CBBAE',
          300: '#7CBBAE',
          400: '#7CBBAE',
          500: '#7CBBAE',
          600: '#7CBBAE',
          700: '#7CBBAE',
          800: '#7CBBAE',
          900: '#7CBBAE',
          // Adjust the global variant tokens as you'd like.
          // The tokens should be the same for all color schemes.
          solidBg: 'var(--joy-palette-secondary-400)',
          solidActiveBg: 'var(--joy-palette-secondary-500)',
          outlinedBorder: 'var(--joy-palette-secondary-700)',
          outlinedColor: 'var(--joy-palette-secondary-600)',
          outlinedActiveBg: 'var(--joy-palette-secondary-900)',
          softColor: 'var(--joy-palette-secondary-500)',
          softBg: 'var(--joy-palette-secondary-900)',
          softActiveBg: 'var(--joy-palette-secondary-800)',
          plainColor: 'var(--joy-palette-secondary-500)',
          plainActiveBg: 'var(--joy-palette-secondary-900)',
        },
      },
    },
  },
});

const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50% ',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


function Event() {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(!openModal);
    }

    return (
        <div style={{ position: 'relative' }}>
            <h1 style={{ position: 'fixed', top: 40, left: 0, width: '100%', background: 'white' }}>這是標題</h1>
            <Tabs defaultValue={0} >
                <TabList style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white' }}>
                    <Tab> 收支明細 </Tab>
                    <Tab> 結算總覽 </Tab>
                </TabList>
                <TabPanel value={0}>
                    <button onClick={handleOpenModal} style={{ position: 'fixed', top: '25%', left: '52%', width: '20%', background: 'white' }}>新增成員</button>
                    <Modal 
                        open={openModal}
                        onClose={handleOpenModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <ModalDialog>
                            <DialogTitle>新增成員</DialogTitle>
                            <form
                                onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                                event.preventDefault();
                                    setOpenModal(false);
                                }}
                            >
                                <Stack spacing={2}>
                                <FormControl>
                                    <Input autoFocus required placeholder="輸入成員名稱"/>
                                </FormControl>
                                <CssVarsProvider theme={theme}>
                                    <Button type="submit" color="secondary">確認</Button>
                                </CssVarsProvider>
                                
                                </Stack>
                            </form>
                        </ModalDialog>
                    </Modal>
                    <button style={{ position: 'fixed', top: '25%', right: '52%', width: '20%', background: 'white' }}>新增項目</button>
                    <br />
                    <br />
                    <ItemCard />
                </TabPanel>

                <TabPanel value={1}>
                    <b>Second</b> tab panel
                </TabPanel>
            </Tabs>

        </div>

        
    );
};
export default Event;