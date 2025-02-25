import { TErrorSource, TGenericErrorResponse } from "../interface/error";


const handleDuplicateError = (err: any) : TGenericErrorResponse=>{

    // extract value from double quotes using regex
    const match = err.message.match(/"([^"]*)"/);
    // the extracted value wil be in the first capturing group
    const extractedMessage = match && match[1];

    const errorSource : TErrorSource =[{
           path : '',
           message : `${extractedMessage} is already exists`
    }]

    const statusCode = 400;
    return {
        statusCode,
        message : 'Invalid ID',
        errorSource
    }
}


export default handleDuplicateError;