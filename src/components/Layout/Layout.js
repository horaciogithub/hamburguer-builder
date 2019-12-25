import React from 'react';

import Aux from '../../hoc/AuxReact';

import './Layout.css';

const layout = (props) => (
    <Aux>
        <div>Toolber, SlideBar, BackDrop</div>
        <main className="content">
            {props.children}
        </main>
    </Aux>
);

export default layout;  