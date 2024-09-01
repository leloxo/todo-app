import Modal from "react-modal";
import React from "react";
import styles from './warnModal.module.scss'

interface WarnModalProps {
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const WarnModal: React.FC<WarnModalProps> = ({ isOpen, message, onConfirm, onCancel }) => {
    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onCancel}
                contentLabel="Confirm Delete"
                className={styles.modalContent}
                overlayClassName={styles.modalOverlay}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
                    {message}
                </h2>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                        className={styles.modalButtonYes}
                        onClick={onConfirm}
                    >
                        Yes
                    </button>
                    <button
                        className={styles.modalButtonCancel}
                        onClick={onCancel}
                    >
                        No
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default WarnModal;