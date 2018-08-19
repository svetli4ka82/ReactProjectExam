import $ from 'jquery';

export default function Requester() {
    const kinveyBaseUrl = "https://baas.kinvey.com/appdata";
    const kinveyAppKey = 'kid_ryBDmMpfQ';
    const kinveyAppSecret = 'ddc89742b98a454fb4386c37821e148b';

    // Creates the authentication header
    function auth(type) {
        return type === 'basic'
            ? 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret)
            : 'Kinvey ' + sessionStorage.getItem('authtoken');
    }

    // Creates request object to kinvey
    function request(method, module, endpoint, auth) {
        let req = {
            method,
            url: kinveyBaseUrl + module + '/' + kinveyAppKey + '/' + endpoint,
            headers: {
                'Authorization': auth(auth)
            }
        };
        return req
    }

    // Function to return GET promise
    function get(module, endpoint, auth) {
        return $.ajax(request('GET', module, endpoint, auth));
    }

    // Function to return POST promise
    function post(module, endpoint, auth, data) {
        let req = request('POST', module, endpoint, auth);
        req.data = data;
        return $.ajax(req);
    }

    // Function to return PUT promise
    function update(module, endpoint, auth, data) {
        let req = request('PUT', module, endpoint, auth);
        req.data = data;
        return $.ajax(req);
    }

    // Function to return DELETE promise
    function remove(module, endpoint, auth) {
        return $.ajax(request('DELETE', module, endpoint, auth));
    }

    return {
        get,
        post,
        update,
        remove
    }
};