import { withData } from "next-apollo";
import { HttpLink } from "apollo-boost";

const config = {
    link: new HttpLink({
        uri: "http://localhost:3000/graphql",
        opts:{
            credentials: "same-origin"
        }
    })
};

export default withData(config);