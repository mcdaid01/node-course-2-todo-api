const secret = "abc123";
const salt="somesecret"; // not sure any difference in term

if (false){
    

    // bit of a demo of the problem solved by 
    // JSON webtoken, that obviously does this stuff a lot better

    const {SHA256} = require("crypto-js");

    var message = "I am user number 3";
    var hash = SHA256(message);

    console.log(message+  " " +hash);

    var data = {
        id: 4
    };

    
    // somesecret salts the hash, means malicious end use can't create the same hash
    var token = {
        data,
        hash: SHA256(JSON.stringify(data) + salt).toString()
    };

    // man in middle
    token.data.id=5;
    token.hash = SHA256(JSON.stringify(token.data)).toString();

    // without salt can't get correct hash

    var resultHash = SHA256(JSON.stringify(token.data)+salt).toString();  // that may be maninpulated

    if (resultHash===token.hash)
        console.log("Data not changed");
    else
        console.log("Data changed, don't trust");
}



// note might can use jwt.io website to decode
// appears the token means payload can be viewed
// but not manipulated

const jwt =  require('jsonwebtoken');

var data ={
    id:10
};

var token = jwt.sign(data,secret);

console.log(token);

var decoded =  jwt.verify(token,secret);

console.log("decoded",decoded);

