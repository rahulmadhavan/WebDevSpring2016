/**
 * Created by rahulk on 3/16/16.
 */
module.exports = function(app, Field) {
    'use strict';

    app.get('/api/assignment/form/:formId/field', getFieldsForForm);
    app.get('/api/assignment/form/:formId/field/:fieldId', getFieldForFormById);
    app.delete('/api/assignment/form/:formId/field/:fieldId', deleteFieldForFormById);
    app.post('/api/assignment/form/:formId/field', createFieldForForm);
    app.put('/api/assignment/form/:formId/field/:fieldId', updateFieldFormById);

    function getFieldsForForm(req, res) {
        var formId = req.params.formId;
        Field.getFieldsForForm(formId)
            .then(function(fields) {
                res.json(fields);
            });
    }

    function getFieldForFormById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        Field.getFieldForFormById(formId, fieldId)
            .then(function(field) {
                res.json(field);
            });
    }

    function deleteFieldForFormById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        Field.deleteFieldForFormById(formId, fieldId)
            .then(function(fields) {
                res.json(fields);
            });
    }

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldBody = req.body;
        Field.createFieldForForm(formId, fieldBody)
            .then(function(field) {
                res.json(field);
            });
    }

    function updateFieldFormById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fieldBody = req.body;
        Field.updateFieldFormById(formId, fieldId, fieldBody)
            .then(function(field) {
                res.json(field);
            });
    }

};
