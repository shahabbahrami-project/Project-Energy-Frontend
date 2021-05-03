import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getThemeProps } from '@material-ui/styles';
import useStyles from "./styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from '@material-ui/core/OutlinedInput';

const options = [
    'Show some love to Material-UI',
    'Show all notification content',
    'Hide sensitive notification content',
    'Hide all notification content',
];

export default function Search(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [searchValue, setSearchValue] = React.useState();
    const [isSearch, setIsSearch] = React.useState(false);




    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    const handleChangeSearch = (event) => {
        console.log(isSearch)
        //   if (isSearch==false){
        //     setAnchorEl(event.currentTarget);
        //     setSearchValue(event.target.value);
        //   }
        setAnchorEl(null);
        setSearchValue(event.target.value);
        setAnchorEl(event.currentTarget);

        //   setIsSearch(false);      
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setSearchValue(options[selectedIndex]);
        setIsSearch(true);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const userlist = props.users.map(user => user.fullName)
    return (
        <>
            <div style={{margin: '0px 0px 10px -10px', width:'17vw'}}>
                <Paper component="form"className={classes.root}>

                    <InputAdornment position="start">
                        <AccountCircle />
                    </InputAdornment>
                    <Autocomplete
                        classes={{ root: classes.textField2, input:classes.autoText,inputRoot:classes.autoText2, inputFocused:classes.autoTextFocus
                                   }}
                        disabled={!props.buttonState}
                        value={props.selectedUser}
                        onChange={(event, newValue) => {
                            if (newValue != null) {
                                props.setSelectedUser(newValue);
                                props.setButtonStateAdmin(newValue.isAdmin);
                                if (newValue.operatorInSiteIds != null) {
                                    const arrayOperator = newValue.operatorInSiteIds.split(',').map(Number);
                                    
                                    var siteOperList=[]
                                 
                                    if (arrayOperator[0]!=0 ){
                                        siteOperList = arrayOperator.map(item => getKeyByValue(props.siteListLeftState, item))
                                    }
                               
                                    // const siteOperList = arrayOperator.map(item => getKeyByValue(props.siteListLeftState, item))
                                    const siteOperRest = Object.keys(props.siteListLeftState).filter((item) => !siteOperList.includes(item));
                                    props.setRightOperator(siteOperList);
                                    props.setLeftOperator(siteOperRest);
                                }
                                else {
                                    props.setRightOperator([]);
                                    props.setLeftOperator(Object.keys(props.siteListLeftState));
                                }

                                if (newValue.observerInSiteIds != null) {
                                    const arrayObserver = newValue.observerInSiteIds.split(',').map(Number);
                                    var siteObserList=[]
                                    if (arrayObserver[0]!=0 ){
                                        siteObserList = arrayObserver.map(item => getKeyByValue(props.siteListLeftState, item))
                                    }
                               
                   
                                    const siteObserRest = Object.keys(props.siteListLeftState).filter((item) => !siteObserList.includes(item));
                                    props.setRightObserver(siteObserList);
                                    props.setLeftObserver(siteObserRest);
                                }
                                else{
                                    props.setRightObserver([]);
                                    props.setLeftObserver(Object.keys(props.siteListLeftState));
                                }


                                //props.setLeft2(newValue.operatorInSiteIds.split(','))
                            }
                            else {
                                const nullUser = { id: "", fullName: "", email: "", password: null, profilePic: "", isAdmin: false, observerInSiteIds: "", operatorInSiteIds: "", activationCode: null, numberOfFails: null, isSuspend: null, isDelete: null };
                                props.setSelectedUser(nullUser);
                                props.setButtonStateAdmin(false);
                            }

                        }}
                        id="combo-box-demo"
                        options={props.users}
                        getOptionLabel={(option) => {
                            if (option.fullName == null) {
                                return ""
                            }
                            else {
                                return option.fullName
                            }
                        }}
                        style={{ width: '100%', margin: '0.5rem', backgroundColor: '#FCFCFC' }} 
                        renderInput={(params) =>  <TextField {...params} label="Search" variant="outlined" classes={{root:classes.textFieldStyles}}/>}
                        //  classes={{root: "data-shrink"? classes.textFieldStyles2:classes.textFieldStyles}} />}
                    />
     

                </Paper>
            </div>
        </>
    );
}
// const top100Films = [
//     { title: 'The Shawshank Redemption', year: 1994 },
//     { title: 'The Godfather', year: 1972 },
//     { title: 'The Godfather: Part II', year: 1974 },
//     { title: 'The Dark Knight', year: 2008 },
//     { title: '12 Angry Men', year: 1957 },
//     { title: "Schindler's List", year: 1993 },
//     { title: 'Pulp Fiction', year: 1994 },
//     { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
//     { title: 'The Good, the Bad and the Ugly', year: 1966 },
//     { title: 'Fight Club', year: 1999 },
//     { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
//     { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
//     { title: 'Forrest Gump', year: 1994 },
//     { title: 'Inception', year: 2010 },
//     { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
//     { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
//     { title: 'Goodfellas', year: 1990 },
//     { title: 'The Matrix', year: 1999 },
//     { title: 'Seven Samurai', year: 1954 },
//     { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
//     { title: 'City of God', year: 2002 },
//     { title: 'Se7en', year: 1995 },
//     { title: 'The Silence of the Lambs', year: 1991 },
//     { title: "It's a Wonderful Life", year: 1946 },
//     { title: 'Life Is Beautiful', year: 1997 },
//     { title: 'The Usual Suspects', year: 1995 },
//     { title: 'Léon: The Professional', year: 1994 },
//     { title: 'Spirited Away', year: 2001 },
//     { title: 'Saving Private Ryan', year: 1998 },
//     { title: 'Once Upon a Time in the West', year: 1968 },
//     { title: 'American History X', year: 1998 },
//     { title: 'Interstellar', year: 2014 },
//     { title: 'Casablanca', year: 1942 },
//     { title: 'City Lights', year: 1931 },
//     { title: 'Psycho', year: 1960 },
//     { title: 'The Green Mile', year: 1999 },
//     { title: 'The Intouchables', year: 2011 },
//     { title: 'Modern Times', year: 1936 },
//     { title: 'Raiders of the Lost Ark', year: 1981 },
//     { title: 'Rear Window', year: 1954 },
//     { title: 'The Pianist', year: 2002 },
//     { title: 'The Departed', year: 2006 },
//     { title: 'Terminator 2: Judgment Day', year: 1991 },
//     { title: 'Back to the Future', year: 1985 },
//     { title: 'Whiplash', year: 2014 },
//     { title: 'Gladiator', year: 2000 },
//     { title: 'Memento', year: 2000 },
//     { title: 'The Prestige', year: 2006 },
//     { title: 'The Lion King', year: 1994 },
//     { title: 'Apocalypse Now', year: 1979 },
//     { title: 'Alien', year: 1979 },
//     { title: 'Sunset Boulevard', year: 1950 },
//     { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
//     { title: 'The Great Dictator', year: 1940 },
//     { title: 'Cinema Paradiso', year: 1988 },
//     { title: 'The Lives of Others', year: 2006 },
//     { title: 'Grave of the Fireflies', year: 1988 },
//     { title: 'Paths of Glory', year: 1957 },
//     { title: 'Django Unchained', year: 2012 },
//     { title: 'The Shining', year: 1980 },
//     { title: 'WALL·E', year: 2008 },
//     { title: 'American Beauty', year: 1999 },
//     { title: 'The Dark Knight Rises', year: 2012 },
//     { title: 'Princess Mononoke', year: 1997 },
//     { title: 'Aliens', year: 1986 },
//     { title: 'Oldboy', year: 2003 },
//     { title: 'Once Upon a Time in America', year: 1984 },
//     { title: 'Witness for the Prosecution', year: 1957 },
//     { title: 'Das Boot', year: 1981 },
//     { title: 'Citizen Kane', year: 1941 },
//     { title: 'North by Northwest', year: 1959 },
//     { title: 'Vertigo', year: 1958 },
//     { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
//     { title: 'Reservoir Dogs', year: 1992 },
//     { title: 'Braveheart', year: 1995 },
//     { title: 'M', year: 1931 },
//     { title: 'Requiem for a Dream', year: 2000 },
//     { title: 'Amélie', year: 2001 },
//     { title: 'A Clockwork Orange', year: 1971 },
//     { title: 'Like Stars on Earth', year: 2007 },
//     { title: 'Taxi Driver', year: 1976 },
//     { title: 'Lawrence of Arabia', year: 1962 },
//     { title: 'Double Indemnity', year: 1944 },
//     { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
//     { title: 'Amadeus', year: 1984 },
//     { title: 'To Kill a Mockingbird', year: 1962 },
//     { title: 'Toy Story 3', year: 2010 },
//     { title: 'Logan', year: 2017 },
//     { title: 'Full Metal Jacket', year: 1987 },
//     { title: 'Dangal', year: 2016 },
//     { title: 'The Sting', year: 1973 },
//     { title: '2001: A Space Odyssey', year: 1968 },
//     { title: "Singin' in the Rain", year: 1952 },
//     { title: 'Toy Story', year: 1995 },
//     { title: 'Bicycle Thieves', year: 1948 },
//     { title: 'The Kid', year: 1921 },
//     { title: 'Inglourious Basterds', year: 2009 },
//     { title: 'Snatch', year: 2000 },
//     { title: '3 Idiots', year: 2009 },
//     { title: 'Monty Python and the Holy Grail', year: 1975 },
// ];