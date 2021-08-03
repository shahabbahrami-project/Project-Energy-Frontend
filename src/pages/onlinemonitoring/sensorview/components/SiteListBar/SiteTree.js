import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import useStyles from "./styles";
import LocationCityRoundedIcon from '@material-ui/icons/LocationCityRounded';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import normalIcon from "./normal.svg";
import alarmIcon from "./alarm.svg";
import nullIcon from "./null.svg";
import ButtonBase from '@material-ui/core/ButtonBase';
import { getSensorsList } from '../../../../../api/api_sensors';
import { toast } from "react-toastify";
import List from '@material-ui/core/List';
import locationIcon from "./location.svg";


function StyledTreeItem(props) {
    // const classes = useTreeItemStyles();
    const classes = useStyles();
    const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

    return (
        <TreeItem
            label={
                <div className={classes.labelRoot}>
                    <LabelIcon color="primary" className={classes.labelIcon} />
                    <Typography variant="body2" className={classes.labelText}>
                        {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit">
                        {labelInfo}
                    </Typography>
                </div>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
            classes={{
                root: classes.root,
                content: classes.content,
                expanded: classes.expanded,
                selected: classes.selected,
                group: classes.group,
                label: classes.label,
            }}
            {...other}
        />
    );
}

StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
};





export default function SiteTree(props) {
    const classes = useStyles();
    const timer = React.useRef();
    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);
    const [expanded, setExpanded] = React.useState([]);
    const [selected, setSelected] = React.useState([]);

    const [checked, setChecked] = React.useState([1]);

    const handleToggleCheckBox = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        console.log(checked)
    };

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
    };

    const clickSite = (e, x, y) => {
        console.log(e)
        props.setCenter([y, x]);
        props.setToggleMapCenter(true)
    };

    return (
        <>

            <List component="nav" aria-label="main mailbox folders" className={classes.tree}>
                        {props.sites.map((site, siteindex) => (
                           <>

                                <ListItem key={site.name} button style={{ marginLeft: '1rem', borderRadius: '0 3rem 3rem 0', width:'94%' }} divider={true} >
                                    <ButtonBase onClick={(e) => clickSite(e, site.locationX, site.locationY)}>
                                                <ListItemAvatar>
                                                        <Avatar src={locationIcon} style={{
                                            border: 'solid',
                                            borderWidth: '0.1rem',
                                            width:'30px',
                                            borderRadius: '3rem',
                                            borderColor:'red',
                                            height: '30px',
                                            webkitBoxShadow: '0px 0px 8px -4px rgba(0,0,0,0.45)',
                                            mozBoxShadow: '0px 0px 8px -4px rgba(0,0,0,0.45)',
                                            boxShadow: '0px 0px 8px -4px rgba(0,0,0,0.45)',
                                        }} />
                                    </ListItemAvatar>

                                    <ListItemText id={10 * siteindex + 2} primary={site.name}/>
                                      </ButtonBase>
                                </ListItem>





                            </>))}

            </List>

        </>  
    );
}