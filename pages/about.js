import Layout from '../components/MyLayout'
import withData from '../lib/apollo';
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { List, ListItem, Button } from '@material-ui/core';

const GET_RANDOM_NUM = gql `
    query RollDice($dice: Int!, $sides: Int) {
        rollDice(numDice: $dice, numSides: $sides)
    }
`;

export default withData(props => {
    const {loading, error, data, fetchMore} = useQuery(GET_RANDOM_NUM, {
        variables: {dice: 2, sides: 6},
        notifyOnNetworkStatusChange: true
    });

    if (data.rollDice) {
        return (
            <div>
                {data.rollDice.map((item, index) => (
                    <List>
                        <ListItem key={index}>{item}</ListItem>
                    </List>
                ))}
                <Button onClick={() => poof(data, fetchMore)}>
                    {loading ? "Loading..." : "Roll some more!!"}
                </Button>
            </div>
            
        )
    }

    return (
        <Layout>
            <p> Loading...</p>
        </Layout>
    )
});

function poof(data, fetchMore){
    return fetchMore({
        updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
                return previousResult;
            }
            return Object.assign({}, previousResult, {
               rollDice: [...previousResult.rollDice, ...fetchMoreResult.rollDice] 
            });
        }
    });
}
