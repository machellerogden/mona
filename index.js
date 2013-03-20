(function(){

    var _ = require('underscore'),
        mona;

    function Mona(defaults) {
        defaults = defaults || {};
        return function Constructor(config) {
                var methodKeys, methods, properties, requiredKeys;
            if (_.isObject(defaults)) {
                dMethodKeys = _.keys(_.functions(defaults));
                dMethods = _.pick(defaults, dMethodKeys);
                dProperties = _.omit(defaults, dMethodKeys);
                dRequiredKeys = _.keys(_.pick(dProperties, "monarequired"));
                if (_.has(config, dRequiredKeys)) {
                    _.extend(this, _.defaults(config, defaults));
                    return this;
                } else {
                    throw new Error("Error: Something important is missing. Check your configuration -- required keys are: " + dRequiredKeys.join(', '));
                }
            }
        };
    }

    // AMD / RequireJS
    if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return Mona;
        });
    
    // Node.js
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = Mona;

    // included directly via <script> tag
    } else {
        root.Mona = Mona;
    }

}());
