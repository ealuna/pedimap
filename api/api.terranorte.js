/**
 * Created by Edward Luna Noriega on 06/09/17.
 */
//const connection = require('./services/connection');
//const df = require('dateformat');
/*
 module.exports = (name) => {
 const database = connection(name);
 for (let i = 0; ) {

 }


 };*/

//console.log(df('5:00 PM', 'HH:MM'))


/*r.on('response', function (res) {
 res.pipe(fs.createWriteStream('./' + res.headers.date + '.' + res.headers['content-type'].split('/')[1]));

 });*/


var request = require("request");
var tarro = request.jar();
var fs = require('fs');
var unzip = require('unzip');

var options = {
    method: 'POST',
    url: 'http://solucionesempresa.entel.pe/gloria_v4/preventa/Default.aspx',
    jar: tarro,
    headers: {
        'cache-control': 'no-cache',
        'Connection':'keep-alive',
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
        txtUsuario: 'admin',
        txtPassword: 'oalfav4',
        dd_distribuidora: '05',
        txhAccion: 'V',
        __VIEWSTATE: '/wEPDwUKMTMwNDE0MDc0Mw9kFgICAw9kFgQCCg8QDxYGHg5EYXRhVmFsdWVGaWVsZAULY29kX2VtcHJlc2EeDURhdGFUZXh0RmllbGQFC25vbV9lbXByZXNhHgtfIURhdGFCb3VuZGdkEBUMBUFVUkVOCkNPTEFNT0xJTkEKRkVSUkVURVJJQQZHTE9SSUEOR0xPUklBX1lVUklfVjQNSElTUEFOSUNBX0FRUAZJTkVNU0EHT1JJVU5EQQxPUklVTkRBX1RFU1QNUEpGX0FSRVFVSVBBMQhQSkZfTElNQRFTQU5UQSBIT05PUkFUQSBWNBUMAjA0AjExAjQzAjk5AjAzAjUyAjAxAjA1Ajc3AjUxAjAyAjA2FCsDDGdnZ2dnZ2dnZ2dnZ2RkAgsPZBYCAgMPEGRkFgBkZPdh3ofqHkaSkP2z0ARS5XE3RXXi',
        __LASTFOCUS: '',
        __EVENTTARGET: '',
        __EVENTARGUMENT: ''
    }
};

var options2 = {
    method: 'POST',
    url: 'http://solucionesempresa.entel.pe/gloria_v4/preventa/DESCARGA.ASPX',
    path: '/',
    jar: tarro,
    encoding: null,
    headers: {
        'cache-control': 'no-cache',
        'Connection':'keep-alive',
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
        txtFechaIni: '18/10/2017',
        txtFechaFin: '18/10/2017',
        txtHoraIni: '00:00',
        txtHoraFin: '23:59',
        __VIEWSTATE: '/wEPDwUKLTM1ODY4Mjg1OQ9kFgICAw9kFgZmD2QWAgIDDw8WAh4EVGV4dAUTQURNLk9SSVVOREEgQUxGQV9WNGRkAgEPZBYCZhA8KwANAQwUKwADBQcwOjAsMDoxFCsAAhYIHgVWYWx1ZQUBOR8ABQ5NQU5URU5JTUlFTlRPUx4LTmF2aWdhdGVVcmwFEy9nbG9yaWFfdjQvcHJldmVudGEeCEltYWdlVXJsBSgvZ2xvcmlhX3Y0L3ByZXZlbnRhL0ltYWdlcy9idG5tYW50ZW4uanBnFCsABwUXMDowLDA6MSwwOjIsMDozLDA6NCwwOjUUKwACFgYfAQUCMTAfAAUIQ0xJRU5URVMfAgUOfi9DbGllbnRlLmFzcHhkFCsAAhYGHwEFAjEzHwAFBVJVVEFTHwIFC34vUnV0YS5hc3B4ZBQrAAIWBh8BBQIxMR8ABQhVU1VBUklPUx8CBQ5+L1VzdWFyaW8uYXNweGQUKwACFgYfAQUCMTIfAAUJUFJPRFVDVE9THwIFD34vUHJvZHVjdG8uYXNweGQUKwACFgYfAQUBMh8ABQVDQVJHQR8CBQx+L0NBUkdBLkFTUFhkFCsAAhYGHwEFATMfAAUIREVTQ0FSR0EfAgUPfi9ERVNDQVJHQS5BU1BYZBQrAAIWCB8BBQE0HwAFCFJFUE9SVEVTHwIFEy9nbG9yaWFfdjQvcHJldmVudGEfAwUoL2dsb3JpYV92NC9wcmV2ZW50YS9JbWFnZXMvYnRucmVwb3J0LmpwZxQrAAcFFzA6MCwwOjEsMDoyLDA6MywwOjQsMDo1FCsAAhYGHwEFATEfAAUHUEVESURPUx8CBRR+L1JlcG9ydGVQZWRpZG8uQVNQWGQUKwACFgYfAQUCMTUfAAUOREVUQUxMRSBQRURJRE8fAgUbfi9SZXBvcnRlUGVkaWRvRGV0YWxsZS5BU1BYZBQrAAIWBh8BBQE1HwAFCk5PIFBFRElET1MfAgUWfi9SZXBvcnRlTm9QZWRpZG8uQVNQWGQUKwACFgYfAQUBNh8ABQpERVZPTFVDSU9OHwIFGH4vUmVwb3J0ZURldm9sdWNpb24uQVNQWGQUKwACFgYfAQUBNx8ABQVDQU5KRR8CBRN+L1JlcG9ydGVDYW5qZS5BU1BYZBQrAAIWBh8BBQE4HwAFCENPQlJBTlpBHwIFFn4vUmVwb3J0ZUNvYnJhbnphLkFTUFhkZGQCCg8PFgIfAGVkZGQDPugpmbCrciDtxala0Y5md5SXZA==',
        __EVENTTARGET: '',
        __EVENTARGUMENT: '',
        btntDescargar: 'Descargar'
    },
    timedOut: 10000
};


request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(response);
        console.log(tarro);
        /*
         request.post(options2).on('response', function (response) {
         //console.log(response)
         response.pipe(fs.createWriteStream('./Archivo.zip'));
         });*/


        var through2 = require('through2');

        var req = request(options2);
        req.on('error', function (e) {
            // Handle connection errors
            //console.log(e);
        });
        var _filename = 'default.zip';
        var bufferedResponse = req.pipe(through2(function (chunk, enc, callback) {
            this.push(chunk);
            callback()
        }));
        req.on('response', function (res) {
            if (res.statusCode === 200) {

                try {
                    var contentDisposition = res.headers['content-disposition'];
                    var match = contentDisposition && contentDisposition.match(/(filename=|filename\*='')(.*)$/);
                    var filename = match && match[2] || 'default.zip';
                    _filename = filename;
                    var dest = fs.createWriteStream(filename, {autoClose: true});

                    dest.on('error', function (e) {
                        // Handle write errors
                        console.log(e);
                    });

                    dest.on('finish', function () {
                        // The file has been downloaded

                        console.log('Downloaded ' + filename);
                    });

                    dest.on('resume', function () {
                        // The file has been downloaded
                        console.log('Downloaded ' + filename);
                    });

                    bufferedResponse.pipe(dest);

                } catch (e) {

                    // Handle request errors
                    console.log(e);
                } finally {

                    console.log('Downloaded Sales');
                }
            }
            else {
                // Handle HTTP server errors
                console.log(res.statusCode);
            }
        });
        req.on('finish', function () {

        });
    }
);


/*

function a(path, callback) {
    request(options, function (a,b,c) {
        //var aa = request(options2);
        var aa = request(options2)
      // aa.pause();
            aa.pipe(fs.createWriteStream('./archivos11131.zip'));
        aa.resume()
            /*
        aa.on('response', function(response) {
                    console.log(response.statusCode) // 200
                    console.log(response.headers['content-type']) // 'image/png'
                })

        aa.on('finish', function(err) {
                console.log(err)
            })
        aa.on('end', function(err) {
            console.log(err)
        })*/
/*
        request
            (options2)
            .on('error', function(err) {
                console.log(err)
            })
            .pipe(fs.createWriteStream('./archivos11131.zip'))*/
        /*aa.on('response', function (res) {
            if(res.statusCode === 200){

                aa.pipe(fs.createWriteStream('./archivos11131.zip')) //pipe to where you want it to go
                //aa.bufer()
                aa.destroy()
            }else{  }
        })*/


        //aa.on();


        /*aa.on('response', function (res) {
           // res.pipe(fs.createWriteStream('./Archivo.zip')) ;

            //res.resume()
        });*/
/*

            .pipe(fs.createWriteStream(path))
            .on('close', function () {
                callback();
            }).on('resume', function () {

        });*/
    //});

//}
/*a('', null)*/