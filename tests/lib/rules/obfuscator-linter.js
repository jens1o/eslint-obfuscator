/**
 * @fileoverview Just a random test
 * @author Jens Hausdorf
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/obfuscator-linter"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("obfuscator", rule, {

    valid: [],

    invalid: [
        {
            code: "let longVariableName = 0;",
            output: "let _1 = 0;",
            parserOptions: {
                ecmaVersion: 6
            },
            errors: [{
                message: "Variable names should be longer than 1 character",
                type: "VariableDeclarator"
            }]
        },
        {
            code: "var longVariableName;",
            output: "var _1;",
            parserOptions: {
                ecmaVersion: 6
            },
            errors: [{
                message: "Variable names should be longer than 1 character",
                type: "VariableDeclarator"
            }]
        },
        {
            code: "let longVariableName = 0; let secondLongVariableName = foo;",
            output: "let _1 = 0; let _2 = foo;",
            parserOptions: {
                ecmaVersion: 6
            },
            errors: [{
                message: "Variable names should be longer than 1 character",
                type: "VariableDeclarator"
            }, {
                message: "Variable names should be longer than 1 character",
                type: "VariableDeclarator"
            }]
        },
        {
            code: `"test"`,
            output: `atob("dGVzdA==");`,
            parserOptions: {
                ecmaVersion: 6
            },
            errors: [{
                message: "Strings should be obfuscated",
                type: "Literal"
            }]
        },
    ]
});
