sap.ui.define([
    "mickey/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "mickey/model/models",
    "mickey/util/lifeSaver",
    "sap/m/MessageToast"
], function (Controller, JSONModel, myModel, lifeSaver, MessageToast) {
    //'use strict';
    return Controller.extend("mickey.controller.MyXML", {
        //Once my Controller object is created then only initialization should happen
        //onInit - like constructor of the class, which gets called once the object is created
        onInit: function () {
            //another way of initializing class level variables
            //base class method which is of same name
            Controller.prototype.onInit.apply(this);
            console.log("Child Class Constructor");
            //a global variable @ class level which can be used by other methods
            this.oView = this.getView();

            var oModel = myModel.createJSONModel("model/mockdata/data.json");

            var oModelGOT = myModel.createJSONModel("model/mockdata/sample.json");
            //Step 3: Make model aware to the app
            sap.ui.getCore().setModel(oModel);
            sap.ui.getCore().setModel(oModelGOT, "fire");

            // var oXMLModel = myModel.createXMLModel();
            // sap.ui.getCore().setModel(oXMLModel);
            var oResource = myModel.createResourceModel();
            sap.ui.getCore().setModel(oResource, "i18n");

           
            var oTab = this.getView().byId("myTable");
            oTab.bindAggregation("rows", "/empTab");
            // oTab.bindRows("/empTab/row");
        //     this.getView().byId("myForm").bindElement("/empTab/row/0");

        },
        onFlip: function () {
            var oModel = sap.ui.getCore().getModel();
            var oModelAvg = sap.ui.getCore().getModel("fire");
            sap.ui.getCore().setModel(oModelAvg);
            sap.ui.getCore().setModel(oModel, "fire");
        },
        onBeforeRendering: function () {
            //if(checkings....)
            this.oView.byId("MyButton").setEnabled(false);

        },

        onAfterRendering: function () {
            //$("#myView--myForm").hide().fadeIn(5000);
        },
        //oView : this.getView(),
        clickMe: function (params) {
            //sap.ui.getCore()
            //var oView = this.getView();
            var oControl = this.oView.byId("MyButton");

            //var oControl = sap.ui.getCore().byId("__xmlview0--MyButton");

            oControl.setVisible(false);
        },
        onMagic: function () {
            //gray out all fields
            var oModel = sap.ui.getCore().getModel();
            //access of data using model
            var myJsonData = oModel.setProperty("/empStr/mario", false);
        },
        superman: lifeSaver,
        
        onRowSelect: function (oEvent) {
            console.log(oEvent.getParameter("rowContext").getPath());
            var sPath = oEvent.getParameter("rowContext").getPath();
            this.index =  oEvent.getParameter("rowIndex");
            this.getView().byId("myForm").bindElement(sPath);
        },
        
        onDelete: function(){debugger;
            if(this.index === undefined) {
                MessageToast.show("Please Select a Row");
                return;
            }
            var oModel = sap.ui.getCore().getModel();
            var aData = oModel.getProperty("/empTab");
            aData.splice(this.index, 1);
            oModel.setProperty("/empTab", aData);
            this.index = undefined;
            
        },

        onShow: function () {
            //get model object
            var oModel = sap.ui.getCore().getModel();
            //access of data using model
            oModel.setProperty("/empStr/mario", true);
            var myJsonData = oModel.getProperty("/empStr");
            console.log(myJsonData);

        }
    });
});
