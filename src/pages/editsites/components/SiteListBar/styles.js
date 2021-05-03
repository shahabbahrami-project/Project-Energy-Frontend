import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    color: theme.palette.text.secondary,
    '&:hover > $content': {
       backgroundColor: theme.palette.action.hover,
       backgroundColor: 'transparent',
    },
    '&:focus > $content, &$selected > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[50]})`,
      color: 'var(--tree-view-color, ${theme.palette.grey[50]})',
      backgroundColor: 'transparent',
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: 'transparent',
    },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
    width: '30px',
    border: 'solid',
    borderWidth: '0.1rem',
    borderRadius: '3rem',
    height: '30px',
    webkitBoxShadow: '0px 0px 8px -4px rgba(0,0,0,0.45)',
    mozBoxShadow: '0px 0px 8px -4px rgba(0,0,0,0.45)',
    boxShadow: '0px 0px 8px -4px rgba(0,0,0,0.45)',
  },
  labelText: {
    fontSize:'0.85vw',
    fontWeight: 'inherit',
    flexGrow: 1,
  },
  tree: {
    height: '100%',
    minHeight:82,
    flexGrow: 1,
    maxWidth: 400,
    width: '100%',
    maxWidth: 360,
    maxHeight:5000,
    backgroundColor: theme.palette.background.paper,
    borderWidth: '0.5px',
    borderColor: '#0566773b',
    borderRadius: '0.5rem',
    borderStyle: 'solid',
    webkitBoxShadow: '0px 0.5px 1px 0.1px rgba(0,0,0,0.43)',
    mozBoxShadow: '0px 0.5px 1px 0.1px rgba(0,0,0,0.43)',
    boxShadow: '0px 0.5px 1px 0.1px rgba(0,0,0,0.43)',

  },
  treeItem: {
    width: '80%',
    marginTop:'0.5rem',
    marginLeft:'1rem',

  },
}));
