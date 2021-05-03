import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterIcon from "@material-ui/icons/FilterList";
import { withStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import { deleteReport } from "../../../../api/api_sites";
const defaultToolbarSelectStyles = {
  iconButton: {
    marginRight: "24px",
    top: "50%",
    display: "inline-block",
    position: "relative",
    transform: "translateY(-10%)"
  },
  deleteIcon: {
    color: "#000"
  }
};

class CustomToolbarSelect extends React.Component {
  handleClick = () => {
    console.log("click! current selected rows", this.props.selectedRows);
  };

  handleClickDelete = () => {
    console.log("click! current selected rows", this.props.selectedRows);
    deleteReport(this.props.selectedRows.data[0].dataIndex, (isOk, data) => {
        if (!isOk) {
          return toast.error("Server is not responding!");
        }
        else {
          toast.success("Report has been deleted from database!");
        }
    }
    )
  };
  render() {
    const { classes } = this.props;

    return (
      <div className={"custom-toolbar-select"}>
        <Tooltip title={"Edit"}>
          <IconButton className={classes.iconButton} onClick={this.handleClick}>
            <FilterIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Delete"}>
          <IconButton className={classes.iconButton} onClick={this.handleClickDelete}>
            <DeleteIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

export default withStyles(defaultToolbarSelectStyles, {
  name: "CustomToolbarSelect"
})(CustomToolbarSelect);
