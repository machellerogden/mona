(function(){

    var _ = require('underscore');

    function Mona(options) {
        options = options || {};
        var defaults = options.defaults || {},
            required = options.required || 'required',
            proto = options.proto || {},
            Constructor;
        function returnKeyIfRequired (value, key) {
            if (value === required) return key;
        }
        Constructor = (function(){
            return function Constructor(config) {
                var requiredKeys;
                if (_.isObject(defaults)) {
                    requiredKeys = _.reject(_.map(defaults, returnKeyIfRequired), _.isUndefined);
                    if (!_.isEmpty(requiredKeys)) {
                        if (_.has(config, requiredKeys)) {
                            _.extend(this, _.defaults(config, defaults));
                        } else {
                            throw new Error("Error: Something important is missing. Check your configuration -- required keys are: " + requiredKeys.join(', '));
                        }
                    }
                    return this;
                }
            };
        }());
        Constructor.prototype = proto;
        return Constructor;
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
