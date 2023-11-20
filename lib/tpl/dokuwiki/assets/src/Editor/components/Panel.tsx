import React, { useState } from 'react';

interface PanelProps extends React.PropsWithChildren {
    title: string;
    icon?: string;
    open?: boolean;
}

const Panel: React.FC<PanelProps> = props => {
    const { children, title, icon } = props;

    const id = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const getCachedOpen = () => window.localStorage.getItem(id) === 'true';

    const [open, setOpen] = useState(getCachedOpen() || props.open);

    const classNames: string = ['inspector-panel', open ? 'open' : false].filter(Boolean).join(' ');

    const toggleOpen = (value: boolean) => {
        window.localStorage.setItem(title.replace(/[^a-z0-9]/gi, '_').toLowerCase(), value ? 'true' : '');
        setOpen(value);
    };

    return (
        <div className={classNames}>
            <div className="panel-header" onClick={() => toggleOpen(!open)}>
                <span>
                    <i className="material-symbols-outlined">{icon}</i>
                    {title}
                </span>
                <i className="material-symbols-outlined">expand_more</i>
            </div>
            <div className="panel-content">{children}</div>
        </div>
    );
};

Panel.defaultProps = {
    open: false,
};

export default Panel;
