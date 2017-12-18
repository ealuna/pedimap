/**
 * Created by Edward Luna Noriega on 18/12/17.
 */

"use strict";

(function () {

    if (!jsPDF) {
        return console.error('akfjkasfjkasfjasjfasjfpo´ñ');
    }

    function Doc(options = {}) {
        this.pdf = new jsPDF(options);
        pdf.page = 1;
        pdf.setFontSize(10);
        pdf.setFont('verdana');
    }

    Doc.prototype.addFooter = function () {
        this.pdf.text(5, 292, 'Informe generado por Pedimap');
        this.pdf.text(192, 292, 'Página ' + this.pdf.page);
    };

    Doc.prototype.setFontConfig = function (options = {}) {
        this.pdf.setFontSize(options.size);
        this.pdf.setFont(options.name);
    };

    Doc.prototype.setHeader = function () {
        this.pdf.text(5, 5, 'Informe generado por Pedimap ' + new Date().toLocaleString());
        this.pdf.text(192, 5, 'Página ' + doc.page);
    };





})();

/*
 function setFontConfig(doc) {
 doc.setFontSize(10);
 doc.setFont("verdana");
 return doc;
 }


 function setFooter(doc) {
 doc.text(5, 292, 'Informe generado por Pedimap ' + new Date().toLocaleString());
 doc.text(192, 292, 'Página ' + pdf.page);
 return pdf;
 }


 function setHeader(doc) {
 doc.text(5, 5, 'Informe generado por Pedimap ' + new Date().toLocaleString());
 doc.text(192, 5, 'Página ' + doc.page);
 return pdf;
 }

 */