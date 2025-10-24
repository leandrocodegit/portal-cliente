'use strict';

var propertiesPanel = require('src/libs/properties-panel');
var hooks = require('src/libs/properties-panel/preact/hooks');
var minDash = require('min-dash');
var preact = require('src/libs/properties-panel/preact');
var React = require('src/libs/properties-panel/preact/compat');
var jsxRuntime = require('src/libs/properties-panel/preact/jsx-runtime');
var KeyboardUtil = require('diagram-js/lib/features/keyboard/KeyboardUtil');
var minDom = require('min-dom');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

const DmnPropertiesPanelContext = preact.createContext({
  selectedElement: null,
  injector: null,
  getService: () => null
});

/**
 * Is an element of the given DMN type?
 *
 * @param  {tjs.model.Base|ModdleElement} element
 * @param  {string} type
 *
 * @return {boolean}
 */
function is(element, type) {
  var bo = getBusinessObject(element);
  return bo && typeof bo.$instanceOf === 'function' && bo.$instanceOf(type);
}

/**
 * Return the business object for a given element.
 *
 * @param  {tjs.model.Base|ModdleElement} element
 *
 * @return {ModdleElement}
 */
function getBusinessObject(element) {
  return element && element.businessObject || element;
}

/**
 * Return true if element has any of the given types.
 *
 * @param {djs.model.Base} element
 * @param {Array<string>} types
 *
 * @return {boolean}
 */
function isAny(element, types) {
  return minDash.some(types, function (t) {
    return is(element, t);
  });
}

function getLabelAttr(semantic) {
  if (is(semantic, 'dmn:Decision') || is(semantic, 'dmn:BusinessKnowledgeModel') || is(semantic, 'dmn:InputData') || is(semantic, 'dmn:KnowledgeSource')) {
    return 'name';
  }
  if (is(semantic, 'dmn:TextAnnotation')) {
    return 'text';
  }
}
function getLabel(element) {
  var semantic = element.businessObject,
    attr = getLabelAttr(semantic);
  if (attr) {
    return semantic[attr] || '';
  }
}

var _path$9;
function _extends$9() { return _extends$9 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$9.apply(null, arguments); }
var SvgDmnIconAssociation = function SvgDmnIconAssociation(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$9({
    xmlns: "http://www.w3.org/2000/svg",
    width: 32,
    height: 32
  }, props), _path$9 || (_path$9 = /*#__PURE__*/React__namespace.createElement("path", {
    fill: "none",
    stroke: "#000",
    strokeDasharray: "3.3,6",
    strokeLinecap: "square",
    strokeWidth: 2,
    d: "m1.5 30.5 29-29"
  })));
};

var _path$8;
function _extends$8() { return _extends$8 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$8.apply(null, arguments); }
var SvgDmnIconAuthorityRequirement = function SvgDmnIconAuthorityRequirement(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$8({
    xmlns: "http://www.w3.org/2000/svg",
    width: 32,
    height: 32
  }, props), _path$8 || (_path$8 = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    d: "m6.364 24.235 1.414 1.414-6.364 6.364L0 30.598l6.364-6.363Zm8-8 1.414 1.414-6.364 6.364L8 22.598l6.364-6.363Zm8-8 1.414 1.414-6.364 6.364L16 14.598l6.364-6.363ZM28 0a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"
  })));
};

var _path$7;
function _extends$7() { return _extends$7 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$7.apply(null, arguments); }
var SvgDmnIconBusinessKnowledge = function SvgDmnIconBusinessKnowledge(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$7({
    xmlns: "http://www.w3.org/2000/svg",
    width: 32,
    height: 32
  }, props), _path$7 || (_path$7 = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M6.258 8 0 15.358l.001.325.028 8.259h25.977L32 16.518V8H6.258Zm.812 1.756h23.174v6.142l-5.077 6.288H1.779L1.759 16l5.31-6.245Z"
  })));
};

var _path$6;
function _extends$6() { return _extends$6 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$6.apply(null, arguments); }
var SvgDmnIconDecision = function SvgDmnIconDecision(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$6({
    xmlns: "http://www.w3.org/2000/svg",
    width: 32,
    height: 32
  }, props), _path$6 || (_path$6 = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    d: "M0 6v20.711h32V6H0Zm1.697 1.697h28.606v17.317H1.697V7.697Z"
  })));
};

var _path$5;
function _extends$5() { return _extends$5 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$5.apply(null, arguments); }
var SvgDmnIconDrd = function SvgDmnIconDrd(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$5({
    xmlns: "http://www.w3.org/2000/svg",
    width: 32,
    height: 32
  }, props), _path$5 || (_path$5 = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M3.563 0A3.554 3.554 0 0 0 .01 3.552L0 28.446A3.554 3.554 0 0 0 3.555 32h24.882a3.554 3.554 0 0 0 3.554-3.552L32 3.554A3.554 3.554 0 0 0 28.445 0H3.563ZM14 14l15 .016V20l-15-.016V14Zm0-11 15 .022V11l-15-.022V3Zm-3 16.992L3 20v-5.992L11 14v5.992Zm0-9.003L3 11V3.01L11 3v7.99ZM3 23.008 11 23v5.992L3 29v-5.992Zm11 5.984V23l15 .016V29l-15-.008Z"
  })));
};

var _path$4;
function _extends$4() { return _extends$4 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$4.apply(null, arguments); }
var SvgDmnIconInformationRequirement = function SvgDmnIconInformationRequirement(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$4({
    xmlns: "http://www.w3.org/2000/svg",
    width: 32,
    height: 32
  }, props), _path$4 || (_path$4 = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M32 .06S20.33 6.015 14.403 8.8c1.27 1.16 2.451 2.41 3.676 3.615L0 30.734 1.325 32l18.08-18.32c1.227 1.223 2.448 2.453 3.676 3.676C26.247 11.121 32 .06 32 .06Z"
  })));
};

var _path$3;
function _extends$3() { return _extends$3 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$3.apply(null, arguments); }
var SvgDmnIconInputData = function SvgDmnIconInputData(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$3({
    xmlns: "http://www.w3.org/2000/svg",
    width: 32,
    height: 32
  }, props), _path$3 || (_path$3 = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M6.384 8c-1.825 0-3.458.945-4.587 2.382C.667 11.82 0 13.756 0 15.88c0 2.125.667 4.062 1.797 5.499 1.13 1.437 2.762 2.382 4.587 2.382h19.232c1.825 0 3.458-.945 4.587-2.382C31.333 19.942 32 18.005 32 15.88c0-2.124-.667-4.06-1.797-5.498C29.073 8.945 27.441 8 25.616 8H6.384Zm0 1.763h19.232c1.223 0 2.342.616 3.201 1.709.86 1.093 1.42 2.656 1.42 4.408 0 1.753-.56 3.316-1.42 4.409-.86 1.093-1.978 1.708-3.2 1.708H6.383c-1.223 0-2.342-.615-3.201-1.708-.86-1.093-1.42-2.656-1.42-4.409 0-1.752.56-3.315 1.42-4.408.86-1.093 1.978-1.709 3.2-1.709Z"
  })));
};

var _path$2;
function _extends$2() { return _extends$2 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$2.apply(null, arguments); }
var SvgDmnIconKnowledgeRequirement = function SvgDmnIconKnowledgeRequirement(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$2({
    xmlns: "http://www.w3.org/2000/svg",
    width: 32,
    height: 32
  }, props), _path$2 || (_path$2 = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    d: "m6.364 24.235 1.414 1.414-6.364 6.364L0 30.598l6.364-6.363Zm8-8 1.414 1.414-6.364 6.364L8 22.598l6.364-6.363Zm8-8 1.414 1.414-6.364 6.364L16 14.598l6.364-6.363ZM32 12.06h-2V3.426l-4.586 4.587L24 6.598l4.537-4.538H20v-2h12v12Z"
  })));
};

var _path$1;
function _extends$1() { return _extends$1 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$1.apply(null, arguments); }
var SvgDmnIconKnowledgeSource = function SvgDmnIconKnowledgeSource(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$1({
    xmlns: "http://www.w3.org/2000/svg",
    width: 32,
    height: 32
  }, props), _path$1 || (_path$1 = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M0 5V23.376l.348.23c4.812 3.182 8.946 2.865 12.41 1.63 3.464-1.235 6.366-3.239 8.999-3.589l.02-.003.021-.003c3.576-.675 5.681.439 9.126 1.88l1.076.45V5.064L0 5Zm1.553 1.557 28.894.059v15.016c-2.89-1.22-5.358-2.187-8.918-1.521-3.199.433-6.1 2.523-9.293 3.662C9.12 24.884 5.83 25.23 1.553 22.535V6.557Z"
  })));
};

var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var SvgDmnIconTextAnnotation = function SvgDmnIconTextAnnotation(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 32,
    height: 32
  }, props), _path || (_path = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M22.087 0v31.647H32v-1.788h-8.125V1.788H32V0h-9.913Zm-2.924 13.999-2.737 2.167 2.167 2.738 2.738-2.167-2.168-2.738Zm-5.475 4.335L10.95 20.5l2.168 2.738 2.737-2.168-2.167-2.737Zm-5.475 4.335-2.738 2.167 2.168 2.738 2.737-2.168-2.167-2.737Zm-5.476 4.335L0 29.17l2.167 2.738 2.738-2.168-2.168-2.737Z"
  })));
};

var iconsByType = {
  'Association': SvgDmnIconAssociation,
  'AuthorityRequirement': SvgDmnIconAuthorityRequirement,
  'BusinessKnowledgeModel': SvgDmnIconBusinessKnowledge,
  'Decision': SvgDmnIconDecision,
  'DecisionTable': SvgDmnIconDrd,
  'Definitions': SvgDmnIconDrd,
  'DRD': SvgDmnIconDrd,
  'InformationRequirement': SvgDmnIconInformationRequirement,
  'InputData': SvgDmnIconInputData,
  'KnowledgeRequirement': SvgDmnIconKnowledgeRequirement,
  'KnowledgeSource': SvgDmnIconKnowledgeSource,
  'TextAnnotation': SvgDmnIconTextAnnotation
};

function getConcreteType(element) {
  const {
    type: elementType
  } = element;
  return getRawType(elementType);
}
const PanelHeaderProvider = {
  getElementLabel: element => {
    if (is(element, 'dmn:Definitions')) return getBusinessObject(element).get('name');
    return getLabel(element);
  },
  getElementIcon: element => {
    const concreteType = getConcreteType(element);
    return iconsByType[concreteType];
  },
  getTypeLabel: element => {
    const concreteType = getConcreteType(element);
    return concreteType.replace(/(\B[A-Z])/g, ' $1').replace(/(\bNon Interrupting)/g, '($1)');
  }
};

// helpers ///////////////////////

function getRawType(type) {
  return type.split(':')[1];
}

const PanelPlaceholderProvider = {
  getEmpty: () => {
    return {
      text: 'Select an element to edit its properties.',
      // todo(pinussilvestrus): add icon
      icon: null
    };
  },
  getMultiple: () => {
    return {
      text: 'Multiple elements are selected. Select a single element to edit its properties.',
      // todo(pinussilvestrus): add icon
      icon: null
    };
  }
};

function DmnPropertiesPanel(props) {
  const {
    element,
    injector,
    getProviders,
    layoutConfig,
    descriptionConfig,
    tooltipConfig
  } = props;
  const canvas = injector.get('canvas');
  const elementRegistry = injector.get('elementRegistry');
  const eventBus = injector.get('eventBus');
  const [state, setState] = hooks.useState({
    selectedElement: element
  });
  const selectedElement = state.selectedElement;

  /**
   * @param {djs.model.Base | Array<djs.model.Base>} element
   */
  const _update = element => {
    if (!element) {
      return;
    }
    let newSelectedElement = element;

    // handle labels
    if (newSelectedElement && newSelectedElement.type === 'label') {
      newSelectedElement = newSelectedElement.labelTarget;
    }
    setState({
      ...state,
      selectedElement: newSelectedElement
    });

    // notify interested parties on property panel updates
    eventBus.fire('propertiesPanel.updated', {
      element: newSelectedElement
    });
  };

  // (2) react on element changes

  // (2a) selection changed
  hooks.useEffect(() => {
    const onSelectionChanged = e => {
      const {
        newSelection = []
      } = e;
      if (newSelection.length > 1) {
        return _update(newSelection);
      }
      const newElement = newSelection[0];
      const rootElement = canvas.getRootElement();
      if (isImplicitRoot$1(rootElement)) {
        return;
      }
      _update(newElement || rootElement);
    };
    eventBus.on('selection.changed', onSelectionChanged);
    return () => {
      eventBus.off('selection.changed', onSelectionChanged);
    };
  }, []);

  // (2b) selected element changed
  hooks.useEffect(() => {
    const onElementsChanged = e => {
      const elements = e.elements;
      const updatedElement = findElement(elements, selectedElement);
      if (updatedElement && elementExists(updatedElement, elementRegistry)) {
        _update(updatedElement);
      }
    };
    eventBus.on('elements.changed', onElementsChanged);
    return () => {
      eventBus.off('elements.changed', onElementsChanged);
    };
  }, [selectedElement]);

  // (2c) root element changed
  hooks.useEffect(() => {
    const onRootAdded = e => {
      const element = e.element;
      if (isImplicitRoot$1(element)) {
        return;
      }
      _update(element);
    };
    eventBus.on('root.added', onRootAdded);
    return () => {
      eventBus.off('root.added', onRootAdded);
    };
  }, [selectedElement]);

  // (2d) provided entries changed
  hooks.useEffect(() => {
    const onProvidersChanged = () => {
      _update(selectedElement);
    };
    eventBus.on('propertiesPanel.providersChanged', onProvidersChanged);
    return () => {
      eventBus.off('propertiesPanel.providersChanged', onProvidersChanged);
    };
  }, [selectedElement]);

  // (3) create properties panel context
  const dmnPropertiesPanelContext = {
    selectedElement,
    injector,
    getService(type, strict) {
      return injector.get(type, strict);
    }
  };

  // (4) retrieve groups for selected element
  const providers = getProviders(selectedElement);
  const groups = hooks.useMemo(() => {
    return minDash.reduce(providers, function (groups, provider) {
      // do not collect groups for multi element state
      if (minDash.isArray(selectedElement)) {
        return [];
      }
      const updater = provider.getGroups(selectedElement);
      return updater(groups);
    }, []);
  }, [providers, selectedElement]);

  // (5) notify layout changes
  const onLayoutChanged = layout => {
    eventBus.fire('propertiesPanel.layoutChanged', {
      layout
    });
  };

  // (6) notify description changes
  const onDescriptionLoaded = description => {
    eventBus.fire('propertiesPanel.descriptionLoaded', {
      description
    });
  };

  // (7) notify tooltip changes
  const onTooltipLoaded = tooltip => {
    eventBus.fire('propertiesPanel.tooltipLoaded', {
      tooltip
    });
  };
  return jsxRuntime.jsx(DmnPropertiesPanelContext.Provider, {
    value: dmnPropertiesPanelContext,
    children: jsxRuntime.jsx(propertiesPanel.PropertiesPanel, {
      element: selectedElement,
      headerProvider: PanelHeaderProvider,
      placeholderProvider: PanelPlaceholderProvider,
      groups: groups,
      layoutConfig: layoutConfig,
      layoutChanged: onLayoutChanged,
      descriptionConfig: descriptionConfig,
      descriptionLoaded: onDescriptionLoaded,
      tooltipConfig: tooltipConfig,
      tooltipLoaded: onTooltipLoaded,
      eventBus: eventBus
    })
  });
}

// helpers //////////////////////////

function isImplicitRoot$1(element) {
  return element && element.isImplicit;
}
function findElement(elements, element) {
  return minDash.find(elements, e => e === element);
}
function elementExists(element, elementRegistry) {
  return element && elementRegistry.get(element.id);
}

const DEFAULT_PRIORITY = 1000;

/**
 * @typedef { import('@bpmn-io/properties-panel').GroupDefinition } GroupDefinition
 * @typedef { import('@bpmn-io/properties-panel').ListGroupDefinition } ListGroupDefinition
 * @typedef { { getGroups: (ModdleElement) => (Array{GroupDefinition|ListGroupDefinition}) => Array{GroupDefinition|ListGroupDefinition}) } PropertiesProvider
 */

class DmnPropertiesPanelRenderer {
  constructor(config, injector, eventBus, dmnjs) {
    const {
      parent,
      layout: layoutConfig,
      description: descriptionConfig,
      tooltip: tooltipConfig
    } = config || {};
    this._eventBus = eventBus;
    this._injector = injector;
    this._layoutConfig = layoutConfig;
    this._descriptionConfig = descriptionConfig;
    this._tooltipConfig = tooltipConfig;
    this._container = minDom.domify('<div style="height: 100%" tabindex="-1" class="bio-properties-panel-container"></div>');
    var commandStack = injector.get('commandStack', false);
    commandStack && setupKeyboard(this._container, eventBus, commandStack);
    eventBus.on('diagram.destroy', () => {
      this.detach();
    });
    eventBus.on('import.done', event => {
      const {
        element
      } = event;
      if (parent) {
        this.attachTo(parent);
      }
      this._render(element);
    });
    eventBus.on('detach', event => {
      this.detach();
    });
    dmnjs.on('detach', () => {
      this.detach();
    });
  }

  /**
   * Attach the properties panel to a parent node.
   *
   * @param {HTMLElement} container
   */
  attachTo(container) {
    if (!container) {
      throw new Error('container required');
    }

    // unwrap jQuery if provided
    if (container.get && container.constructor.prototype.jquery) {
      container = container.get(0);
    }
    if (typeof container === 'string') {
      container = minDom.query(container);
    }

    // (1) detach from old parent
    this.detach();

    // (2) append to parent container
    container.appendChild(this._container);

    // (3) notify interested parties
    this._eventBus.fire('propertiesPanel.attach');
  }

  /**
   * Detach the properties panel from its parent node.
   */
  detach() {
    const parentNode = this._container.parentNode;
    if (parentNode) {
      parentNode.removeChild(this._container);
      this._eventBus.fire('propertiesPanel.detach');
    }
  }

  /**
   * Register a new properties provider to the properties panel.
   *
   * @param {Number} [priority]
   * @param {PropertiesProvider} provider
   */
  registerProvider(priority, provider) {
    if (!provider) {
      provider = priority;
      priority = DEFAULT_PRIORITY;
    }
    if (typeof provider.getGroups !== 'function') {
      console.error('Properties provider does not implement #getGroups(element) API');
      return;
    }
    this._eventBus.on('propertiesPanel.getProviders', priority, function (event) {
      event.providers.push(provider);
    });
    this._eventBus.fire('propertiesPanel.providersChanged');
  }
  _getProviders() {
    const event = this._eventBus.createEvent({
      type: 'propertiesPanel.getProviders',
      providers: []
    });
    this._eventBus.fire(event);
    return event.providers;
  }
  _render(element) {
    const canvas = this._injector.get('canvas');
    if (!element) {
      element = canvas.getRootElement();
    }
    if (isImplicitRoot(element)) {
      return;
    }
    preact.render(jsxRuntime.jsx(DmnPropertiesPanel, {
      element: element,
      injector: this._injector,
      getProviders: this._getProviders.bind(this),
      layoutConfig: this._layoutConfig,
      descriptionConfig: this._descriptionConfig,
      tooltipConfig: this._tooltipConfig
    }), this._container);
    this._eventBus.fire('propertiesPanel.rendered');
  }
  _destroy() {
    if (this._container) {
      preact.render(null, this._container);
      this._eventBus.fire('propertiesPanel.destroyed');
    }
  }
}
DmnPropertiesPanelRenderer.$inject = ['config.propertiesPanel', 'injector', 'eventBus', '_parent'];

// helpers ///////////////////////

function isImplicitRoot(element) {
  return element && element.isImplicit;
}

/**
 * Setup keyboard bindings (undo, redo) on the given container.
 *
 * @param {Element} container
 * @param {EventBus} eventBus
 * @param {CommandStack} commandStack
 */
function setupKeyboard(container, eventBus, commandStack) {
  function cancel(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  function handleKeys(event) {
    if (KeyboardUtil.isUndo(event)) {
      commandStack.undo();
      return cancel(event);
    }
    if (KeyboardUtil.isRedo(event)) {
      commandStack.redo();
      return cancel(event);
    }
  }
  eventBus.on('keyboard.bind', function () {
    minDom.event.bind(container, 'keydown', handleKeys);
  });
  eventBus.on('keyboard.unbind', function () {
    minDom.event.unbind(container, 'keydown', handleKeys);
  });
}

/**
 * A handler that combines and executes multiple commands.
 *
 * All updates are bundled on the command stack and executed in one step.
 * This also makes it possible to revert the changes in one step.
 */
class MultiCommandHandler {
  constructor(commandStack) {
    this._commandStack = commandStack;
  }
  preExecute(context) {
    const commandStack = this._commandStack;
    minDash.forEach(context, function (command) {
      commandStack.execute(command.cmd, command.context);
    });
  }
}
MultiCommandHandler.$inject = ['commandStack'];

const HANDLERS = {
  'properties-panel.multi-command-executor': MultiCommandHandler
};
function CommandInitializer(eventBus, commandStack) {
  eventBus.on('diagram.init', function () {
    minDash.forEach(HANDLERS, function (handler, id) {
      commandStack.registerHandler(id, handler);
    });
  });
}
CommandInitializer.$inject = ['eventBus', 'commandStack'];
var Commands = {
  __init__: [CommandInitializer]
};

var index$3 = {
  __depends__: [Commands, propertiesPanel.DebounceInputModule, propertiesPanel.FeelPopupModule],
  __init__: ['propertiesPanel'],
  propertiesPanel: ['type', DmnPropertiesPanelRenderer]
};

function useService (type, strict) {
  const {
    getService
  } = hooks.useContext(DmnPropertiesPanelContext);
  return getService(type, strict);
}

/**
 * @typedef { import('@bpmn-io/properties-panel').EntryDefinition } Entry
 */

/**
 * @returns {Array<Entry>} entries
 */
function DocumentationProps(props) {
  const {
    element
  } = props;
  if (!is(element, 'dmn:DMNElement')) {
    return [];
  }
  const entries = [{
    id: 'description',
    component: Description,
    element,
    isEdited: propertiesPanel.isTextAreaEntryEdited
  }];
  if (!is(element, 'dmn:Decision')) {
    return entries;
  }
  return entries.concat([{
    id: 'question',
    component: Question,
    element,
    isEdited: propertiesPanel.isTextAreaEntryEdited
  }, {
    id: 'allowedAnswers',
    component: AllowedAnswers,
    element,
    isEdited: propertiesPanel.isTextAreaEntryEdited
  }]);
}
function Description(props) {
  const {
    element,
    id
  } = props;
  const modeling = useService('modeling');
  const debounce = useService('debounceInput');
  const translate = useService('translate');
  let options = {
    element,
    id,
    label: translate('Description'),
    debounce,
    getValue: element => {
      return getBusinessObject(element).get('description');
    },
    setValue: value => {
      modeling.updateProperties(element, {
        description: value
      });
    }
  };
  return propertiesPanel.TextAreaEntry(options);
}
function Question(props) {
  const {
    element,
    id
  } = props;
  const modeling = useService('modeling');
  const debounce = useService('debounceInput');
  const translate = useService('translate');
  let options = {
    element,
    id,
    label: translate('Question'),
    debounce,
    getValue: element => {
      return getBusinessObject(element).get('question');
    },
    setValue: value => {
      modeling.updateProperties(element, {
        question: value
      });
    }
  };
  return propertiesPanel.TextAreaEntry(options);
}
function AllowedAnswers(props) {
  const {
    element,
    id
  } = props;
  const modeling = useService('modeling');
  const debounce = useService('debounceInput');
  const translate = useService('translate');
  let options = {
    element,
    id,
    label: translate('Allowed answers'),
    debounce,
    getValue: element => {
      return getBusinessObject(element).get('allowedAnswers');
    },
    setValue: value => {
      modeling.updateProperties(element, {
        allowedAnswers: value
      });
    }
  };
  return propertiesPanel.TextAreaEntry(options);
}

const SPACE_REGEX = /\s/;

// for QName validation as per http://www.w3.org/TR/REC-xml/#NT-NameChar
const QNAME_REGEX = /^([a-z][\w-.]*:)?[a-z_][\w-.]*$/i;

// for ID validation as per BPMN Schema (QName - Namespace)
const ID_REGEX = /^[a-z_][\w-.]*$/i;

/**
 * checks whether the id value is valid
 *
 * @param {ModdleElement} element
 * @param {String} idValue
 * @param {Function} translate
 *
 * @return {String} error message
 */
function isIdValid(element, idValue, translate) {
  const assigned = element.$model.ids.assigned(idValue);
  const idAlreadyExists = assigned && assigned !== element;
  if (!idValue) {
    return translate('ID must not be empty.');
  }
  if (idAlreadyExists) {
    return translate('ID must be unique.');
  }
  return validateId(idValue, translate);
}
function validateId(idValue, translate) {
  if (containsSpace(idValue)) {
    return translate('ID must not contain spaces.');
  }
  if (!ID_REGEX.test(idValue)) {
    if (QNAME_REGEX.test(idValue)) {
      return translate('ID must not contain prefix.');
    }
    return translate('ID must be a valid QName.');
  }
}
function containsSpace(value) {
  return SPACE_REGEX.test(value);
}

/**
 * @typedef { import('@bpmn-io/properties-panel').EntryDefinition } Entry
 */

/**
 * @returns {Array<Entry>} entries
 */
function IdProps$1(props) {
  const {
    element
  } = props;
  return [{
    id: 'id',
    component: Id$1,
    element,
    isEdited: propertiesPanel.isTextFieldEntryEdited
  }];
}
function Id$1(props) {
  const {
    element,
    id
  } = props;
  const modeling = useService('modeling');
  const debounce = useService('debounceInput');
  const translate = useService('translate');
  const setValue = (value, error) => {
    if (error) {
      return;
    }
    modeling.updateProperties(element, {
      id: value
    });
  };
  const getValue = hooks.useCallback(element => {
    return getBusinessObject(element).id;
  }, [element]);
  const validate = hooks.useCallback(value => {
    const businessObject = getBusinessObject(element);
    return isIdValid(businessObject, value, translate);
  }, [element, translate]);
  return propertiesPanel.TextFieldEntry({
    element,
    id,
    label: translate('ID'),
    getValue,
    setValue,
    debounce,
    validate
  });
}

/**
 * @typedef { import('@bpmn-io/properties-panel').EntryDefinition } Entry
 */

/**
 * @returns {Array<Entry>} entries
 */
function NameProps(props) {
  const {
    element
  } = props;
  if (!isAny(element, ['dmn:DRGElement', 'dmn:Definitions', 'dmn:TextAnnotation'])) {
    return [];
  }
  return [{
    id: 'name',
    component: Name,
    element,
    isEdited: propertiesPanel.isTextAreaEntryEdited
  }];
}
function Name(props) {
  const {
    element,
    id
  } = props;
  const modeling = useService('modeling');
  const debounce = useService('debounceInput');
  const translate = useService('translate');

  // (1) default: name
  let options = {
    element,
    id,
    label: translate('Name'),
    debounce,
    getValue: element => {
      return getBusinessObject(element).get('name');
    },
    setValue: value => {
      modeling.updateProperties(element, {
        name: value
      });
    },
    autoResize: true
  };

  // (2) text annotation
  if (is(element, 'dmn:TextAnnotation')) {
    options = {
      ...options,
      getValue: element => {
        return getBusinessObject(element).get('text');
      },
      setValue: value => {
        modeling.updateProperties(element, {
          text: value
        });
      }
    };
  }
  return propertiesPanel.TextAreaEntry(options);
}

class DmnPropertiesProvider {
  constructor(propertiesPanel) {
    propertiesPanel.registerProvider(this);
  }
  getGroups(element) {
    return groups => {
      return [...groups, ...getGroups(element)];
    };
  }
}
DmnPropertiesProvider.$inject = ['propertiesPanel'];
function getGroups(element) {
  const groups = [GeneralGroup(element), DocumentationGroup(element)];

  // contract: if a group returns null, it should not be displayed at all
  return groups.filter(group => group !== null);
}
function GeneralGroup(element) {
  const entries = [...NameProps({
    element
  }), ...IdProps$1({
    element
  })];
  return {
    id: 'general',
    label: 'General',
    entries,
    component: propertiesPanel.Group
  };
}
function DocumentationGroup(element) {
  const entries = [...DocumentationProps({
    element
  })];
  if (!entries.length) {
    return null;
  }
  return {
    id: 'documentation',
    label: 'Documentation',
    entries,
    component: propertiesPanel.Group
  };
}

var index$2 = {
  __init__: ['dmnPropertiesProvider'],
  dmnPropertiesProvider: ['type', DmnPropertiesProvider]
};

function VersionTagProps$1(props) {
  const {
    element
  } = props;
  if (!is(element, 'dmn:Decision')) {
    return [];
  }
  return [{
    id: 'versionTag',
    component: VersionTag$1,
    element,
    isEdited: propertiesPanel.isTextFieldEntryEdited
  }];
}
function VersionTag$1(props) {
  const {
    element,
    id
  } = props;
  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');
  const getValue = () => {
    return getBusinessObject(element).get('camunda:versionTag');
  };
  const setValue = value => {
    modeling.updateProperties(element, {
      'camunda:versionTag': value
    });
  };
  return propertiesPanel.TextFieldEntry({
    element,
    id,
    label: translate('Version tag'),
    getValue,
    setValue,
    debounce
  });
}

function HistoryCleanupProps(props) {
  const {
    element
  } = props;
  if (!is(element, 'dmn:Decision')) {
    return [];
  }
  return [{
    id: 'historyTimeToLive',
    component: HistoryTimeToLive,
    element,
    isEdited: propertiesPanel.isTextFieldEntryEdited
  }];
}
function HistoryTimeToLive(props) {
  const {
    element,
    id
  } = props;
  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');
  const getValue = () => {
    return getBusinessObject(element).get('camunda:historyTimeToLive');
  };
  const setValue = value => {
    modeling.updateProperties(element, {
      'camunda:historyTimeToLive': value
    });
  };
  return propertiesPanel.TextFieldEntry({
    element,
    id,
    label: translate('Time to live'),
    tooltip: jsxRuntime.jsx("div", {
      children: jsxRuntime.jsxs("p", {
        children: [translate('Number of days before this resource is being cleaned up. If specified, takes precedence over the engine configuration.'), ' ', jsxRuntime.jsx("a", {
          href: "https://docs.camunda.org/manual/latest/user-guide/process-engine/history/",
          target: "_blank",
          rel: "noopener noreferrer",
          children: translate('Learn more')
        })]
      })
    }),
    getValue,
    setValue,
    debounce
  });
}

/**
 * @typedef { import('@bpmn-io/properties-panel').EntryDefinition } Entry
 */

/**
 * @returns {Array<Entry>} entries
 */
function IdProps(props) {
  const {
    element
  } = props;
  return [{
    id: 'id',
    component: Id,
    element,
    isEdited: propertiesPanel.isTextFieldEntryEdited
  }];
}
function Id(props) {
  const {
    element,
    id
  } = props;
  const modeling = useService('modeling');
  const debounce = useService('debounceInput');
  const translate = useService('translate');
  const setValue = (value, error) => {
    if (error) {
      return;
    }
    modeling.updateProperties(element, {
      id: value
    });
  };
  const getValue = hooks.useCallback(element => {
    return getBusinessObject(element).id;
  }, [element]);
  const validate = hooks.useCallback(value => {
    const businessObject = getBusinessObject(element);
    return isIdValid(businessObject, value, translate);
  }, [element, translate]);
  const description = is(element, 'dmn:Decision') ? translate('This maps to the decision definition key.') : null;
  return propertiesPanel.TextFieldEntry({
    element,
    id,
    label: translate('ID'),
    getValue,
    setValue,
    debounce,
    validate,
    description
  });
}

const LOW_PRIORITY$1 = 500;
const CAMUNDA_PLATFORM_GROUPS = [HistoryCleanupGroup];

/**
 * Provides `camunda` namespace properties.
 *
 * @example
 * ```javascript
 * import DmnModeler from 'dmn-js/lib/Modeler';
 * import {
 *   DmnPropertiesPanelModule,
 *   DmnPropertiesProviderModule,
 *   CamundaPlatformPropertiesProviderModule
 * } from 'dmn-js-properties-panel';
 *
 * const modeler = new DmnModeler({
 *   container: '#canvas',
 *   propertiesPanel: {
 *     parent: '#properties'
 *   },
 *   additionalModules: [
 *     DmnPropertiesPanelModule,
 *     DmnPropertiesProviderModule,
 *     CamundaPlatformPropertiesProviderModule
 *   ]
 * });
 * ```
 */
class CamundaPropertiesProvider {
  constructor(propertiesPanel, injector) {
    propertiesPanel.registerProvider(LOW_PRIORITY$1, this);
    this._injector = injector;
  }
  getGroups(element) {
    return groups => {
      // (1) add Camunda Platform specific groups
      groups = groups.concat(this._getGroups(element));

      // (2) update existing groups with Camunda Platform specific properties
      updateGeneralGroup$1(groups, element);
      return groups;
    };
  }
  _getGroups(element) {
    const groups = CAMUNDA_PLATFORM_GROUPS.map(createGroup => createGroup(element, this._injector));

    // contract: if a group returns null, it should not be displayed at all
    return groups.filter(group => group !== null);
  }
}
CamundaPropertiesProvider.$inject = ['propertiesPanel', 'injector'];

/**
 * This ensures the <Implementation> group always locates after <Documentation>
 */

function updateGeneralGroup$1(groups, element) {
  const generalGroup = findGroup$1(groups, 'general');
  if (!generalGroup) {
    return;
  }
  const {
    entries
  } = generalGroup;

  // (1) replace id with camunda id
  const idIndex = minDash.findIndex(entries, entry => entry.id === 'id');
  entries.splice(idIndex, 1, ...IdProps({
    element
  }));

  // (2) add version tag after id
  entries.splice(idIndex + 1, 0, ...VersionTagProps$1({
    element
  }));
}
function HistoryCleanupGroup(element) {
  const group = {
    label: 'History cleanup',
    id: 'Camunda__HistoryCleanup',
    component: propertiesPanel.Group,
    entries: [...HistoryCleanupProps({
      element
    })]
  };
  if (group.entries.length) {
    return group;
  }
  return null;
}

// helper /////////////////////

function findGroup$1(groups, id) {
  return groups.find(g => g.id === id);
}

var index$1 = {
  __init__: ['CamundaPropertiesProvider'],
  CamundaPropertiesProvider: ['type', CamundaPropertiesProvider]
};

/**
 * Create a new element and (optionally) set its parent.
 */
function createElement(type, properties, parent, dmnFactory) {
  const element = dmnFactory.create(type, properties);
  if (parent) {
    element.$parent = parent;
  }
  return element;
}

/**
 * Get extension elements of business object. Optionally filter by type.
 */
function getExtensionElementsList(businessObject, type = undefined) {
  const extensionElements = businessObject.get('extensionElements');
  if (!extensionElements) {
    return [];
  }
  const values = extensionElements.get('values');
  if (!values || !values.length) {
    return [];
  }
  if (type) {
    return values.filter(value => is(value, type));
  }
  return values;
}

function VersionTagProps(props) {
  const {
    element
  } = props;
  if (!is(element, 'dmn:Decision')) {
    return [];
  }
  return [{
    id: 'versionTag',
    component: VersionTag,
    isEdited: propertiesPanel.isTextFieldEntryEdited
  }];
}
function VersionTag(props) {
  const {
    element
  } = props;
  const drdFactory = useService('drdFactory');
  const commandStack = useService('commandStack');
  const debounce = useService('debounceInput');
  const translate = useService('translate');
  const getValue = () => {
    const versionTag = getVersionTag(element);
    if (versionTag) {
      return versionTag.get('value');
    }
  };
  const setValue = value => {
    let commands = [];
    const businessObject = getBusinessObject(element);
    let extensionElements = businessObject.get('extensionElements');

    // (1) ensure extension elements
    if (!extensionElements) {
      extensionElements = createElement('dmn:ExtensionElements', {
        values: []
      }, businessObject, drdFactory);
      commands.push({
        cmd: 'element.updateModdleProperties',
        context: {
          element,
          moddleElement: businessObject,
          properties: {
            extensionElements
          }
        }
      });
    }

    // (2) ensure version tag
    let versionTag = getVersionTag(element);
    if (!versionTag) {
      versionTag = createElement('zeebe:VersionTag', {}, extensionElements, drdFactory);
      commands.push({
        cmd: 'element.updateModdleProperties',
        context: {
          element,
          moddleElement: extensionElements,
          properties: {
            values: [...extensionElements.get('values'), versionTag]
          }
        }
      });
    }

    // (3) update version tag value
    commands.push({
      cmd: 'element.updateModdleProperties',
      context: {
        element,
        moddleElement: versionTag,
        properties: {
          value
        }
      }
    });
    commandStack.execute('properties-panel.multi-command-executor', commands);
  };
  return propertiesPanel.TextFieldEntry({
    element,
    id: 'versionTag',
    label: translate('Version tag'),
    getValue,
    setValue,
    debounce
  });
}

// helper //////////////////

function getVersionTag(element) {
  const businessObject = getBusinessObject(element);
  return getExtensionElementsList(businessObject, 'zeebe:VersionTag')[0];
}

const LOW_PRIORITY = 500;

/**
 * Provides `zeebe` namespace properties.
 *
 * @example
 * ```javascript
 * import DmnModeler from 'dmn-js/lib/Modeler';
 * import {
 *   DmnPropertiesPanelModule,
 *   DmnPropertiesProviderModule,
 *   ZeebePropertiesProviderModule
 * } from 'dmn-js-properties-panel';
 *
 * const modeler = new DmnModeler({
 *   container: '#canvas',
 *   propertiesPanel: {
 *     parent: '#properties'
 *   },
 *   additionalModules: [
 *     DmnPropertiesPanelModule,
 *     DmnPropertiesProviderModule,
 *     ZeebePropertiesProviderModule
 *   ]
 * });
 * ```
 */
class ZeebePropertiesProvider {
  constructor(propertiesPanel, injector) {
    propertiesPanel.registerProvider(LOW_PRIORITY, this);
    this._injector = injector;
  }
  getGroups(element) {
    return groups => {
      updateGeneralGroup(groups, element);
      return groups;
    };
  }
}
ZeebePropertiesProvider.$inject = ['propertiesPanel', 'injector'];
function updateGeneralGroup(groups, element) {
  const generalGroup = findGroup(groups, 'general');
  if (!generalGroup) {
    return;
  }
  const {
    entries
  } = generalGroup;
  const idIndex = minDash.findIndex(entries, entry => entry.id === 'id');
  entries.splice(idIndex + 1, 0, ...VersionTagProps({
    element
  }));
}

// helper /////////////////////

function findGroup(groups, id) {
  return groups.find(g => g.id === id);
}

var index = {
  __init__: ['zeebePropertiesProvider'],
  zeebePropertiesProvider: ['type', ZeebePropertiesProvider]
};

/* eslint-disable react-hooks/rules-of-hooks */
const TooltipProvider = {
  'versionTag': element => {
    const translate = useService('translate');
    return jsxRuntime.jsx("div", {
      children: jsxRuntime.jsx("p", {
        children: translate('Version tag by which this decision can be referenced.')
      })
    });
  }
};

exports.CamundaPropertiesProviderModule = index$1;
exports.DmnPropertiesPanelModule = index$3;
exports.DmnPropertiesProviderModule = index$2;
exports.ZeebePropertiesProviderModule = index;
exports.ZeebeTooltipProvider = TooltipProvider;
exports.useService = useService;
//# sourceMappingURL=index.js.map
