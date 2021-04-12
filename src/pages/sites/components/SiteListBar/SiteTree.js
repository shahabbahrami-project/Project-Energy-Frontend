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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import locationIcon from "./location.svg";
import cityIcon from "./city.svg";
import ButtonBase from '@material-ui/core/ButtonBase';
// const useTreeItemStyles = makeStyles((theme) => ({
//     root: {
//         color: theme.palette.text.secondary,
//         '&:hover > $content': {
//             backgroundColor: theme.palette.action.hover,
//         },
//         '&:focus > $content, &$selected > $content': {
//             backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[50]})`,
//             color: 'var(--tree-view-color, ${theme.palette.grey[50]})',
//         },
//         '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
//             backgroundColor: 'transparent',
//         },
//     },
//     content: {
//         color: theme.palette.text.secondary,
//         borderTopRightRadius: theme.spacing(2),
//         borderBottomRightRadius: theme.spacing(2),
//         paddingRight: theme.spacing(1),
//         fontWeight: theme.typography.fontWeightMedium,
//         '$expanded > &': {
//             fontWeight: theme.typography.fontWeightRegular,
//         },
//     },
//     group: {
//         marginLeft: 0,
//         '& $content': {
//             paddingLeft: theme.spacing(2),
//         },
//     },
//     expanded: {},
//     selected: {},
//     label: {
//         fontWeight: 'inherit',
//         color: 'inherit',
//     },
//     labelRoot: {
//         display: 'flex',
//         alignItems: 'center',
//         padding: theme.spacing(0.5, 0),
//     },
//     labelIcon: {
//         marginRight: theme.spacing(1),
//         width: '30px',
//         border: 'solid',
//         borderWidth: '0.1rem',
//         borderRadius: '3rem',
//         height: '30px',
//         webkitBoxShadow: '0px 0px 8px -4px rgba(0,0,0,0.45)',
//         mozBoxShadow: '0px 0px 8px -4px rgba(0,0,0,0.45)',
//         boxShadow: '0px 0px 8px -4px rgba(0,0,0,0.45)',
//     },
//     labelText: {
//         fontWeight: 'inherit',
//         flexGrow: 1,
//     },
// }));


// props2.setToggleMapCenter(true)
// props2.setCenter([ data[0].locationY, data[0].locationX])

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
        // timer.current = window.setTimeout(() => {
        //     props.setToggleMapCenter(false);
        //   }, 2000);
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








                // props.cities.map((item, cityindex) => (
                //     <StyledTreeItem
                //         nodeId={cityindex}
                //         labelText={item.cityName}
                //         labelIcon={LocationCityRoundedIcon}
                //         color='#DAE5F4'
                //         bgColor='#DAE5F4'
                //         style={{
                //             width: '80%',
                //             marginTop: '0.5rem',
                //             marginLeft: '1rem',
                //             marginBottom: '0.5rem'
                //         }} >
                //         {item.siteNames.map((site, siteindex) => (
                //             <> 

                //             <ListItem key={site} button style={{ marginLeft: '1rem' , borderRadius:'0 3rem 3rem 0'}} divider={true} >
                //             <ButtonBase onClick={(e)=>clickSite(e,item.locationX[siteindex],item.locationY[siteindex])}>
                //                     <ListItemAvatar>
                //                         <Avatar src={locationIcon} style={{
                //                             border: 'solid',
                //                             borderWidth: '0.1rem',
                //                             width:'30px',
                //                             borderRadius: '3rem',
                //                             borderColor:'red',
                //                             height: '30px',
                //                             webkitBoxShadow: '0px 0px 8px -4px rgba(0,0,0,0.45)',
                //                             mozBoxShadow: '0px 0px 8px -4px rgba(0,0,0,0.45)',
                //                             boxShadow: '0px 0px 8px -4px rgba(0,0,0,0.45)',
                //                         }} />
                //                     </ListItemAvatar>

                //                     <ListItemText id={cityindex + 10 * siteindex + 2} primary={site}/>
                //                     {/* <ListItemSecondaryAction>
                //                         <Checkbox
                //                             edge="end"
                //                             onChange={handleToggleCheckBox(cityindex + 10 * siteindex + 2)}
                //                             checked={checked.indexOf(cityindex + 10 * siteindex + 2) === -1}
                //                             inputProps={{ 'aria-labelledby': cityindex + 10 * siteindex + 2 }}
                //                         />
                //                     </ListItemSecondaryAction> */}
                //                       </ButtonBase>
                //                 </ListItem>





                //             </>
                //         )
                //         )}
                //     </StyledTreeItem>


                // ))

            

    
    );
}

{/* <Checkbox
edge="end"
onChange={handleToggleCheckBox(site)}
checked={checked.indexOf(site) !== -1}
inputProps={{ 'aria-labelledby': `checkbox-list-secondary-label-${site}` }}
/> */}