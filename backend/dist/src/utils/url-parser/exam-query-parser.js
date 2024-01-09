"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseExamFilterParams = void 0;
const parseExamFilterParams = (url) => {
    const filter = {};
    const splitUrl = url.split('?');
    if (splitUrl.length === 1) {
        return filter;
    }
    const paramsString = splitUrl[1];
    const paramsArray = paramsString.split('&');
    paramsArray.forEach(param => {
        var split_parameter = param.split('=');
        if (split_parameter.length !== 1) {
            switch (split_parameter[0]) {
                case 'examId':
                    filter.examId = split_parameter[1].split(',');
                    break;
                case 'examType':
                    filter.examType = split_parameter[1].split(',');
                    break;
                case 'classGroupName':
                    filter.classGroupName = split_parameter[1].split(',');
                    break;
                case 'acYear':
                    filter.acYear = split_parameter[1].split(',');
                    break;
                case 'studentId':
                    filter.studentId = split_parameter[1].split(',');
                    break;
                default:
                    console.log(`error parameter -> ${split_parameter[0]}`);
            }
        }
    });
    return filter;
};
exports.parseExamFilterParams = parseExamFilterParams;
