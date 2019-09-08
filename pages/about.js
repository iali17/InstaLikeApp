import Layout from '../components/MyLayout'
import withData from '../lib/apollo';
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { List, ListItem } from '@material-ui/core';

const GET_RANDOM_NUM = gql `
    {
        rollDice(numDice: 2, numSides: 6)
    }
`;

// function poof(data){
//     alert(data.rollDice);
// }

export default withData(props => {
    // const { data } = useQuery(GET_RANDOM_NUM, {
    //     variables: {numD:1, numS: 6 },
    //     notifyOnNetworkStatusChange: true
    // });

    const {data} = useQuery(GET_RANDOM_NUM);

    if (data.rollDice) {
        return (
            <div>
                {data.rollDice.map((item, index) => (
                    <List>
                        <ListItem key={index}>{item}</ListItem>
                    </List>
                ))}
            </div>
        )
    }

    return (
        <Layout>
            <p> Loading...</p>
        </Layout>
    )
});
