import { API, graphqlOperation } from 'aws-amplify'

async function graphQLFunction(baseQuery, parameter, type, nextToken = false) {
  let query = '';
  switch (baseQuery) {
    // user queries and mutations
    case 'CreateUser':
      {
        query = `
        mutation CreateMvsUser($input: CreateMvs_usersInput!) {
          createMvs_users(input:$input) {
            user_id
            email
            first_name
            last_name
            username
          }
        }`;
        break;
      }

      case 'DeleteUser':
        {
          query = `
          mutation DeleteMvsUser($input: DeleteMvs_usersInput!) {
            DeleteMvs_users(input:$input) {
              user_id
              email
            }
          }`;
          break;
        }
      
    case 'UpdateUser':
      {
        query = `
        mutation UpdateMvsUser($input: UpdateMvs_usersInput!) {
          updateMvs_users(input: $input) {
            user_id
            email
            first_name
            last_name
            username
          }
        }`;
        break;
      }
  
      case 'PreSignedUrlGet':
        {
          query = `
          query preSignedUrlPost {
            getSignedUrl(user_id:"${parameter.user_id}")
              {
                statusCode
                body
              }
            }`;
          break;
        }

        case 'PreSignedUrlPost':{
          query = `
          query preSignedUrlPost {
              preSignedUrl(user_id:"${parameter.user_id}")
              {
                statusCode
                body
              }
              }
              `;
            break;
        }
        
        case 'GetSignedUrlPost':
          {
            query = `
            query getSignedUrl {
              getSignedUrl(user_id:"${parameter.user_id}")
                {
                  statusCode
                  body
                }
              }`;
            break;
          }

           default:
      break;
  }

  try {
    //console.log(type +' '+ baseQuery, 'is called with parameter', parameter, 'query--', query);
    if (type === 'mutation') {
      return await API.graphql(graphqlOperation(query, { input: parameter }))
    }
    return await API.graphql(graphqlOperation(query))
  } catch (err) {
    console.log('error in calling ...', type, err)
  }
}



export default graphQLFunction;