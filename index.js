// const express = require('express')
// const app = express()

const $rdf = require('rdflib');
const solid = { auth:require('solid-auth-cli') }
const store = $rdf.graph();
const fetcher = $rdf.fetcher(store,{fetch:solid.auth.fetch})

const fs = require('fs');
const yaml = require('js-yaml');

/* Read solid login information (confidential) */
let fileContents = fs.readFileSync('solid_login.yaml', 'utf8');
let login_yaml = yaml.safeLoad(fileContents);
process.env.SOLID_IDP = login_yaml.SOLID_IDP //"https://inrupt.net"
process.env.SOLID_USERNAME = login_yaml.SOLID_USERNAME //"https://chang.inrupt.net/profile/card#me"
process.env.SOLID_PASSWORD = login_yaml.SOLID_PASSWORD //"sophia383842"

/* Fetch the object from the an object which is from the same subject */
async function fetchObjectFromObject(fileURL, inter_object, expected_predicate){
    let outputObj = [];
    await fetcher.load($rdf.sym(fileURL)).then(response=> {
        store.match(null, null,  $rdf.sym(inter_object), $rdf.sym(fileURL)).forEach(statement=>{
            store.match(statement.subject,  $rdf.sym(expected_predicate), null, $rdf.sym(fileURL)).forEach(signatureStatement=>{
                outputObj.push(signatureStatement.object.value);
            });
        })
    },e => console.log("Error fetching : "+e))
    return outputObj
}

/* Generatlly fetch sub/predi/object from a file */
async function fetchGeneralProperty(fileURL, knownSubject, knownPredicate){
    let outputObj = [];
    await fetcher.load($rdf.sym(fileURL)).then(response=> {
        store.match($rdf.sym(knownSubject), $rdf.sym(knownPredicate), null, $rdf.sym(fileURL)).forEach(statement=>{
            outputObj.push(statement.object.value)
        });
    },e => console.log("Error fetching : "+e))
    return outputObj
}

// app.get('/solid', function (req, res) {
solid.auth.login().then(session => {
    console.log("Your SOLID WebID is ", session.webId)
    //Fetch profile information
    fetcher.load($rdf.sym(session.webId)).then(response=> {
        const UserName = store.any($rdf.sym(session.webId), $rdf.sym("http://www.w3.org/2006/vcard/ns#fn"));
        console.log("Try to fetch your username: ", UserName)            
    },e => console.log("Error fetching : "+e))
},e => console.log("Error logging in : "+e))
// })

// //Launch listening server on port 8081
// app.listen(5000, function () {
//   console.log('app listening on port 5000!')
// })