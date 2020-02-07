angular
    .module('alurapic')
    .factory('tokenInterceptor', function ($window, $q, $location){

        let interceptor = {};

        interceptor.response = (response) => {
            
            let token = response.headers('x-access-token');

            if(token){
                console.log('Armazenando token');
                $window.sessionStorage.token = token;
            }

            return response;
        };

        interceptor.request = (config) => {
            config.headers = config.headers || {} ;

            if($window.sessionStorage.token){
                config.headers['x-access-token'] = $window.sessionStorage.token;
                console.log('Adicionando token no header...');
            }

            return config;
        };

        interceptor.responseError = (rejection) => {

            if(rejection != null && rejection.status == 401) {
                delete $window.sessionStorage.token;
                $location.path('/login');
            }

            return $q.reject(rejection);
        };

        return interceptor;
    });