import React from 'react';
import styles from './completedTodoHeader.module.scss';
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
            <h1>Completed</h1>
            <button
                className={isCompletedTaskContainerExpanded ? styles.dropdownButtonUp : styles.dropdownButtonDown}
                onClick={updateExpandedState}
            />
        </div>
    );
};

export default CompletedAppHeader;
