"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/presign";
exports.ids = ["pages/api/presign"];
exports.modules = {

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("aws-sdk");

/***/ }),

/***/ "(api)/./pages/api/presign.js":
/*!******************************!*\
  !*** ./pages/api/presign.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_0__);\n\nasync function handler(req, res) {\n    console.log({\n        accessKeyId: process.env.AWS_ACCESS_KEY_ID,\n        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,\n        region: process.env.AWS_REGION\n    });\n    aws_sdk__WEBPACK_IMPORTED_MODULE_0___default().config.update({\n        accessKeyId: process.env.AWS_ACCESS_KEY_ID,\n        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,\n        region: process.env.AWS_REGION,\n        signatureVersion: \"v4\",\n        acl: \"public-read\"\n    });\n    const s3 = new (aws_sdk__WEBPACK_IMPORTED_MODULE_0___default().S3)();\n    const post = await s3.createPresignedPost({\n        Bucket: process.env.AWS_BUCKET_NAME,\n        Fields: {\n            key: req.query.file\n        },\n        Expires: 300,\n        Conditions: [\n            [\n                \"content-length-range\",\n                0,\n                50 * 1024 * 1024\n            ]\n        ]\n    });\n    const publicUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${req.query.file}`;\n    res.status(200).json({\n        ...post,\n        publicUrl\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvcHJlc2lnbi5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBMEI7QUFFWCxlQUFlQyxPQUFPLENBQUNDLEdBQUcsRUFBRUMsR0FBRyxFQUFFO0lBQzlDQyxPQUFPLENBQUNDLEdBQUcsQ0FBQztRQUFFQyxXQUFXLEVBQUVDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxpQkFBaUI7UUFDdERDLGVBQWUsRUFBRUgsT0FBTyxDQUFDQyxHQUFHLENBQUNHLHFCQUFxQjtRQUNsREMsTUFBTSxFQUFFTCxPQUFPLENBQUNDLEdBQUcsQ0FBQ0ssVUFBVTtLQUFFLENBQUM7SUFDbkNiLDREQUFpQixDQUFDO1FBQ2hCTSxXQUFXLEVBQUVDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxpQkFBaUI7UUFDMUNDLGVBQWUsRUFBRUgsT0FBTyxDQUFDQyxHQUFHLENBQUNHLHFCQUFxQjtRQUNsREMsTUFBTSxFQUFFTCxPQUFPLENBQUNDLEdBQUcsQ0FBQ0ssVUFBVTtRQUM5QkcsZ0JBQWdCLEVBQUUsSUFBSTtRQUN0QkMsR0FBRyxFQUFFLGFBQWE7S0FDbkIsQ0FBQyxDQUFDO0lBQ0gsTUFBTUMsRUFBRSxHQUFHLElBQUlsQixtREFBTSxFQUFFO0lBQ3ZCLE1BQU1vQixJQUFJLEdBQUcsTUFBTUYsRUFBRSxDQUFDRyxtQkFBbUIsQ0FBQztRQUN4Q0MsTUFBTSxFQUFFZixPQUFPLENBQUNDLEdBQUcsQ0FBQ2UsZUFBZTtRQUNuQ0MsTUFBTSxFQUFFO1lBQ05DLEdBQUcsRUFBRXZCLEdBQUcsQ0FBQ3dCLEtBQUssQ0FBQ0MsSUFBSTtTQUNwQjtRQUNEQyxPQUFPLEVBQUUsR0FBRztRQUNaQyxVQUFVLEVBQUU7WUFDVjtnQkFBQyxzQkFBc0I7QUFBRSxpQkFBQztBQUFFLGtCQUFFLEdBQUcsSUFBSSxHQUFHLElBQUk7YUFBQztTQUM5QztLQUNGLENBQUM7SUFFRixNQUFNQyxTQUFTLEdBQUcsQ0FBQyxRQUFRLEVBQUV2QixPQUFPLENBQUNDLEdBQUcsQ0FBQ2UsZUFBZSxDQUFDLElBQUksRUFBRWhCLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDSyxVQUFVLENBQUMsZUFBZSxFQUFFWCxHQUFHLENBQUN3QixLQUFLLENBQUNDLElBQUksQ0FBQyxDQUFDO0lBRXZIeEIsR0FBRyxDQUFDNEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7UUFBRSxHQUFHWixJQUFJO1FBQUVVLFNBQVM7S0FBRSxDQUFDLENBQUM7QUFDL0MsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2VkdWNhdGlvbi8uL3BhZ2VzL2FwaS9wcmVzaWduLmpzP2VmNzYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF3cyBmcm9tICdhd3Mtc2RrJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcclxuICBjb25zb2xlLmxvZyh7IGFjY2Vzc0tleUlkOiBwcm9jZXNzLmVudi5BV1NfQUNDRVNTX0tFWV9JRCxcclxuICAgIHNlY3JldEFjY2Vzc0tleTogcHJvY2Vzcy5lbnYuQVdTX1NFQ1JFVF9BQ0NFU1NfS0VZLFxyXG4gICAgcmVnaW9uOiBwcm9jZXNzLmVudi5BV1NfUkVHSU9OLH0pXHJcbiAgYXdzLmNvbmZpZy51cGRhdGUoe1xyXG4gICAgYWNjZXNzS2V5SWQ6IHByb2Nlc3MuZW52LkFXU19BQ0NFU1NfS0VZX0lELFxyXG4gICAgc2VjcmV0QWNjZXNzS2V5OiBwcm9jZXNzLmVudi5BV1NfU0VDUkVUX0FDQ0VTU19LRVksXHJcbiAgICByZWdpb246IHByb2Nlc3MuZW52LkFXU19SRUdJT04sXHJcbiAgICBzaWduYXR1cmVWZXJzaW9uOiAndjQnLFxyXG4gICAgYWNsOiAncHVibGljLXJlYWQnLFxyXG4gIH0pO1xyXG4gIGNvbnN0IHMzID0gbmV3IGF3cy5TMygpO1xyXG4gIGNvbnN0IHBvc3QgPSBhd2FpdCBzMy5jcmVhdGVQcmVzaWduZWRQb3N0KHtcclxuICAgIEJ1Y2tldDogcHJvY2Vzcy5lbnYuQVdTX0JVQ0tFVF9OQU1FLFxyXG4gICAgRmllbGRzOiB7XHJcbiAgICAgIGtleTogcmVxLnF1ZXJ5LmZpbGUsXHJcbiAgICB9LFxyXG4gICAgRXhwaXJlczogMzAwLCAvLyBzZWNvbmRzXHJcbiAgICBDb25kaXRpb25zOiBbXHJcbiAgICAgIFsnY29udGVudC1sZW5ndGgtcmFuZ2UnLCAwLCA1MCAqIDEwMjQgKiAxMDI0XSwgLy8gdXAgdG8gNTAgTUJcclxuICAgIF0sXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHB1YmxpY1VybCA9IGBodHRwczovLyR7cHJvY2Vzcy5lbnYuQVdTX0JVQ0tFVF9OQU1FfS5zMy4ke3Byb2Nlc3MuZW52LkFXU19SRUdJT059LmFtYXpvbmF3cy5jb20vJHtyZXEucXVlcnkuZmlsZX1gO1xyXG5cclxuICByZXMuc3RhdHVzKDIwMCkuanNvbih7IC4uLnBvc3QsIHB1YmxpY1VybCB9KTtcclxufSJdLCJuYW1lcyI6WyJhd3MiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwiY29uc29sZSIsImxvZyIsImFjY2Vzc0tleUlkIiwicHJvY2VzcyIsImVudiIsIkFXU19BQ0NFU1NfS0VZX0lEIiwic2VjcmV0QWNjZXNzS2V5IiwiQVdTX1NFQ1JFVF9BQ0NFU1NfS0VZIiwicmVnaW9uIiwiQVdTX1JFR0lPTiIsImNvbmZpZyIsInVwZGF0ZSIsInNpZ25hdHVyZVZlcnNpb24iLCJhY2wiLCJzMyIsIlMzIiwicG9zdCIsImNyZWF0ZVByZXNpZ25lZFBvc3QiLCJCdWNrZXQiLCJBV1NfQlVDS0VUX05BTUUiLCJGaWVsZHMiLCJrZXkiLCJxdWVyeSIsImZpbGUiLCJFeHBpcmVzIiwiQ29uZGl0aW9ucyIsInB1YmxpY1VybCIsInN0YXR1cyIsImpzb24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/presign.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/presign.js"));
module.exports = __webpack_exports__;

})();