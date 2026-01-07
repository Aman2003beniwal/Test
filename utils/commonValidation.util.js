
// fieldArr==String
// ["name","email","password"]
export function requestBodyValidator({body,fieldArr}){
    if(!body || typeof body!=="object"  || !Object.keys(body).length){
        return {
            success:false,
            message:"Request Body is empty or not provided."
        }
    }

    // name:false,null,undefined
    const missingField = fieldArr.filter(field=> !Object.prototype.hasOwnProperty.call(body,field));
    // const missingField = fieldArr.filter(field=> !req.body[field]);

    if(missingField.length>0){
        return {
            success:false,
            message:`Following fields are missing : ${missingField.join(", ")}`
        }
    }
    return {
            success:true,
            message:""
        }
}