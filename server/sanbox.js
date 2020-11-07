const request = require('request');
const password = 'NOTFORYOU!';

let options = {json: true, jar:true};
// const url = 'https://users.premierleague.com/accounts/login/'
const formData = {
  password,
  login: 'tobbenda@gmail.com',
  redirect_uri: 'https://fantasy.premierleague.com/a/login',
  app: 'plfpl-web'
}

// request.post(url, formData, options, (error, res, body) => {
//   if (error) {
//     return console.error('upload failed:', error);
//   }
//   console.log('Upload successful!  Server responded with:', body);
// });



const login = async() => {
  const cookiePattern = new RegExp(/(?<=pl_profile=)[^;]+/);
  request.post({url:'https://users.premierleague.com/accounts/login/', formData: formData}, async function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('upload failed:', err);
    }
    const myCookieString = `pl_profile=${httpResponse.caseless.dict['set-cookie'][0].match(cookiePattern)[0]}`;
    const j = request.jar();
    const cookie = myCookieString;
    const url = 'https://fantasy.premierleague.com/api/my-team/627527/';
    j.setCookie(cookie, url);
    await request({url: url, jar: j}, (err, res, bod) => {
      if (err) {
        console.log(err);
      }else {
        const test = JSON.parse(bod);
        console.log(test);
      }
    });
    // console.log('Upload successful!  Server responded with:', httpResponse.caseless.dict['set-cookie'][0]);
  }); 
}


const getLoggedInTeam = async () => {
  const j = request.jar();
  const test = await(login());
  console.log('TEEEEEEST: ',test);
  const cookie = request.cookie('pl_profile=eyJzIjogIld6SXNOREF4TnpJME56VmQ6MWtiTXNnOnkwZTFhalZ3WS00YzlvbDhsNS1yTnhnYUd6WSIsICJ1IjogeyJpZCI6IDQwMTcyNDc1LCAiZm4iOiAiVG9yYmpcdTAwZjhybiIsICJsbiI6ICJEYWhsIiwgImZjIjogbnVsbH19');
  const url = 'https://fantasy.premierleague.com/api/my-team/627527/';
  j.setCookie(cookie, url);
  await request({url: url, jar: j}, (err, res, bod) => {
    if (err) {
      console.log(err);
    }else {
      const test = JSON.parse(bod);
      // console.log(test);
      stuff = test;
      return(test);
    }
  });
}


const motherFunction = async () => {
  const a = await getLoggedInTeam()
  console.log(a);
}

// getLoggedInTeam();
motherFunction()

// getLoggedInTeam();
