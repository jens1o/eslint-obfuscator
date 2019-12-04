/**
 * @fileoverview Just a random test
 * @author Jens Hausdorf
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Just a random test",
            category: "Fill me in",
            recommended: false
        },
        fixable: "code",  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function (context) {

        // variables should be defined here

        let variableCount = 0;

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

        const encode = string => {
            // FIXME: Return self-decoding string like base64/xor


            return `atob(${JSON.stringify(Buffer.from(string).toString('base64'))});`;
        };

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            VariableDeclarator: (node) => {
                context.report({
                    node: node,
                    message: 'Variable names should be longer than 1 character',
                    fix: fixerObject => {
                        let fixerString = `_${++variableCount}`;

                        if (node.init) {
                            fixerString += ` = ${context.getSource(node.init)}`;
                        }

                        return fixerObject.replaceText(node, fixerString);
                    }
                });
            },
            'Literal:exit': node => {
                switch (typeof node.value) {
                    case 'string': {
                        context.report({
                            node: node,
                            message: 'Strings should be obfuscated',
                            fix: fixerObject => {
                                return fixerObject.replaceText(node, encode(node.value))
                            }
                        });
                        break;
                    }
                    default:
                        return;

                }
            }


        };
    }
};
