import React from "react";
import { AlertDialog, Button, Icon } from "react-onsenui";
import styles from "./styles.module.css";

interface DeleteButtonProps {
  confirm?: boolean;
  onClick: () => void;
}

export function DeleteButton(props: DeleteButtonProps) {
  const { confirm = true } = props;

  const [
    showDeleteConfirmation,
    setShowDeleteConfirmation,
  ] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <Button
        className={styles.deleteButton}
        modifier="quiet"
        onClick={(e) => {
          e?.stopPropagation();
          confirm ? setShowDeleteConfirmation(true) : props.onClick();
        }}
      >
        <Icon icon="fa-trash-alt" />
      </Button>
      <AlertDialog
        isOpen={showDeleteConfirmation}
        onCancel={() => setShowDeleteConfirmation(false)}
        modifier="rowfooter"
      >
        <div className="alert-dialog-title">Are you sure?</div>
        <div className="alert-dialog-content">
          The item will be deleted permanently
        </div>
        <div className="alert-dialog-footer">
          <Button
            onClick={() => setShowDeleteConfirmation(false)}
            // the --rowfooter modifier is not applied automatically for some reason
            // added it manually here and in the button below
            className="alert-dialog-button alert-dialog-button--rowfooter"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setShowDeleteConfirmation(false);
              props.onClick();
            }}
            className="alert-dialog-button alert-dialog-button--rowfooter"
          >
            Ok
          </Button>
        </div>
      </AlertDialog>
    </React.Fragment>
  );
}
