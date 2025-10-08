import "@app/ui.css"

const CLIENT_ID = "1065260752217-644mckvp6hditaevp7efea4mqjcinni8.apps.googleusercontent.com"
const userInfo = document.getElementById( "user-info" )

console.log( CLIENT_ID )

// Google Identity init
window.onload = () => {

	google.accounts.id.initialize( {
		client_id: CLIENT_ID,
		callback: handleCredentialResponse,
		auto_select: false,
	} )

	// render sign-in button
	google.accounts.id.renderButton(
		document.getElementById( "g_id_signin" ),
		{
			theme: "outline",
			size: "large",
		}
	)
}

// callback function when user signs in
function handleCredentialResponse( response ) {

	const jwt = response.credential
	const payload = parseJwt( jwt )

	userInfo.textContent = JSON.stringify( payload, null, 2 )
	console.log( "User info:", payload )
}

// JWT decode helper
function parseJwt( token ) {

	const base64Url = token.split( "." )[ 1 ]
	const base64 = base64Url.replace( /-/g, "+" ).replace( /_/g, "/" )
	const jsonPayload = decodeURIComponent(
		atob( base64 )
			.split( "" )
			.map( c => "%" + ( "00" + c.charCodeAt( 0 ).toString( 16 ) ).slice( - 2 ) )
			.join( "" )
	)

	return JSON.parse( jsonPayload )
}
