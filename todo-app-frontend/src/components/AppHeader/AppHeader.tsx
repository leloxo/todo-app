import React from 'react';
import styles from './appHeader.module.scss';
import {useDispatch} from "react-redux";
import {NavigationState, setNavigationState} from '../../slices/todoSlice';
import {AppDispatch} from "../../store/store";

const AppHeader: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    return (
        <div className={styles.headerContainer}>
            <h1>Tasks</h1>
            <button onClick={() => dispatch(setNavigationState(NavigationState.CREATE))}>
                Add Task
            </button>
        </div>
    );
};

export default AppHeader;