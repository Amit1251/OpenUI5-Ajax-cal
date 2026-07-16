sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, JSONModel, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("ajax.controller.View1", {
        onInit() {
            // initialize an empty posts model so the table binds safely before data arrives
            this.getView().setModel(new JSONModel({ posts: [] }), "posts");
        },

        // Successful AJAX request to fetch data from the API and set it to the posts model
        onPress() {
            jQuery.ajax({
                url: "https://jsonplaceholder.typicode.com/posts",
                method: "GET",
                success: (data) => {
                    var oModel = new JSONModel({ posts: data });
                    this.getView().setModel(oModel, "posts");
                },
                error: (error) => {
                    console.error(error);
                }
            });

        },

        // Filter table by ID
        onFilterByID(oEvent) {
            var sQuery = oEvent.getParameter("query");
            var oTable = this.getView().byId("postsTable");
            var oBinding = oTable.getBinding("items");
            
            var aFilters = [];
            if (sQuery) {
                aFilters.push(new Filter("id", FilterOperator.EQ, sQuery));
            }
            oBinding.filter(aFilters);
        }
    });
});