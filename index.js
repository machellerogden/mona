(function(){

    var _ = require('underscore'),
        Deferred = require('JQDeferred'),
        mona;

    function Mona(defaults) {
        defaults = defaults || {};
        function lift (value, key, object) {
            if (_.isObject(value)) {
                if (value.value === 'value') {
                    object[key] = value.value;
                } else if (_.isBoolean(value.required)) {
                    delete object[key];
                }
            }
        }
        function getRequiredKey (value, key) {
            if ( _.isBoolean(value.required) && (value.required === true) ) {
                return key;
            }
        }
        return function Constructor(config) {
                var methodKeys, methods, properties, objectProperties, configKeys, requiredKeys;
            if (_.isObject(defaults)) {
                dMethodKeys = _.keys(_.functions(defaults));
                dMethods = _.pick(defaults, dMethodKeys);
                dProperties = _.omit(defaults, dMethodKeys);
                dRequiredKeys = _.reject(_.map(dProperties, getRequiredKey), _.isUndefined);
                if (_.has(config, dRequiredKeys)) {
                    _.each(defaults, lift);
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
