import React from "react";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import "./style.css";
import { Result } from "../../redux/result/resultTypes";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { putRatings } from "../../redux/result/resultActions";

/* 

This first part of the code is all regarding to redux. This is because this component needs to access the redux state.
The following code follows the conventions that redux suggests. You can read more about it here: https://redux.js.org/recipes/usage-with-typescript

The first thing to do is declare an interface (RootState) that fits the redux store. It is only necessary to declare the parts of the store that the component needs.
The function mapStateToProps is responsible for mapping the redux state to the components props. This uses the RootState interface to get the parts that we need from the state.

The function mapDispatchToProps is responsible for mapping the redux actions to the components props. We only map the actions that this component needs and uses.

Then we declare the connector with the connect function with the mapStateToProps and mapDispatchToProps as input.
This is to easily Use the ConnectedProps<T> to infer the types of the props from connect automatically.

Then we declare the type of the final Props that the component will use. We write it like this so that it is easy to add props if the component needs it.

Finally the component takes in props of the type Props.

When the component is exported (at the bottom), the component gets connected to the redux store with the connector we declared.

*/

interface RootState {
    resultInfo: {
        open: boolean;
        loading: boolean;
        error: string;
        result: Result;
    };
}

const mapStateToProps = (state: RootState) => {
    return {
        resultData: state.resultInfo,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        putRatings: (ratings: Array<number>, id: string) =>
            dispatch(putRatings(ratings, id)),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const CustomizedRatings: React.FunctionComponent<Props> = (props) => {
    // Sets a disabled attribute in the component state. Initially false.
    // Will be used to disable rating when user has rated movie.
    const [disabled, setDisabled] = React.useState(false);

    // Sets a userRaing attribute in the component state. Initially 0.
    // Will be used to store users rating when user has rated movie.
    const [userRating, setUserRating] = React.useState<number | null>(0);

    // Extracts relevant properties from the redux state.
    const result = props.resultData.result;
    const id = result._id;

    // Function that triggers when user rates movie. Takes in ChangeEvent (which isnt used), and value.
    const handleChange = (
        _: React.ChangeEvent<unknown>,
        value: number | null
    ) => {
        // If the value is not null, push the rating to a copy of the movie's ratings. Then it runs the putRatings action with the newRatings and movie id as input.
        // It stores the rating on the movie in session storage, sets the userRating state to the rating and sets the disabled state to true.
        if (value !== null) {
            const newRatings = result.ratings;
            newRatings.push(value);
            props.putRatings(newRatings, result._id);
            sessionStorage.setItem(id, String(value));
            setUserRating(value);
            setDisabled(true);
        }
    };

    // useEffect hook triggers when component mounts and everytime id or disabled updates.
    // Checks if user has rating of movie in session storage. If it does, set the userRating state to the rating in storage and disabled to true.
    // Else, set disabled to false.
    React.useEffect(() => {
        const tmp = sessionStorage.getItem(id);
        if (tmp !== null) {
            setUserRating(parseInt(tmp));
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [id, disabled]);

    return (
        <div>
            {/* Rating component from MUI Lab. Value set to the userRating value in state and disabled to the disabled value in state. 
            When changed, triggers handleChange. Uses MUI StarBorderIcon*/}
            <Rating
                className="rating"
                name="customized-empty"
                value={userRating}
                precision={1}
                onChange={handleChange}
                disabled={disabled}
                emptyIcon={<StarBorderIcon />}
            />
        </div>
    );
};

export default connector(CustomizedRatings);
