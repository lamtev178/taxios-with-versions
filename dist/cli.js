#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_child_process_1 = require("node:child_process");
var promises_1 = require("node:fs/promises");
var fs_1 = require("fs");
var mkdirp_1 = require("mkdirp");
var path_1 = __importDefault(require("path"));
var minimist_1 = __importDefault(require("minimist"));
// import 'dotenv/config'
// console.log(process.env);
// for(let i of process.argv){
//     if(process.env[`${i}`]){
//         console.log(i + " :", process.env[`${i}`]);
//     }
// }
var args = process.argv.slice(2);
var argv = (0, minimist_1.default)(args, {
    string: ['out', 'export', 'package-version'],
    alias: {
        out: ['o'],
        export: ['e'],
    },
});
var packageVersion = argv['package-version'];
var outputPath = argv.out;
var inputPath = argv._[0];
if (!packageVersion) {
    console.error('You have to specify package-version');
    process.exit(1);
}
args.splice(args.findIndex(function (el) { return el === '--package-version'; }), 2);
(0, node_child_process_1.execSync)("taxios-generate ".concat(args.join(' ')));
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, mkdirp_1.mkdirp)(path_1.default.dirname("typesPackage/".concat(outputPath)))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, promises_1.copyFile)(outputPath, "typesPackage/".concat(outputPath))];
                case 2:
                    _a.sent();
                    (0, fs_1.writeFileSync)('./typesPackage/package.json', JSON.stringify(config), 'utf8');
                    (0, node_child_process_1.execSync)("cd typesPackage && npm publish");
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log('An error has occurred ', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
main();
var config = {
    name: "taxios_".concat(inputPath.split('//')[1].split('/')[0]),
    version: packageVersion,
};
//# sourceMappingURL=cli.js.map