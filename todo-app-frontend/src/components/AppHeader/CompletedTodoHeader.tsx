import React from 'react';
import styles from './appHeader.module.scss';
import {setCompletedTaskContainerExpanded} from "../../slices/todoSlice";
import {AppDispatch, RootState} from "../../store/store";
import {useDispatch, useSelector} from "react-redux";

const CompletedAppHeader: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const isCompletedTaskContainerExpanded = useSelector((state: RootState) => state.todo.isCompletedTaskContainerExpanded);

    const updateExpandedState = () => {
        dispatch(setCompletedTaskContainerExpanded(!isCompletedTaskContainerExpanded));
    }

    return (
        <div className={styles.headerContainer} style={{ marginTop: '1rem' }}>
            <h1 style={{ cursor: 'pointer' }} onClick={updateExpandedState}>Completed Tasks</h1>
        </div>
    );
};

export default React.memo(CompletedAppHeader);