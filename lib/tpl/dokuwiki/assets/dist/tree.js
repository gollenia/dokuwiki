/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Tree/img/file.svg":
/*!*******************************!*\
  !*** ./src/Tree/img/file.svg ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"images/6da9a2e1b4f76a69d2068a685d538f71-file.svg\");\n\n//# sourceURL=webpack://dwtheme/./src/Tree/img/file.svg?");

/***/ }),

/***/ "./src/Tree/img/folder.svg":
/*!*********************************!*\
  !*** ./src/Tree/img/folder.svg ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"images/e2c4556aa800dee649a5dad3d380876a-folder.svg\");\n\n//# sourceURL=webpack://dwtheme/./src/Tree/img/folder.svg?");

/***/ }),

/***/ "./src/Tree/tree.scss":
/*!****************************!*\
  !*** ./src/Tree/tree.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://dwtheme/./src/Tree/tree.scss?");

/***/ }),

/***/ "./node_modules/scheduler/cjs/scheduler.development.js":
/*!*************************************************************!*\
  !*** ./node_modules/scheduler/cjs/scheduler.development.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("/**\n * @license React\n * scheduler.development.js\n *\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\nif (true) {\n  (function() {\n\n          'use strict';\n\n/* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */\nif (\n  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&\n  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart ===\n    'function'\n) {\n  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());\n}\n          var enableSchedulerDebugging = false;\nvar enableProfiling = false;\nvar frameYieldMs = 5;\n\nfunction push(heap, node) {\n  var index = heap.length;\n  heap.push(node);\n  siftUp(heap, node, index);\n}\nfunction peek(heap) {\n  return heap.length === 0 ? null : heap[0];\n}\nfunction pop(heap) {\n  if (heap.length === 0) {\n    return null;\n  }\n\n  var first = heap[0];\n  var last = heap.pop();\n\n  if (last !== first) {\n    heap[0] = last;\n    siftDown(heap, last, 0);\n  }\n\n  return first;\n}\n\nfunction siftUp(heap, node, i) {\n  var index = i;\n\n  while (index > 0) {\n    var parentIndex = index - 1 >>> 1;\n    var parent = heap[parentIndex];\n\n    if (compare(parent, node) > 0) {\n      // The parent is larger. Swap positions.\n      heap[parentIndex] = node;\n      heap[index] = parent;\n      index = parentIndex;\n    } else {\n      // The parent is smaller. Exit.\n      return;\n    }\n  }\n}\n\nfunction siftDown(heap, node, i) {\n  var index = i;\n  var length = heap.length;\n  var halfLength = length >>> 1;\n\n  while (index < halfLength) {\n    var leftIndex = (index + 1) * 2 - 1;\n    var left = heap[leftIndex];\n    var rightIndex = leftIndex + 1;\n    var right = heap[rightIndex]; // If the left or right node is smaller, swap with the smaller of those.\n\n    if (compare(left, node) < 0) {\n      if (rightIndex < length && compare(right, left) < 0) {\n        heap[index] = right;\n        heap[rightIndex] = node;\n        index = rightIndex;\n      } else {\n        heap[index] = left;\n        heap[leftIndex] = node;\n        index = leftIndex;\n      }\n    } else if (rightIndex < length && compare(right, node) < 0) {\n      heap[index] = right;\n      heap[rightIndex] = node;\n      index = rightIndex;\n    } else {\n      // Neither child is smaller. Exit.\n      return;\n    }\n  }\n}\n\nfunction compare(a, b) {\n  // Compare sort index first, then task id.\n  var diff = a.sortIndex - b.sortIndex;\n  return diff !== 0 ? diff : a.id - b.id;\n}\n\n// TODO: Use symbols?\nvar ImmediatePriority = 1;\nvar UserBlockingPriority = 2;\nvar NormalPriority = 3;\nvar LowPriority = 4;\nvar IdlePriority = 5;\n\nfunction markTaskErrored(task, ms) {\n}\n\n/* eslint-disable no-var */\n\nvar hasPerformanceNow = typeof performance === 'object' && typeof performance.now === 'function';\n\nif (hasPerformanceNow) {\n  var localPerformance = performance;\n\n  exports.unstable_now = function () {\n    return localPerformance.now();\n  };\n} else {\n  var localDate = Date;\n  var initialTime = localDate.now();\n\n  exports.unstable_now = function () {\n    return localDate.now() - initialTime;\n  };\n} // Max 31 bit integer. The max integer size in V8 for 32-bit systems.\n// Math.pow(2, 30) - 1\n// 0b111111111111111111111111111111\n\n\nvar maxSigned31BitInt = 1073741823; // Times out immediately\n\nvar IMMEDIATE_PRIORITY_TIMEOUT = -1; // Eventually times out\n\nvar USER_BLOCKING_PRIORITY_TIMEOUT = 250;\nvar NORMAL_PRIORITY_TIMEOUT = 5000;\nvar LOW_PRIORITY_TIMEOUT = 10000; // Never times out\n\nvar IDLE_PRIORITY_TIMEOUT = maxSigned31BitInt; // Tasks are stored on a min heap\n\nvar taskQueue = [];\nvar timerQueue = []; // Incrementing id counter. Used to maintain insertion order.\n\nvar taskIdCounter = 1; // Pausing the scheduler is useful for debugging.\nvar currentTask = null;\nvar currentPriorityLevel = NormalPriority; // This is set while performing work, to prevent re-entrance.\n\nvar isPerformingWork = false;\nvar isHostCallbackScheduled = false;\nvar isHostTimeoutScheduled = false; // Capture local references to native APIs, in case a polyfill overrides them.\n\nvar localSetTimeout = typeof setTimeout === 'function' ? setTimeout : null;\nvar localClearTimeout = typeof clearTimeout === 'function' ? clearTimeout : null;\nvar localSetImmediate = typeof setImmediate !== 'undefined' ? setImmediate : null; // IE and Node.js + jsdom\n\nvar isInputPending = typeof navigator !== 'undefined' && navigator.scheduling !== undefined && navigator.scheduling.isInputPending !== undefined ? navigator.scheduling.isInputPending.bind(navigator.scheduling) : null;\n\nfunction advanceTimers(currentTime) {\n  // Check for tasks that are no longer delayed and add them to the queue.\n  var timer = peek(timerQueue);\n\n  while (timer !== null) {\n    if (timer.callback === null) {\n      // Timer was cancelled.\n      pop(timerQueue);\n    } else if (timer.startTime <= currentTime) {\n      // Timer fired. Transfer to the task queue.\n      pop(timerQueue);\n      timer.sortIndex = timer.expirationTime;\n      push(taskQueue, timer);\n    } else {\n      // Remaining timers are pending.\n      return;\n    }\n\n    timer = peek(timerQueue);\n  }\n}\n\nfunction handleTimeout(currentTime) {\n  isHostTimeoutScheduled = false;\n  advanceTimers(currentTime);\n\n  if (!isHostCallbackScheduled) {\n    if (peek(taskQueue) !== null) {\n      isHostCallbackScheduled = true;\n      requestHostCallback(flushWork);\n    } else {\n      var firstTimer = peek(timerQueue);\n\n      if (firstTimer !== null) {\n        requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);\n      }\n    }\n  }\n}\n\nfunction flushWork(hasTimeRemaining, initialTime) {\n\n\n  isHostCallbackScheduled = false;\n\n  if (isHostTimeoutScheduled) {\n    // We scheduled a timeout but it's no longer needed. Cancel it.\n    isHostTimeoutScheduled = false;\n    cancelHostTimeout();\n  }\n\n  isPerformingWork = true;\n  var previousPriorityLevel = currentPriorityLevel;\n\n  try {\n    if (enableProfiling) {\n      try {\n        return workLoop(hasTimeRemaining, initialTime);\n      } catch (error) {\n        if (currentTask !== null) {\n          var currentTime = exports.unstable_now();\n          markTaskErrored(currentTask, currentTime);\n          currentTask.isQueued = false;\n        }\n\n        throw error;\n      }\n    } else {\n      // No catch in prod code path.\n      return workLoop(hasTimeRemaining, initialTime);\n    }\n  } finally {\n    currentTask = null;\n    currentPriorityLevel = previousPriorityLevel;\n    isPerformingWork = false;\n  }\n}\n\nfunction workLoop(hasTimeRemaining, initialTime) {\n  var currentTime = initialTime;\n  advanceTimers(currentTime);\n  currentTask = peek(taskQueue);\n\n  while (currentTask !== null && !(enableSchedulerDebugging )) {\n    if (currentTask.expirationTime > currentTime && (!hasTimeRemaining || shouldYieldToHost())) {\n      // This currentTask hasn't expired, and we've reached the deadline.\n      break;\n    }\n\n    var callback = currentTask.callback;\n\n    if (typeof callback === 'function') {\n      currentTask.callback = null;\n      currentPriorityLevel = currentTask.priorityLevel;\n      var didUserCallbackTimeout = currentTask.expirationTime <= currentTime;\n\n      var continuationCallback = callback(didUserCallbackTimeout);\n      currentTime = exports.unstable_now();\n\n      if (typeof continuationCallback === 'function') {\n        currentTask.callback = continuationCallback;\n      } else {\n\n        if (currentTask === peek(taskQueue)) {\n          pop(taskQueue);\n        }\n      }\n\n      advanceTimers(currentTime);\n    } else {\n      pop(taskQueue);\n    }\n\n    currentTask = peek(taskQueue);\n  } // Return whether there's additional work\n\n\n  if (currentTask !== null) {\n    return true;\n  } else {\n    var firstTimer = peek(timerQueue);\n\n    if (firstTimer !== null) {\n      requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);\n    }\n\n    return false;\n  }\n}\n\nfunction unstable_runWithPriority(priorityLevel, eventHandler) {\n  switch (priorityLevel) {\n    case ImmediatePriority:\n    case UserBlockingPriority:\n    case NormalPriority:\n    case LowPriority:\n    case IdlePriority:\n      break;\n\n    default:\n      priorityLevel = NormalPriority;\n  }\n\n  var previousPriorityLevel = currentPriorityLevel;\n  currentPriorityLevel = priorityLevel;\n\n  try {\n    return eventHandler();\n  } finally {\n    currentPriorityLevel = previousPriorityLevel;\n  }\n}\n\nfunction unstable_next(eventHandler) {\n  var priorityLevel;\n\n  switch (currentPriorityLevel) {\n    case ImmediatePriority:\n    case UserBlockingPriority:\n    case NormalPriority:\n      // Shift down to normal priority\n      priorityLevel = NormalPriority;\n      break;\n\n    default:\n      // Anything lower than normal priority should remain at the current level.\n      priorityLevel = currentPriorityLevel;\n      break;\n  }\n\n  var previousPriorityLevel = currentPriorityLevel;\n  currentPriorityLevel = priorityLevel;\n\n  try {\n    return eventHandler();\n  } finally {\n    currentPriorityLevel = previousPriorityLevel;\n  }\n}\n\nfunction unstable_wrapCallback(callback) {\n  var parentPriorityLevel = currentPriorityLevel;\n  return function () {\n    // This is a fork of runWithPriority, inlined for performance.\n    var previousPriorityLevel = currentPriorityLevel;\n    currentPriorityLevel = parentPriorityLevel;\n\n    try {\n      return callback.apply(this, arguments);\n    } finally {\n      currentPriorityLevel = previousPriorityLevel;\n    }\n  };\n}\n\nfunction unstable_scheduleCallback(priorityLevel, callback, options) {\n  var currentTime = exports.unstable_now();\n  var startTime;\n\n  if (typeof options === 'object' && options !== null) {\n    var delay = options.delay;\n\n    if (typeof delay === 'number' && delay > 0) {\n      startTime = currentTime + delay;\n    } else {\n      startTime = currentTime;\n    }\n  } else {\n    startTime = currentTime;\n  }\n\n  var timeout;\n\n  switch (priorityLevel) {\n    case ImmediatePriority:\n      timeout = IMMEDIATE_PRIORITY_TIMEOUT;\n      break;\n\n    case UserBlockingPriority:\n      timeout = USER_BLOCKING_PRIORITY_TIMEOUT;\n      break;\n\n    case IdlePriority:\n      timeout = IDLE_PRIORITY_TIMEOUT;\n      break;\n\n    case LowPriority:\n      timeout = LOW_PRIORITY_TIMEOUT;\n      break;\n\n    case NormalPriority:\n    default:\n      timeout = NORMAL_PRIORITY_TIMEOUT;\n      break;\n  }\n\n  var expirationTime = startTime + timeout;\n  var newTask = {\n    id: taskIdCounter++,\n    callback: callback,\n    priorityLevel: priorityLevel,\n    startTime: startTime,\n    expirationTime: expirationTime,\n    sortIndex: -1\n  };\n\n  if (startTime > currentTime) {\n    // This is a delayed task.\n    newTask.sortIndex = startTime;\n    push(timerQueue, newTask);\n\n    if (peek(taskQueue) === null && newTask === peek(timerQueue)) {\n      // All tasks are delayed, and this is the task with the earliest delay.\n      if (isHostTimeoutScheduled) {\n        // Cancel an existing timeout.\n        cancelHostTimeout();\n      } else {\n        isHostTimeoutScheduled = true;\n      } // Schedule a timeout.\n\n\n      requestHostTimeout(handleTimeout, startTime - currentTime);\n    }\n  } else {\n    newTask.sortIndex = expirationTime;\n    push(taskQueue, newTask);\n    // wait until the next time we yield.\n\n\n    if (!isHostCallbackScheduled && !isPerformingWork) {\n      isHostCallbackScheduled = true;\n      requestHostCallback(flushWork);\n    }\n  }\n\n  return newTask;\n}\n\nfunction unstable_pauseExecution() {\n}\n\nfunction unstable_continueExecution() {\n\n  if (!isHostCallbackScheduled && !isPerformingWork) {\n    isHostCallbackScheduled = true;\n    requestHostCallback(flushWork);\n  }\n}\n\nfunction unstable_getFirstCallbackNode() {\n  return peek(taskQueue);\n}\n\nfunction unstable_cancelCallback(task) {\n  // remove from the queue because you can't remove arbitrary nodes from an\n  // array based heap, only the first one.)\n\n\n  task.callback = null;\n}\n\nfunction unstable_getCurrentPriorityLevel() {\n  return currentPriorityLevel;\n}\n\nvar isMessageLoopRunning = false;\nvar scheduledHostCallback = null;\nvar taskTimeoutID = -1; // Scheduler periodically yields in case there is other work on the main\n// thread, like user events. By default, it yields multiple times per frame.\n// It does not attempt to align with frame boundaries, since most tasks don't\n// need to be frame aligned; for those that do, use requestAnimationFrame.\n\nvar frameInterval = frameYieldMs;\nvar startTime = -1;\n\nfunction shouldYieldToHost() {\n  var timeElapsed = exports.unstable_now() - startTime;\n\n  if (timeElapsed < frameInterval) {\n    // The main thread has only been blocked for a really short amount of time;\n    // smaller than a single frame. Don't yield yet.\n    return false;\n  } // The main thread has been blocked for a non-negligible amount of time. We\n\n\n  return true;\n}\n\nfunction requestPaint() {\n\n}\n\nfunction forceFrameRate(fps) {\n  if (fps < 0 || fps > 125) {\n    // Using console['error'] to evade Babel and ESLint\n    console['error']('forceFrameRate takes a positive int between 0 and 125, ' + 'forcing frame rates higher than 125 fps is not supported');\n    return;\n  }\n\n  if (fps > 0) {\n    frameInterval = Math.floor(1000 / fps);\n  } else {\n    // reset the framerate\n    frameInterval = frameYieldMs;\n  }\n}\n\nvar performWorkUntilDeadline = function () {\n  if (scheduledHostCallback !== null) {\n    var currentTime = exports.unstable_now(); // Keep track of the start time so we can measure how long the main thread\n    // has been blocked.\n\n    startTime = currentTime;\n    var hasTimeRemaining = true; // If a scheduler task throws, exit the current browser task so the\n    // error can be observed.\n    //\n    // Intentionally not using a try-catch, since that makes some debugging\n    // techniques harder. Instead, if `scheduledHostCallback` errors, then\n    // `hasMoreWork` will remain true, and we'll continue the work loop.\n\n    var hasMoreWork = true;\n\n    try {\n      hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);\n    } finally {\n      if (hasMoreWork) {\n        // If there's more work, schedule the next message event at the end\n        // of the preceding one.\n        schedulePerformWorkUntilDeadline();\n      } else {\n        isMessageLoopRunning = false;\n        scheduledHostCallback = null;\n      }\n    }\n  } else {\n    isMessageLoopRunning = false;\n  } // Yielding to the browser will give it a chance to paint, so we can\n};\n\nvar schedulePerformWorkUntilDeadline;\n\nif (typeof localSetImmediate === 'function') {\n  // Node.js and old IE.\n  // There's a few reasons for why we prefer setImmediate.\n  //\n  // Unlike MessageChannel, it doesn't prevent a Node.js process from exiting.\n  // (Even though this is a DOM fork of the Scheduler, you could get here\n  // with a mix of Node.js 15+, which has a MessageChannel, and jsdom.)\n  // https://github.com/facebook/react/issues/20756\n  //\n  // But also, it runs earlier which is the semantic we want.\n  // If other browsers ever implement it, it's better to use it.\n  // Although both of these would be inferior to native scheduling.\n  schedulePerformWorkUntilDeadline = function () {\n    localSetImmediate(performWorkUntilDeadline);\n  };\n} else if (typeof MessageChannel !== 'undefined') {\n  // DOM and Worker environments.\n  // We prefer MessageChannel because of the 4ms setTimeout clamping.\n  var channel = new MessageChannel();\n  var port = channel.port2;\n  channel.port1.onmessage = performWorkUntilDeadline;\n\n  schedulePerformWorkUntilDeadline = function () {\n    port.postMessage(null);\n  };\n} else {\n  // We should only fallback here in non-browser environments.\n  schedulePerformWorkUntilDeadline = function () {\n    localSetTimeout(performWorkUntilDeadline, 0);\n  };\n}\n\nfunction requestHostCallback(callback) {\n  scheduledHostCallback = callback;\n\n  if (!isMessageLoopRunning) {\n    isMessageLoopRunning = true;\n    schedulePerformWorkUntilDeadline();\n  }\n}\n\nfunction requestHostTimeout(callback, ms) {\n  taskTimeoutID = localSetTimeout(function () {\n    callback(exports.unstable_now());\n  }, ms);\n}\n\nfunction cancelHostTimeout() {\n  localClearTimeout(taskTimeoutID);\n  taskTimeoutID = -1;\n}\n\nvar unstable_requestPaint = requestPaint;\nvar unstable_Profiling =  null;\n\nexports.unstable_IdlePriority = IdlePriority;\nexports.unstable_ImmediatePriority = ImmediatePriority;\nexports.unstable_LowPriority = LowPriority;\nexports.unstable_NormalPriority = NormalPriority;\nexports.unstable_Profiling = unstable_Profiling;\nexports.unstable_UserBlockingPriority = UserBlockingPriority;\nexports.unstable_cancelCallback = unstable_cancelCallback;\nexports.unstable_continueExecution = unstable_continueExecution;\nexports.unstable_forceFrameRate = forceFrameRate;\nexports.unstable_getCurrentPriorityLevel = unstable_getCurrentPriorityLevel;\nexports.unstable_getFirstCallbackNode = unstable_getFirstCallbackNode;\nexports.unstable_next = unstable_next;\nexports.unstable_pauseExecution = unstable_pauseExecution;\nexports.unstable_requestPaint = unstable_requestPaint;\nexports.unstable_runWithPriority = unstable_runWithPriority;\nexports.unstable_scheduleCallback = unstable_scheduleCallback;\nexports.unstable_shouldYield = shouldYieldToHost;\nexports.unstable_wrapCallback = unstable_wrapCallback;\n          /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */\nif (\n  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&\n  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop ===\n    'function'\n) {\n  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());\n}\n        \n  })();\n}\n\n\n//# sourceURL=webpack://dwtheme/./node_modules/scheduler/cjs/scheduler.development.js?");

/***/ }),

/***/ "./node_modules/scheduler/index.js":
/*!*****************************************!*\
  !*** ./node_modules/scheduler/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nif (false) {} else {\n  module.exports = __webpack_require__(/*! ./cjs/scheduler.development.js */ \"./node_modules/scheduler/cjs/scheduler.development.js\");\n}\n\n\n//# sourceURL=webpack://dwtheme/./node_modules/scheduler/index.js?");

/***/ }),

/***/ "./src/Tree/NewPage.tsx":
/*!******************************!*\
  !*** ./src/Tree/NewPage.tsx ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nconst NewPage = () => {\n    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", { className: 'backdrop' },\n        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", { className: \"modal open\" },\n            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", { className: \"modal-dialog\" },\n                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", { className: \"modal-content\" },\n                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", { className: \"modal-header\" },\n                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h5\", { className: \"modal-title\" }, \"Modal title\"),\n                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", { type: \"button\", className: \"btn-close\", \"data-bs-dismiss\": \"modal\", \"aria-label\": \"Close\" })),\n                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", { className: \"modal-body\" },\n                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"p\", null, \"Modal body text goes here.\")),\n                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", { className: \"modal-footer\" },\n                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", { type: \"button\", className: \"btn btn-secondary\", \"data-bs-dismiss\": \"modal\" }, \"Close\"),\n                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", { type: \"button\", className: \"btn btn-primary\" }, \"Save changes\")))))));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NewPage);\n\n\n//# sourceURL=webpack://dwtheme/./src/Tree/NewPage.tsx?");

/***/ }),

/***/ "./src/Tree/TreeItem.tsx":
/*!*******************************!*\
  !*** ./src/Tree/TreeItem.tsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _img_file_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./img/file.svg */ \"./src/Tree/img/file.svg\");\n/* harmony import */ var _img_folder_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./img/folder.svg */ \"./src/Tree/img/folder.svg\");\n\n\n\nconst TreeItem = (props) => {\n    const { item, currentID } = props;\n    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n    const [addPage, setAddPage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n    const [newPageName, setNewPageName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');\n    const toggleOpen = () => {\n        setOpen(!open);\n    };\n    const inputField = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n        if (currentID.includes(item.id))\n            setOpen(true);\n    }, []);\n    const classes = [\n        open ? 'open' : false,\n        item.children ? 'folder' : 'file',\n        item.id == currentID ? 'active' : false\n    ].filter(Boolean).join(' ');\n    const activateAddPage = () => {\n        setAddPage(true);\n        setOpen(true);\n    };\n    const inputKeyDown = (event) => {\n        if (event.key == 'Enter') {\n            if (!inputField.current.value) {\n                setAddPage(false);\n                return;\n            }\n            let newPage = inputField.current.value;\n            newPage.replace(' ', '_');\n            console.log('new Page', item.id + ':' + inputField.current.value);\n        }\n        if (event.key == \"Escape\") {\n            setAddPage(false);\n            inputField.current.value = '';\n        }\n    };\n    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"li\", { className: classes },\n        !item.children && react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", null,\n            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"img\", { src: _img_file_svg__WEBPACK_IMPORTED_MODULE_1__[\"default\"], width: \"16px\", height: \"16px\" }),\n            \" \",\n            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", { href: '/' + item.id }, item.title)),\n        item.children && react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,\n            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", null,\n                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"i\", { onClick: () => toggleOpen(), className: 'material-symbols-outlined icon-chevron' }, \"chevron_right\"),\n                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"img\", { src: _img_folder_svg__WEBPACK_IMPORTED_MODULE_2__[\"default\"], width: \"16px\", height: \"16px\" }),\n                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"a\", { href: '/' + item.id }, item.title),\n                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"i\", { className: 'add-page material-symbols-outlined', onClick: () => activateAddPage() }, \"add\")),\n            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"ul\", null,\n                addPage && react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"li\", null,\n                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", { className: \"fomr-control new-page-input\", autoFocus: true, onKeyDown: (event) => { inputKeyDown(event); }, ref: inputField, type: \"text\" })),\n                item.children.map((child, index) => {\n                    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(TreeItem, { key: index, currentID: currentID, item: child }));\n                })))));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TreeItem);\n\n\n//# sourceURL=webpack://dwtheme/./src/Tree/TreeItem.tsx?");

/***/ }),

/***/ "./src/Tree/TreeView.tsx":
/*!*******************************!*\
  !*** ./src/Tree/TreeView.tsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _NewPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewPage */ \"./src/Tree/NewPage.tsx\");\n/* harmony import */ var _TreeItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TreeItem */ \"./src/Tree/TreeItem.tsx\");\n/* harmony import */ var _tree_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tree.scss */ \"./src/Tree/tree.scss\");\n\n\n\n\nconst TreeView = () => {\n    var _a;\n    const currentId = (_a = window.DOKU_ID) !== null && _a !== void 0 ? _a : '';\n    const [tree, setTree] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n        fetch('/?controller=edit&method=tree')\n            .then(response => response.json())\n            .then(data => setTree(data));\n    }, []);\n    console.log(tree);\n    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,\n        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"ul\", { className: 'tree tree-root' }, tree === null || tree === void 0 ? void 0 : tree.map((item, index) => {\n            return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_TreeItem__WEBPACK_IMPORTED_MODULE_2__[\"default\"], { key: index, currentID: currentId, item: item });\n        })),\n        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_NewPage__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null)));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TreeView);\n\n\n//# sourceURL=webpack://dwtheme/./src/Tree/TreeView.tsx?");

/***/ }),

/***/ "./src/tree.tsx":
/*!**********************!*\
  !*** ./src/tree.tsx ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ \"./node_modules/react-dom/client.js\");\n/* harmony import */ var _Tree_TreeView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tree/TreeView */ \"./src/Tree/TreeView.tsx\");\n\n\n\nconst root = react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot(document.getElementById('react-tree'));\nroot.render(react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().StrictMode), null,\n    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Tree_TreeView__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null)));\n\n\n//# sourceURL=webpack://dwtheme/./src/tree.tsx?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"tree": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkdwtheme"] = self["webpackChunkdwtheme"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor-react"], () => (__webpack_require__("./src/tree.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;