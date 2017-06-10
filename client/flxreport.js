/**
 * Created by YN. Pamungkas Jayuda ~ email:yulius.jayuda@gmail.com on 8/25/16.
 */

var iKolom = 0;
var data = [];

Template.flxreport.created = function () {
	subscribtion(Session.get("reportCollections"), 1000000);
	iKolom = 0;
	data = [];
};
Template.flxreport.helpers({
	separator: function () {
		return Session.get("separator");
	},
	ttdleft: function () {
		return Session.get("ttdleft");
	},
	ttdright: function () {
		return Session.get("ttdright");
	},
	reportTo: function () {
		return Session.get("reportTo");
	},
	headerRight: function () {
		return Session.get("headerRight");
	},
	reportCompany: function () {
		return Session.get("reportCompany");
	},
	totalvalue: function () {
		return Session.get("totalvalue");
	},
	reportFootnote: function () {
		return Session.get("reportFootnote");
	},
	reportNama: function () {
		return Session.get("reportNama");
	},
	reportNumber: function () {
		return Session.get("reportNumber");
	},
	created: function () {
		return new Date().toISOString().substring(0, 11);
	},
	colSpan: function(){
		return iKolom-1;
	},
	sKolom: function () {
		var dataKolomNew = Session.get("reportKolom");
		return dataKolomNew;
	},
	sData: function () {
		var namaKolom = "";
		var DataColl = Session.get("reportCollectionsAll");

		DataColl.forEach(function (obj){
			var tdData = "";
			var reportKolom = Session.get("reportKolom");
			var nilaiData = "";
			for (i = 0; i < reportKolom.length; i++) {
				namaKolom = reportKolom[i].fields;
				nilaiData = "";
				if(ikiAngkoUdu(obj[namaKolom])) {
					nilaiData = parseInt(obj[namaKolom]).toLocaleString();
				} else {
					nilaiData = obj[namaKolom];
				}
				tdData = tdData + "<td>" + nilaiData + "</td>";
			}
			data.push({"DATA":tdData});
		});
		return data;
	},
	spacer:function () {
		var tdData = "";
		for (i = 0; i < iKolom-2; i++) {
			tdData = tdData + "<td></td>";
		}
		return tdData;
	},
	logo: function () {
		return sLogo;
	},
	sHeaderBackground: function () {
		return sHeaderBackground;
	},

});

Template.flxreport.events({
	'click a.back': function (e,tpl) {
		e.preventDefault();
		Session.set("reportNama", null);
		Session.set("reportKolom", null);
		Session.set("reportCollectionsAll", null);
		Session.set("reportNumber", null);
		Session.set("reportFootnote", null);

		Router.go(Session.get("reportBackUrl"));
	},
	'click a.print': function (e,tpl) {
		e.preventDefault();
		window.print();
	},
	'click a.download': function (e, tpl) {
		e.preventDefault();
		var nameFile = Session.get("reportNama") + "_By_" + Meteor.user().profile.name;

		Meteor.call('downloadReport', Session.get("reportCollectionsAll"), function (err, fileContent) {
			if (fileContent) {
				var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
				saveAs(blob, nameFile);
			} else {
				FlashMessages.sendError("Ops, Sorry. Your No data to download");
			}
		});
	},

});

ikiAngkoUdu = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
