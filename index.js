(function(){

    var _ = require('underscore'),
        mona;

    function Mona(defaults, requiredValue) {
        defaults = defaults || {};
        requiredValue = requiredValue || 'required';
        function returnKeyIfRequired (value, key) {
            if (value === requiredValue) return key;
        }
        return function Constructor(config) {
                var dMethodKeys, dProperties, dRequiredKeys;
            if (_.isObject(defaults)) {
                dMethodKeys = _.keys(_.functions(defaults));
                dProperties = _.omit(defaults, dMethodKeys);
                dRequiredKeys = _.reject(_.map(dProperties, returnKeyIfRequired), _.isUndefined);
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

