import axios from 'axios'

const baseURL = "https://graph.instagram.com";
const baseURL2 = "https://api.instagram.com";


const clientId = 'instagram-app-id' // 990602627938098
const redirectUri = 'redirect-uri' // https://socialsizzle.herokuapp.com/auth/
const scope = 'user_profile,user_media'
const state = '89'

// If authorization is successful, we will redirect the user to your redirect_uri and
// pass you an Authorization Code through the code query string parameter.
// Capture the code so your app can exchange if for a short-lived Instagram User Access Token.
// https://socialsizzle.herokuapp.com/auth/?code=AQBx-hBsH3...#_
// Note that #_ will be appended to the end of the redirect URI, but it is not part of the code itself, so strip it out.

// More info -> https://developers.facebook.com/docs/instagram-basic-display-api/guides/getting-access-tokens-and-permissions
// https://socialsizzle.herokuapp.com/auth/?error=access_denied
//   &error_reason=user_denied
//   &error_description=The+user+denied+your+request

const getAuthorizationCode = async () => {
    return await axios.get(`/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}`, {
        baseURL: baseURL2,
    })
}



// Info -> getting a shrt lived access token from the authorization code
// sample response:
// {
//   "access_token": "IGQVJ...", // short-lived access token
//   "user_id": 17841405793187218
// }
// sample error:
// {
//   "error_type": "OAuthException",
//   "code": 400,
//   "error_message": "Matching code was not found or was already used"
// }

const getAccessToken = async () => {
    const response = await axios.get(`/oauth/access_token`, {
        baseURL: baseURL2,
        data: {
            client_id: 'sample 990602627938098',
            client_secret: 'eb8c7...',
            grant_type: 'authorization_code',
            redirect_uri: 'https://socialsizzle.herokuapp.com/auth/',
            code: 'AQBx-hBsH3...'
        }
    })
}




// Requests for long-lived tokens include your app secret so should only be made in 
// server-side code, never in client-side code or in an app binary that could be 
// decompiled. Do not share your app secret with anyone, expose it in code, 
// send it to a client, or store it in a device.Requests for long-lived tokens 
// include your app secret so should only be made in server-side code, 
// never in client-side code or in an app binary that could be decompiled. 
// Do not share your app secret with anyone, expose it in code, send it to a client, 
// or store it in a device.
// @Info -> https://developers.facebook.com/docs/instagram-basic-display-api/guides/long-lived-access-tokens#get-a-long-lived-token
// Sample response
// {
//   "access_token":"{long-lived-user-access-token}",
//   "token_type": "bearer",
//   "expires_in": 5183944  // Number of seconds until token expires
// }

const getLongLivedAccessToken = async () => {
    const response = await axios.get("/access_token", {
        baseURL,
        params: {
            grant_type: 'ig_exchange_token',
            client_secret: "instagram-app-secret",
            access_token: "short-lived-access-token"
        }
    })
}



// can be made from the client side
// Sample response:
// {
//   "access_token":"{long-lived-user-access-token}",
//   "token_type": "bearer",
//   "expires_in": 5183944 // Number of seconds until token expires
// }

const refreshLongLivedAccessToken = async () => {
    const response = await axios.get("/refresh_access_token", {
        baseURL,
        params: {
            grant_type: 'ig_refresh_token',
            access_token: "long-lived-access-token"
        }
    })
}




// Get user profile information
// Sample response:
// {
//   "id": "17841405793187218",
//   "username": "jayposiris"
// }
const getUserProfileInfo = async () => {
    const response = await axios.get("/me", {
        baseURL,
        params: {
            fields: 'id,username',
            access_token: "IGQVJ..."
        }
    })
}




// Get user media information
// Sample response:
// {
//   "data": [
//     {
//       "id": "17895695668004550",
//       "caption": ""
//     },
//     {
//       "id": "17899305451014820",
//       "caption": ""
//     },
//     {
//       "id": "17896450804038745",
//       "caption": ""
//     },
//     {
//       "id": "17881042411086627",
//       "caption": ""
//     }
//   ],
//   "paging": {
//     "cursors": {
//       "after": "MTAxN...",
//       "before": "NDMyN..."
//       },
//     "next": "https://graph.faceb..."
//   }
// }

// You can query the User Media edge to get a collection
// of Media on the User and use field expansion to have 
// the response include Media fields on each Media in the
// collection
const getUserMediaInfo = async () => {
    const response = await axios.get("/me/media", {
        baseURL,
        params: {
            fields: 'id,caption',
            access_token: "IGQVJ..."
        }
    })
}


// Get user media data
// Replace {media-id} with the ID of the image, video, or album you want to query
// Sample response:
// {
//   "id": "17895695668004550",
//   "media_type": "IMAGE",
//   "media_url": "https://fb-s-b-a.akamaihd.net/...",
//   "username": "jayposiris"
//   "timestamp": "2017-08-31T18:10:00+0000"
// }

const getUserMediaData = async () => {
    const response = await axios.get("/{media-id}", {
        baseURL,
        params: {
            fields: 'id,media_type,media_url,username,timestamp',
            access_token: "IGQVJ..."
        }
    })
}


// Get user album content
// Sample response:
// {
//   "data": [
//     {
//       "id": "17880997618081620"
//     },
//     {
//       "id": "17871527143187462"
//     }
//   ],
//   "paging": {
//     "cursors": {
//       "after": "MTAxN...",
//       "before": "NDMyN..."
//       },
//     "previous": "https://graph.faceb...",
//     "next": "https://graph.faceb..."
//   }
// }
const getUserMediaAlbumContent = async () => {
    const response = await axios.get("/{media-id}/children", {
        baseURL,
        params: {
            fields: 'id,caption,media_type,media_url,username,timestamp',
            access_token: "IGQVJ..."
        }
    })
}


