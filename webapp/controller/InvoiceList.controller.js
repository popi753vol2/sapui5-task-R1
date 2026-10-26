sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/ui/core/UIComponent"], function (Controller, JSONModel, Filter, FilterOperator, UIComponent) {
  "use strict";

  const App = Controller.extend("ui5.tutorial.walkthrough.controller.App", {
    onInit() {
      const viewModel = new JSONModel({
        currency: "EUR"
      });
      this.getView()?.setModel(viewModel, "view");
    },
    onFilterInvoices(event) {
      this._invoiceQuery = event.getParameter("query");
      this.applyInvoiceFilters();
    },

    onStatusFilterChange() {
      this.applyInvoiceFilters();
    },

    applyInvoiceFilters() {
      const filters = [];
      const query = this._invoiceQuery;
      const status = this.byId("statusFilter")?.getSelectedKey();

      if (query) {
        filters.push(new Filter("ProductName", FilterOperator.Contains, query));
      }
      if (status) {
        filters.push(new Filter("Status", FilterOperator.EQ, status));
      }

      const list = this.byId("invoiceList");
      const binding = list?.getBinding("items");
      binding?.filter(filters);
    },
    onPress(event) {
      const item = event.getSource();
      const router = UIComponent.getRouterFor(this);
      router.navTo("detail", {
        invoicePath: window.encodeURIComponent(item.getBindingContext("invoice").getPath().substring(1))
      });
    }
  });
  return App;
});
