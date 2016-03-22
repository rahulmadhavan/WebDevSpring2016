/**
 * Created by rahulk on 3/16/16.
 */
module.exports = function(app, Form) {
    'use strict';

    app.get('/api/assignment/user/:userId/form', getFormsForUser);
    app.get('/api/assignment/form/:formId', findFormById);
    app.delete('/api/assignment/form/:formId', deleteFormById);
    app.post('/api/assignment/user/:userId/form', createFormForUser);
    app.put('/api/assignment/form/:formId', updateFormById);

    function getFormsForUser(req, res) {
        var userId = req.params.userId;
        var forms = Form.findAllFormsForUser(userId);
        res.json(forms);
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        var form = Form.getFormById(formId);
        res.json(form);
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        var forms = Form.deleteFormById(formId);
        res.json(forms);
    }

    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var formBody = req.body;
        var form = Form.createFormForUser(userId,formBody);
        res.json(form);
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var formBody = req.body;
        var form = Form.updateFormById(formId,formBody);
        res.json(form);
    }

};
