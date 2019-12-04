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

        const encodeString = string => {
            // FIXME: Return self-decoding string like base64/xor


            return `atob(${JSON.stringify(Buffer.from(string).toString('base64'))});`;
        };

        const encodeNumber = number => {
            return `0b${number.toString(2)}`;
        };

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            VariableDeclarator: (node) => {
                if (node.id.name.startsWith('_') && parseInt(node.id.name.slice(1))) {
                    return;
                }

                context.report({
                    node: node,
                    message: 'Variable names shouldn\'t be longer than 1 character',
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
                                return fixerObject.replaceText(node, encodeString(node.value))
                            }
                        });
                        break;
                    }
                    case 'number': {
                        if (node.raw.startsWith('0b') || node.raw.startsWith('0x') || node.raw.startsWith('0o')) {
                            return;
                        }

                        context.report({
                            node: node,
                            message: 'Numbers should be obfuscated',
                            fix: fixerObject => {
                                return fixerObject.replaceText(node, encodeNumber(node.value))
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
