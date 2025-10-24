function sign(embedUrl) {
	var key 			= "1d63b5da-2266-44d0-a657-556dafda1053";
    var signer_disable_preview 	= "0";
    var signer_email 		= "lpoliveira.ti@gmail.com";
    var signer_display_name 	= ""; //Opcional
    var signer_documentation	= ""; //Opcional
    var signer_birthday 	= ""; //Opcional
    var signer_key_signer 	= ""; //Opcional

    var host			= "https://sandbox.d4sign.com.br/embed/viewblob";
    var container 		= "signature-div";
    var width 			= '1025';
    var height 			=  'auto';
    //----------FIM DAS VARIAVEIS----------//

    var is_safari = navigator.userAgent.indexOf('Safari') > -1;
    var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
    if ((is_chrome) && (is_safari)) {is_safari = false;}
    if (is_safari) {
        if (!document.cookie.match(/^(.*;)?\s*fixed\s*=\s*[^;]+(.*)?$/)) {
            document.cookie = 'fixed=fixed; expires=Tue, 19 Jan 2038 03:14:07 UTC; path=/';
            var url = document.URL;
            var str = window.location.search;
            var param = str.replace("?", "");
            if (url.indexOf("?")>-1){
                url = url.substr(0,url.indexOf("?"));
            }
            window.location.replace("https://sandbox.d4sign.com.br/embed/safari_fix?param="+param+'&r='+url);
        }
    }
    iframe = document.createElement("iframe");
    if (signer_key_signer === ''){
        iframe.setAttribute("src", host+'/'+key+'?email='+signer_email+'&display_name='+signer_display_name+'&documentation='+signer_documentation+'&birthday='+signer_birthday+'&disable_preview='+signer_disable_preview);
    }else{
        iframe.setAttribute("src", host+'/'+key+'?email='+signer_email+'&display_name='+signer_display_name+'&documentation='+signer_documentation+'&birthday='+signer_birthday+'&disable_preview='+signer_disable_preview+'&key_signer='+signer_key_signer);
    }
    iframe.setAttribute("id", 'd4signIframe');
    iframe.setAttribute("width", width);
    iframe.setAttribute("height", height);

    iframe.style.border = 0;
    iframe.setAttribute("allow", 'geolocation');
    var cont = document.getElementById(container);
    cont.appendChild(iframe);
    window.addEventListener("message", (event) => {
        if (event.data === "signed") {
            alert('ASSINADO');
        }
        if (event.data === "wrong-data") {
            alert('DADOS ERRADOS');
        }
    }, false);
}
