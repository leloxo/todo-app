import React from 'react';
import styles from './appTitle.module.scss'

interface AppTitleProps {
    title: string;
}

const AppTitle: React.FC<AppTitleProps> = ({ title }) => {
    return (
        <p className={styles.appTitle}>
            {title}
        </p>
    );
};

export default AppTitle;