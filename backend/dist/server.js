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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const teacher_router_1 = __importDefault(require("./src/routers/teacher-router"));
const student_router_1 = __importDefault(require("./src/routers/student-router"));
const cors_1 = __importDefault(require("cors"));
const midterm_router_1 = __importDefault(require("./src/routers/midterm-router"));
const labGroup_router_1 = __importDefault(require("./src/routers/labGroup-router"));
const labExercise_router_1 = __importDefault(require("./src/routers/labExercise-router"));
const homework_router_1 = __importDefault(require("./src/routers/homework-router"));
const exam_router_1 = __importDefault(require("./src/routers/exam-router"));
const classGroup_router_1 = __importDefault(require("./src/routers/classGroup-router"));
const auth_router_1 = __importDefault(require("./src/routers/auth-router"));
//For env File
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.FE_URL,
}));
// for logging endpoints and methods
app.use((req, res, next) => {
    // ANSI escape code for yellow text color
    const yellowText = '\x1b[33m';
    // ANSI escape code to reset text color to the default
    const resetText = '\x1b[0m';
    console.log(`${yellowText}Request received for ${req.method} ${req.path}${resetText}\n`);
    next();
});
app.use((0, express_session_1.default)({
    secret: process.env.EXPRESS_SECRET_KEY || 'secret-key', // Replace with a strong secret key for session encryption
    resave: false, // Don't save sessions if they haven't been modified
    saveUninitialized: false, // Don't save new, uninitialized sessions
    cookie: {
        maxAge: 3600000, // Session duration in milliseconds (1 hour in this example)
    },
}));
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Hello world');
}));
app.use('/auth', auth_router_1.default);
app.use('/teacher', teacher_router_1.default);
app.use('/student', student_router_1.default);
app.use('/midterm', midterm_router_1.default);
app.use('/labGroup', labGroup_router_1.default);
app.use('/labExercise', labExercise_router_1.default);
app.use('/homework', homework_router_1.default);
app.use('/exam', exam_router_1.default);
app.use('/classGroup', classGroup_router_1.default);
app.listen(port, () => {
    console.log(`Server is at http://localhost:${port}\n\n`);
});
