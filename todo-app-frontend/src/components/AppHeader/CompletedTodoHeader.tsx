import React from 'react';
import styles from './appHeader.module.scss';

const CompletedAppHeader: React.FC = () => {
    return (
        <div className={styles.headerContainer} style={{ marginTop: '1rem' }}>
            <h1>Completed Tasks</h1>
        </div>
    );
};

export default CompletedAppHeader;