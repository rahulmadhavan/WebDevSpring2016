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
        var fields = Field.getFieldsForForm(formId);
        res.json(fields);
    }

    function getFieldForFormById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = Field.getFieldsForForm(formId, fieldId);
        res.json(field);
    }

    function deleteFieldForFormById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = Field.deleteFieldForFormById(formId, fieldId);
        res.json(fields);
    }

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldBody = req.body;
        var field = Field.createFieldForForm(formId, fieldBody);
        res.json(field);
    }

    function updateFieldFormById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fieldBody = req.body;
        var field = Field.updateFieldFormById(formId, fieldId, fieldBody);
        res.json(field);
    }

};
