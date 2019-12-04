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

    // TODO: add cases
    valid: [],

    invalid: [
        {
            code: "let longVariableName = foo;",
            output: "let _1 = foo;",
            parserOptions: {
                ecmaVersion: 6
            },
            errors: [{
                message: "Variable names shouldn't be longer than 1 character",
                type: "VariableDeclarator"
            }]
        },
        {
            code: "let _1 = 0;",
            output: "let _1 = 0b0;",
            parserOptions: {
                ecmaVersion: 6
            },
            errors: [{
                message: "Numbers should be obfuscated",
                type: "Literal"
            }]
        },
        {
            code: "var longVariableName;",
            output: "var _1;",
            parserOptions: {
                ecmaVersion: 6
            },
            errors: [{
                message: "Variable names shouldn't be longer than 1 character",
                type: "VariableDeclarator"
            }]
        },
        {
            code: "let longVariableName = bar; let secondLongVariableName = foo;",
            output: "let _1 = bar; let _2 = foo;",
            parserOptions: {
                ecmaVersion: 6
            },
            errors: [{
                message: "Variable names shouldn't be longer than 1 character",
                type: "VariableDeclarator"
            }, {
                message: "Variable names shouldn't be longer than 1 character",
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
