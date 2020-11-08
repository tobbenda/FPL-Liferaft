const request = require('request');
const password = 'pepe1445';

const formData = {
  password,
  login: 'tobbenda@gmail.com',
  redirect_uri: 'https://fantasy.premierleague.com/a/login',
  app: 'plfpl-web'
}

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
    console.log('Upload successful!  Server responded with:', httpResponse.caseless.dict['set-cookie'][0]);
  }); 
}
login()


// const password = 'pepe1445';
// // const formData = {
// //   password,
// //   login: 'tobbenda@gmail.com',
// //   redirect_uri: 'https://fantasy.premierleague.com/a/login',
// //   app: 'plfpl-web'
// // }
// //   const login = async() => {
// //     const cookiePattern = new RegExp(/(?<=pl_profile=)[^;]+/);
// //     request.post({url:'https://users.premierleague.com/accounts/login/', formData: formData}, async function optionalCallback(err, httpResponse, body) {
// //       if (err) {
// //         return console.error('upload failed:', err);
// //       }
// //       // const myCookieString = `pl_profile=${httpResponse.caseless.dict['set-cookie'][0].match(cookiePattern)[0]}`;
// //       // const j = request.jar();
// //       // const cookie = myCookieString;
// //       const url = 'https://fantasy.premierleague.com/api/my-team/627527/';
// //       // j.setCookie(cookie, url);
// //       await request({url: url}, (err, res, bod) => {
// //         if (err) {
// //           console.log(err);
// //         }else {
// //           const test = JSON.parse(bod);
// //           console.log(test);
// //         }
// //       });
// //     }); 
// //   }
// //   login();

// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

// var urlencoded = new URLSearchParams();
// urlencoded.append("password", "pepe1445");
// urlencoded.append("login", "tobbenda@gmail.com");
// urlencoded.append("redirect_uri", "https://fantasy.premierleague.com/a/login");
// urlencoded.append("app", "plfpl-web");

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: urlencoded,
//   redirect: 'follow'
// };

// fetch("https://users.premierleague.com/accounts/login/", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));