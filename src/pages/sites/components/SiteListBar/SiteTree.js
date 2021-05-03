import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import useStyles from "./styles";
import LocationCityRoundedIcon from '@material-ui/icons/LocationCityRounded';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import locationIcon from "./location.svg";
import normalIcon from "./normal.svg";
import alarmIcon from "./alarm.svg";
import nullIcon from "./null.svg";
import cityIcon from "./city.svg";
import ButtonBase from '@material-ui/core/ButtonBase';




function StyledTreeItem(props) {
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

    const clickSite = (e,x,y) => {
        props.setCenter([y,x]);
        props.setToggleMapCenter(true)
        props.setClickedSite(props.sites.find(element => element.locationY == y && element.locationX == x));
        const clickedSiteTemp = props.sites.find(element => element.locationY == y && element.locationX == x);
        localStorage.setItem("clickedSiteID", clickedSiteTemp.id);
    };

    return (
        <TreeView
            className={classes.tree}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            expanded={expanded}
            selected={selected}
            onNodeToggle={handleToggle}
            onNodeSelect={handleSelect}
        >
            {
                props.cities.map((item, cityindex) => (
                    <StyledTreeItem
                        nodeId={cityindex}
                        labelText={item.cityName}
                        labelIcon={LocationCityRoundedIcon}
                        // color='#DAE5F4'
                        bgColor='#DAE5F4'
                        style={{
                            width: '80%',
                            marginTop: '0.5rem',
                            marginLeft: '1rem',
                            marginBottom: '0.5rem',
                            fontSize:'0.7vw'
                        }} >
                        {item.siteNames.map((site, siteindex) => (
                            <> 
                           
                            <ListItem key={site} button style={{ fontSize:'0.8vw',marginLeft: '1rem' , borderRadius:'0 3rem 3rem 0'}} divider={true} >
                            <ButtonBase onClick={(e)=>clickSite(e,item.locationX[siteindex],item.locationY[siteindex])}>
                                    <ListItemAvatar>
                                        <Avatar src={item.status[siteindex]=="OK"?normalIcon:item.status[siteindex]=="notOK"?alarmIcon:nullIcon} style={{
                                            // border: 'solid',
                                            // borderWidth: '0.1rem',
                                            width:'40px',
                                            borderRadius: '3rem',
                                            // borderColor:'red',
                                            height: '40px',
                                            webkitBoxShadow: '0px 0px 8px -4px rgba(0,0,0,0.45)',
                                            mozBoxShadow: '0px 0px 8px -4px rgba(0,0,0,0.45)',
                                            boxShadow: '0px 0px 8px -4px rgba(0,0,0,0.45)',
                                        }} />
                                    </ListItemAvatar>
                                    
                                    <ListItemText  id={cityindex + 10 * siteindex + 2} primary={<><Typography style={{fontSize:'0.7vw'}}>{site}</Typography></>}/>
                                      </ButtonBase>
                                </ListItem>
                              

                            
                                
                                
                            </>
                        )
                        )}
                    </StyledTreeItem>


                ))
            }

        </TreeView>
    );
}
