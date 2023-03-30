import React from 'react';
import { Drawer } from 'rsuite';

const DrawerPanel = ({
    handleClose,
    title,
    light,
    open,
    children,
    hasBackdrop,
    placement,
    size,
}) => (
    <>
        <Drawer
            open={open}
            onClose={handleClose}
            backdrop={hasBackdrop && 'static'}
            placement={placement}
            size={size}
        >
            {title && (
                <Drawer.Header
                    className={`${
                        !light
                            ? 'bg-slate-800 text-slate-100'
                            : 'bg-slate-100 text-slate-800'
                    }`}
                >
                    <Drawer.Title
                        className={`${
                            !light ? 'text-slate-100' : 'text-slate-800'
                        }`}
                    >
                        {title}
                    </Drawer.Title>
                </Drawer.Header>
            )}

            <Drawer.Body
                className={`${
                    !light
                        ? 'bg-slate-900 text-slate-100'
                        : 'bg-slate-50 text-slate-800'
                } px-5`}
            >
                {children}
            </Drawer.Body>
        </Drawer>
    </>
);

export default DrawerPanel;
