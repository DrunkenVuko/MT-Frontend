/**
 * Created by Vuko on 24.05.16.
 */
module.exports = [
    'CommonRequest', 'ngDialog',
    function(
        CommonRequest, ngDialog
    ) {
        'use strict';
        var self = this;

        self.details = {};
        self.x = "Hello";

        // Allergene
        self.allergic_multipleSelect_Selected = [];
        self.allergic_multipleSelect_Data = [
            {id: 1, label: "David"},
            {id: 2, label: "Jhon"},
            {id: 3, label: "Lisa"},
            {id: 4, label: "Nicole"},
            {id: 5, label: "Danny"}];

        self.allergic_multipleSelect_Settings = {
            enableSearch: true,
            scrollable: true,
            smartButtonMaxItems: 3,
            smartButtonTextConverter: function(itemText, originalItem) {
                if (itemText === 'Jhon') {
                    return 'Jhonny!';
                }

                return itemText;
            }
        };

        // Gruppierungen
        self.group_multipleSelect_Selected = [];
        self.group_multipleSelect_Data = [
            {id: 1, label: "Vorspeise"},
            {id: 2, label: "Hauptspeise"},
            {id: 3, label: "Dessert"},
            {id: 4, label: "Spirituosen"},
            {id: 5, label: "etc"}];

        self.group_multipleSelect_Settings = {
            enableSearch: true,
            scrollable: true,
            smartButtonMaxItems: 2,
            smartButtonTextConverter: function(itemText, originalItem) {
                if (itemText === 'Jhon') {
                    return 'Jhonny!';
                }

                return itemText;
            }
        };
    }];