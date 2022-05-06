
# InnerSceptre v0.0.1

## About the project

InnerSceptre provides a useInnerSceptre() hook to wrap your server requests in a configurable AxiosInstance.

InnerSceptre also provides an ***<***InnerSceptre***>*** component for warning a user of a soon-to-expire session
and/or inform a user that their session has already expired.

## Setup

## Recommended use
    
## ***useInnerSceptre() hook***:

The useInnerSceptre() hook accepts an optional ***UseInnerSceptreProps*** object.

>{
  onIntercept: () => void;  
  onErrorIntercept: () => void;  
  axiosConfig: AxiosRequestConfig;  
  maxIdleTimeInSeconds: number;  
}

* onIntercept
> optional function to execute between a server response and the promise resolution
* onErrorIntercept
> optional function to execute between a server error response and the promise rejection
* axiosConfig
> optional [configuration](https://axios-http.com/docs/req_config) for the AxiosInstance that useInnerSceptre returns
* maxIdleTimeInSeconds
> optional number that **must** match the number of seconds it takes for a session to expire if the session expiration warning or dialogue are intended for use

### Examples:

```
const innerSceptreWithSessionTimer = useInnerSceptre({maxIdleTimeInSeconds: 5 * 60});
```

```
const innerSceptreWithDefaults = useInnerSceptre();
```

```
const innerSceptre = useInnerSceptre({
onIntercept: () => { console.log('intercept'); },
onErrorIntercept: () => { console.log('error'); },
axiosConfig: {headers: { Accept: 'application/json' }},
maxIdleTimeInSeconds: 15 * 60
});
```

## ***<***InnerSceptre***>*** ***component***:

The ***<***InnerSceptre***>*** component accepts optional ***InnerSceptreProps***.

>{  
  maxIdleTimeInSeconds?: number;  
  timeToExtendInSeconds?: number;  
  serverRequestUri?: string;  
  WarningComponent?: FC<**WarningComponentProps**>;  
  ExpiredComponent?: FC<**any**>;  
}

* maxIdleTimeInSeconds
> optional number that **must** match the number of seconds it takes for a session to expire if the session expiration warning or dialogue are intended for use
> ***Note:*** defaults to 0 if a number is not provided for this prop
> ***Note:*** will only enable session timer if **maxIdleTimeInSeconds** > 0
* timeToExtendInSeconds
> optional number of seconds before session expiration to present a warning to the user that their session will expire with a countdown to expiration
> ***Note:*** defaults to 60 seconds if a number is not provided for this prop
> ***Note:*** this prop is only utilized when **maxIdleTimeInSeconds** > 0
* serverRequestUri
> optional uri to a get request from the server. This is used to make a valid and inexpensive request from the server in order to keep the session active.
> ***Note:*** defaults to '/api' if a uri is not provided for this prop
> ***Note:*** must add a valid uri to a get request if the **maxIdleTimeInSeconds** prop is > 0
* WarningComponent
	- WarningComponentProps
	>{  
  secondsUntilSessionTimeout: number;  
  serverRequest: () => Promise<any>;  
}

	- secondsUntilSessionTimeout
	>
	- serverRequest
	> 
	
* ExpiredComponent
> optional ReactElement to inform the user that their session has expired.
> ***Recommend:*** providing a button to refresh the page or handle expired session behavior
> ***Note:*** default is a message of 'Your Session has Expired' with an 'OK' button that forces a refresh

## NPM Dependencies
* @types/react
* axios
* react
* recoil
* typescript