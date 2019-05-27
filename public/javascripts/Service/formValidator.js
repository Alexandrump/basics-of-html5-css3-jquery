var FormValidator = {

    isNameValid: function (queryString) {
        return queryString.name.length <= 10;
    },
    isSurnameValid: function (queryString) {
        return queryString.surname.length <= 20;
    },
    isPhoneValid: function (queryString) {
        return jQuery.isNumeric(queryString.phone) && queryString.phone.length === 9
    },
    isEmailValid: function (queryString) {
        var regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regExp.test(String(queryString.email).toLowerCase());
    },
    serializeQueryString: function (element) {
        return $(element).serializeArray().reduce(function (obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {})
    },
};
