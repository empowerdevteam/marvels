import graphQLFunction from "../graphQLFunction";

export const createUser = async () => {
    try{
    
    let parameter = {
    'user_id':'username',
    'email': 'email',
    'first_name':'name' || 'null',
    'last_name':'name' || 'null',
    'username':'username',
    };
    await graphQLFunction('CreateUser', parameter, "mutation", false);
    } catch (error) {
    console.log('errorCreateUser', error);
    }
    }
    
    export const deleteUser = async () => {
    try{
    
    let parameter = {
    'user_id':'username',
    'email': 'email',
    };
    await graphQLFunction('DeleteUser', parameter, "mutation", false);
    } catch (error) {
    console.log('errorDeleteUser', error);
    }
    }
    
    
    export const preSignedUrlPost = async () => {
    
    try{
    let parameter = {
    user_id: 'username',
    media_name: 'mediaName',
    };
    let preSignedURLFuntion = 'PreSignedUrl';
    
    await graphQLFunction(preSignedURLFuntion, parameter, "", false)
    .then(async (response) => {
    
    });
    } catch (error) {
    console.log("errorPreSignedUrlPost", error);
    }
    
    }