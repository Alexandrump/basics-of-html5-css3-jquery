$(document).ready(function () {

    $('form').submit(function (event) {
        $("#message label").remove();
        var queryStringDTO = FormValidator.serializeQueryString(this);
        if (!FormValidator.isNameValid(queryStringDTO) ||
            !FormValidator.isSurnameValid(queryStringDTO) ||
            !FormValidator.isPhoneValid(queryStringDTO) ||
            !FormValidator.isEmailValid(queryStringDTO)
        ) {
            $("#message").append("<label>El formulario no cumple alguna de las restricciones.</label>");
            event.preventDefault();
            return false;
        } else {
            $("#message").append("<label>El formulario se ha rellenado correctamente.</label>");
            event.preventDefault();
            return false;
        }
    });
});
