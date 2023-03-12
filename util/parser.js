function parseError(error){

    if(error.name == 'ValidationError'){
        console.log(Object.values(error.errors));
        return Object.values(error.errors).map(v => v.message);
    } else if(Array.isArray(error)) {
        return error.map(x => x.msg);
    } else {
        return error.message.split('\n');
    }
}

module.exports = { parseError };