/*
 * Timemap.js Copyright 2008 Nick Rabinowitz.
 * Licensed under the MIT License (see LICENSE.txt)
 */

/**
 * @fileOverview
 * This file defines the Param class, which is used to get, set, and serialize
 * different fields on TimeMap and TimeMapItem objects.
 *
 * @author Nick Rabinowitz (www.nickrabinowitz.com)
 */

/**
 * @class
 * A parameter, with methods to get, set, and serialize the current value.
 *
 * @constructor
 * @param {Object} options          Container for named arguments
 * @param {Function} options.get            Function to get the current param value
 * @param {Function} options.set            Function to set the param to a new value
 * @param {Function} [options.setConfig]    Function to set a new value in a config object
 * @param {Function} [options.fromStr]      Function to parse the value from a string
 * @param {Function} [options.toStr]        Function to serialize the current value to a string
 */
TimeMap.Param = function(options) {
    /**
     * Get the current state value from a TimeMap or TimeMapItem object
     * @function
     *
     * @param {TimeMap|TimeMapItem} o       Object to inspect
     * @return {mixed}                      Current state value
     */
    this.get = options.get;
    
    /**
     * Set the current state value on a TimeMap or TimeMapItem object
     * @function
     *
     * @param {TimeMap|TimeMapItem} o       Object to modify
     * @param {mixed} value                 Value to set
     */
    this.set = options.set;
    
    /**
     * Set a new value on a config object for TimeMap.init()
     * @function
     * @see TimeMap.init
     *
     * @param {Object} config   Config object to modify
     * @param {mixed} value     Value to set
     */
    this.setConfig = options.setConfig || function(config, value) {
        // default: do nothing
    };
    
    /**
     * Parse a state value from a string
     * @function
     *
     * @param {String} s        String to parse
     * @return {mixed}          Current state value
     */
    this.fromString = options.fromStr || function(s) {
        // default: this is a string
        return s;
    };
    
    /**
     * Serialize a state value as a string
     * @function
     *
     * @param {mixed} value     Value to serialize
     * @return {String}         Serialized string
     */
    this.toString = options.toStr || function(value) {
        // default: use the built-in string method
        return value.toString();
    };
    
    /**
     * Get the current value as a string
     * 
     * @param {TimeMap|TimeMapItem} o       Object to inspect
     */
    this.getString = function(o) {
        this.toString(this.get(o));
    };
    
    /**
     * Set the current state value from a string
     * 
     * @param {TimeMap|TimeMapItem} o       Object to modify
     * @param {String} s                    String version of value to set
     */
    this.setString = function(o, s) {
        this.set(o, this.fromString(s));
    };
};

/**
 * @class
 * A convenience class for those parameters which deal with a value
 * in the options of a TimeMap or TimeMapItem object, setting some
 * additional default functions.
 *
 * @augments TimeMap.Param
 *
 * @constructor
 * @param {Object} options          Container for named arguments (see {@link TimeMap.Param})
 * @param {String} paramName        String name of the option parameter
 */
TimeMap.OptionParam = function(options, paramName) {
    if (paramName) {
        var defaults = {
            get: function(o) {
                return o.opts[paramName];
            },
            set: function(o, value) {
                o.opts[paramName] = value;
            },
            setConfig: function(config, value) {
                config.options = config.options || {};
                config.options[paramName] = value;
            }
        };
        options = TimeMap.util.merge(options, defaults);
    }
    return new TimeMap.Param(options);
};